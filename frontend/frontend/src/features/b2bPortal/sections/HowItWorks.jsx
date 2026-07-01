import { motion } from "framer-motion";
import { ClipboardList, FileText, Mail, Truck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Apply",
    description:
      "Send your business details and GST number. Approvals usually within 2 working days.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Build & quote",
    description:
      "Use the order builder, request a quote, and we confirm pricing and stock.",
  },
  {
    number: "03",
    icon: Mail,
    title: "Pay or net-30",
    description:
      "Pay on invoice, or use 30-day credit once your account is established.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Dispatch",
    description:
      "Packed and shipped in 3–6 days, pan-India, with tracking and lot documents.",
  },
];

const HowItWorks = () => {
  return (
    <section className="px-6 py-16 xl:px-0">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#047B22]" />
            <p className="font-ibm-mono text-[14px] font-semibold text-[#047B22] sm:text-[16px] md:text-[18px]">
              How it works
            </p>
          </div>

          <h2 className="text-[26px] font-semibold leading-tight text-black sm:text-[32px] md:text-[40px] xl:text-[44px]">
            From application to shelf in a week.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mt-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <p className="font-ibm-mono text-sm font-semibold text-[#047B22] sm:text-lg">
                  Step {step.number}
                </p>

                <div className="mt-4 flex h-20 w-20 items-center justify-center rounded-xl border border-gray-200 bg-white">
                  <Icon className="h-6 w-6 text-gray-400" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-black sm:text-2xl">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-[16px]">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
