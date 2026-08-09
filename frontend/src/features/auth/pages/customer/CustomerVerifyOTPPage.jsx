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
import { setCustomer } from "../../../../store/slices/authSlice";

const CustomerVerifyOTPPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const from = location.state?.from;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email) {
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

      const { data } = await verifyCustomerOTP({ email, otp });

      if (data.data.needsMobile) {
        // Email verified, but no mobile number on file yet — collect and
        // validate it before a full login session is issued.
        navigate("/customer/add-mobile", {
          state: { pendingToken: data.data.pendingToken, from },
        });
        return;
      }

      // Store only user details in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...data.data.customer,
          role: "customer",
        }),
      );
      dispatch(setCustomer(data.data.customer));

      await dispatch(mergeGuestCartOnLogin());

      const destination = from ? `${from.pathname}${from.search || ""}` : "/";
      navigate(destination, { replace: true });
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await sendCustomerOTP({ email });
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
          subtitle="Enter the 6-digit verification code sent to your email."
        />

        <form onSubmit={handleSubmit} className="space-y-8">
          <p className="text-center text-sm text-gray-500">
            Code sent to
            <span className="ml-1 font-semibold text-[#0F6B3E]">
              {email}
            </span>
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
              ← Change Email Address
            </Link>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default CustomerVerifyOTPPage;
