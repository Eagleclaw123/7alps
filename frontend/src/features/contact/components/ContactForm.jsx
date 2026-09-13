import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { ArrowUpRight } from "lucide-react";
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
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Your name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: false,
    placeholder: "you@example.com",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "text",
    required: true,
    placeholder: "10-digit number",
  },
  {
    name: "companyName",
    label: "Company Name",
    type: "text",
    required: false,
    placeholder: "Your company",
  },
  {
    name: "productInterest",
    label: "Product Interest",
    type: "text",
    required: false,
    placeholder: "What are you looking for?",
  },
  {
    name: "quantityRequirement",
    label: "Quantity Requirement",
    type: "text",
    required: false,
    placeholder: "Approximate quantity",
  },
];

const FieldLabel = ({ required, children }) => (
  <label className="mb-2 block font-ibm-mono text-[8px] uppercase tracking-[0.24em] text-[#91847A]">
    {children}

    {required && <span className="ml-1 text-[#C56B4E]">*</span>}
  </label>
);

const ContactForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: validators[name] ? validators[name](value) : "",
      }));
    }
  };

  const handleBlur = ({ target: { name, value } }) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

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

    if (!validateAll()) return;

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
        staggerChildren: 0.07,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="bg-[#F4EDE2]"
    >
      {/* Header */}
      <div className="flex items-end justify-between border-b border-[#D8CCC0] pb-7">
        <div>
          <span className="font-ibm-mono text-[8px] uppercase tracking-[0.28em] text-[#C56B4E]">
            Start a conversation
          </span>

          <h3 className="mt-3 font-manrope text-3xl font-medium leading-none tracking-[-0.055em] text-[#211B17] md:text-4xl">
            Request a quote.
          </h3>
        </div>

        <span className="hidden font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#91847A] sm:block">
          7ALP / 01
        </span>
      </div>

      {/* Intro */}
      <div className="py-7">
        <p className="max-w-lg font-manrope text-sm leading-6 text-[#756A62]">
          Tell us what you&apos;re looking for and our team will get back to
          you.
        </p>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-7 md:grid-cols-2">
        {FIELD_CONFIG.map(({ name, label, type, required, placeholder }) => (
          <motion.div
            key={name}
            variants={itemVariants}
            className="flex flex-col"
          >
            <FieldLabel required={required}>{label}</FieldLabel>

            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              className={`w-full border-0 border-b bg-transparent px-0 py-3 font-manrope text-sm text-[#211B17] outline-none transition-colors placeholder:text-[#B0A49A] ${
                fieldErrors[name]
                  ? "border-red-500"
                  : "border-[#D8CCC0] focus:border-[#C56B4E]"
              }`}
            />

            {fieldErrors[name] && (
              <span className="mt-2 font-manrope text-xs text-red-600">
                {fieldErrors[name]}
              </span>
            )}
          </motion.div>
        ))}

        {/* Message */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:col-span-2"
        >
          <FieldLabel required={false}>Message</FieldLabel>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tell us a little more..."
            rows={4}
            className={`w-full resize-none border-0 border-b bg-transparent px-0 py-3 font-manrope text-sm text-[#211B17] outline-none transition-colors placeholder:text-[#B0A49A] ${
              fieldErrors.message
                ? "border-red-500"
                : "border-[#D8CCC0] focus:border-[#C56B4E]"
            }`}
          />

          {fieldErrors.message && (
            <span className="mt-2 font-manrope text-xs text-red-600">
              {fieldErrors.message}
            </span>
          )}
        </motion.div>
      </div>

      {/* Success */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex items-start gap-3 border-l-2 border-[#C56B4E] bg-white/50 px-5 py-4"
        >
          <FiCheckCircle size={17} className="mt-0.5 shrink-0 text-[#C56B4E]" />

          <div>
            <p className="font-manrope text-sm font-medium text-[#211B17]">
              Request received.
            </p>

            <p className="mt-1 font-manrope text-xs leading-5 text-[#756A62]">
              Thanks! Your quote request has been submitted.
            </p>
          </div>
        </motion.div>
      )}

      {/* Error */}
      {submitError && (
        <p className="mt-7 border-l-2 border-red-500 bg-red-50 px-5 py-4 font-manrope text-sm text-red-600">
          {submitError}
        </p>
      )}

      {/* Submit */}
      <motion.div
        variants={itemVariants}
        className="mt-10 flex items-center justify-between border-t border-[#D8CCC0] pt-7"
      >
        <span className="hidden max-w-xs font-manrope text-xs leading-5 text-[#91847A] sm:block">
          We&apos;ll use your details only to respond to your enquiry.
        </span>

        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex items-center gap-5 bg-[#211B17] px-7 py-4 font-manrope text-sm font-medium text-[#F4EDE2] transition-colors duration-300 hover:bg-[#C56B4E] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit enquiry"}

          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4EDE2] text-[#211B17] transition-transform duration-300 group-hover:translate-x-1">
            <ArrowUpRight size={14} />
          </span>
        </button>
      </motion.div>
    </motion.form>
  );
};

export default ContactForm;
