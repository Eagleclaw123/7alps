import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const ProductBanner = () => {
  const navigate = useNavigate();
  return (
    <section
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dasvdkncm/image/upload/v1783565540/ashwagandha-powder-and-dried-root-in-wooden-bowls-natural-adaptogen-herbal-medicine-photo_fl7rar.jpg')",
      }}
      className="relative flex h-[70vh] items-center justify-center bg-cover bg-center text-center md:h-[45vh] xl:h-[65vh]"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <motion.h2
          className="text-4xl font-semibold leading-tight text-white md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Discover Nature's Finest
          <br />
          Herbal Products
        </motion.h2>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Explore our complete collection of premium herbal powders and natural
          wellness products, carefully sourced to deliver purity, quality, and
          everyday wellness.
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            className="inline-flex items-center gap-2 rounded-lg bg-[#0F6B3E] px-7 py-3 font-medium text-white transition hover:bg-[#0b5b35]"
            onClick={() => navigate("/contact")}
          >
            Enquire Now
            <GoArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductBanner;
