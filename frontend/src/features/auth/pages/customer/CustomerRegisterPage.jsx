import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import AuthButton from "../../components/AuthButton";
import AuthCard from "../../components/AuthCard";
import AuthHeader from "../../components/AuthHeader";
import AuthInput from "../../components/AuthInput";
import AuthLayout from "../../components/AuthLayout";
import { sendCustomerOTP } from "../../../../shared/services/auth.service";

const CustomerRegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: location.state?.mobile || "",
  });

  const handleChange = ({ target: { name, value } }) => {
    if (name === "mobile") {
      setFormData((prev) => ({ ...prev, mobile: value.replace(/\D/g, "").slice(0, 10) }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (formData.mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);
      await sendCustomerOTP(formData);

      navigate("/customer/verify-otp", {
        state: { mobile: formData.mobile },
      });
    } catch (error) {
      alert(
        error.response?.data?.message || "Unable to send OTP. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Create Account"
          subtitle="Join 7ALP's and start your wellness journey."
        />

        <form
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
          onSubmit={handleSubmit}
        >
          <AuthInput
            name="name"
            label="Full Name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />

          <AuthInput
            name="mobile"
            label="Mobile Number"
            type="tel"
            placeholder="9876543210"
            value={formData.mobile}
            onChange={handleChange}
            maxLength={10}
          />

          <div className="md:col-span-2">
            <AuthButton type="submit" disabled={loading}>
              {loading ? "Sending OTP..." : "Create Account"}
            </AuthButton>
          </div>

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
