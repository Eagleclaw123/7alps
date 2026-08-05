import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";

import { submitContactForm } from "../../../shared/services/contact.service";

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  productInterest: "",
  quantityRequirement: "",
  message: "",
};

// Only fullName and phone are mandatory now. Every other field is optional —
// but if the person does fill one in (e.g. email), it's still validated for
// a sensible format rather than accepted as-is.
const validators = {
  fullName: (value) => {
    if (!value.trim()) return "Full name is required.";
    if (value.trim().length < 3) return "Name must be at least 3 characters.";
    if (!/^[A-Za-z\s.'-]+$/.test(value.trim()))
      return "Name can only contain letters and spaces.";
    return "";
  },
  email: (value) => {
    if (!value.trim()) return "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
      return "Enter a valid email address.";
    return "";
  },
  phone: (value) => {
    if (!value.trim()) return "Phone number is required.";
    if (!/^\d{10}$/.test(value.trim()))
      return "Enter a valid 10-digit phone number.";
    return "";
  },
  companyName: () => "",
  productInterest: () => "",
  quantityRequirement: () => "",
  message: (value) => {
    if (!value.trim()) return "";
    if (value.trim().length < 10)
      return "Message should be at least 10 characters.";
    return "";
  },
};

const FIELD_CONFIG = [
  { name: "fullName", label: "Full Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: false },
  { name: "phone", label: "Phone Number", type: "text", required: true },
  { name: "companyName", label: "Company Name", type: "text", required: false },
  {
    name: "productInterest",
    label: "Product Interest",
    type: "text",
    required: false,
  },
  {
    name: "quantityRequirement",
    label: "Quantity Requirement",
    type: "text",
    required: false,
  },
];

/* Tracked-out field label, matches the profile page's label system */
const FieldLabel = ({ required, children }) => (
  <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#86806F] mb-1.5">
    {children}
    {required ? <span className="text-[#B4652F]"> *</span> : null}
  </label>
);

const underlineInput =
  "border-b bg-transparent py-2 text-[15px] text-[#201F1B] outline-none transition-colors focus:border-[#16442C] placeholder:text-[#B8B2A0]";

const ContactForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: validators[name] ? validators[name](value) : "",
      }));
    }
  };

  const handleBlur = ({ target: { name, value } }) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFieldErrors((prev) => ({
      ...prev,
      [name]: validators[name] ? validators[name](value) : "",
    }));
  };

  const validateAll = () => {
    const nextErrors = {};
    Object.keys(validators).forEach((field) => {
      nextErrors[field] = validators[field](formData[field] || "");
    });
    setFieldErrors(nextErrors);
    setTouched(
      Object.keys(validators).reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {}),
    );
    return Object.values(nextErrors).every((msg) => !msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setSubmitError("");

    if (!validateAll()) {
      return;
    }

    setSubmitting(true);
    try {
      await submitContactForm(formData);
      setSubmitted(true);
      setFormData(initialFormData);
      setTouched({});
      setFieldErrors({});
    } catch (err) {
      setSubmitError(
        err?.response?.data?.message ||
          "Something went wrong submitting your request. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.form
      className="mt-12 border border-[#E3DFD2] bg-white p-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="mb-6 flex items-center gap-2">
        <Leaf size={16} className="text-[#16442C]" />
        <h4 className="font-medium text-xl text-[#201F1B]">Request a Quote</h4>
      </div>
      <div
        className="mb-8 h-px w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, #C9C2AE 0, #C9C2AE 6px, transparent 6px, transparent 13px)",
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {FIELD_CONFIG.map(({ name, label, type, required }) => (
          <motion.div
            className="flex flex-col"
            variants={itemVariants}
            key={name}
          >
            <FieldLabel required={required}>{label}</FieldLabel>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${underlineInput} ${
                fieldErrors[name] ? "border-red-500" : "border-[#E3DFD2]"
              }`}
            />
            {fieldErrors[name] ? (
              <span className="mt-1 text-xs text-red-600">
                {fieldErrors[name]}
              </span>
            ) : null}
          </motion.div>
        ))}

        <motion.div
          className="flex flex-col sm:col-span-2"
          variants={itemVariants}
        >
          <FieldLabel required={false}>Message</FieldLabel>
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${underlineInput} ${
              fieldErrors.message ? "border-red-500" : "border-[#E3DFD2]"
            }`}
          />
          {fieldErrors.message ? (
            <span className="mt-1 text-xs text-red-600">
              {fieldErrors.message}
            </span>
          ) : null}
        </motion.div>
      </div>

      {submitted ? (
        <p className="mt-6 flex items-center gap-2 text-sm font-medium text-[#16442C]">
          <FiCheckCircle size={16} />
          Thanks! Your quote request has been submitted.
        </p>
      ) : null}

      {submitError ? (
        <p className="mt-6 text-sm font-medium text-red-600">{submitError}</p>
      ) : null}

      <div className="mt-12 flex">
        <button
          type="submit"
          disabled={submitting}
          className="bg-[#16442C] text-white px-8 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-[#0E3220] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Quote"}
        </button>
      </div>
    </motion.form>
  );
};

export default ContactForm;
