import { motion } from "framer-motion";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const ProductBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[620px] overflow-hidden bg-[#211B17] text-[#F4EDE2] md:min-h-[680px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://res.cloudinary.com/dasvdkncm/image/upload/v1783565540/ashwagandha-powder-and-dried-root-in-wooden-bowls-natural-adaptogen-herbal-medicine-photo_fl7rar.jpg"
          alt="Ashwagandha herbal powder and roots"
          className="h-full w-full object-cover"
        />

        {/* Soft overall overlay */}
        <div className="absolute inset-0 bg-[#211B17]/5" />

        {/* Light left gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#211B17]/60 via-[#211B17]/25 to-transparent" />

        {/* Very subtle bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#211B17]/35 via-transparent to-transparent" />
      </div>
      {/* Content */}
      <div className="relative z-10 flex min-h-[620px] items-end md:min-h-[680px]">
        <div className="mx-auto w-full max-w-[1600px] px-6 pb-14 sm:px-10 md:pb-20 lg:px-16">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-7 flex items-center gap-3"
            >
              <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#A85F43]">
                02
              </span>
              <span className="h-px w-10 bg-[#C56B4E]" />

              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#D9B6A5]">
                The 7ALP collection
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.07em]"
            >
              Nature's finest
              <br />
              <span className="text-[#C56B4E]">made simple.</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              className="mt-8 max-w-xl font-manrope text-sm leading-7 text-[#D8CCC0] md:text-base"
            >
              Explore our collection of premium herbal powders, thoughtfully
              sourced and selected for purity, quality, and everyday natural
              wellness.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
              className="mt-9"
            >
              <button
                onClick={() => navigate("/products")}
                className="group inline-flex items-center gap-5 bg-[#F4EDE2] px-7 py-4 font-manrope text-sm font-medium text-[#211B17] transition-all duration-300 hover:bg-[#C56B4E] hover:text-white"
              >
                Enquire Now
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#211B17] text-[#F4EDE2] transition-transform duration-300 group-hover:translate-x-1">
                  <GoArrowRight size={14} />
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom information bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/15">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
          <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-white/50">
            7ALP's / Herbal wellness
          </span>

          <div className="hidden items-center gap-3 sm:flex">
            <span className="h-1 w-1 rounded-full bg-[#C56B4E]" />

            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-white/50">
              Pure / Botanical / Natural
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductBanner;
