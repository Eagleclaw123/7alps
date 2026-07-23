import {
  adminForgotPassword,
  adminResetPasswordAfterOTP,
  adminVerifyOTP,
} from "../../../../shared/services/admin.service";
import AuthLayout from "../../components/AuthLayout";
import ForgotPasswordFlow from "../../components/ForgotPasswordFlow";

const AdminForgotPasswordPage = () => {
  return (
    <AuthLayout>
      <ForgotPasswordFlow
        role="admin"
        loginPath="/admin/login"
        forgotPasswordFn={adminForgotPassword}
        verifyOTPFn={adminVerifyOTP}
        resetPasswordFn={adminResetPasswordAfterOTP}
      />
    </AuthLayout>
  );
};

export default AdminForgotPasswordPage;
