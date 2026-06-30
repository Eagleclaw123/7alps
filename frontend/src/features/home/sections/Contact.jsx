import { FiPhone } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { motion } from "framer-motion";

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

const Contact = () => {
  return (
    <section className="px-6">
      <div className="container max-w-7xl mx-auto mb-10">
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
        >
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10">
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
              className="flex flex-col xl:col-span-3"
              variants={itemVariants}
            >
              <label className="text-md mb-1">Message</label>
              <input
                type="text"
                className="border-b border-gray-500 focus:outline-none py-2"
              />
            </motion.div>
          </div>
          <div className="mt-10 flex justify-center">
            <button className="bg-[#1C6A00] text-white px-8 py-3 rounded">
              Submit Quote
            </button>
          </div>
        </motion.form>
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <iframe
            title="7ALP Location"
            src="https://www.google.com/maps?q=Hyderabad&output=embed"
            className="w-full h-[400px]"
            loading="lazy"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
