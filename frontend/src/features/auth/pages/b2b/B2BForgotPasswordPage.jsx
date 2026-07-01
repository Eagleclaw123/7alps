import AuthLayout from "../../components/AuthLayout";
import ForgotPasswordForm from "../../components/ForgotPasswordForm";

const B2BForgotPasswordPage = () => {
  return (
    <AuthLayout>
      <ForgotPasswordForm
        title="Forgot Password"
        subtitle="Enter your registered business email to receive a password reset link."
        label="Business Email"
        placeholder="Enter your business email"
        loginPath="/b2b/login"
      />
    </AuthLayout>
  );
};

export default B2BForgotPasswordPage;
