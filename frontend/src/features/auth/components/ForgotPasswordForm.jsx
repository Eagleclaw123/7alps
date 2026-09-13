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

        <p className="text-center text-xs text-gray-600">
          Remember your password?{" "}
          <Link
            to={loginPath}
            className="font-semibold text-[#211B17] underline decoration-[#C56B4E] underline-offset-4 transition hover:text-[#C56B4E]"
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
