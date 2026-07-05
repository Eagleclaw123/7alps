import { motion } from "framer-motion";
import { Globe, Users, ArrowLeftRight, Network } from "lucide-react";

const cards = [
  {
    number: "1/04",
    icon: Globe,
    title: "Global Trade Overview",
    description: "Every batch is screened and cleared before it ships.",
  },
  {
    number: "2/04",
    icon: Users,
    title: "Global Presence",
    description: "Expanding our reach through trusted global partnerships.",
  },
  {
    number: "3/04",
    icon: ArrowLeftRight,
    title: "Import Export Capabilities",
    description: "Reliable trade solutions built for international growth.",
  },
  {
    number: "4/04",
    icon: Network,
    title: "Supply Chain Network",
    description: "A seamless journey from farms to global markets.",
  },
];

const GlobalTrade = () => {
  return (
    <section className="px-6 py-16 xl:px-0">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          className="max-w-3xl space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#047B22]" />
            <p className="font-ibm-mono text-[14px] font-semibold text-[#047B22] sm:text-[16px] md:text-[18px]">
              Global trade, in brief
            </p>
          </div>

          <h2 className="text-[24px] font-semibold leading-tight text-black sm:text-[30px] md:text-[38px] xl:text-[42px]">
            We partner with businesses worldwide to meet the rising demand for
            natural and sustainable wellness solutions.
          </h2>
        </motion.div>

        {/* Grid: cards left, image right */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 lg:grid-cols-2">
          {/* 2x2 card grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.number}
                  className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 sm:p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div>
                    <p className="font-ibm-mono text-sm font-semibold text-[#047B22]">
                      {card.number}
                    </p>
                  </div>

                  <div className="mt-6 space-y-2">
                    <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
                      <Icon className="h-5 w-5 text-gray-400" />
                    </div>
                    <h3 className="text-base font-semibold text-black sm:text-lg">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-5 text-gray-600">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Image with caption */}
          <motion.div
            className="relative overflow-hidden rounded-xl"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://res.cloudinary.com/dasvdkncm/image/upload/v1782920532/47be7db1bd588a9bd7faf781909a3951db09aeb0_xibjbg.png"
              alt="Global trade logistics"
              className="h-full min-h-[420px] w-full object-cover lg:min-h-[420px]"
            />

            {/* Caption overlay */}
            <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/90 p-4 backdrop-blur-sm sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
              <p className="text-base font-semibold leading-snug text-black sm:text-lg">
                We've built 7ALP for borders from day one — single-origin
                sourcing, lab-tested batches.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GlobalTrade;
