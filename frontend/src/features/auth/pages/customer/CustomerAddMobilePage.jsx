import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import AuthButton from "../../components/AuthButton";
import AuthCard from "../../components/AuthCard";
import AuthHeader from "../../components/AuthHeader";
import AuthInput from "../../components/AuthInput";
import AuthLayout from "../../components/AuthLayout";
import { completeCustomerMobile } from "../../../../shared/services/auth.service";
import { mergeGuestCartOnLogin } from "../../../../store/slices/cartSlice";
import { setCustomer } from "../../../../store/slices/authSlice";

const validateMobile = (mobile) => {
  if (!mobile) {
    return "Mobile number is required.";
  }
  if (mobile.length !== 10) {
    return "Mobile number must be exactly 10 digits.";
  }
  if (!/^[6-9]\d{9}$/.test(mobile)) {
    return "Enter a valid Indian mobile number.";
  }
  return "";
};

const CustomerAddMobilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pendingToken = location.state?.pendingToken;
  const from = location.state?.from;

  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!pendingToken) {
    return (
      <AuthLayout>
        <AuthCard>
          <AuthHeader
            title="Session Expired"
            subtitle="Please start over from the login page."
          />
          <Link
            to="/customer/login"
            className="block text-center font-medium text-[#0F6B3E] hover:underline"
          >
            ← Back to Login
          </Link>
        </AuthCard>
      </AuthLayout>
    );
  }

  const handleChange = ({ target: { value } }) => {
    const nextValue = value.replace(/\D/g, "").slice(0, 10);
    setMobile(nextValue);

    if (touched) {
      setError(validateMobile(nextValue));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateMobile(mobile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateMobile(mobile);
    setTouched(true);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const { data } = await completeCustomerMobile(pendingToken, mobile);

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...data.data.customer,
          role: "customer",
        }),
      );
      dispatch(setCustomer(data.data.customer));

      await dispatch(mergeGuestCartOnLogin());

      const destination = from ? `${from.pathname}${from.search || ""}` : "/";
      navigate(destination, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to save mobile number.",
      );
    } finally {
      setLoading(false);
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
          title="One Last Step"
          subtitle="Add your mobile number so we can reach you about your orders."
        />

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div>
            <AuthInput
              name="mobile"
              label="Mobile Number"
              type="tel"
              placeholder="9876543210"
              value={mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={10}
            />
            {error ? (
              <p className="mt-1.5 text-sm text-red-600">{error}</p>
            ) : null}
          </div>

          <AuthButton type="submit" disabled={loading || mobile.length !== 10}>
            {loading ? "Saving..." : "Continue"}
          </AuthButton>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default CustomerAddMobilePage;
