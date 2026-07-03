import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthButton from "../../components/AuthButton";
import AuthCard from "../../components/AuthCard";
import AuthHeader from "../../components/AuthHeader";
import AuthInput from "../../components/AuthInput";
import AuthLayout from "../../components/AuthLayout";
import PasswordInput from "../../components/PasswordInput";
import { adminLogin } from "../../../../shared/services/auth.service";

const initialFormData = {
  email: "",
  password: "",
};

const AdminLoginPage = () => {
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

    try {
      setLoading(true);

      const { data: responseData } = await adminLogin(formData);

      const adminUser = responseData?.data?.user;

      if (adminUser) {
        localStorage.setItem("admin", JSON.stringify(adminUser));
      }

      navigate("/admin/dashboard", {
        replace: true,
      });
    } catch (error) {
      alert(
        error.response?.data?.message || "Unable to login. Please try again.",
      );
    } finally {
      setLoading(false);
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
          title="Admin Portal"
          subtitle="Authorized personnel only."
        />

        <form className="space-y-6" onSubmit={handleSubmit}>
          <AuthInput
            name="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
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

          <div className="flex justify-end text-sm">
            <Link
              to="/admin/forgot-password"
              className="font-medium text-[#0F6B3E] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <AuthButton type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Login"}
          </AuthButton>

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

export default AdminLoginPage;
