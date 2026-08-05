import { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { motion } from "framer-motion";

import { submitContactForm } from "../../../shared/services/contact.service";

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
    if (!value.trim()) return "Email is required.";
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
  productInterest: (value) => {
    if (!value.trim())
      return "Please tell us what product you're interested in.";
    return "";
  },
  quantityRequirement: (value) => {
    if (!value.trim()) return "Please share your quantity requirement.";
    return "";
  },
  message: (value) => {
    if (!value.trim()) return "Message is required.";
    if (value.trim().length < 10)
      return "Message should be at least 10 characters.";
    return "";
  },
};

const FIELD_CONFIG = [
  { name: "fullName", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone Number", type: "text" },
  { name: "companyName", label: "Company Name", type: "text" },
  { name: "productInterest", label: "Product Interest", type: "text" },
  {
    name: "quantityRequirement",
    label: "Quantity Requirement",
    type: "text",
  },
];

const Contact = () => {
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

  return (
    <section id="b2b-contact" className="px-6 xl:px-0 my-16 scroll-mt-24">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col xl:flex-row justify-between xl:items-end gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {" "}
          <div>
            <h3 className="text-[32px] xl:text-[48px] max-w-xl leading-tight">
              We are always ready to help you and answer your questions
            </h3>
            <p className="text-lg xl:text-[28px] text-gray-600 mt-2">
              Let's Build a Healthier Future Together
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#EFEFEF] h-10 w-10 flex flex-col justify-center items-center">
                <FiPhone size={20} />
              </div>
              <p className="text-[16px] md:text-[20px]">+91 79010 82907</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#EFEFEF] h-10 w-10 flex flex-col justify-center items-center">
                <CiMail size={20} />
              </div>
              <p className="text-[16px] md:text-[20px]">
                7alp.globalmark@gmail.com
              </p>
            </div>
          </div>
        </motion.div>
        <motion.form
          className="mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          onSubmit={handleSubmit}
          noValidate
        >
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10">
            {FIELD_CONFIG.map(({ name, label, type }) => (
              <motion.div
                className="flex flex-col"
                variants={itemVariants}
                key={name}
              >
                <label className="text-md mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border-b focus:outline-none py-2 ${
                    fieldErrors[name] ? "border-red-500" : "border-gray-500"
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
              className="flex flex-col xl:col-span-3"
              variants={itemVariants}
            >
              <label className="text-md mb-1">Message</label>
              <input
                type="text"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border-b focus:outline-none py-2 ${
                  fieldErrors.message ? "border-red-500" : "border-gray-500"
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
            <p className="mt-6 text-center text-sm text-[#1C6A00]">
              Thanks! Your quote request has been submitted.
            </p>
          ) : null}
          {submitError ? (
            <p className="mt-6 text-center text-sm text-red-600">
              {submitError}
            </p>
          ) : null}
          <div className="mt-12 flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#1C6A00] text-white px-8 py-3 rounded disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Quote"}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
