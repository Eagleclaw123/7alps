import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthButton from "../../components/AuthButton";
import AuthCard from "../../components/AuthCard";
import AuthHeader from "../../components/AuthHeader";
import AuthInput from "../../components/AuthInput";
import AuthLayout from "../../components/AuthLayout";
import { sendCustomerOTP } from "../../../../shared/services/auth.service";

const initialFormData = {
  mobile: "",
};

const CustomerLoginPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = ({ target: { name, value } }) => {
    // Allow only numbers
    const mobile = value.replace(/\D/g, "").slice(0, 10);

    setFormData({
      mobile,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);

      await sendCustomerOTP(formData);

      // Pass mobile number to OTP verification page
      navigate("/customer/verify-otp", {
        state: {
          mobile: formData.mobile,
        },
      });
    } catch (error) {
      const message = error.response?.data?.message;

      if (error.response?.status === 400 && message?.includes("provide your name")) {
        // No account exists for this number yet — send them to register instead
        // of dead-ending on an error.
        navigate("/customer/register", { state: { mobile: formData.mobile } });
        return;
      }

      console.error(error);
      alert(message || "Unable to send OTP. Please try again.");
    } finally {
      setLoading(false);
      setFormData(initialFormData);
    }
  };

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
          title="Welcome Back"
          subtitle="Login using your registered mobile number."
        />

        <form className="space-y-6" onSubmit={handleSubmit}>
          <AuthInput
            name="mobile"
            label="Mobile Number"
            type="tel"
            placeholder="Enter your mobile number"
            value={formData.mobile}
            onChange={handleChange}
            maxLength={10}
          />

          <AuthButton type="submit" disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </AuthButton>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/customer/register"
              className="font-semibold text-[#0F6B3E] hover:underline"
            >
              Create Account
            </Link>
          </p>

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

export default CustomerLoginPage;
