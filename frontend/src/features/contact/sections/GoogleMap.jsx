import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

const GoogleMap = () => {
  return (
    <section className="overflow-hidden bg-[#EAE0D4] px-5 py-20 sm:px-8 md:py-28 xl:px-16">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-10 lg:grid-cols-[0.45fr_1.55fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#A85F43]">
                07
              </span>
              <span className="h-px w-8 bg-[#C56B4E]" />

              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
                Find us
              </span>
            </div>

            <h2 className="font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.07em] text-[#211B17]">
              Let's
              <br />
              <span className="font-normal text-[#756A62]">Connect.</span>
            </h2>

            <div className="mt-8 flex items-start gap-3">
              <MapPin
                size={18}
                strokeWidth={1.4}
                className="mt-0.5 shrink-0 text-[#C56B4E]"
              />

              <div>
                <p className="font-manrope text-base font-medium text-[#211B17]">
                  Madhapur, Hyderabad, India.
                </p>

                <p className="mt-1 font-manrope text-sm leading-6 text-[#756A62]">
                  Our base for sourcing, formulation,
                  <br />
                  and global distribution.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative overflow-hidden border border-[#CFC2B5] bg-white"
          >
            <div className="h-[400px] sm:h-[500px] lg:h-[620px]">
              <iframe
                title="7ALP Location"
                src="https://www.google.com/maps?q=Hyderabad&output=embed"
                className="h-full w-full grayscale-[25%]"
                loading="lazy"
                allowFullScreen
              />
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between bg-[#211B17]/90 px-5 py-4 backdrop-blur-sm">
              <div>
                <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-white/50">
                  7ALP&apos;s / HQ
                </span>

                <p className="mt-1 font-manrope text-sm font-medium text-white">
                  Hyderabad, Telangana
                </p>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Madhapur%2C+Hyderabad"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white transition-colors hover:bg-[#C56B4E]"
                aria-label="Open location in Google Maps"
              >
                <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 border-t border-[#CFC2B5] pt-7">
          <p className="max-w-3xl font-manrope text-xl font-medium leading-tight tracking-[-0.04em] text-[#211B17] md:text-2xl">
            Rooted in Hyderabad.
            <br />
            <span className="font-normal text-[#756A62]">
              Connected to the world.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default GoogleMap;
