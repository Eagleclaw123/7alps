import ContactButton from "./ContactButton";
import ContactInput from "./ContactInput";
import ContactTextArea from "./ContactTextArea";
import { FiPhone } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { motion } from "framer-motion";

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO:
    // React Hook Form
    // Zod Validation
    // API Integration
    console.log("Form Submitted");
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
      className="mt-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="text-md mb-1">Full Name</label>
          <input
            type="text"
            className="border-b border-gray-500 focus:outline-none py-2"
          />
        </motion.div>

        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="text-md mb-1">Email</label>
          <input
            type="email"
            className="border-b border-gray-500 focus:outline-none py-2"
          />
        </motion.div>

        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="text-md mb-1">Phone Number</label>
          <input
            type="text"
            className="border-b border-gray-500 focus:outline-none py-2"
          />
        </motion.div>

        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="text-md mb-1">Company Name</label>
          <input
            type="text"
            className="border-b border-gray-500 focus:outline-none py-2"
          />
        </motion.div>

        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="text-md mb-1">Product Interest</label>
          <input
            type="text"
            className="border-b border-gray-500 focus:outline-none py-2"
          />
        </motion.div>

        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="text-md mb-1">Quantity Requirement</label>
          <input
            type="text"
            className="border-b border-gray-500 focus:outline-none py-2"
          />
        </motion.div>

        <motion.div
          className="flex flex-col sm:col-span-2"
          variants={itemVariants}
        >
          <label className="text-md mb-1">Message</label>
          <input
            type="text"
            className="border-b border-gray-500 focus:outline-none py-2"
          />
        </motion.div>
      </div>
      <div className="mt-12 flex">
        <button className="bg-[#1C6A00] text-white px-8 py-3 rounded">
          Submit Quote
        </button>
      </div>
    </motion.form>
  );
};

export default ContactForm;
