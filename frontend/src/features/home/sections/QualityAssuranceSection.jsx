import { FiShield, FiCheckCircle } from "react-icons/fi";
import { GoArrowRight, GoArrowUpRight } from "react-icons/go";
import { FaLeaf } from "react-icons/fa";

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
      "We source premium herbs directly from trusted farmers using sustainable and ethical agricultural practices, practices.",
  },
  {
    icon: FiCheckCircle,
    title: "Export Standards",
    description:
      "Our products follow international quality standards with hygienic processing and secure packaging for global markets.",
  },
];

const QualityAssuranceSection = () => {
  return (
    <section className="px-6 xl:px-0 mt-16 py-16 bg-gray-100/30">
      <div className="mx-auto max-w-7xl">
        {/* Top */}
        <div className="grid items-center gap-6 lg:grid-cols-2">
          {/* Content */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#047B22]" />
              <p className="font-ibm-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-[#047B22] sm:text-sm">
                Quality Assurance
              </p>
            </div>

            <h2 className="mt-6 text-[28px] md:text-[44px]l font-semibold leading-tight text-[#2C2C2C] md:text-5xl">
              Quality You Can Trust,
              <br />
              From Farm to Every Package
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
              At 7ALP's, every herbal powder is carefully sourced, processed,
              and tested to ensure purity, safety, and consistent quality for
            </p>

            <button className="flex w-full mt-8 items-center justify-center gap-2 rounded-lg bg-[#008521] px-6 py-3 text-white transition hover:bg-[#047B22] sm:w-fit lg:mb-4">
              Browse All
              <GoArrowRight className="text-lg" />
            </button>
          </div>

          {/* Image */}
          <div>
            <img
              src="https://res.cloudinary.com/dasvdkncm/image/upload/v1784520833/fresh-organic-herbs-ground-for-healthy-seasoning-free-photo_ytd1mr.jpg"
              alt="Quality Assurance"
              className="h-[450px] w-full rounded-3xl object-cover"
            />
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, index) => (
            <div key={index}>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#F4F8F5] text-[#0F6B3E]">
                <Icon size={28} />
              </div>

              <h3 className="text-[22px] font-semibold text-[#2C2C2C]">
                {title}
              </h3>

              <p className="mt-4 text-[16px]">{description}</p>

              {/* <button className="mt-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F5EC] text-[#0F6B3E] transition hover:scale-110 hover:bg-[#0F6B3E] hover:text-white">
                <GoArrowUpRight size={20} />
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualityAssuranceSection;
