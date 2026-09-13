import { motion } from "framer-motion";
import {
  MessageCircle,
  Sprout,
  FlaskConical,
  MapPin,
  DollarSign,
} from "lucide-react";

const reasons = [
  {
    icon: MessageCircle,
    title: "One herb. One origin.",
    description:
      "We buy whole herbs from named farms and mill them ourselves in small batches.",
  },
  {
    icon: Sprout,
    title: "Experience that matters.",
    description:
      "More than 2.5 years of focused experience building premium herbal products.",
  },
  {
    icon: FlaskConical,
    title: "Tested, not assumed.",
    description: "Every batch is screened and cleared before it ships.",
  },
  {
    icon: MapPin,
    title: "Traceable to the field.",
    description:
      "A lot code on every pack helps connect the powder back to its harvest and quality records.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#F4EDE2] px-5 py-24 text-[#211B17] sm:px-8 lg:py-32 xl:px-16">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid gap-8 border-b border-[#D8CCC0] pb-12 lg:grid-cols-[1fr_0.45fr] lg:items-end"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#A85F43]">
                01
              </span>
              <span className="h-px w-10 bg-[#C56B4E]" />

              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
                Six reasons it&apos;s different
              </span>
            </div>

            <h2 className="max-w-5xl font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.075em]">
              What you&apos;re
              <br />
              <span className="font-normal text-[#C56B4E]">
                really paying for.
              </span>
            </h2>
          </div>

          <p className="max-w-md font-manrope text-sm leading-7 text-[#756A62] md:text-base">
            Not a logo. Not a louder label. The difference lives in the
            decisions most brands never show you.
          </p>
        </motion.div>

        {/* Main visual composition */}
        <div className="grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-20">
          {/* Statement */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col justify-between"
          >
            <div>
              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.25em] text-[#91847A]">
                The difference is upstream
              </span>

              <h3 className="mt-7 max-w-xl font-manrope text-[clamp(2.4rem,4vw,4.5rem)] font-medium leading-[0.92] tracking-[-0.065em]">
                Better powder
                <br />
                starts with
                <br />
                <span className="font-normal text-[#C56B4E]">
                  better decisions.
                </span>
              </h3>

              <p className="mt-7 max-w-lg font-manrope text-sm leading-7 text-[#756A62] md:text-base">
                We control more of the journey instead of buying a finished
                powder and putting our label on it. That means closer attention
                to sourcing, processing, testing and traceability.
              </p>
            </div>

            {/* Small fact */}
            <div className="mt-12 border-l border-[#C56B4E] pl-5 lg:mt-20">
              <span className="font-ibm-mono text-[8px] uppercase tracking-[0.22em] text-[#91847A]">
                Our approach
              </span>

              <p className="mt-2 max-w-sm font-manrope text-sm font-medium leading-6 text-[#211B17]">
                Less distance between the ingredient and the people responsible
                for it.
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative min-h-[480px] overflow-hidden bg-[#EAE0D4] md:min-h-[620px]"
          >
            <img
              src="https://cosmesiglobal.com/cdn/shop/collections/Herbal_Powders.png?v=1766742666"
              alt="Premium herbal powders"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 hover:scale-[1.025]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#211B17]/65 via-transparent to-transparent" />

            {/* Image caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-white/60">
                    7ALP&apos;s / Ingredient first
                  </span>

                  <p className="mt-2 max-w-sm font-manrope text-sm leading-6 text-white/90">
                    The product starts long before it reaches the shelf.
                  </p>
                </div>

                <span className="font-ibm-mono text-[9px] text-white/60">
                  01
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reasons */}
        <div className="border-t border-[#D8CCC0]">
          <div className="grid lg:grid-cols-4">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;

              return (
                <motion.article
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`group border-b border-[#D8CCC0] py-8 lg:border-b-0 lg:px-7 lg:py-10 ${
                    index !== 0 ? "lg:border-l lg:border-[#D8CCC0]" : "lg:pl-0"
                  }`}
                >
                  <div className="flex items-start justify-between gap-5">
                    <Icon
                      size={20}
                      strokeWidth={1.3}
                      className="text-[#C56B4E] transition-transform duration-300 group-hover:translate-x-1"
                    />

                    <span className="font-ibm-mono text-[8px] text-[#A79A90]">
                      0{index + 1}
                    </span>
                  </div>

                  <h4 className="mt-8 max-w-xs font-manrope text-xl font-medium leading-tight tracking-[-0.035em] text-[#211B17]">
                    {reason.title}
                  </h4>

                  <p className="mt-4 max-w-xs font-manrope text-sm leading-6 text-[#756A62]">
                    {reason.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 flex flex-col gap-5 border-t border-[#D8CCC0] pt-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-3xl font-manrope text-2xl font-medium leading-tight tracking-[-0.045em] md:text-3xl">
            We&apos;re not trying to make herbs
            <br className="hidden md:block" />
            <span className="font-normal text-[#756A62]">
              complicated.
            </span>{" "}
            We&apos;re trying to make them right.
          </p>

          <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
            Source / Process / Verify
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
