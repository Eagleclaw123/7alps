import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  {
    label: "Sourcing",
    us: "Single-origin, named farms",
    them: "Mixed lots, origin unknown",
  },
  {
    label: "Grinding",
    us: "Stone-ground in-house, small batches",
    them: "Bought pre-ground in bulk",
  },
  {
    label: "Fillers & additives",
    us: "None — single ingredient",
    them: "Maltodextrin, anti-caking agents",
  },
  {
    label: "Drying",
    us: "Shade-dried below 40°C",
    them: "High-heat dried for speed",
  },
  {
    label: "Fineness",
    us: "Sieved to a fine 80-mesh",
    them: "Coarse, inconsistent texture",
  },
  {
    label: "Testing",
    us: "Every batch, COA on file",
    them: "Rarely, if ever",
  },
];

const Comparison = () => {
  return (
    <section className="relative overflow-hidden bg-[#211B17] px-5 py-24 text-[#F4EDE2] sm:px-8 lg:py-32 xl:px-16">
      {/* Subtle background image */}
      <div className="absolute inset-0">
        <img
          src="https://res.cloudinary.com/dasvdkncm/image/upload/v1782808666/f910f2fa731e472213b10164fc8561d3a17cb4c0_cszg6g.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-15"
        />

        <div className="absolute inset-0 bg-[#211B17]/85" />
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid gap-10 border-b border-white/15 pb-12 lg:grid-cols-[1fr_0.42fr] lg:items-end"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#A85F43]">
                02
              </span>
              <span className="h-px w-10 bg-[#C56B4E]" />

              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
                An honest comparison
              </span>
            </div>

            <h2 className="max-w-5xl font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.075em]">
              Look closer.
              <br />
              <span className="font-normal text-[#C56B4E]">
                The difference is there.
              </span>
            </h2>
          </div>

          <p className="max-w-md font-manrope text-sm leading-7 text-[#B7AAA0] md:text-base">
            Two powders can look similar on a shelf. Their journey from field to
            finished product can be very different.
          </p>
        </motion.div>

        {/* Comparison header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-14 grid border-b border-white/15 pb-5 md:grid-cols-[1fr_1fr_1fr]"
        >
          <div className="hidden md:block">
            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
              What to check
            </span>
          </div>

          <div className="border-l border-white/10 pl-5 md:pl-8">
            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#C56B4E]">
              7ALP&apos;s approach
            </span>
          </div>

          <div className="border-l border-white/10 pl-5 md:pl-8">
            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
              Conventional powders
            </span>
          </div>
        </motion.div>

        {/* Rows */}
        <div>
          {rows.map((row, index) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid border-b border-white/10 md:grid-cols-[1fr_1fr_1fr]"
            >
              {/* Label */}
              <div className="flex items-center gap-4 py-7 md:py-8">
                <span className="font-ibm-mono text-[9px] text-[#C56B4E]">
                  0{index + 1}
                </span>

                <span className="font-manrope text-sm font-medium text-[#F4EDE2] md:text-base">
                  {row.label}
                </span>
              </div>

              {/* 7ALP */}
              <div className="flex items-start gap-4 border-l border-white/10 py-7 pl-5 md:py-8 md:pl-8">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border border-[#C56B4E]/50">
                  <Check
                    size={12}
                    strokeWidth={1.8}
                    className="text-[#C56B4E]"
                  />
                </div>

                <span className="max-w-sm font-manrope text-sm leading-6 text-[#D8CCC0]">
                  {row.us}
                </span>
              </div>

              {/* Conventional */}
              <div className="flex items-start gap-4 border-l border-white/10 py-7 pl-5 md:py-8 md:pl-8">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border border-white/15">
                  <X size={12} strokeWidth={1.5} className="text-[#91847A]" />
                </div>

                <span className="max-w-sm font-manrope text-sm leading-6 text-[#91847A]">
                  {row.them}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <div>
            <p className="max-w-3xl font-manrope text-2xl font-medium leading-tight tracking-[-0.04em] text-[#F4EDE2] md:text-3xl">
              The difference isn&apos;t always visible.
              <br />
              <span className="font-normal text-[#91847A]">
                That&apos;s why we believe it should be explainable.
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C56B4E]" />

            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
              Transparency / Process / Proof
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Comparison;
