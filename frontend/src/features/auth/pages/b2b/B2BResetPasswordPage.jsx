import AuthLayout from "../../components/AuthLayout";
import ResetPasswordForm from "../../components/ResetPasswordForm";

const B2BResetPasswordPage = () => {
  return (
    <AuthLayout>
      <ResetPasswordForm
        title="Reset Password"
        subtitle="Create a new password for your business account."
        loginPath="/b2b/login"
      />
    </AuthLayout>
  );
};

export default B2BResetPasswordPage;
