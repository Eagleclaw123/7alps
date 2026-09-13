import { motion } from "framer-motion";
import { FiShield, FiCheckCircle } from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: FiShield,
    title: "Quality Tested",
    description:
      "Every batch undergoes strict quality checks to ensure purity, safety, and consistent performance before reaching customers.",
  },
  {
    icon: FaLeaf,
    title: "Naturally Sourced",
    description:
      "We source premium herbs directly from trusted farmers using sustainable and ethical agricultural practices.",
  },
  {
    icon: FiCheckCircle,
    title: "Export Standards",
    description:
      "Our products follow international quality standards with hygienic processing and secure packaging for global markets.",
  },
];

const QualityAssuranceSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#F3EEE6] text-[#211B17]">
      <div className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-8 md:py-32 lg:px-12 xl:px-16">
        {/* =====================================================
            BACKGROUND TYPOGRAPHY
        ====================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-8
            top-8
            select-none
            font-manrope
            text-[170px]
            font-semibold
            leading-none
            tracking-[-0.09em]
            text-[#211B17]/[0.035]
            sm:text-[230px]
            md:text-[300px]
            lg:text-[380px]
          "
        >
          QUALITY
        </div>

        {/* =====================================================
            TOP LABEL
        ====================================================== */}

        <div className="relative z-10 mb-20 flex items-center gap-4">
          <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#A85F43]">
            04
          </span>

          <span className="h-px w-12 bg-[#A85F43]" />

          <span className="font-ibm-mono text-[10px] uppercase tracking-[0.25em] text-[#8B8077]">
            From farm to package
          </span>
        </div>

        {/* =====================================================
            MAIN ASYMMETRICAL LAYOUT
        ====================================================== */}

        <div className="relative z-10 grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-24">
          {/* ===================================================
              IMAGE SIDE
          ==================================================== */}

          <div className="relative">
            {/* Image */}

            <div className="relative aspect-[1.15] overflow-hidden bg-[#D9D0C3] md:aspect-[1.25]">
              <img
                src="https://res.cloudinary.com/dasvdkncm/image/upload/v1784520833/fresh-organic-herbs-ground-for-healthy-seasoning-free-photo_ytd1mr.jpg"
                alt="Fresh herbs representing 7ALP's quality assurance"
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-1000
                  hover:scale-[1.035]
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Image caption */}

              <div className="absolute bottom-6 left-6">
                <p className="font-ibm-mono text-[9px] uppercase tracking-[0.22em] text-white/80">
                  Carefully selected
                </p>

                <p className="mt-1 font-manrope text-sm text-white/65">
                  Nature, handled with care.
                </p>
              </div>
            </div>

            {/* =================================================
                FLOATING BADGE
            ================================================== */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.35,
              }}
              className="
                absolute
                -bottom-8
                right-5
                w-[190px]
                bg-[#211B17]
                px-6
                py-6
                text-[#F3EEE6]
                shadow-2xl
                sm:right-8
                md:w-[220px]
                md:px-7
                md:py-7
              "
            >
              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.2em] text-[#C97858]">
                Our standard
              </span>

              <p className="mt-3 font-manrope text-xl font-medium leading-tight tracking-[-0.03em]">
                Quality in
                <br />
                every detail.
              </p>

              <div className="mt-5 h-px w-full bg-white/15" />

              <span className="mt-4 block font-ibm-mono text-[8px] uppercase tracking-[0.15em] text-white/40">
                7ALP's / Quality
              </span>
            </motion.div>
          </div>

          {/* ===================================================
              CONTENT SIDE
          ==================================================== */}

          <div className="lg:pb-8">
            {/* Accent */}

            <div className="mb-8 h-[1px] w-16 bg-[#A85F43]" />

            <p className="max-w-md font-ibm-mono text-[10px] uppercase tracking-[0.18em] text-[#8B8077]">
              Quality is not a final step.
              <br />
              It is built into every step.
            </p>

            <h2
              className="
                mt-7
                max-w-xl
                font-manrope
text-[clamp(3.5rem,6vw,6.5rem)]
                font-medium
                leading-[1.0]
                tracking-[-0.075em]
              "
            >
              Pure
              <br />
              by
              <br />
              <span className="text-[#A85F43]">standard.</span>
            </h2>

            <p className="mt-9 max-w-lg font-manrope text-[15px] leading-7 text-[#746A62] md:text-base">
              At 7ALP's, every herbal powder is carefully sourced, processed,
              and tested to ensure purity, safety, and consistent quality.
              Because what reaches you should meet the same standard we expect
              ourselves.
            </p>

            {/* CTA */}

            <button
              onClick={() => navigate("/products")}
              className="
                group
                mt-9
                inline-flex
                items-center
                gap-3
                border-b
                border-[#211B17]
                pb-2
                font-manrope
                text-sm
                font-medium
                text-[#211B17]
                transition-colors
                duration-300
                hover:border-[#A85F43]
                hover:text-[#A85F43]
              "
            >
              Explore Products
              <GoArrowRight
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </button>
          </div>
        </div>

        {/* =====================================================
            FEATURE BLOCKS
        ====================================================== */}

        <div className="relative z-10 mt-28 grid border-t border-[#211B17]/15 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className="
                group
                border-b
                border-[#211B17]/15
                px-0
                py-9

                md:border-b-0
                md:border-r
                md:px-8
                md:py-10

                first:md:pl-0
                last:md:border-r-0
                last:md:pr-0
              "
            >
              {/* Icon */}

              <div className="mb-7 flex items-center justify-between">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    border
                    border-[#211B17]/15
                    text-[#A85F43]
                    transition-all
                    duration-300
                    group-hover:border-[#A85F43]
                    group-hover:bg-[#A85F43]
                    group-hover:text-white
                  "
                >
                  <Icon size={20} strokeWidth={1.5} />
                </div>

                <span className="font-ibm-mono text-[9px] tracking-[0.2em] text-[#A59A91]">
                  0{index + 1}
                </span>
              </div>

              <h3 className="font-manrope text-xl font-medium tracking-[-0.03em] text-[#211B17] md:text-[22px]">
                {title}
              </h3>

              <p className="mt-4 max-w-sm font-manrope text-sm leading-6 text-[#81766D]">
                {description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* =====================================================
            BOTTOM LINE
        ====================================================== */}

        <div className="relative z-10 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-ibm-mono text-[9px] uppercase tracking-[0.2em] text-[#9A8F86]">
            Sourced with care / Tested with purpose
          </span>

          <span className="font-manrope text-sm text-[#8A7F76]">
            The standard behind every 7ALP product.
          </span>
        </div>
      </div>
    </section>
  );
};

export default QualityAssuranceSection;
