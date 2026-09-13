import { motion } from "framer-motion";
import testimonials from "../data/testimonials.json";

const Testimonials = () => {
  const featured = testimonials[0];
  const supporting = testimonials.slice(1, 5);

  return (
    <section className="overflow-hidden bg-[#F4EDE2] py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#A85F43]">
                06
              </span>
              <span className="h-px w-12 bg-[#C56B4E]" />
              <span className="font-ibm-mono text-[10px] uppercase tracking-[0.28em] text-[#7A6F68]">
                Customer stories
              </span>
            </div>

            <h2 className="max-w-3xl font-manrope text-[clamp(3rem,6vw,6.5rem)] font-medium leading-[0.88] tracking-[-0.07em] text-[#211B17]">
              Loved by people
              <br />
              who choose <span className="text-[#C56B4E]">better.</span>
            </h2>
          </div>

          <p className="max-w-sm font-manrope text-sm leading-7 text-[#756B64] md:text-base">
            Real experiences from customers who value natural ingredients,
            thoughtful sourcing, and uncompromising quality.
          </p>
        </div>

        {/* Featured testimonial */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden bg-[#211B17] p-8 text-[#F4EDE2] md:p-14 lg:p-20"
          >
            <span className="absolute right-8 top-2 font-manrope text-[160px] font-medium leading-none text-white/[0.035] md:right-16 md:text-[220px]">
              “
            </span>

            <div className="relative z-10 max-w-5xl">
              <div className="mb-10 flex gap-1 text-[#C56B4E]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>★</span>
                ))}
              </div>

              <blockquote className="font-manrope text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.05em]">
                “{featured.quote}”
              </blockquote>

              <div className="mt-12 flex items-center gap-4">
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="h-12 w-12 rounded-full object-cover grayscale"
                />

                <div>
                  <p className="font-manrope text-sm font-semibold">
                    {featured.name}
                  </p>
                  <p className="mt-1 font-ibm-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
                    {featured.role}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Supporting testimonials */}
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {supporting.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              className="group flex min-h-[270px] flex-col justify-between border border-[#D9CEC3] bg-[#EFE5D9] p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-[#E8DCCE]"
            >
              <div>
                <div className="mb-7 text-sm tracking-[0.18em] text-[#C56B4E]">
                  ★★★★★
                </div>

                <p className="font-manrope text-[16px] leading-7 tracking-[-0.01em] text-[#332A25]">
                  “{item.quote}”
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-9 w-9 rounded-full object-cover grayscale"
                />

                <div>
                  <p className="font-manrope text-xs font-semibold text-[#211B17]">
                    {item.name}
                  </p>
                  <p className="mt-0.5 font-ibm-mono text-[8px] uppercase tracking-[0.15em] text-[#887C73]">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom statement */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-[#D5C9BE] pt-6 md:flex-row">
          <span className="font-ibm-mono text-[9px] uppercase tracking-[0.22em] text-[#8A7E75]">
            Natural ingredients / Honest experiences
          </span>

          <span className="font-manrope text-sm text-[#8A7E75]">
            The 7ALP experience.
          </span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
