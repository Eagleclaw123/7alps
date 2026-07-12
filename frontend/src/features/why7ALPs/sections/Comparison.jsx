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
    <section className="relative mt-5 bg-[url('https://res.cloudinary.com/dasvdkncm/image/upload/v1782808666/f910f2fa731e472213b10164fc8561d3a17cb4c0_cszg6g.png')] bg-cover bg-center bg-no-repeat px-6 py-20 xl:px-0">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F2A1A]/85 via-[#1F2A1A]/75 to-[#1F2A1A]/85" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-xl space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#C98E63]" />
            <p className="font-ibm-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-[#C98E63] sm:text-sm">
              An honest comparison
            </p>
          </div>

          <h2 className="font-semibold text-[24px] leading-tight text-[#FAF6EF] sm:text-[28px] md:text-[36px] xl:text-[40px]">
            7ALP vs the average powder on the shelf
          </h2>

          <p className="text-[14px] leading-6 text-[#EFE6D8]/80 sm:text-[15px] sm:leading-7 md:text-[18px]">
            Same category, very different practices. Here&apos;s where the gap
            actually is.
          </p>
        </motion.div>

        <div className="mt-10 overflow-hidden rounded-xl border border-[#EFE6D8]/15 sm:mt-12">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr className="bg-[#1F2A1A]">
                  <th className="px-4 py-6 font-ibm-mono text-xs font-semibold uppercase tracking-wider text-[#EFE6D8]/70 sm:px-6 sm:text-sm">
                    What to check
                  </th>
                  <th className="px-4 py-6 font-ibm-mono text-xs font-semibold uppercase tracking-wider text-[#EFE6D8] sm:px-6 sm:text-sm">
                    We 7ALP
                  </th>
                  <th className="px-4 py-6 font-ibm-mono text-xs font-semibold uppercase tracking-wider text-[#EFE6D8]/70 sm:px-6 sm:text-sm">
                    Conventional powders
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-[#FAF6EF]" : "bg-white"}
                  >
                    <td className="px-4 py-7 text-sm font-medium text-[#3F4A2E] sm:px-6 sm:text-[15px]">
                      {row.label}
                    </td>
                    <td className="bg-[#EFE6D8]/60 px-4 py-7 text-sm text-[#3F4A2E] sm:px-6 sm:text-[15px]">
                      <div className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#5B7A3A]" />
                        <span>{row.us}</span>
                      </div>
                    </td>
                    <td className="px-4 py-7 text-sm text-[#6B7259] sm:px-6 sm:text-[15px]">
                      <div className="flex items-start gap-2">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-[#B9714A]" />
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
