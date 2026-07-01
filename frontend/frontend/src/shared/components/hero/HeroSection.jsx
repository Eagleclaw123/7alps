import { motion } from "framer-motion";
import { GoArrowRight } from "react-icons/go";
import { BsCheck2 } from "react-icons/bs";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const HeroSection = ({
  backgroundImage,
  badgeText,
  badgeColor = "#047B22",
  heading,
  headingHighlight,
  description,
  buttons = [],
  highlights = [],
  values = [],
  additionalContent,
  containerHeight = "h-[90vh] md:h-[70vh] xl:h-screen",
  overlayColor = "bg-black/10",
  textColor = "text-white",
  headingSize = "text-[26px] md:text-4xl xl:text-[46px]",
  contentMaxWidth = "max-w-2xl",
}) => {
  return (
    <section className={`relative overflow-hidden ${containerHeight}`}>
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Hero Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayColor}`} />

      {/* Content */}
      <div className="relative z-10 flex h-full items-end pb-10">
        <div className="mx-auto w-full max-w-7xl px-6 xl:px-0">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className={contentMaxWidth}
          >
            {/* Badge */}
            {badgeText && (
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: badgeColor }}
                />
                <p
                  className="text-[18px] font-ibm-mono font-semibold"
                  style={{ color: badgeColor }}
                >
                  {badgeText}
                </p>
              </div>
            )}

            {/* Heading */}
            {heading && (
              <h1
                className={`mt-4 ${headingSize} font-semibold leading-tight ${textColor}`}
              >
                {heading}
                {headingHighlight && (
                  <span style={{ color: badgeColor }}> {headingHighlight}</span>
                )}
              </h1>
            )}

            {/* Description */}
            {description && (
              <p
                className={`mt-6 text-[18px] xl:text-[20px] max-w-xl ${textColor}/80`}
              >
                {description}
              </p>
            )}

            {/* Buttons */}
            {buttons.length > 0 && (
              <div className="flex gap-6 items-center flex-wrap mt-6">
                {buttons.map((button, index) => (
                  <button
                    key={index}
                    onClick={button.onClick}
                    className={`rounded-lg px-6 py-3 font-medium transition-all ${
                      button.variant === "secondary"
                        ? "bg-white text-black hover:bg-gray-100"
                        : "bg-[#008521] text-white hover:bg-[#006b1a]"
                    }`}
                  >
                    {button.label}
                    {button.showArrow !== false && (
                      <GoArrowRight className="inline ml-2" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Highlights */}
            {highlights.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-14 text-gray-300">
                {highlights.map(({ icon: Icon, title, subtitle }, index) => (
                  <div
                    key={title}
                    className={`flex flex-col items-center gap-3 text-center text-gray-800 ${
                      index !== highlights.length - 1
                        ? "border-black/20 pr-6"
                        : ""
                    }`}
                  >
                    <Icon size={28} />
                    <p className="text-sm">
                      {title}
                      <br />
                      {subtitle}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {values.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4">
                {values.map((title) => (
                  <div
                    key={title}
                    className="flex items-center gap-2 rounded-full border border-[#E7E7E7] bg-[#606E32] px-4 py-3 text-white"
                  >
                    <BsCheck2 className="text-lg flex-shrink-0" />
                    <span className="text-sm font-medium">{title}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Additional Content */}
            {additionalContent && (
              <div className="mt-8">{additionalContent}</div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
