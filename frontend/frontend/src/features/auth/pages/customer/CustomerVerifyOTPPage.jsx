import { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "../../components/AuthLayout";
import AuthCard from "../../components/AuthCard";
import AuthHeader from "../../components/AuthHeader";
import AuthButton from "../../components/AuthButton";
import OTPInput from "../../components/OTPInput";

const CustomerVerifyOTPPage = () => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("Please enter the complete OTP.");
      return;
    }

    console.log("OTP:", otp);

    // Call your verify OTP API here
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
          title="Verify OTP"
          subtitle="Enter the 6-digit verification code sent to your mobile number."
        />

        <form onSubmit={handleSubmit} className="space-y-8">
          <p className="text-center text-sm text-gray-500">
            Code sent to
            <span className="ml-1 font-semibold text-[#0F6B3E]">
              +91 98765 43210
            </span>
          </p>

          <OTPInput onChange={setOtp} />

          <AuthButton type="submit">Verify OTP</AuthButton>

          <div className="space-y-3 text-center text-sm">
            <p className="text-gray-500">Didn't receive the code?</p>

            <button
              type="button"
              className="font-semibold text-[#0F6B3E] transition hover:underline"
            >
              Resend OTP (00:30)
            </button>

            <Link
              to="/customer/login"
              className="block font-medium text-[#0F6B3E] transition hover:underline"
            >
              ← Change Mobile Number
            </Link>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default CustomerVerifyOTPPage;
