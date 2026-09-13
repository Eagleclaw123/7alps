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
      {/* IMAGE SIDE */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[57%]">
        <img
          src={backgroundImage}
          alt="7ALP herbal powder ingredients"
          className="h-full w-full object-cover object-center"
        />

        {/* Image treatment */}
        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute inset-y-0 left-0 hidden w-48 bg-gradient-to-r from-[#F4EDE2] to-transparent lg:block" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />
      </div>

      {/* LEFT CONTENT */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-[1600px] px-5 pt-28 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="max-w-[720px] lg:w-[48%]"
          >
            {/* Eyebrow */}
            {badgeText && (
              <div className="mb-7 flex items-center gap-3">
                <span
                  className="h-[1px] w-10"
                  style={{ backgroundColor: badgeColor }}
                />

                <span
                  className="font-ibm-mono text-[9px] uppercase tracking-[0.3em]"
                  style={{ color: badgeColor }}
                >
                  {badgeText}
                </span>
              </div>
            )}

            {/* Heading */}
            {heading && (
              <h1
                className={`font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.075em] ${textColor}`}
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
              <p className="mt-8 max-w-lg font-manrope text-sm leading-7 text-[#756A62] md:text-base">
                {description}
              </p>
            )}

            {/* CTA */}
            {buttons.length > 0 && (
              <div className="mt-9 flex flex-wrap gap-4">
                {buttons.map((button, index) => (
                  <button
                    key={index}
                    onClick={button.onClick}
                    className="group inline-flex items-center gap-4 bg-[#211B17] px-7 py-4 font-manrope text-sm font-medium text-[#F4EDE2] transition-all duration-300 hover:bg-[#C56B4E]"
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
              <div className="mt-8 flex flex-wrap gap-3">
                {values.map((title) => (
                  <div
                    key={title}
                    className="flex items-center gap-2 border border-[#D8CCC0] bg-white/40 px-4 py-3"
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
              <div className="mt-10 flex flex-wrap gap-8  pt-6">
                {highlights.map(({ icon: Icon, title, subtitle }) => (
                  <div key={title} className="flex items-center gap-3">
                    {Icon && <Icon size={22} style={{ color: badgeColor }} />}

                    <div>
                      <p className="font-manrope text-sm font-medium text-[#211B17]">
                        {title}
                      </p>

                      {subtitle && (
                        <p className="mt-0.5 font-manrope text-xs text-[#8A7D74]">
                          {subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {additionalContent && (
              <div className="mt-8">{additionalContent}</div>
            )}
          </motion.div>
        </div>
      </div>

      {/* IMAGE LABEL */}
      <div className="absolute bottom-7 right-7 z-20 hidden md:block">
        <div className="flex items-center gap-3 border border-white/30 bg-black/20 px-4 py-3 backdrop-blur-md">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: badgeColor }}
          />

          <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-white/80">
            Pure / Botanical / Natural
          </span>
        </div>
      </div>

      {/* Bottom information */}
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
