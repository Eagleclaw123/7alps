import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const values = [
  {
    number: "01",
    label: "Honesty",
    title: "If we can't prove it, we won't print it.",
    description:
      'Every claim on our pack maps to a test result or a sourcing record. No vague "natural", no borrowed science — just what we can actually show you.',
  },
  {
    number: "02",
    label: "Restraint",
    title: "The best ingredient list is a short one.",
    description:
      "We'd rather sell one true herb than a long label of padding. If it doesn't earn its place in the formula, it doesn't go in.",
  },
  {
    number: "03",
    label: "Respect",
    title: "Fair to the grower. Fair to you.",
    description:
      "We pay growers properly and price to active content, not weight. Good herbs come from people treated well — that's not a tagline, it's the supply chain.",
  },
];

const WhatWeStandFor = () => {
  return (
    <section className="overflow-hidden bg-[#F4EDE2] px-5 py-24 text-[#211B17] sm:px-8 lg:py-32 xl:px-16">
      <div className="mx-auto max-w-[1500px]">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-end"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#A85F43]">
                03
              </span>
              <span className="h-px w-10 bg-[#C56B4E]" />

              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
                What we stand for
              </span>
            </div>

            <h2 className="max-w-5xl font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.075em]">
              Three things
              <br />
              <span className="font-normal text-[#C56B4E]">
                we won't compromise.
              </span>
            </h2>
          </div>

          <p className="max-w-md font-manrope text-sm leading-7 text-[#756A62] md:text-base">
            A good product starts with good intentions. A great one keeps those
            intentions intact all the way through the supply chain.
          </p>
        </motion.div>

        {/* Principles */}
        <div className="mt-16 border-y border-[#D8CCC0] lg:mt-24">
          {values.map((value, index) => (
            <motion.article
              key={value.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group grid gap-8 border-b border-[#D8CCC0] py-10 last:border-b-0 md:py-12 lg:grid-cols-[180px_1fr_auto] lg:items-start lg:gap-12 lg:py-14"
            >
              {/* Number */}
              <div className="flex items-center gap-4 lg:block">
                <span className="font-manrope text-5xl font-medium leading-none tracking-[-0.07em] text-[#CFC1B4] transition-colors duration-300 group-hover:text-[#C56B4E] md:text-6xl">
                  {value.number}
                </span>

                <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#C56B4E] lg:mt-4 lg:block">
                  {value.label}
                </span>
              </div>

              {/* Content */}
              <div className="max-w-3xl">
                <h3 className="font-manrope text-[clamp(1.7rem,3vw,3rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[#211B17]">
                  {value.title}
                </h3>

                <p className="mt-5 max-w-2xl font-manrope text-sm leading-7 text-[#756A62] md:text-base">
                  {value.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden lg:flex lg:justify-end">
                <div className="flex h-10 w-10 items-center justify-center border border-[#D8CCC0] text-[#91847A] transition-all duration-300 group-hover:border-[#C56B4E] group-hover:bg-[#C56B4E] group-hover:text-[#F4EDE2]">
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Closing manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-20 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <div>
            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
              Our promise
            </span>

            <p className="mt-5 max-w-4xl font-manrope text-[clamp(2rem,4vw,4rem)] font-medium leading-[0.95] tracking-[-0.06em]">
              Keep the ingredient honest
              <br />
              from <span className="font-normal text-[#C56B4E]">field</span> to
              finished product.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C56B4E]" />

            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
              Honest / Simple / Responsible
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeStandFor;
