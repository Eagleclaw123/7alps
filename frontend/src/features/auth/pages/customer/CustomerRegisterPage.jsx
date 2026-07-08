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
  mobile: (value) => {
    if (!value) return "Please enter your mobile number.";
    if (value.length !== 10) return "Mobile number must be exactly 10 digits.";
    if (!/^[6-9]\d{9}$/.test(value))
      return "Enter a valid 10-digit mobile number.";
    return "";
  },
};

const CustomerRegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: location.state?.mobile || "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    const nextValue =
      name === "mobile" ? value.replace(/\D/g, "").slice(0, 10) : value;

    setFormData((prev) => ({ ...prev, [name]: nextValue }));

    if (touched[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: validators[name](nextValue),
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
      mobile: validators.mobile(formData.mobile),
    };
    setFieldErrors(nextErrors);
    setTouched({ name: true, mobile: true });
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
        state: { mobile: formData.mobile, from: location.state?.from },
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
    !validators.name(formData.name) && !validators.mobile(formData.mobile);

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Create Account"
          subtitle="Join 7ALP's and start your wellness journey."
        />

        <form
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
          onSubmit={handleSubmit}
          noValidate
        >
          <div>
            <AuthInput
              name="name"
              label="Full Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {fieldErrors.name ? (
              <p className="mt-1.5 text-sm text-red-600">{fieldErrors.name}</p>
            ) : null}
          </div>

          <div>
            <AuthInput
              name="mobile"
              label="Mobile Number"
              type="tel"
              placeholder="9876543210"
              value={formData.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={10}
            />
            {fieldErrors.mobile ? (
              <p className="mt-1.5 text-sm text-red-600">
                {fieldErrors.mobile}
              </p>
            ) : null}
          </div>

          {formError ? (
            <p className="md:col-span-2 text-sm text-red-600">{formError}</p>
          ) : null}

          <div className="md:col-span-2">
            <AuthButton type="submit" disabled={loading || !isValid}>
              {loading ? "Sending OTP..." : "Create Account"}
            </AuthButton>
          </div>

          <p className="md:col-span-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/customer/login" className="font-semibold text-[#0F6B3E]">
              Login
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default CustomerRegisterPage;
