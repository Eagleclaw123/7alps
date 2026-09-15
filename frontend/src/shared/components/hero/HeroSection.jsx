import { motion } from "framer-motion";
import { GoArrowRight, GoArrowUpRight } from "react-icons/go";
import { BsCheck2 } from "react-icons/bs";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const HeroSection = ({
  backgroundImage,
  badgeText,
  badgeColor = "#C56B4E",
  heading,
  headingHighlight,
  description,
  buttons = [],
  highlights = [],
  values = [],
  additionalContent,
  containerHeight = "h-screen",
  overlayColor = "",
  textColor = "text-[#211B17]",
  headingSize = "",
  contentMaxWidth = "max-w-2xl",
}) => {
  return (
    <section
      className={`relative overflow-hidden bg-[#F4EDE2] ${containerHeight}`}
    >
      {/* =====================================================
          IMAGE
      ===================================================== */}
      <div className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[57%]">
        <img
          src={backgroundImage}
          alt="7ALP herbal powder ingredients"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Subtle cinematic tone */}
        <div className="absolute inset-0 bg-[#211B17]/[0.04]" />

        {/* Premium desktop blend */}
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#F4EDE2] via-[#F4EDE2]/75 via-[14%] via-transparent via-[48%] to-transparent" />

        {/* Very subtle bottom depth */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#211B17]/15 to-transparent" />

        {/* Mobile readability */}
        <div className="absolute inset-0 lg:hidden bg-gradient-to-b from-[#F4EDE2]/40 via-[#F4EDE2]/60 via-[38%] to-transparent" />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto flex w-full max-w-[1600px] items-center px-5 pb-20 pt-32 sm:px-8 sm:pb-24 lg:px-12 lg:pb-0 lg:pt-28 xl:px-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="w-full max-w-[720px] lg:w-[48%]"
          >
            {/* Eyebrow */}
            {badgeText && (
              <div className="mb-6 flex items-center gap-3 sm:mb-7">
                <span
                  className="h-[1px] w-8 sm:w-10"
                  style={{ backgroundColor: badgeColor }}
                />

                <span
                  className="font-ibm-mono text-[8px] uppercase tracking-[0.28em] sm:text-[9px] sm:tracking-[0.3em]"
                  style={{ color: badgeColor }}
                >
                  {badgeText}
                </span>
              </div>
            )}

            {/* Heading */}
            {heading && (
              <h1
                className={`font-manrope text-[clamp(3rem,13vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.075em] ${textColor}`}
              >
                {heading}

                {headingHighlight && (
                  <>
                    <br />

                    <span className="font-normal" style={{ color: badgeColor }}>
                      {headingHighlight}
                    </span>
                  </>
                )}
              </h1>
            )}

            {/* Description */}
            {description && (
              <p className="mt-6 max-w-[560px] font-manrope text-sm leading-6 text-[#514740] sm:mt-8 sm:text-base sm:leading-7 lg:max-w-lg">
                {description}
              </p>
            )}

            {/* CTA */}
            {buttons.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-3 sm:mt-9 sm:gap-4">
                {buttons.map((button, index) => (
                  <button
                    key={index}
                    onClick={button.onClick}
                    className="group inline-flex items-center gap-4 bg-[#211B17] px-6 py-3.5 font-manrope text-sm font-medium text-[#F4EDE2] transition-all duration-300 hover:bg-[#C56B4E] sm:px-7 sm:py-4"
                  >
                    {button.label}

                    {button.showArrow !== false && (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4EDE2] text-[#211B17] transition-transform duration-300 group-hover:translate-x-1">
                        <GoArrowRight size={14} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Values */}
            {values.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
                {values.map((title) => (
                  <div
                    key={title}
                    className="flex items-center gap-2 border border-[#D8CCC0] bg-[#F4EDE2]/80 px-3 py-2.5 backdrop-blur-sm sm:px-4 sm:py-3"
                  >
                    <BsCheck2
                      className="shrink-0"
                      style={{ color: badgeColor }}
                    />

                    <span className="font-manrope text-xs text-[#514740]">
                      {title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Highlights */}
            {highlights.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-6 border-t border-[#D8CCC0] pt-5 sm:mt-10 sm:gap-8 sm:pt-6">
                {highlights.map(({ icon: Icon, title, subtitle }) => (
                  <div key={title} className="flex items-center gap-3">
                    {Icon && <Icon size={20} style={{ color: badgeColor }} />}

                    <div>
                      <p className="font-manrope text-sm font-medium text-[#211B17]">
                        {title}
                      </p>

                      {subtitle && (
                        <p className="mt-0.5 font-manrope text-xs text-gray-800">
                          {subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Additional Content */}
            {additionalContent && (
              <div className="mt-7 sm:mt-8">{additionalContent}</div>
            )}
          </motion.div>
        </div>
      </div>

      {/* =====================================================
          IMAGE LABEL
      ===================================================== */}
      <div className="absolute bottom-6 right-5 z-20 hidden md:block lg:bottom-7 lg:right-7">
        <div className="flex items-center gap-3 border border-white/25 bg-[#211B17]/15 px-4 py-3 backdrop-blur-md">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: badgeColor }}
          />

          <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-white/80">
            Pure / Botanical / Natural
          </span>
        </div>
      </div>

      {/* =====================================================
          BOTTOM INFORMATION
      ===================================================== */}
      <div className="absolute bottom-0 left-0 z-20 hidden w-[43%] border-t border-[#D8CCC0] lg:block">
        <div className="flex items-center justify-between px-12 py-4 xl:px-16">
          <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#91847A]">
            7ALP's / Natural wellness
          </span>

          <div className="flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-[#C56B4E]" />

            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#91847A]">
              Farm to formulation
            </span>

            <GoArrowUpRight size={12} className="text-[#C56B4E]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
