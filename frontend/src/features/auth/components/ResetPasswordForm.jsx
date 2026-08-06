import { Link } from "react-router-dom";

import AuthButton from "./AuthButton";
import AuthCard from "./AuthCard";
import AuthHeader from "./AuthHeader";
import PasswordInput from "./PasswordInput";

const ResetPasswordForm = ({
  title,
  subtitle,
  loginPath,
  password,
  onPasswordChange,
  confirmPassword,
  onConfirmPasswordChange,
  onSubmit,
  loading,
  error,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <AuthCard>
      <div className="mb-8">
        <img
          src="https://res.cloudinary.com/dasvdkncm/image/upload/v1781664574/7_ALP_s_Logo-removebg-preview_e7kr1k.png"
          alt="7ALP's Logo"
          className="h-16 w-auto"
        />
      </div>

      <AuthHeader title={title} subtitle={subtitle} />

      <form className="space-y-6" onSubmit={handleSubmit}>
        <PasswordInput
          label="New Password"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <AuthButton type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </AuthButton>

        <p className="text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            to={loginPath}
            className="font-semibold text-[#0F6B3E] hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </form>
    </AuthCard>
  );
};

export default ResetPasswordForm;
