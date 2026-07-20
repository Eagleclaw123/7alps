import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { SevenAlpsFAQs } from "../data/faqs";

const FAQs = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // ✅ Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="text-black px-6 xl:px-0 my-16">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 xl:grid-cols-10 gap-10 xl:gap-16 items-start">
          {/* LEFT CONTENT */}
          <motion.div variants={fadeUp} className="xl:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 items-center gap-10">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#047B22]" />
                  <p className="font-ibm-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-[#047B22] sm:text-sm">
                    Common Questions
                  </p>
                </div>

                <h2 className="mb-4 text-2xl leading-tight sm:text-3xl lg:text-[40px] font-semibold">
                  Frequently Asked <br />
                  <span className="font-manrope text-[#008521] font-normal">
                    Questions
                  </span>
                </h2>

                <p className="text-sm text-gray-600 sm:text-base">
                  Here are some of the most common questions we receive. If you
                  have any other questions, feel free to reach out to us!
                </p>
              </div>
              <div>
                <img
                  src="https://res.cloudinary.com/dasvdkncm/image/upload/v1782719890/2211.i203.039.F.m004.c9.sandalwood_realistic_perfumes_aromatherapy_AD-removebg-preview_rnnapk.png"
                  alt="Product"
                  className=" xl:w-100 object-contain"
                />
              </div>
            </div>
          </motion.div>

          {/* FAQ LIST */}
          <motion.div variants={container} className="xl:col-span-6 space-y-4">
            {SevenAlpsFAQs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <motion.div
                  key={faq.id}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  className="rounded-xl border border-gray-200 p-5 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="flex w-full items-start justify-between gap-4 text-left"
                  >
                    <h3 className="max-w-[90%] text-base font-semibold leading-snug sm:text-lg">
                      {faq.question}
                    </h3>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "bg-[#008521] text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {isOpen ? (
                        <AiOutlineMinus size={14} />
                      ) : (
                        <AiOutlinePlus size={14} />
                      )}
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        {Array.isArray(faq.answer) ? (
                          <ul className="mt-3 list-disc space-y-2 border-t border-gray-200 pt-3 pl-5 text-sm text-gray-600 sm:text-base">
                            {faq.answer.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-3 border-t border-gray-200 pt-3 text-sm text-gray-600 sm:text-base">
                            {faq.answer}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default FAQs;
