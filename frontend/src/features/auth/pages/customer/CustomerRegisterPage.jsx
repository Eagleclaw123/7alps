import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import AuthButton from "../../components/AuthButton";
import AuthCard from "../../components/AuthCard";
import AuthHeader from "../../components/AuthHeader";
import AuthInput from "../../components/AuthInput";
import AuthLayout from "../../components/AuthLayout";
import { sendCustomerOTP } from "../../../../shared/services/auth.service";

const validators = {
  name: (value) => {
    if (!value.trim()) return "Please enter your name.";
    if (value.trim().length < 3) return "Name must be at least 3 characters.";
    if (!/^[A-Za-z\s.'-]+$/.test(value.trim()))
      return "Name can only contain letters and spaces.";
    return "";
  },
  email: (value) => {
    if (!value) return "Please enter your email address.";
    if (!/^\S+@\S+\.\S+$/.test(value)) return "Enter a valid email address.";
    return "";
  },
};

const CustomerRegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: location.state?.email || "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

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
      name: validators.name(formData.name),
      email: validators.email(formData.email),
    };
    setFieldErrors(nextErrors);
    setTouched({ name: true, email: true });
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
      await sendCustomerOTP(formData);

      navigate("/customer/verify-otp", {
        state: { email: formData.email, from: location.state?.from },
      });
    } catch (error) {
      setFormError(
        error.response?.data?.message ||
          "Unable to send OTP. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const isValid =
    !validators.name(formData.name) && !validators.email(formData.email);

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Create account."
          subtitle="Join 7ALP's and start your wellness journey."
        />

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div>
            <AuthInput
              name="name"
              label="Full Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {fieldErrors.name && (
              <p className="mt-2 font-manrope text-xs text-red-600">
                {fieldErrors.name}
              </p>
            )}
          </div>

          <div>
            <AuthInput
              name="email"
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {fieldErrors.email && (
              <p className="mt-2 font-manrope text-xs text-red-600">
                {fieldErrors.email}
              </p>
            )}
          </div>

          {formError && (
            <p className="font-manrope text-xs text-red-600">{formError}</p>
          )}

          <AuthButton type="submit" disabled={loading || !isValid}>
            {loading ? "Sending OTP..." : "Create Account"}
          </AuthButton>

          <div className="border-t border-[#D8CCC0] pt-6 text-center">
            <p className="font-manrope text-xs text-[#756A62]">
              Already have an account?{" "}
              <Link
                to="/customer/login"
                className="font-semibold text-[#211B17] underline decoration-[#C56B4E] underline-offset-4 transition hover:text-[#C56B4E]"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default CustomerRegisterPage;
