import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthButton from "../../components/AuthButton";
import AuthCard from "../../components/AuthCard";
import AuthHeader from "../../components/AuthHeader";
import AuthInput from "../../components/AuthInput";
import AuthLayout from "../../components/AuthLayout";
import PasswordInput from "../../components/PasswordInput";
import { adminLogin } from "../../../../shared/services/auth.service";

const initialFormData = {
  email: "",
  password: "",
};

const validators = {
  email: (value) => {
    if (!value.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
      return "Enter a valid email address.";
    return "";
  },
  password: (value) => {
    if (!value) return "Password is required.";
    if (value.length < 6) return "Password must be at least 6 characters.";
    return "";
  },
};

const AdminLoginPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: validators[name](value),
      }));
    }
  };

  const handleBlur = ({ target: { name, value } }) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFieldErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
  };

  const validateAll = () => {
    const nextErrors = {
      email: validators.email(formData.email),
      password: validators.password(formData.password),
    };
    setFieldErrors(nextErrors);
    setTouched({ email: true, password: true });
    return Object.values(nextErrors).every((msg) => !msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!validateAll()) {
      return;
    }

    try {
      setLoading(true);

      const { data: responseData } = await adminLogin(formData);

      const adminUser = responseData?.data?.user;

      navigate("/admin", {
        replace: true,
      });
    } catch (error) {
      setFormError(
        error.response?.data?.message || "Unable to login. Please try again.",
      );
    } finally {
      setLoading(false);
      setFormData(initialFormData);
      setTouched({});
    }
  };

  const isValid =
    !validators.email(formData.email) &&
    !validators.password(formData.password);

  return (
    <AuthLayout>
      <AuthCard>
        <div className="mb-8">
          <img
            src="https://res.cloudinary.com/dasvdkncm/image/upload/v1781664574/7_ALP_s_Logo-removebg-preview_e7kr1k.png"
            alt="7ALP's Logo"
            className="h-16 w-auto"
          />
        </div>

        <AuthHeader
          title="Admin Portal"
          subtitle="Authorized personnel only."
        />

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div>
            <AuthInput
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {fieldErrors.email ? (
              <p className="mt-1.5 text-sm text-red-600">{fieldErrors.email}</p>
            ) : null}
          </div>

          <div>
            <PasswordInput
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {fieldErrors.password ? (
              <p className="mt-1.5 text-sm text-red-600">
                {fieldErrors.password}
              </p>
            ) : null}
          </div>

          <div className="flex justify-end text-sm">
            <Link
              to="/admin/forgot-password"
              className="font-medium text-[#0F6B3E] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {formError ? (
            <p className="text-sm text-red-600">{formError}</p>
          ) : null}

          <AuthButton type="submit" disabled={loading || !isValid}>
            {loading ? "Signing In..." : "Login"}
          </AuthButton>

          <p className="text-center text-sm text-gray-600">
            <Link to="/" className="font-medium text-[#0F6B3E] hover:underline">
              ← Back to Website
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default AdminLoginPage;
