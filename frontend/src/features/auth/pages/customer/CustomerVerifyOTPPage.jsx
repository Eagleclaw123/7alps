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
        <AuthHeader
          title="Verify your email."
          subtitle="Enter the 6-digit verification code sent to your email."
        />

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="border-l-2 border-[#C56B4E] pl-4">
            <p className="font-ibm-mono text-[9px] uppercase tracking-[0.2em] text-[#91847A]">
              Code sent to
            </p>

            <p className="mt-1 break-all font-manrope text-sm font-medium text-[#211B17]">
              {email}
            </p>
          </div>

          <OTPInput onChange={setOtp} />

          <AuthButton type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </AuthButton>

          <div className="space-y-4 border-t border-[#D8CCC0] pt-6 text-center">
            <p className="font-manrope text-xs text-[#756A62]">
              Didn't receive the code?
            </p>

            <button
              type="button"
              onClick={handleResend}
              className="font-ibm-mono text-[9px] font-medium uppercase tracking-[0.2em] text-[#211B17] underline decoration-[#C56B4E] underline-offset-4 transition hover:text-[#C56B4E]"
            >
              Resend OTP
            </button>

            <Link
              to="/customer/login"
              className="block font-ibm-mono text-[9px] uppercase tracking-[0.2em] text-[#756A62] transition hover:text-[#C56B4E]"
            >
              ← Change email address
            </Link>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default CustomerVerifyOTPPage;
