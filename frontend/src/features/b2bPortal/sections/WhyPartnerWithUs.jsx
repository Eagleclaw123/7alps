import { motion } from "framer-motion";
import { Percent, LineChart, CircleCheck } from "lucide-react";
import SectionHeading from "../../home/components/SectionHeading";

const features = [
  {
    icon: Percent,
    title: "Honest margins",
    description:
      "Wholesale priced for real shelf economics — keep 45–55% on every unit, with deeper tiers as volume grows.",
  },
  {
    icon: LineChart,
    title: "Low minimums",
    description:
      "Start with a ₹25,000 first order — no need to commit to a pallet before you know what moves.",
  },
  {
    icon: CircleCheck,
    title: "Traceable provenance",
    description:
      "Every case carries lot codes and named-source herbs — the trust signal that turns browsers into repeat buyers.",
  },
];

const WhyPartnerWithUs = () => {
  return (
    <section className="py-16 px-6 xl:px-0">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeading
            eyebrow="Why partner with 7ALP"
            title={
              <>
                A line that sells itself, and a{" "}
                <span className="font-manrope text-[#008521] font-normal">
                  partner
                </span>{" "}
                that shows up.
              </>
            }
            description="You're not just buying stock — you're buying a story your customers can verify, with the trade terms to make it worth your shelf space."
          />
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 md:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="rounded-xl border border-gray-200 bg-white p-6 sm:p-7"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-gray-200">
                  <Icon className="h-5 w-5 text-gray-500" />
                </div>

                <h3 className="text-xl font-semibold text-black sm:text-2xl">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-[15px]">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyPartnerWithUs;
