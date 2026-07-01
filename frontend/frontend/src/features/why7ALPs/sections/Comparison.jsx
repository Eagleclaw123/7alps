import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  {
    label: "Sourcing",
    us: "Single-origin, named farms",
    them: "Mixed lots, origin unknown",
  },
  {
    label: "Grinding",
    us: "Stone-ground in-house, small batches",
    them: "Bought pre-ground in bulk",
  },
  {
    label: "Fillers & additives",
    us: "None — single ingredient",
    them: "Maltodextrin, anti-caking agents",
  },
  {
    label: "Drying",
    us: "Shade-dried below 40°C",
    them: "High-heat dried for speed",
  },
  {
    label: "Fineness",
    us: "Sieved to a fine 80-mesh",
    them: "Coarse, inconsistent texture",
  },
  {
    label: "Testing",
    us: "Every batch, COA on file",
    them: "Rarely, if ever",
  },
];

const Comparison = () => {
  return (
    <section className="relative py-16 px-6 mt-5 xl:px-0 bg-[url('https://res.cloudinary.com/dasvdkncm/image/upload/v1782808666/f910f2fa731e472213b10164fc8561d3a17cb4c0_cszg6g.png')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative  max-w-7xl mx-auto">
        <motion.div
          className="max-w-xl space-y-4 mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 text-white">
            <div className="h-2 w-2 rounded-full bg-white" />
            <p className="text-[14px] sm:text-[16px] md:text-[18px] font-ibm-mono font-semibold text-white">
              An honest comparison
            </p>
          </div>

          <h2 className="text-[24px] sm:text-[28px] md:text-[36px] xl:text-[40px] leading-tight font-semibold text-white">
            7ALP vs the average powder on the shelf
          </h2>

          <p className="text-[14px] leading-6 sm:leading-7  sm:text-[15px] md:text-[18px] xl:text-[20px] text-white">
            Same category, very different practices. Here's where the gap
            actually is.
          </p>
        </motion.div>
        <div className="mt-8 overflow-hidden rounded-xl sm:mt-10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr className="bg-[#0E2C16]">
                  <th className="px-4 py-6 text-sm font-semibold text-white sm:px-6 sm:text-base">
                    What to check
                  </th>
                  <th className="px-4 py-6 text-sm font-semibold text-white sm:px-6 sm:text-base">
                    We 7ALP
                  </th>
                  <th className="px-4 py-6 text-sm font-semibold text-white sm:px-6 sm:text-base">
                    Conventional powders
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-[#EFF3EC]" : "bg-white"}
                  >
                    <td className="px-4 py-8 text-sm font-medium text-black sm:px-6 sm:text-[15px]">
                      {row.label}
                    </td>
                    <td className="px-4 py-8 text-sm text-gray-800 sm:px-6 sm:text-[15px] bg-[#8DA782]/20">
                      <div className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2E9E44]" />
                        <span>{row.us}</span>
                      </div>
                    </td>
                    <td className="px-4 py-8 text-sm text-gray-800 sm:px-6 sm:text-[15px]">
                      <div className="flex items-start gap-2">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-[#D03B3B]" />
                        <span>{row.them}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
