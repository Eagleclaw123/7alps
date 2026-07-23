import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ForgotPasswordForm from "./ForgotPasswordForm";
import OTPInput from "./OTPInput";
import ResetPasswordForm from "./ResetPasswordForm";
import AuthCard from "./AuthCard";
import AuthHeader from "./AuthHeader";
import AuthButton from "./AuthButton";

const ForgotPasswordFlow = ({
  role, // "admin" | "b2b"
  loginPath,
  forgotPasswordFn,
  verifyOTPFn,
  resetPasswordFn,
}) => {
  const navigate = useNavigate();
  const [step, setStep] = useState("email"); // "email" | "otp" | "reset"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    setError("");
    setLoading(true);
    try {
      await forgotPasswordFn(email);
      setStep("otp");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    if (otp.length !== 6) {
      setError("Please enter the 6-digit code.");
      return;
    }
    setLoading(true);
    try {
      await verifyOTPFn(email, otp);
      setStep("reset");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await resetPasswordFn(email, otp, password, confirmPassword);
      navigate(loginPath);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "email") {
    return (
      <ForgotPasswordForm
        title="Forgot Password"
        subtitle={`Enter your ${role === "admin" ? "admin" : "B2B"} email to receive a verification code.`}
        label={role === "admin" ? "Admin Email" : "Business Email"}
        placeholder="Enter your email"
        loginPath={loginPath}
        email={email}
        onEmailChange={setEmail}
        onSubmit={handleSendOtp}
        loading={loading}
        error={error}
      />
    );
  }

  if (step === "otp") {
    return (
      <AuthCard>
        <AuthHeader
          title="Enter Verification Code"
          subtitle={`We sent a 6-digit code to ${email}`}
        />
        <div className="space-y-6">
          <OTPInput onChange={setOtp} />
          {error && <p className="text-center text-sm text-red-600">{error}</p>}
          <AuthButton onClick={handleVerifyOtp} disabled={loading}>
            {loading ? "Verifying..." : "Verify Code"}
          </AuthButton>
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full text-center text-sm font-semibold text-[#0F6B3E] hover:underline"
          >
            Resend Code
          </button>
        </div>
      </AuthCard>
    );
  }

  return (
    <ResetPasswordForm
      title="Reset Password"
      subtitle="Enter your new password below."
      loginPath={loginPath}
      password={password}
      onPasswordChange={setPassword}
      confirmPassword={confirmPassword}
      onConfirmPasswordChange={setConfirmPassword}
      onSubmit={handleResetPassword}
      loading={loading}
      error={error}
    />
  );
};

export default ForgotPasswordFlow;