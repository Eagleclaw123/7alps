import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section
      className="relative flex h-[55vh] items-center justify-center bg-cover bg-center text-center md:h-[45vh] xl:h-[65vh]"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dasvdkncm/image/upload/v1783564641/powdered-matcha-plate-created-using-generative-ai-technology_qpkrit.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/25 to-black/10" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <motion.h2
          className="text-3xl font-semibold leading-tight text-white md:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Let's Build a Healthier Future Together{" "}
        </motion.h2>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-200 md:text-xl"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Discover premium-quality herbal ingredients sourced directly from
          trusted farms. Empower your business with reliable supply, consistent
          quality, and sustainable partnerships.
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link to="/contact">
            <button className="inline-flex items-center gap-2 rounded-lg bg-[#0F6B3E] px-7 py-3 font-medium text-white transition-all duration-300 hover:bg-[#0b5b35]">
              Start a Partnership
              <GoArrowRight size={18} />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
