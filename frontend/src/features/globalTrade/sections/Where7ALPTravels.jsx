import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

const Where7ALPTravels = () => {
  return (
    <section className="overflow-hidden bg-[#211B17] px-5 py-24 text-[#F4EDE2] sm:px-8 lg:py-32 xl:px-16">
      <div className="mx-auto max-w-[1500px]">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid gap-10 lg:grid-cols-[1fr_0.4fr] lg:items-end"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#A85F43]">
                02
              </span>
              <span className="h-px w-10 bg-[#C56B4E]" />

              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
                Where we travel
              </span>
            </div>

            <h2 className="max-w-5xl font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.075em]">
              One origin.
              <br />
              <span className="font-normal text-[#C56B4E]">
                Many destinations.
              </span>
            </h2>
          </div>

          <p className="max-w-md font-manrope text-sm leading-7 text-[#AFA39A] md:text-base">
            From our base in Hyderabad, our supply network connects Indian
            herbal ingredients with businesses and markets beyond our borders.
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mt-14 overflow-hidden border border-white/10 lg:mt-20"
        >
          <div className="relative h-[280px] sm:h-[380px] md:h-[500px] lg:h-[650px]">
            <img
              src="https://focus.nm-img.net/uploads/sites/5/2025/02/Understanding-What-Is-Trade-Protectionism-in-Economy.webp?aspect_ratio=2560%3A440+2560w&height=440&width=2560"
              alt="Cargo ship and container port representing global trade"
              className="h-full w-full object-cover object-center"
            />

            {/* Image treatment */}
            <div className="absolute inset-0 bg-[#211B17]/20" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#211B17]/80 via-transparent to-transparent" />

            {/* Hyderabad origin marker */}
            <div className="absolute left-[52%] top-[61%] hidden md:block">
              <div className="relative">
                <span className="absolute -inset-3 animate-ping rounded-full bg-[#C56B4E]/30" />

                <span className="relative flex h-3 w-3 rounded-full bg-[#C56B4E]" />
              </div>

              <div className="absolute left-5 top-[-8px] whitespace-nowrap">
                <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-white/80">
                  Hyderabad / Origin
                </span>
              </div>
            </div>

            {/* Bottom information */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-9">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin
                      size={14}
                      strokeWidth={1.4}
                      className="text-[#C56B4E]"
                    />

                    <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-white/60">
                      Origin point
                    </span>
                  </div>

                  <p className="mt-2 font-manrope text-xl font-medium text-white md:text-2xl">
                    Hyderabad, India
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-white/50">
                    Source / Route / Destination
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center border border-white/25 text-white">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom metrics */}
        <div className="grid border-b border-white/10 sm:grid-cols-3">
          <div className="border-b border-white/10 py-7 sm:border-b-0 sm:border-r sm:px-8 sm:py-9 sm:pl-0">
            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.22em] text-[#91847A]">
              Origin
            </span>

            <p className="mt-3 font-manrope text-lg text-[#F4EDE2]">India</p>
          </div>

          <div className="border-b border-white/10 py-7 sm:border-b-0 sm:border-r sm:px-8 sm:py-9">
            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.22em] text-[#91847A]">
              Base
            </span>

            <p className="mt-3 font-manrope text-lg text-[#F4EDE2]">
              Hyderabad
            </p>
          </div>

          <div className="py-7 sm:px-8 sm:py-9 sm:pr-0">
            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.22em] text-[#91847A]">
              Reach
            </span>

            <p className="mt-3 font-manrope text-lg text-[#F4EDE2]">
              Global markets
            </p>
          </div>
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-14"
        >
          <p className="max-w-4xl font-manrope text-2xl font-medium leading-tight tracking-[-0.04em] md:text-3xl">
            Wherever the destination,
            <br />
            <span className="font-normal text-[#91847A]">
              the standard starts at the source.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Where7ALPTravels;
