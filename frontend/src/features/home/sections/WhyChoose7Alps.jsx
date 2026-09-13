import { motion } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";

import { whyChooseUs } from "../data/whyChooseData";

const WhyChoose7Alps = () => {
  return (
    <section className="relative overflow-hidden bg-[#171312] text-[#F3EADF]">
      <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 md:py-32 lg:px-12 xl:px-16">
        {/* =====================================================
            TOP LABEL
        ====================================================== */}

        <div className="mb-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#C56B4E]">
              03
            </span>

            <span className="h-px w-14 bg-[#C56B4E]" />

            <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#A9A097]">
              Why 7ALP's
            </span>
          </div>

          <span className="hidden font-ibm-mono text-[9px] uppercase tracking-[0.2em] text-[#6F6963] md:block">
            Rooted in quality
          </span>
        </div>

        {/* =====================================================
            MAIN EDITORIAL AREA
        ====================================================== */}

        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          {/* ===================================================
              LEFT CONTENT
          ==================================================== */}

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-3xl font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.075em]"
            >
              Better
              <br />
              ingredients.
              <br />
              <span className="font-normal text-[#C56B4E]">
                Better standards.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              className="mt-9 max-w-md font-manrope text-sm leading-7 text-[#AAA19A] md:text-base"
            >
              From carefully selected botanical ingredients to the final
              package, every step is guided by one simple principle — give
              nature the respect it deserves.
            </motion.p>

            {/* Small manifesto */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.25,
              }}
              className="mt-12 flex items-center gap-4"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#554B45]">
                <GoArrowUpRight size={18} className="text-[#C56B4E]" />
              </span>

              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.2em] text-[#8F8780]">
                Our commitment to quality
              </span>
            </motion.div>
          </div>

          {/* ===================================================
              RIGHT VIDEO
          ==================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* Decorative number */}
            <div className="absolute -left-8 -top-16 z-10 hidden select-none font-manrope text-[150px] font-semibold leading-none tracking-[-0.08em] text-white/[0.035] xl:block">
              7
            </div>

            <div className="relative aspect-[1.08] overflow-hidden bg-[#28201C]">
              <video
                src="https://res.cloudinary.com/dasvdkncm/video/upload/v1783646118/5480218-uhd_3840_2160_25fps_lul7ir.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />

              {/* cinematic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#171312]/70 via-transparent to-[#171312]/10" />

              {/* video label */}
              <div className="absolute left-6 top-6 flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C56B4E]" />

                <span className="font-ibm-mono text-[9px] uppercase tracking-[0.22em] text-white/75">
                  The 7ALP Standard
                </span>
              </div>

              {/* bottom text */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <p className="max-w-xs font-manrope text-sm leading-6 text-white/75">
                  Nature is our starting point. Quality is our promise.
                </p>

                <span className="font-ibm-mono text-[9px] uppercase tracking-[0.18em] text-white/50">
                  7ALP / 2026
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            FEATURE LIST
        ====================================================== */}

        {/* =====================================================
    FEATURE LIST
====================================================== */}

        <div className="mt-24 border-t border-[#3B332E]">
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.heading}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.06,
                }}
                className="
          group
          grid
          grid-cols-[42px_1fr_auto]
          items-center
          gap-5
          border-b
          border-[#3B332E]
          py-8

          md:grid-cols-[70px_52px_1fr_48px]
          md:gap-6
          md:py-9
        "
              >
                {/* NUMBER */}
                <span className="font-ibm-mono text-[10px] tracking-[0.2em] text-[#C56B4E]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* ICON */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center">
                  {Icon && (
                    <Icon
                      size={23}
                      className="
                text-[#C56B4E]
                transition-transform
                duration-300
                group-hover:scale-110
              "
                    />
                  )}
                </div>

                {/* CONTENT */}
                <div className="min-w-0">
                  <h3
                    className="
              font-manrope
              text-[19px]
              font-medium
              tracking-[-0.025em]
              text-[#F3EADF]
              transition-colors
              duration-300
              group-hover:text-[#C56B4E]
              md:text-2xl
            "
                  >
                    {item.heading}
                  </h3>

                  {item.subHeading && (
                    <p
                      className="
                mt-2
                max-w-2xl
                font-manrope
                text-[13px]
                leading-6
                text-[#817872]
                md:text-sm
              "
                    >
                      {item.subHeading}
                    </p>
                  )}
                </div>

                {/* ARROW */}
                <span
                  className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-[#514741]
            text-[#8D837B]
            transition-all
            duration-300
            group-hover:border-[#C56B4E]
            group-hover:bg-[#C56B4E]
            group-hover:text-[#171312]
          "
                >
                  <GoArrowUpRight size={17} />
                </span>
              </motion.div>
            );
          })}
        </div>
        {/* =====================================================
            BOTTOM STATEMENT
        ====================================================== */}

        <div className="mt-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <p className="font-ibm-mono text-[9px] uppercase tracking-[0.22em] text-[#655D57]">
            Sourced thoughtfully / Crafted carefully / Delivered honestly
          </p>

          <span className="font-manrope text-sm text-[#6F6761]">
            The 7ALP difference.
          </span>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose7Alps;
