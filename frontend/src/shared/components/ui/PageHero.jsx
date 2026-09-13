import { motion } from "framer-motion";

const PageHero = ({
  eyebrow = "7ALP's",
  title,
  titleHighlight,
  description,
  backgroundImage,
  imageAlt = "7ALP herbal wellness",
  leftLabel = "7ALP's",
  rightLabel = "Personal / Delivery",
  minHeight = "62vh",
  overlay = "medium",
  align = "bottom",
}) => {
  const overlayClasses = {
    light: {
      base: "bg-[#211B17]/20",
      horizontal:
        "bg-gradient-to-r from-[#211B17]/55 via-[#211B17]/20 to-transparent",
      bottom:
        "bg-gradient-to-t from-[#211B17]/45 via-transparent to-transparent",
    },

    medium: {
      base: "bg-[#211B17]/35",
      horizontal:
        "bg-gradient-to-r from-[#211B17]/75 via-[#211B17]/35 to-transparent",
      bottom:
        "bg-gradient-to-t from-[#211B17]/60 via-transparent to-transparent",
    },

    dark: {
      base: "bg-[#211B17]/50",
      horizontal:
        "bg-gradient-to-r from-[#211B17]/85 via-[#211B17]/45 to-transparent",
      bottom:
        "bg-gradient-to-t from-[#211B17]/75 via-transparent to-transparent",
    },
  };

  const currentOverlay = overlayClasses[overlay] || overlayClasses.medium;

  const alignmentClass =
    align === "center"
      ? "items-center pb-16 pt-32 sm:pb-20"
      : "items-end pb-16 pt-32 sm:pb-20";

  return (
    <section className="relative overflow-hidden bg-[#211B17]">
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className={`absolute inset-0 ${currentOverlay.base}`} />

        <div className={`absolute inset-0 ${currentOverlay.horizontal}`} />

        <div className={`absolute inset-0 ${currentOverlay.bottom}`} />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className={`relative z-10 mx-auto flex max-w-[1500px] ${alignmentClass} px-5 sm:px-8 xl:px-16`}
        style={{
          minHeight,
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-4xl"
        >
          {/* EYEBROW */}

          {eyebrow && (
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C56B4E]" />

              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
                {eyebrow}
              </span>
            </div>
          )}

          {/* TITLE */}

          <h1 className="font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.08em] text-[#F4EDE2]">
            {title}

            {titleHighlight && (
              <>
                <br />

                <span className="font-normal text-[#C56B4E]">
                  {titleHighlight}
                </span>
              </>
            )}
          </h1>

          {/* DESCRIPTION */}

          {description && (
            <p className="mt-8 max-w-xl font-manrope text-sm leading-7 text-white/65 md:text-base">
              {description}
            </p>
          )}
        </motion.div>
      </div>

      {/* =====================================================
          BOTTOM META BAR
      ===================================================== */}

      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8 xl:px-16">
          <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-white/40">
            {leftLabel}
          </span>

          <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-white/40">
            {rightLabel}
          </span>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
