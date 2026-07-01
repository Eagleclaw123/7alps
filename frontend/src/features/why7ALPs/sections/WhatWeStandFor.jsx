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
    <section className="py-16 px-6 xl:px-0">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#047B22]" />
            <p className="font-ibm-mono text-[14px] font-semibold text-[#047B22] sm:text-[16px] md:text-[18px]">
              What we stand for
            </p>
          </div>

          <h2 className="text-[28px] font-medium leading-tight sm:text-[32px] md:text-[40px] xl:text-[44px]">
            Three things we
            <br className="hidden sm:block" /> won't compromise
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 md:grid-cols-3">
          {values.map((value, i) => (
            <motion.div
              key={value.number}
              className="rounded-xl border border-gray-200 bg-white p-6 sm:p-7 min-h-[280px] flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <p className="font-ibm-mono text-md font-semibold text-[#047B22]">
                {value.number} — {value.label}
              </p>

              <div>
                <h3 className="mt-4 text-xl font-semibold text-black sm:text-2xl">
                  {value.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-[15px]">
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
