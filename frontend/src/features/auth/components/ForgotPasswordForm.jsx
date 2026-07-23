import { Link } from "react-router-dom";

import AuthButton from "./AuthButton";
import AuthCard from "./AuthCard";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";

const ForgotPasswordForm = ({
  title,
  subtitle,
  label,
  placeholder,
  loginPath,
  registerPath,
  registerText,
  email,
  onEmailChange,
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
        <AuthInput
          label={label}
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <AuthButton type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
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

        {registerPath && (
          <p className="text-center text-sm text-gray-600">
            {registerText}{" "}
            <Link
              to={registerPath}
              className="font-semibold text-[#0F6B3E] hover:underline"
            >
              Register
            </Link>
          </p>
        )}
      </form>
    </AuthCard>
  );
};

export default ForgotPasswordForm;
