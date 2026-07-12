import { motion } from "framer-motion";
import {
  MessageCircle,
  Sprout,
  FlaskConical,
  MapPin,
  DollarSign,
} from "lucide-react";

const WhyChooseUs = () => {
  return (
    <section className="px-6 py-16 sm:px-6 md:py-20 xl:px-0">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-xl space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#B9714A]" />
            <p className="font-ibm-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-[#B9714A] sm:text-sm">
              Six reasons it&apos;s different
            </p>
          </div>

          <h2 className="font-semibold text-[26px] leading-tight text-[#3F4A2E] sm:text-[30px] md:text-[38px] xl:text-[42px]">
            What you&apos;re really paying for
          </h2>

          <p className="text-[14px] leading-6 text-[#6B7259] sm:text-[15px] sm:leading-7 md:text-[17px]">
            Not a logo, not a label — a way of making powder that most brands
            quietly cut corners on.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3 md:items-stretch">
          {/* Card 1 */}
          <div className="flex min-h-[220px] flex-col justify-between rounded-xl bg-gradient-to-br from-[#4A5A34] to-[#1F2A1A] p-5 text-[#FAF6EF] sm:min-h-[260px] sm:p-6 md:min-h-[280px]">
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-[#FAF6EF]/15 sm:h-10 sm:w-10">
              <MessageCircle className="h-4 w-4 text-[#EFE6D8] sm:h-5 sm:w-5" />
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg font-medium leading-snug sm:text-xl md:text-[22px]">
                One herb, one origin — ground by our own hands
              </h3>
              <p className="text-sm text-[#EFE6D8]/85">
                We buy whole herbs from named farms and mill them ourselves in
                small batches. Most brands buy powder pre-ground from anyone,
                anywhere.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex min-h-[220px] flex-col justify-between rounded-xl bg-[#EFE6D8] p-5 sm:min-h-[260px] sm:p-6 md:min-h-[280px]">
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-white sm:h-10 sm:w-10">
              <Sprout className="h-4 w-4 text-[#B9714A] sm:h-5 sm:w-5" />
            </div>
            <div className="space-y-2 text-[#3F4A2E]">
              <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl">
                2.5+
              </h3>
              <p className="text-base font-semibold sm:text-lg md:text-[22px]">
                We have this much years of experience.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex min-h-[220px] flex-col justify-between rounded-xl border border-[#E3D9C7] bg-white p-5 sm:min-h-[260px] sm:p-6 md:min-h-[280px]">
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-[#FAF6EF] sm:h-10 sm:w-10">
              <FlaskConical className="h-4 w-4 text-[#6B7259] sm:h-5 sm:w-5" />
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl text-[#3F4A2E] sm:text-2xl md:text-[32px]">
                Tested, not trusted
              </h3>
              <p className="text-sm text-[#6B7259] sm:text-base md:text-[22px]">
                Every batch is screened and cleared before it ships.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 sm:gap-5 md:grid-cols-2 md:items-stretch">
          {/* Card 4 */}
          <div className="flex min-h-[220px] flex-col justify-between rounded-xl border border-[#E3D9C7] bg-[#FAF6EF] p-5 sm:min-h-[260px] sm:p-6 md:min-h-[280px]">
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-white sm:h-10 sm:w-10">
              <MapPin className="h-4 w-4 text-[#6B7259] sm:h-5 sm:w-5" />
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl text-[#3F4A2E] sm:text-2xl md:text-[32px]">
                Traceable to the field it grew in
              </h3>
              <p className="text-sm text-[#6B7259] sm:text-base md:text-[22px]">
                A lot code on every pack lets you follow the powder back to its
                harvest, drying record and test results. Provenance you can
                verify.
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="flex min-h-[220px] flex-col justify-between rounded-xl bg-gradient-to-br from-[#B9714A] to-[#8A5236] p-5 text-[#FAF6EF] sm:min-h-[260px] sm:p-6 md:min-h-[280px]">
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-[#FAF6EF]/15 sm:h-10 sm:w-10">
              <DollarSign className="h-4 w-4 text-[#FAF6EF] sm:h-5 sm:w-5" />
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl md:text-[32px]">
                Honest pricing, no padding
              </h3>
              <p className="text-sm text-[#FAF6EF]/85 sm:text-base md:text-[22px]">
                Because there are no fillers bulking up the weight, you pay for
                active herb — not maltodextrin sold by the gram.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
