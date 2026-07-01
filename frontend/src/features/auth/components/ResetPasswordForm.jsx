import { Link } from "react-router-dom";

import AuthButton from "./AuthButton";
import AuthCard from "./AuthCard";
import AuthHeader from "./AuthHeader";
import PasswordInput from "./PasswordInput";

const ResetPasswordForm = ({ title, subtitle, loginPath }) => {
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

      <form className="space-y-6">
        <PasswordInput
          label="New Password"
          placeholder="Enter your new password"
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your new password"
        />

        <AuthButton type="submit">Reset Password</AuthButton>

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
