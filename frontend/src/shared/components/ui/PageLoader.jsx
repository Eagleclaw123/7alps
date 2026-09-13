// src/app/components/PageLoader.jsx

import { motion } from "framer-motion";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#F4EDE2] text-[#211B17]">
      {/* Soft background atmosphere */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C56B4E]/[0.06] blur-3xl"
        animate={{
          scale: [0.85, 1.15, 0.85],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top brand */}
      <div className="absolute left-6 top-6 sm:left-10 sm:top-10">
        <div className="flex items-center gap-3">
          <span className="font-manrope text-lg font-semibold tracking-[-0.06em]">
            7ALP's
          </span>

          <span className="h-px w-7 bg-[#C56B4E]" />

          <span className="font-ibm-mono text-[8px] uppercase tracking-[0.28em] text-[#91847A]">
            Herbal wellness
          </span>
        </div>
      </div>

      {/* Main */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center px-6">
        {/* Logo animation */}
        <div className="relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
          {/* Outer expanding circle */}
          <motion.div
            className="absolute inset-0 rounded-full border border-[#C56B4E]/25"
            animate={{
              scale: [0.72, 1.08],
              opacity: [0.65, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          {/* Second subtle ring */}
          <motion.div
            className="absolute inset-8 rounded-full border border-[#211B17]/10"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Logo container */}
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[#211B17]/10 bg-[#F4EDE2] shadow-[0_20px_60px_rgba(33,27,23,0.08)] sm:h-32 sm:w-32"
          >
            <img
              src="https://res.cloudinary.com/dasvdkncm/image/upload/v1781664574/7_ALP_s_Logo-removebg-preview_e7kr1k.png"
              alt="7ALP's"
              className="h-16 w-auto object-contain sm:h-20"
            />

            {/* Small orbiting accent */}
            <motion.span
              className="absolute left-1/2 top-[-5px] h-2 w-2 rounded-full bg-[#C56B4E]"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                transformOrigin: "0 70px",
              }}
            />
          </motion.div>
        </div>

        {/* Loading copy */}
        <div className="mt-10 text-center">
          <motion.div
            animate={{
              opacity: [0.45, 1, 0.45],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="font-ibm-mono text-[9px] uppercase tracking-[0.32em] text-[#C56B4E]"
          >
            Preparing your experience
          </motion.div>

          <p className="mt-3 font-manrope text-xs text-[#91847A]">
            Pure ingredients. Thoughtfully delivered.
          </p>
        </div>

        {/* Elegant progress */}
        <div className="mt-8 flex w-full max-w-[260px] items-center gap-4">
          <span className="font-ibm-mono text-[8px] tracking-[0.2em] text-[#A69A90]">
            7
          </span>

          <div className="h-px flex-1 overflow-hidden bg-[#D8CCC0]">
            <motion.div
              className="h-full origin-left bg-[#C56B4E]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: [0.65, 0, 0.35, 1],
              }}
            />
          </div>

          <motion.span
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="font-ibm-mono text-[8px] tracking-[0.2em] text-[#A69A90]"
          >
            ...
          </motion.span>
        </div>
      </div>

      {/* Bottom editorial detail */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-[#211B17]/10 pt-4 sm:bottom-8 sm:left-10 sm:right-10">
        <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#A69A90]">
          Natural / Honest / Pure
        </span>

        <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#A69A90]">
          Est. 7ALP's
        </span>
      </div>
    </div>
  );
};

export default PageLoader;
