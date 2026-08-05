import { motion } from "framer-motion";

// Every tier CTA leads to the same place — the Contact form further down
// this page, which is the only lead-capture point on this marketing page.
const scrollToContact = () => {
  document.getElementById("b2b-contact")?.scrollIntoView({ behavior: "smooth" });
};

const tiers = [
  {
    tier: "Tier 01 — Stockist",
    margin: "45%",
    description: "For boutiques and studios testing the line.",
    orderValue: "₹25,000 – ₹74,999",
    features: [
      "Base wholesale pricing",
      "Mix & match any products",
      "Free shelf cards & testers",
    ],
    cta: "Start an order",
    highlighted: false,
  },
  {
    tier: "Tier 02 — Stockist",
    margin: "50%",
    description: "For established retailers with steady turnover.",
    orderValue: "₹75,000 – ₹1,49,999",
    features: [
      "Extra 5% off base wholesale",
      "Priority dispatch & allocation",
      "30-day credit on approval",
    ],
    cta: "Start an order",
    highlighted: true,
  },
  {
    tier: "Tier 03 — Distributor",
    margin: "45%",
    description: "For distributors, chains and exporters.",
    orderValue: "₹1,50,000+",
    features: [
      "Base wholesale pricing",
      "Mix & match any products",
      "Free shelf cards & testers",
    ],
    cta: "Talk to us",
    highlighted: false,
  },
];

const WholesaleTiers = () => {
  return (
    <section className="px-6 pb-16 xl:px-0">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="max-w-2xl space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#047B22]" />
            <p className="font-ibm-mono text-[14px] font-semibold text-[#047B22] sm:text-[16px] md:text-[18px]">
              Wholesale tiers
            </p>
          </div>

          <h2 className="text-[26px] font-semibold leading-tight text-black sm:text-[32px] md:text-[40px] xl:text-[44px]">
            The more you stock,{" "}
            <span className="text-[#047B22]">the deeper the margin.</span>
          </h2>

          <p className="text-[14px] leading-6 text-gray-600 sm:text-[15px] sm:leading-7 md:text-[18px]">
            Your tier is applied automatically based on order value. No
            haggling, no hidden rules — just clear slabs.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.tier + i}
              className={`flex flex-col rounded-2xl border p-6 sm:p-7 ${
                t.highlighted
                  ? "border-transparent bg-gradient-to-br from-[#015A17] to-[#106E28] text-white"
                  : "border-gray-200 bg-white text-black"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <p
                className={`font-ibm-mono text-sm font-semibold ${
                  t.highlighted ? "text-[#8FD19E]" : "text-[#047B22]"
                }`}
              >
                {t.tier}
              </p>

              <p className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-bold sm:text-5xl">
                  {t.margin}
                </span>
                <span
                  className={`text-base ${
                    t.highlighted ? "text-white/70" : "text-gray-500"
                  }`}
                >
                  margin
                </span>
              </p>

              <p
                className={`mt-3 text-sm sm:text-[15px] ${
                  t.highlighted ? "text-white/80" : "text-gray-600"
                }`}
              >
                {t.description}
              </p>

              <p
                className={`mt-4 text-sm font-medium sm:text-[15px] ${
                  t.highlighted ? "text-[#F2B544]" : "text-[#C9821E]"
                }`}
              >
                Order value · {t.orderValue}
              </p>

              <ul className="mt-5 space-y-3">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-2 text-sm sm:text-[15px] ${
                      t.highlighted ? "text-white/90" : "text-gray-700"
                    }`}
                  >
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                        t.highlighted ? "bg-white/60" : "bg-gray-400"
                      }`}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToContact}
                className={`mt-7 w-full rounded-full py-3 text-sm font-semibold transition sm:text-base ${
                  t.highlighted
                    ? "bg-[#C9821E] text-white hover:bg-[#b3741a]"
                    : "bg-gray-100 text-[#C9821E] hover:bg-gray-200"
                }`}
              >
                {t.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WholesaleTiers;
