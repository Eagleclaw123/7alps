import { motion } from "framer-motion";
import {
  LuDroplet,
  LuLeaf,
  LuShieldCheck,
  LuGlobe,
  LuSprout,
} from "react-icons/lu";

const stats = [
  {
    label: "Natural Ingredients",
    value: "100%",
    Icon: LuDroplet,
  },
  {
    label: "Premium Herbal Products",
    value: "50+",
    Icon: LuLeaf,
  },
  {
    label: "Quality Tested",
    value: "100%",
    Icon: LuShieldCheck,
  },
  {
    label: "Global Distribution",
    value: "20+",
    Icon: LuGlobe,
  },
];

const QualityBanner = () => {
  return (
    <section className="overflow-hidden bg-[#211B17] px-5 py-24 text-[#F4EDE2] sm:px-8 lg:py-32 xl:px-16">
      <div className="mx-auto max-w-[1600px]">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#A85F43]">
                01
              </span>
              <span className="h-px w-10 bg-[#C56B4E]" />

              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#D9B6A5]">
                Our quality promise
              </span>
            </div>

            <h2 className="max-w-5xl font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.075em]">
              Quality
              <br />
              <span className="font-normal text-[#C56B4E]">is built in.</span>
            </h2>
          </div>

          <p className="max-w-md pb-1 font-manrope text-sm leading-7 text-[#B7AAA0] md:text-base">
            From the moment an herb is sourced to the moment it reaches you,
            every stage is designed around purity, consistency and care.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="my-14 h-px bg-white/15 lg:my-20" />

        {/* Main content */}
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative min-h-[420px] overflow-hidden bg-[#332923] md:min-h-[560px]"
          >
            <img
              src="https://cosmesiglobal.com/cdn/shop/collections/Herbal_Powders.png?v=1766742666"
              alt="Premium herbal powders"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-[#211B17]/15" />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#211B17]/80 via-[#211B17]/20 to-transparent p-7 md:p-10">
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-white/60">
                    7ALP / Standards
                  </p>

                  <p className="mt-2 max-w-xs font-manrope text-sm leading-6 text-white/90">
                    Nothing unnecessary. Nothing overlooked.
                  </p>
                </div>

                <span className="font-ibm-mono text-[9px] text-white/50">
                  01
                </span>
              </div>
            </div>
          </motion.div>

          {/* Principles */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="max-w-lg font-manrope text-lg leading-8 text-[#D8CCC0] md:text-xl">
                We don't treat quality as the final checkpoint. It is part of
                every decision we make along the way.
              </p>
            </div>

            <div className="mt-12 border-t border-white/15">
              {stats.map(({ label, value, Icon }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  className="grid grid-cols-[45px_1fr_auto] items-center gap-5 border-b border-white/15 py-6"
                >
                  <Icon
                    size={19}
                    strokeWidth={1.3}
                    className="text-[#C56B4E]"
                  />

                  <span className="font-manrope text-sm text-[#B7AAA0]">
                    {label}
                  </span>

                  <span className="font-manrope text-2xl font-medium tracking-[-0.04em] text-[#F4EDE2]">
                    {value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityBanner;
