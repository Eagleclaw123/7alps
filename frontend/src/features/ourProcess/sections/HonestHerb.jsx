import { motion } from "framer-motion";
import { Percent, LineChart, CircleCheck } from "lucide-react";

const features = [
  {
    icon: Percent,
    number: "01",
    title: "More herb per gram",
    description:
      "No fillers or carriers means a higher concentration of active plant in every serving — you pay for the herb, not the padding.",
  },
  {
    icon: LineChart,
    number: "02",
    title: "Use it your way",
    description:
      "Stir into water, milk or smoothies; mix into oils, masks and pastes. One powder flexes across drinks, skin and hair.",
  },
  {
    icon: CircleCheck,
    number: "03",
    title: "Longer, stable shelf life",
    description:
      "Dry and airtight, powders stay potent far longer than ready-made liquids — no preservatives needed to keep them honest.",
  },
];

const HonestHerb = () => {
  return (
    <section className="bg-[#F4EDE2] px-5 py-24 sm:px-8 lg:py-32 xl:px-16">
      <div className="mx-auto max-w-[1600px]">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#A85F43]">
                03
              </span>
              <span className="h-px w-10 bg-[#C56B4E]" />

              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
                Why powder
              </span>
            </div>

            <h2 className="max-w-5xl font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.075em] text-[#211B17]">
              The most honest
              <br />
              <span className="font-normal text-[#C56B4E]">
                way to sell a herb.
              </span>
            </h2>
          </div>

          <p className="max-w-md font-manrope text-sm leading-7 text-[#756A62] md:text-base">
            A powder hides nothing. There's no capsule shell, no emulsifier, no
            water to pad the weight — just the plant, and however you choose to
            use it.
          </p>
        </motion.div>

        {/* Feature area */}
        <div className="mt-16 border-t border-[#D8CCC0] lg:mt-24">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.08,
                }}
                className="grid gap-7 border-b border-[#D8CCC0] py-9 md:grid-cols-[100px_70px_1fr_1.2fr] md:items-center md:gap-8 lg:py-11"
              >
                {/* Number */}
                <span className="font-ibm-mono text-[9px] uppercase tracking-[0.2em] text-[#91847A]">
                  {feature.number}
                </span>

                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center border border-[#D8CCC0] text-[#C56B4E]">
                  <Icon size={19} strokeWidth={1.4} />
                </div>

                {/* Title */}
                <h3 className="max-w-md font-manrope text-2xl font-medium tracking-[-0.04em] text-[#211B17] lg:text-3xl">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="max-w-xl font-manrope text-sm leading-7 text-[#756A62] md:text-[15px]">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-14 flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
        >
          <p className="font-manrope text-sm text-[#756A62]">
            Nothing added. Nothing hidden.
          </p>

          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C56B4E]" />

            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
              Pure / Botanical / Natural
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HonestHerb;
