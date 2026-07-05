import { motion } from "framer-motion";

const points = [
  {
    title: "Whole, not pre-ground",
    description:
      "We buy whole herbs and grind them ourselves, so we know exactly what's in every gram.",
  },
  {
    title: "Cold, not hot",
    description:
      "Low-temperature shade-drying protects the volatile compounds that give each herb its effect.",
  },
  {
    title: "Pure, not padded",
    description:
      "No maltodextrin, no anti-caking agents, no bulking fillers. One herb, ground fine. That's it.",
  },
];

const ProcessIntro = () => {
  return (
    <section>
      {/* Bottom: two-column text */}
      <div className="px-6 py-16 xl:px-0">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2 md:gap-16">
          <motion.p
            className="text-[20px] font-medium leading-snug text-black sm:text-[26px] lg:border-r md:border-gray-300 md:pr-16 md:text-[30px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            A powder is only as good as the herb it came from — and what you
            didn't do to it. Most powders on the market are bought pre-ground,
            blended with carriers, and dried with heat that quietly burns off
            the actives. We do the opposite.
          </motion.p>

          <div className="space-y-8">
            {points.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <p className="font-ibm-mono text-sm font-semibold text-[#047B22] sm:text-base">
                  {point.title}
                </p>
                <p className="mt-2 text-[14px] leading-6 text-gray-700 sm:text-[16px]">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessIntro;
