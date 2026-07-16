import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthButton from "../../components/AuthButton";
import AuthCard from "../../components/AuthCard";
import AuthHeader from "../../components/AuthHeader";
import AuthInput from "../../components/AuthInput";
import AuthLayout from "../../components/AuthLayout";
import PasswordInput from "../../components/PasswordInput";
import { b2bLoginRequest } from "../../../../shared/services/b2b.service";

const initialFormData = {
  email: "",
  password: "",
};

const B2BLoginPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      alert("Please enter your business email and password.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await b2bLoginRequest(formData);

      const member = data?.data?.member;

      // Store only non-sensitive display info — the JWT itself lives in an httpOnly cookie.
      localStorage.setItem(
        "user",
        JSON.stringify({
          role: "b2b",
          id: member?._id,
          name: member?.name,
          email: member?.email,
          businessName: member?.businessName,
        }),
      );

      navigate("/b2b", {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Unable to login. Please try again.",
      );
    } finally {
      setLoading(false);

      // Reset form
      setFormData(initialFormData);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className="mb-8">
          <img
            src="https://res.cloudinary.com/dasvdkncm/image/upload/v1781664574/7_ALP_s_Logo-removebg-preview_e7kr1k.png"
            alt="7ALP's Logo"
            className="h-16 w-auto"
          />
        </div>

        <AuthHeader
          title="Business Login"
          subtitle="Access your wholesale dashboard."
        />

        <form className="space-y-6" onSubmit={handleSubmit}>
          <AuthInput
            name="email"
            label="Business Email"
            type="email"
            placeholder="Enter your business email"
            value={formData.email}
            onChange={handleChange}
          />

          <PasswordInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="flex items-center justify-end text-sm">
            <Link
              to="/b2b/forgot-password"
              className="font-medium text-[#0F6B3E] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <AuthButton type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Login"}
          </AuthButton>

          <p className="text-center text-sm text-gray-600">
            Need a business account?{" "}
            <Link
              to="/contact"
              className="font-semibold text-[#0F6B3E] hover:underline"
            >
              Contact Our Sales Team
            </Link>
          </p>

          <p className="text-center text-sm text-gray-600">
            <Link to="/" className="font-medium text-[#0F6B3E] hover:underline">
              ← Back to Website
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default B2BLoginPage;
