import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { SevenAlpsFAQs } from "../data/faqs";

const FAQs = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-[#F7F2EB] px-5 py-24 text-[#211B17] sm:px-8 md:py-32 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-[1500px]">
        {/* ================= HEADER ================= */}
        <div className="grid gap-10 border-b border-[#D8CDC2] pb-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#A85F43]">
                07
              </span>
              <span className="h-px w-12 bg-[#C56B4E]" />
              <span className="font-ibm-mono text-[10px] uppercase tracking-[0.28em] text-[#7A6F68]">
                Frequently asked
              </span>
            </div>

            <h2 className="mt-6 max-w-2xl font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.07em]">
              Questions,
              <br />
              <span className="text-[#C56B4E]">answered.</span>
            </h2>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <p className="max-w-md font-manrope text-sm leading-7 text-[#746A63] md:text-base">
              Everything you need to know about our herbal ingredients,
              products, sourcing, quality, and ordering.
            </p>

            <span className="hidden font-ibm-mono text-[9px] uppercase tracking-[0.2em] text-[#9A8F87] lg:block">
              06 / FAQ
            </span>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="grid gap-14 pt-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          {/* ================= LEFT IMAGE ================= */}
          <div className="hidden lg:block">
            <div className="relative overflow-hidden bg-[#DED0C1]">
              <img
                src="https://cosmesiglobal.com/cdn/shop/collections/Herbal_Powders.png?v=1766742666&width=1500"
                alt="7ALP herbal powders"
                className="h-[520px] w-full object-cover"
              />

              {/* Image caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#F4EDE2]/90 px-5 py-4 backdrop-blur-sm">
                <div className="flex items-center justify-between border-t border-[#211B17]/15 pt-4">
                  <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#6E625A]">
                    7ALP's
                  </span>

                  <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#6E625A]">
                    Herbal powders
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-6 max-w-xs font-manrope text-sm leading-6 text-[#8A7E76]">
              Natural ingredients, carefully selected for quality and everyday
              wellness.
            </p>
          </div>

          {/* ================= RIGHT FAQ ================= */}
          <div>
            {SevenAlpsFAQs.map((faq, index) => {
              const isOpen = openId === faq.id;

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.05,
                  }}
                  className="border-b border-[#D8CDC2]"
                >
                  {/* QUESTION */}
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    className="group flex w-full items-center justify-between gap-6 py-7 text-left md:py-9"
                  >
                    <div className="flex min-w-0 items-start gap-5 md:gap-8">
                      <span className="pt-1 font-ibm-mono text-[9px] tracking-[0.18em] text-[#C56B4E]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3
                        className={`font-manrope text-[18px] font-medium leading-snug tracking-[-0.02em] transition-colors duration-300 md:text-[22px] ${
                          isOpen
                            ? "text-[#C56B4E]"
                            : "text-[#211B17] group-hover:text-[#C56B4E]"
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    {/* PLUS ICON */}
                    <motion.span
                      animate={{
                        rotate: isOpen ? 45 : 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "border-[#C56B4E] bg-[#C56B4E] text-white"
                          : "border-[#CFC2B7] text-[#211B17] group-hover:border-[#C56B4E]"
                      }`}
                    >
                      <AiOutlinePlus size={16} />
                    </motion.span>
                  </button>

                  {/* ANSWER */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pl-[37px] pr-12 md:pl-[61px] md:pr-16">
                          {Array.isArray(faq.answer) ? (
                            <ul className="space-y-3 font-manrope text-sm leading-7 text-[#746A63] md:text-base">
                              {faq.answer.map((item, itemIndex) => (
                                <li key={itemIndex} className="relative pl-5">
                                  <span className="absolute left-0 top-[13px] h-1 w-1 rounded-full bg-[#C56B4E]" />

                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="font-manrope text-sm leading-7 text-[#746A63] md:text-base">
                              {faq.answer}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="mt-16 flex flex-col gap-3 border-t border-[#D8CDC2] pt-6 md:flex-row md:items-center md:justify-between">
          <span className="font-ibm-mono text-[9px] uppercase tracking-[0.22em] text-[#9A8F87]">
            Natural ingredients / Honest answers
          </span>

          <span className="font-manrope text-sm text-[#8A7E76]">
            We're here to help.
          </span>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
