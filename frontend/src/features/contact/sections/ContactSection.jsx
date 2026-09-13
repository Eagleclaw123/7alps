import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import ContactForm from "../components/ContactForm";
import PageHero from "../../../shared/components/ui/PageHero";

const ContactSection = () => {
  return (
    <section className="overflow-hidden bg-[#F4EDE2] text-[#211B17]">
      {/* Hero */}
      <PageHero
        eyebrow="Let's connect"
        title="We're"
        titleHighlight="here to help."
        description="Questions about our products, orders, or partnerships? We'd love to hear from you."
        backgroundImage="https://res.cloudinary.com/dasvdkncm/image/upload/v1784788176/ChatGPT_Image_Jul_23_2026_11_57_14_AM_gbwvsk.png"
        imageAlt="Contact 7ALP"
        leftLabel="7ALP's / Contact"
        rightLabel="Talk / Connect"
      />
      {/* Contact area */}
      <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 md:py-28 xl:px-16">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="mb-8 flex items-center gap-3">
              <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#A85F43]">
                01
              </span>
              <span className="h-px w-8 bg-[#C56B4E]" />

              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
                Contact details
              </span>
            </div>

            <h2 className="max-w-xl font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.07em]">
              Good conversations
              <br />
              <span className="font-normal text-[#91847A]">start here.</span>
            </h2>

            <p className="mt-7 max-w-md font-manrope text-sm leading-7 text-[#756A62] md:text-base">
              Whether you&apos;re looking for product information, need help
              with an order, or want to explore a business opportunity, send us
              a message.
            </p>

            {/* Contact details */}
            <div className="mt-12 border-t border-[#D8CCC0]">
              <a
                href="mailto:7alps.global@gmail.com"
                className="group flex items-center justify-between border-b border-[#D8CCC0] py-6"
              >
                <div className="flex items-center gap-4">
                  <Mail
                    size={18}
                    strokeWidth={1.4}
                    className="text-[#C56B4E]"
                  />

                  <div>
                    <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#91847A]">
                      Email
                    </span>

                    <p className="mt-1 font-manrope text-sm text-[#211B17]">
                      7alps.global@gmail.com
                    </p>
                  </div>
                </div>

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

              <a
                href="tel:+917207003679"
                className="group flex items-center justify-between border-b border-[#D8CCC0] py-6"
              >
                <div className="flex items-center gap-4">
                  <Phone
                    size={18}
                    strokeWidth={1.4}
                    className="text-[#C56B4E]"
                  />

                  <div>
                    <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#91847A]">
                      Phone
                    </span>

                    <p className="mt-1 font-manrope text-sm text-[#211B17]">
                      +91 72070 03679
                    </p>
                  </div>
                </div>

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

              <div className="flex items-center justify-between py-6">
                <div className="flex items-center gap-4">
                  <MapPin
                    size={18}
                    strokeWidth={1.4}
                    className="text-[#C56B4E]"
                  />

                  <div>
                    <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#91847A]">
                      Location
                    </span>

                    <p className="mt-1 font-manrope text-sm text-[#211B17]">
                      Hyderabad, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Existing form — logic untouched */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
