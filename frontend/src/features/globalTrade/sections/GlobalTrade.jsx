import { motion } from "framer-motion";
import {
  Globe,
  Users,
  ArrowLeftRight,
  Network,
  ArrowUpRight,
} from "lucide-react";

const cards = [
  {
    number: "01",
    icon: Globe,
    title: "Global Trade Overview",
    description: "Every batch is screened and cleared before it ships.",
  },
  {
    number: "02",
    icon: Users,
    title: "Global Presence",
    description: "Expanding our reach through trusted global partnerships.",
  },
  {
    number: "03",
    icon: ArrowLeftRight,
    title: "Import & Export",
    description: "Reliable trade solutions built for international growth.",
  },
  {
    number: "04",
    icon: Network,
    title: "Supply Chain Network",
    description: "A seamless journey from farms to global markets.",
  },
];

const GlobalTrade = () => {
  return (
    <section className="overflow-hidden bg-[#F4EDE2] px-5 py-24 text-[#211B17] sm:px-8 lg:py-32 xl:px-16">
      <div className="mx-auto max-w-[1500px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid gap-10 border-b border-[#D8CCC0] pb-12 lg:grid-cols-[1fr_0.42fr] lg:items-end"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#A85F43]">
                01
              </span>
              <span className="h-px w-10 bg-[#C56B4E]" />

              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
                Global trade
              </span>
            </div>

            <h2 className="max-w-5xl font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.075em]">
              From India.
              <br />
              <span className="font-normal text-[#C56B4E]">
                Made for the world.
              </span>
            </h2>
          </div>

          <p className="max-w-md font-manrope text-sm leading-7 text-[#756A62] md:text-base">
            We partner with businesses worldwide to meet the growing demand for
            natural and sustainable wellness ingredients.
          </p>
        </motion.div>

        {/* Main composition */}
        <div className="grid gap-10 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative min-h-[500px] overflow-hidden bg-[#D8CCC0] lg:min-h-[650px]"
          >
            <img
              src="https://static.wixstatic.com/media/5c95fd_e4178db0fd944354a4e5bc38ba89ab5c~mv2.png/v1/fill/w_980%2Ch_653%2Cal_c%2Cq_90%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/5c95fd_e4178db0fd944354a4e5bc38ba89ab5c~mv2.png"
              alt="Herbal powder prepared for international export"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.025]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#211B17]/70 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-white/60">
                    7ALP&apos;s / International supply
                  </span>

                  <p className="mt-3 max-w-md font-manrope text-lg leading-7 text-white">
                    From Indian origin to international destination.
                  </p>
                </div>

                <span className="font-ibm-mono text-[9px] text-white/50">
                  01
                </span>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
                Beyond borders
              </span>

              <p className="mt-6 max-w-2xl font-manrope text-2xl font-medium leading-[1.15] tracking-[-0.04em] text-[#211B17] md:text-3xl">
                Our job doesn't end when a product leaves the farm. It continues
                through every hand, document and destination along the way.
              </p>
            </motion.div>

            {/* Feature list */}
            <div className="mt-14 border-t border-[#D8CCC0]">
              {cards.map((card, index) => {
                const Icon = card.icon;

                return (
                  <motion.article
                    key={card.number}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.07,
                    }}
                    className="group grid grid-cols-[42px_1fr_auto] gap-5 border-b border-[#D8CCC0] py-6 md:grid-cols-[55px_1fr_auto] md:gap-7 md:py-7"
                  >
                    <div className="flex items-start">
                      <span className="font-ibm-mono text-[9px] text-[#C56B4E]">
                        {card.number}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <Icon
                          size={17}
                          strokeWidth={1.3}
                          className="text-[#C56B4E]"
                        />

                        <h3 className="font-manrope text-base font-medium text-[#211B17] md:text-lg">
                          {card.title}
                        </h3>
                      </div>

                      <p className="mt-2 max-w-xl font-manrope text-sm leading-6 text-[#756A62]">
                        {card.description}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <span className="flex h-8 w-8 items-center justify-center border border-[#D8CCC0] text-[#91847A] transition-all duration-300 group-hover:border-[#C56B4E] group-hover:bg-[#C56B4E] group-hover:text-[#F4EDE2]">
                        <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-[#D8CCC0] pt-8"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <p className="max-w-3xl font-manrope text-2xl font-medium leading-tight tracking-[-0.04em] md:text-3xl">
              Indian ingredients.
              <br />
              <span className="font-normal text-[#756A62]">
                Global possibilities.
              </span>
            </p>

            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
              India / Worldwide
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalTrade;
