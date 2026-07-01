import SectionHeading from "../../home/components/SectionHeading";
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
    <section className="my-12 px-4 sm:px-6 xl:px-0">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="max-w-xl space-y-4 mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#047B22]" />
            <p className="text-[14px] sm:text-[16px] md:text-[18px] text-[#047B22] font-ibm-mono font-semibold">
              Six reasons it's different
            </p>
          </div>

          <h2 className="text-[24px] sm:text-[28px] md:text-[36px] xl:text-[40px] leading-tight font-semibold">
            What you're really paying for
          </h2>

          <p className="text-[14px] leading-6 sm:leading-7 text-gray-600 sm:text-[15px] md:text-[18px] xl:text-[20px]">
            Not a logo, not a label — a way of making powder that most brands
            quietly cut corners on.
          </p>
        </motion.div>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3 md:items-stretch">
          {/* Card 1 */}
          <div className="flex min-h-[220px] sm:min-h-[260px] md:min-h-[280px] flex-col justify-between rounded-xl bg-gradient-to-br from-[#3A9250] to-[#064B17] p-5 sm:p-6 text-white">
            <div className="mb-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-md bg-[#EFEFEF]">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#064B17]" />
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl md:text-[22px] font-medium leading-snug">
                One herb, one origin — ground by our own hands
              </h3>
              <p className="text-sm text-white/90">
                We buy whole herbs from named farms and mill them ourselves in
                small batches. Most brands buy powder pre-ground from anyone,
                anywhere.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex min-h-[220px] sm:min-h-[260px] md:min-h-[280px] flex-col justify-between rounded-xl bg-[#BAE0C3] p-5 sm:p-6">
            <div className="mb-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-md bg-[#EFEFEF]">
              <Sprout className="h-4 w-4 sm:h-5 sm:w-5 text-[#3D940E]" />
            </div>
            <div className="space-y-2 text-[#3D940E]">
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-semibold">
                2.5+
              </h3>
              <p className="text-base sm:text-lg md:text-[22px] font-semibold">
                We have this much years of experience.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex min-h-[220px] sm:min-h-[260px] md:min-h-[280px] flex-col justify-between rounded-xl bg-[#EEE4D8] p-5 sm:p-6">
            <div className="mb-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-md bg-[#EFEFEF]">
              <FlaskConical className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl md:text-[32px] text-black">
                Tested, not trusted
              </h3>
              <p className="text-gray-700 text-sm sm:text-base md:text-[22px]">
                Every batch is screened and cleared before it ships.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:items-stretch">
          {/* Card 4 */}
          <div className="flex min-h-[220px] sm:min-h-[260px] md:min-h-[280px] flex-col justify-between rounded-xl bg-white border border-gray-200 p-5 sm:p-6">
            <div className="mb-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-md bg-[#EFEFEF]">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl md:text-[32px] text-black">
                Traceable to the field it grew in
              </h3>
              <p className="text-gray-700 text-sm sm:text-base md:text-[22px]">
                A lot code on every pack lets you follow the powder back to its
                harvest, drying record and test results. Provenance you can
                verify.
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="flex min-h-[220px] sm:min-h-[260px] md:min-h-[280px] flex-col justify-between rounded-xl bg-gradient-to-br from-[#105822] to-[#032F0E] p-5 sm:p-6 text-white">
            <div className="mb-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-md bg-[#EFEFEF]">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-[#064B17]" />
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl md:text-[32px]">
                Honest pricing, no padding
              </h3>
              <p className="text-white/90 text-sm sm:text-base md:text-[22px]">
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
