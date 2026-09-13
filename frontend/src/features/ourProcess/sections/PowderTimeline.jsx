import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    label: "Source",
    title: "Single-origin sourcing",
    description:
      "We work with named growers and harvest each herb at its peak — bhringraj before it flowers, amla when fully ripe. One herb, one origin, every time.",
    image:
      "https://miro.medium.com/v2/resize%3Afit%3A1400/1%2A7ktvBf-X5rVyGJXcn1tmPg.png",
    info: [
      { label: "Origin", value: "Named farms" },
      { label: "Harvest", value: "At peak only" },
    ],
  },

  {
    number: "02",
    label: "Clean",
    title: "Cleaning & sorting",
    description:
      "Each lot is hand-sorted to remove stalks, stones and grit, then triple-washed in filtered water. Anything that isn't the herb itself gets taken out here.",
    image:
      "https://www.agroherbal.net/assets/images/slider/slide-img/2-1-960x741.jpg",
    info: [
      { label: "Method", value: "Hand-sorted" },
      { label: "Process", value: "Triple, filtered" },
    ],
  },

  {
    number: "03",
    label: "Dry",
    title: "Low-heat shade-drying",
    description:
      "Herbs dry slowly on racks below 40 °C, out of direct sun. It takes longer, but it keeps the volatile oils and active compounds that high-heat drying destroys.",
    image: "https://teriin.org/sites/default/files/inline-images/NMHS_1.jpg",
    info: [
      { label: "Temperature", value: "< 40 °C" },
      { label: "Duration", value: "24–48 hrs" },
    ],
  },

  {
    number: "04",
    label: "Grind",
    title: "Stone-grind & pulverise",
    description:
      "Dried herbs are ground in small batches on low-RPM stone mills. Slow grinding keeps the powder cool, so heat from friction never cooks the herb a second time.",
    image:
      "https://ueeshop.ly200-cdn.com/u_file/UPAW/UPAW894/2409/products/02/7df1926c13.png",
    info: [
      { label: "Method", value: "Low-RPM stone" },
      { label: "Production", value: "Small lots" },
    ],
  },

  {
    number: "05",
    label: "Sieve",
    title: "Micro-sieving to grade",
    description:
      "Every powder passes through fine 80-mesh sieves so the texture is silky and consistent — no gritty bits, no clumps. Oversized particles go back to be reground.",
    image:
      "https://butterflyayurveda.com/cdn/shop/files/vibro-shifter-2_e5178d93-2838-43e8-893e-f7706bb067bb.png?v=1718364719&width=3840",
    info: [
      { label: "Mesh", value: "80-mesh" },
      { label: "Result", value: "Uniform" },
    ],
  },

  {
    number: "06",
    label: "Blend",
    title: "Blend to formula",
    description:
      "For multi-herb formulas, graded powders are weighed to exact ratios and blended slowly until perfectly even — so every spoonful is the same as the last.",
    image:
      "https://www.lebenformulation.com/Images/products/herbal/manual_hand_blending.png",
    info: [
      { label: "Method", value: "Exact ratios" },
      { label: "Process", value: "Slow, even" },
    ],
  },

  {
    number: "07",
    label: "Test",
    title: "Lab-test & verify",
    description:
      "Each batch is tested for purity, moisture, microbial safety and heavy metals before it's cleared. Nothing ships without a passing certificate of analysis.",
    image: "https://www.kelvinlabs.in/images/cctv.jpg",
    info: [
      { label: "Testing", value: "Metals · microbes" },
      { label: "Verification", value: "COA per lot" },
    ],
  },

  {
    number: "08",
    label: "Pack",
    title: "Airtight pack & lot-stamp",
    description:
      "Cleared powder is sealed in airtight, light-proof packaging within hours, then stamped with its lot code and dispatch date — so you can trace it right back to the field.",
    image:
      "https://s.alicdn.com/@sc04/kf/Hc598422e4b5b4a9797ed160078535fbcZ/High-Speed-Automatic-Small-Food-Bagging-Fine-Herbal-Corn-Milk-Rice-Matcha-Tea-Powder-Vffs-Packaging-Machine-Professing-Line.jpg",
    info: [
      { label: "Packaging", value: "Airtight, opaque" },
      { label: "Traceability", value: "Lot + date" },
    ],
  },
];
const PowderTimeline = () => {
  return (
    <section className="bg-[#EAE0D4] px-5 py-24 sm:px-8 lg:py-32 xl:px-16">
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
          className="grid gap-8 border-b border-[#CFC1B4] pb-12 lg:grid-cols-[1fr_0.65fr] lg:items-end"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#A85F43]">
                02
              </span>
              <span className="h-px w-10 bg-[#C56B4E]" />

              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
                The eight steps
              </span>
            </div>

            <h2 className="max-w-4xl font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.075em] text-[#211B17]">
              From field
              <br />
              <span className="font-normal text-[#C56B4E]">
                to fine powder.
              </span>
            </h2>
          </div>

          <p className="max-w-md font-manrope text-sm leading-7 text-[#756A62] md:text-base">
            Follow a single batch through everything we do to it — and
            everything we deliberately don't.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-16 lg:mt-24">
          {/* Connecting line */}
          <div className="absolute bottom-0 left-[22px] top-0 w-px bg-[#BDAFA2] lg:left-1/2 lg:-translate-x-1/2" />

          <div className="space-y-16 lg:space-y-28">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.article
                  key={step.number}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-80px",
                  }}
                  transition={{
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative"
                >
                  {/* Timeline marker */}
                  <div className="absolute left-[22px] top-5 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-[#C56B4E] bg-[#EAE0D4] lg:left-1/2 lg:h-14 lg:w-14">
                    <span className="font-ibm-mono text-[9px] tracking-[0.1em] text-[#C56B4E]">
                      {step.number}
                    </span>
                  </div>

                  <div
                    className={`grid pl-12 lg:grid-cols-2 lg:gap-16 lg:pl-0 ${
                      isEven ? "" : "lg:[direction:rtl]"
                    }`}
                  >
                    {/* Image */}
                    <div
                      className={`overflow-hidden lg:[direction:ltr] ${
                        isEven ? "lg:pr-8" : "lg:pl-8"
                      }`}
                    >
                      <div className="group relative aspect-[4/3] overflow-hidden bg-[#D8CCC0]">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />

                        <div className="absolute inset-0 bg-[#211B17]/5 transition-colors duration-500 group-hover:bg-transparent" />

                        <div className="absolute bottom-5 left-5">
                          <span className="bg-[#F4EDE2]/90 px-3 py-2 font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#514740] backdrop-blur-sm">
                            Step {step.number}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={`flex items-center lg:[direction:ltr] ${
                        isEven ? "lg:pl-8" : "lg:pr-8"
                      }`}
                    >
                      <div className="pt-7 lg:pt-0">
                        <span className="font-ibm-mono text-[9px] uppercase tracking-[0.25em] text-[#C56B4E]">
                          {step.label}
                        </span>

                        <h3 className="mt-4 max-w-lg font-manrope text-3xl font-medium leading-[0.98] tracking-[-0.055em] text-[#211B17] md:text-4xl">
                          {step.title}
                        </h3>

                        <p className="mt-5 max-w-lg font-manrope text-sm leading-7 text-[#756A62] md:text-base">
                          {step.description}
                        </p>

                        {/* Info */}
                        <div className="mt-8 grid max-w-lg grid-cols-2 border-t border-[#CFC1B4]">
                          {step.info.map((item) => (
                            <div
                              key={item.label}
                              className="border-b border-[#CFC1B4] py-4 first:mr-4"
                            >
                              <p className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#91847A]">
                                {item.label}
                              </p>

                              <p className="mt-2 font-manrope text-sm font-medium text-[#211B17]">
                                {item.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 border-t border-[#CFC1B4] pt-10 lg:mt-32"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <p className="max-w-2xl font-manrope text-2xl font-medium leading-tight tracking-[-0.04em] text-[#211B17] md:text-3xl">
              Eight deliberate steps.
              <br />
              <span className="font-normal text-[#756A62]">
                One honest ingredient.
              </span>
            </p>

            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
              Farm / Process / Formula
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PowderTimeline;
