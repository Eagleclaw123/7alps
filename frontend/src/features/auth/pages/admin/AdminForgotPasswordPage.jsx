import AuthLayout from "../../components/AuthLayout";
import ForgotPasswordForm from "../../components/ForgotPasswordForm";

const AdminForgotPasswordPage = () => {
  return (
    <AuthLayout>
      <ForgotPasswordForm
        title="Forgot Password"
        subtitle="Enter your admin email to receive a password reset link."
        label="Admin Email"
        placeholder="Enter your admin email"
        loginPath="/admin/login"
      />
    </AuthLayout>
  );
};

export default AdminForgotPasswordPage;
