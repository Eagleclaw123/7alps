import {
  b2bForgotPassword,
  b2bResetPasswordAfterOTP,
  b2bVerifyOTP,
} from "../../../../shared/services/b2b.service";
import AuthLayout from "../../components/AuthLayout";
import ForgotPasswordFlow from "../../components/ForgotPasswordFlow";

const B2BForgotPasswordPage = () => {
  return (
    <AuthLayout>
      <ForgotPasswordFlow
        role="b2b"
        loginPath="/b2b/login"
        forgotPasswordFn={b2bForgotPassword}
        verifyOTPFn={b2bVerifyOTP}
        resetPasswordFn={b2bResetPasswordAfterOTP}
      />
    </AuthLayout>
  );
};

export default B2BForgotPasswordPage;
