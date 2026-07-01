import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    label: "Source",
    title: "Single-origin sourcing",
    description:
      "We work with named growers and harvest each herb at its peak — bhringraj before it flowers, amla when fully ripe. One herb, one origin, every time.",
    image:
      "https://res.cloudinary.com/dasvdkncm/image/upload/v1782816710/1f4bbdb06af238b765a3294bd707d4dc1468270e_q2bwoq.png",
    info: [
      { label: "Origin", value: "Named farms" },
      { label: "Harvest", value: "At peak only" },
    ],
  },
  {
    number: "02",
    label: "CLean",
    title: "Cleaning & sorting",
    description:
      "Each lot is hand-sorted to remove stalks, stones and grit, then triple-washed in filtered water. Anything that isn't the herb itself gets taken out here.",
    image:
      "https://res.cloudinary.com/dasvdkncm/image/upload/v1782816711/f475961aa98a0b9edcba18dad84155dd103eb0ad_eliuuw.png",
    info: [
      { label: "Origin", value: "Hand-sorted" },
      { label: "Harvest", value: "Triple, filtered" },
    ],
  },
  {
    number: "03",
    label: "Dry",
    title: "Low-heat shade-drying",
    description:
      "Herbs dry slowly on racks below 40 °C, out of direct sun. It takes longer, but it keeps the volatile oils and active compounds that high-heat drying destroys.",
    image:
      "https://res.cloudinary.com/dasvdkncm/image/upload/v1782816711/012bdd6071c189861fca2d1e8482659dd34f333b_vkzhtk.png",
    info: [
      { label: "Origin", value: "< 40 °C" },
      { label: "Harvest", value: "24–48 hrs" },
    ],
  },
  {
    number: "04",
    label: "Grind",
    title: "Stone-grind & pulverise",
    description:
      "Dried herbs are ground in small batches on low-RPM stone mills. Slow grinding keeps the powder cool, so heat from friction never cooks the herb a second time.",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop",
    info: [
      { label: "Origin", value: "Low-RPM stone" },
      { label: "Harvest", value: "Small lots" },
    ],
  },
  {
    number: "05",
    label: "Sieve",
    title: "Micro-sieving to grade",
    description:
      "Every powder passes through fine 80-mesh sieves so the texture is silky and consistent — no gritty bits, no clumps. Oversized particles go back to be reground.",
    image:
      "https://res.cloudinary.com/dasvdkncm/image/upload/v1782816710/c57e10a175ab7f474d1ccc9c1e21fb49d7cd8238_yk0kap.png",
    info: [
      { label: "Origin", value: "80-mesh" },
      { label: "Harvest", value: "Until uniform" },
    ],
  },
  {
    number: "06",
    label: "Blend",
    title: "Blend to formula",
    description:
      "For multi-herb formulas, graded powders are weighed to exact ratios and blended slowly until perfectly even — so every spoonful is the same as the last.",
    image:
      "https://res.cloudinary.com/dasvdkncm/image/upload/v1782816710/b7b02e134f78b096d593731d0b94c7037ef5d3a2_es62yf.png",
    info: [
      { label: "Origin", value: "Weighed exact" },
      { label: "Harvest", value: "Slow, even" },
    ],
  },
  {
    number: "07",
    label: "Test",
    title: "Lab-test & verify",
    description:
      "Each batch is tested for purity, moisture, microbial safety and heavy metals before it's cleared. Nothing ships without a passing certificate of analysis.",
    image:
      "https://res.cloudinary.com/dasvdkncm/image/upload/v1782816712/76561b782194a728acc60e18736d701a7d6ec9ca_wcokg3.png",
    info: [
      { label: "Origin", value: "Metals · microbes" },
      { label: "Harvest", value: "COA per lot" },
    ],
  },
  {
    number: "08",
    label: "Pack",
    title: "Airtight pack & lot-stamp",
    description:
      "Cleared powder is sealed in airtight, light-proof packaging within hours, then stamped with its lot code and dispatch date — so you can trace it right back to the field.",
    image:
      "https://res.cloudinary.com/dasvdkncm/image/upload/v1782816710/132cb35127bd0d9d0b1116d1a68f1eccd2eecd1e_jxadbd.png",
    info: [
      { label: "Origin", value: "Airtight, opaque" },
      { label: "Harvest", value: "Lot + date" },
    ],
  },
];

const PowderTimeline = () => {
  return (
    <section className="bg-[#C8D7C2] py-16 px-6 xl:px-0">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="max-w-xl space-y-4 mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#047B22]" />
            <p className="text-[14px] sm:text-[16px] md:text-[18px] text-[#047B22] font-ibm-mono font-semibold">
              The eight steps
            </p>
          </div>

          <h2 className="text-[24px] sm:text-[28px] md:text-[36px] xl:text-[40px] leading-tight font-semibold">
            From a field of herbs to a fine, true powder
          </h2>

          <p className="text-[14px] leading-6 sm:leading-7 text-gray-600 sm:text-[15px] md:text-[18px] xl:text-[20px]">
            Follow a single batch through everything we do to it — and
            everything we deliberately don't.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-12 sm:mt-16">
          {/* Vertical line: left-aligned on mobile, centered on desktop */}
          <div className="absolute bottom-0 top-0 left-4 w-px bg-[#0E2C16]/30 sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-10 sm:space-y-14">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={step.number} className="relative">
                  {/* Marker dot with step number */}
                  <div className="absolute left-4 top-2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-3 border-[#8BA580] bg-white sm:left-1/2 sm:h-16 sm:w-16">
                    <span className="font-ibm-mono text-xs font-semibold text-[#0E2C16] sm:text-sm">
                      {step.number}
                    </span>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`flex w-full pl-12 sm:pl-0 ${
                      isEven ? "sm:justify-start" : "sm:justify-end"
                    }`}
                  >
                    <div
                      className={`w-full sm:w-[calc(50%-32px)] ${
                        isEven ? "sm:pr-8" : "sm:pl-8"
                      }`}
                    >
                      <div className="overflow-hidden rounded-2xl bg-white shadow-sm p-4">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="h-48 w-full object-cover sm:h-48"
                        />

                        <div className="py-5">
                          <p className="font-ibm-mono text-xs font-semibold uppercase tracking-wide text-gray-500 sm:text-sm">
                            Step {step.number} · {step.label}
                          </p>

                          <h3 className="mt-2 text-xl font-semibold text-black sm:text-2xl">
                            {step.title}
                          </h3>

                          <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-[15px]">
                            {step.description}
                          </p>

                          <div className="mt-5 pt-5 block sm:hidden lg:grid grid grid-cols-2 gap-4 border-t border-gray-200 ">
                            {step.info.map((item) => (
                              <div key={item.label}>
                                <p className="font-ibm-mono text-xs font-semibold uppercase tracking-wide text-gray-500">
                                  {item.label}
                                </p>
                                <p className="mt-1 text-base font-semibold text-black sm:text-[16px]">
                                  {item.value}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PowderTimeline;
