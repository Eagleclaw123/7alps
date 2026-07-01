import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dasvdkncm/image/upload/v1782036756/Rectangle_3463773_bha4io.png')",
      }}
      className="bg-cover bg-center h-[70vh] md:h-[40vh] xl:h-[70vh] flex flex-col justify-center items-center text-center"
    >
      <motion.div
        className="space-y-5"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.9,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <motion.h2
          className="text-[35px] xl:text-[44px] text-[#1C6A00] font-semibold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Let's Build a Healthier Future Together
        </motion.h2>

        <motion.p
          className="text-[18px] xl:text-[24px] max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Connecting Nature's Finest Ingredients to Businesses and Markets
          Across the World
        </motion.p>

        <motion.button
          className="bg-[#1C6A00] text-white py-3 px-5 rounded"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Become a Partner
          <GoArrowRight className="inline ml-1.5" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Banner;
