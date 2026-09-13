import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="relative min-h-[620px] overflow-hidden bg-[#171312] text-white md:min-h-[700px] xl:min-h-[780px]">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <img
        src="https://cosmesiglobal.com/cdn/shop/collections/Herbal_Powders.png?v=1766742666&width=1500"
        alt="7ALP's herbal powder ingredients"
        className="
    absolute
    inset-0
    h-full
    w-full
    object-cover
    object-center
    scale-[1.02]
  "
      />

      {/* Cinematic treatment */}

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-[1600px] items-center px-5 py-24 sm:px-8 md:min-h-[700px] lg:px-12 xl:min-h-[780px] xl:px-16">
        <div className="max-w-4xl">
          {/* Eyebrow */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-7 flex items-center gap-4"
          >
            <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#A85F43]">
              05
            </span>
            <span className="h-[1px] w-12 bg-[#D58A68]" />

            <span className="font-ibm-mono text-[10px] uppercase tracking-[0.28em] text-white/70">
              Let's grow together
            </span>
          </motion.div>

          {/* Heading */}

          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              max-w-4xl
              font-manrope
text-[clamp(3.5rem,6vw,6.5rem)]
              font-medium
              leading-[1.0]
              tracking-[-0.085em]
            "
          >
            A healthier
            <br />
            future starts
            <br />
            <span className="text-[#D58A68]">together.</span>
          </motion.h2>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
            className="
              mt-8
              max-w-xl
              font-manrope
              text-sm
              leading-7
              text-white/70
              md:text-base
            "
          >
            Premium herbal ingredients, trusted sourcing, and reliable
            partnerships — built for people and businesses that value quality.
          </motion.p>

          {/* CTA */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
            className="mt-9"
          >
            <Link
              to="/contact"
              className="
                group
                inline-flex
                items-center
                gap-4
                bg-[#F4EDE2]
                px-7
                py-4
                font-manrope
                text-sm
                font-medium
                text-[#211B17]
                transition-all
                duration-300
                hover:bg-[#D58A68]
                hover:text-white
              "
            >
              Start a Partnership
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#211B17] text-white transition-transform duration-300 group-hover:translate-x-1">
                <GoArrowRight size={15} />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM INFORMATION BAR
      ====================================================== */}

      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/15">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12 xl:px-16">
          <span className="font-ibm-mono text-[9px] uppercase tracking-[0.22em] text-white/45">
            7ALP's / Natural wellness
          </span>

          <div className="hidden items-center gap-8 md:flex">
            <span className="font-ibm-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
              Premium ingredients
            </span>

            <span className="h-1 w-1 rounded-full bg-[#D58A68]" />

            <span className="font-ibm-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
              Trusted partnerships
            </span>
          </div>

          <span className="font-ibm-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
            05 / Contact
          </span>
        </div>
      </div>
    </section>
  );
};

export default Banner;
