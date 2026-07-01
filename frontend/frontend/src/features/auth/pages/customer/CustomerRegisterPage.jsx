import { Link } from "react-router-dom";

import AuthButton from "../../components/AuthButton";
import AuthCard from "../../components/AuthCard";
import AuthHeader from "../../components/AuthHeader";
import AuthInput from "../../components/AuthInput";
import PasswordInput from "../../components/PasswordInput";
import AuthLayout from "../../components/AuthLayout";

const CustomerRegisterPage = () => {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Create Account"
          subtitle="Join 7ALP's and start your wellness journey."
        />

        <form className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <AuthInput label="Full Name" placeholder="John Doe" />

          <AuthInput
            label="Email Address"
            type="email"
            placeholder="john@example.com"
          />

          <AuthInput
            label="Phone Number"
            type="tel"
            placeholder="+91 9876543210"
          />

          <PasswordInput label="Password" placeholder="Password" />

          <label className="md:col-span-2 flex items-center gap-3 text-sm">
            <input type="checkbox" className="h-4 w-4 rounded" />I agree to the
            Terms & Privacy Policy
          </label>

          <div className="md:col-span-2">
            <AuthButton type="submit">Create Account</AuthButton>
          </div>

          <div className="md:col-span-2 flex items-center gap-4">
            <hr className="flex-1" />
            <span className="text-sm text-gray-500">OR</span>
            <hr className="flex-1" />
          </div>

          <button
            type="button"
            className="md:col-span-2 flex h-12 items-center justify-center rounded-xl border font-medium hover:bg-gray-50"
          >
            Continue with Google
          </button>

          <p className="md:col-span-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/customer/login" className="font-semibold text-[#0F6B3E]">
              Login
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default CustomerRegisterPage;
