import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import AuthButton from "../../components/AuthButton";
import AuthCard from "../../components/AuthCard";
import AuthHeader from "../../components/AuthHeader";
import AuthInput from "../../components/AuthInput";
import AuthLayout from "../../components/AuthLayout";
import { sendCustomerOTP } from "../../../../shared/services/auth.service";

const initialFormData = {
  email: "",
};

const validateEmail = (email) => {
  if (!email) {
    return "Email address is required.";
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Enter a valid email address.";
  }
  return "";
};

const CustomerLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  const handleChange = ({ target: { value } }) => {
    setFormData({
      email: value,
    });

    if (touched) {
      setError(validateEmail(value));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateEmail(formData.email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateEmail(formData.email);
    setTouched(true);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    try {
      setLoading(true);

      await sendCustomerOTP(formData);

      // Pass email (and where to return to after login) to the OTP page
      navigate("/customer/verify-otp", {
        state: {
          email: formData.email,
          from,
        },
      });
    } catch (err) {
      const message = err.response?.data?.message;

      if (
        err.response?.status === 400 &&
        message?.includes("provide your name")
      ) {
        // No account exists for this email yet — send them to register instead
        // of dead-ending on an error.
        navigate("/customer/register", {
          state: { email: formData.email, from },
        });
        return;
      }

      console.error(err);
      setError(message || "Unable to send OTP. Please try again.");
    } finally {
      setLoading(false);
      setFormData(initialFormData);
      setTouched(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Welcome back."
          subtitle="Login using your registered email address."
        />

        <form className="space-y-7" onSubmit={handleSubmit} noValidate>
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

            {error && (
              <p className="mt-2 font-manrope text-xs text-red-600">{error}</p>
            )}
          </div>

          <AuthButton
            type="submit"
            disabled={loading || !!validateEmail(formData.email)}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </AuthButton>

          <div className="border-t border-[#D8CCC0] pt-6 text-center">
            <p className="font-manrope text-xs text-[#756A62]">
              Don't have an account?{" "}
              <Link
                to="/customer/register"
                className="font-semibold text-[#211B17] underline decoration-[#C56B4E] underline-offset-4 transition hover:text-[#C56B4E]"
              >
                Create Account
              </Link>
            </p>
          </div>
          <p className="text-center text-xs text-gray-600">
            <Link
              to="/"
              className="font-semibold text-[#211B17] underline decoration-[#C56B4E] underline-offset-4 transition hover:text-[#C56B4E]"
            >
              ← Back to Website
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default CustomerLoginPage;
