import { motion } from "framer-motion";

const values = [
  {
    number: "01",
    label: "Honesty",
    title: "If we can't prove it, we won't print it",
    description:
      'Every claim on our pack maps to a test result or a sourcing record. No vague "natural", no borrowed science — just what we can actually show you.',
  },
  {
    number: "02",
    label: "Restraint",
    title: "The best ingredient list is a short one",
    description:
      "We'd rather sell one true herb than a long label of padding. If it doesn't earn its place in the formula, it doesn't go in.",
  },
  {
    number: "03",
    label: "Respect",
    title: "Fair to the grower, fair to you",
    description:
      "We pay growers properly and price to active content, not weight. Good herbs come from people treated well — that's not a tagline, it's the supply chain.",
  },
];

const WhatWeStandFor = () => {
  return (
    <section className="px-6 py-20 xl:px-0">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-14 space-y-4 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#B9714A]" />
            <p className="font-ibm-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-[#B9714A] sm:text-sm">
              What we stand for
            </p>
          </div>

          <h2 className="font-semibold text-[28px] leading-tight text-[#3F4A2E] sm:text-[32px] md:text-[40px] xl:text-[44px]">
            Three things we
            <br className="hidden sm:block" /> won&apos;t compromise
          </h2>
        </motion.div>

        <div className="divide-y divide-[#E3D9C7] border-y border-[#E3D9C7]">
          {values.map((value, i) => (
            <motion.div
              key={value.number}
              className="grid grid-cols-1 gap-4 py-10 md:grid-cols-[140px_1fr] md:gap-10 md:py-12"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Number + label */}
              <div className="flex items-baseline gap-3 md:flex-col md:items-start md:gap-2">
                <span className="font-serif text-5xl leading-none text-[#E4DAC6] md:text-6xl">
                  {value.number}
                </span>
                <p className="font-ibm-mono text-xs font-semibold uppercase tracking-[0.15em] text-[#B9714A]">
                  {value.label}
                </p>
              </div>

              {/* Title + description */}
              <div className="max-w-2xl">
                <h3 className="text-xl font-semibold text-[#3F4A2E] sm:text-2xl">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#6B7259] sm:text-[15px]">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeStandFor;
