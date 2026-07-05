import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import AuthLayout from "../../components/AuthLayout";
import AuthCard from "../../components/AuthCard";
import AuthHeader from "../../components/AuthHeader";
import AuthButton from "../../components/AuthButton";
import OTPInput from "../../components/OTPInput";
import {
  sendCustomerOTP,
  verifyCustomerOTP,
} from "../../../../shared/services/auth.service";
import { mergeGuestCartOnLogin } from "../../../../store/slices/cartSlice";

const CustomerVerifyOTPPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const mobile = location.state?.mobile;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (!mobile) {
    return (
      <AuthLayout>
        <AuthCard>
          <AuthHeader
            title="Session Expired"
            subtitle="Please start over from the login page."
          />
          <Link
            to="/customer/login"
            className="block text-center font-medium text-[#0F6B3E] hover:underline"
          >
            ← Back to Login
          </Link>
        </AuthCard>
      </AuthLayout>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("Please enter the complete OTP.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await verifyCustomerOTP({ mobile, otp });

      localStorage.setItem("customerToken", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.data.customer, role: "customer" }),
      );

      await dispatch(mergeGuestCartOnLogin());

      navigate("/customer/dashboard", { replace: true });
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await sendCustomerOTP({ mobile });
      alert("A new OTP has been sent.");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to resend OTP.");
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
          title="Verify OTP"
          subtitle="Enter the 6-digit verification code sent to your mobile number."
        />

        <form onSubmit={handleSubmit} className="space-y-8">
          <p className="text-center text-sm text-gray-500">
            Code sent to
            <span className="ml-1 font-semibold text-[#0F6B3E]">
              +91 {mobile}
            </span>
          </p>

          <p className="text-center text-xs text-gray-400">
            SMS delivery isn't set up yet — use{" "}
            <span className="font-semibold">123456</span> to continue.
          </p>

          <OTPInput onChange={setOtp} />

          <AuthButton type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </AuthButton>

          <div className="space-y-3 text-center text-sm">
            <p className="text-gray-500">Didn't receive the code?</p>

            <button
              type="button"
              onClick={handleResend}
              className="font-semibold text-[#0F6B3E] transition hover:underline"
            >
              Resend OTP
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
