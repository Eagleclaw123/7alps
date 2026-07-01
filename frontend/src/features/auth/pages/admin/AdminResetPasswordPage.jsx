import AuthLayout from "../../components/AuthLayout";
import ResetPasswordForm from "../../components/ResetPasswordForm";

const AdminResetPasswordPage = () => {
  return (
    <AuthLayout>
      <ResetPasswordForm
        title="Reset Password"
        subtitle="Create a new password for your admin account."
        loginPath="/admin/login"
      />
    </AuthLayout>
  );
};

export default AdminResetPasswordPage;
