import { motion } from "framer-motion";
import { Percent, LineChart, CircleCheck } from "lucide-react";

const features = [
  {
    icon: Percent,
    title: "More herb per gram",
    description:
      "No fillers or carriers means a higher concentration of active plant in every serving — you pay for the herb, not the padding.",
  },
  {
    icon: LineChart,
    title: "Use it your way",
    description:
      "Stir into water, milk or smoothies; mix into oils, masks and pastes. One powder flexes across drinks, skin and hair.",
  },
  {
    icon: CircleCheck,
    title: "Longer, stable shelf life",
    description:
      "Dry and airtight, powders stay potent far longer than ready-made liquids — no preservatives needed to keep them honest.",
  },
];

const HonestHerb = () => {
  return (
    <section className="py-16 px-6 xl:px-0">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="max-w-2xl space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[28px] font-semibold leading-tight sm:text-[32px] md:text-[40px] xl:text-[44px]">
            The most honest way to sell a herb
          </h2>

          <p className="text-[14px] leading-6 text-gray-600 sm:text-[15px] sm:leading-7 md:text-[18px]">
            A powder hides nothing. There's no capsule shell, no emulsifier, no
            water to pad the weight — just the plant, and however you choose to
            use it.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 md:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="rounded-xl border border-gray-200 bg-white p-6 sm:p-7"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-gray-200">
                  <Icon className="h-5 w-5 text-gray-500" />
                </div>

                <h3 className="text-xl font-semibold text-black sm:text-2xl">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-[15px]">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HonestHerb;
