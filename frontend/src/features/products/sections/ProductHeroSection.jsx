import { motion } from "framer-motion";
import { GoArrowRight } from "react-icons/go";
import { PiPlantLight } from "react-icons/pi";
import { MdVerified } from "react-icons/md";
import { GiFarmer } from "react-icons/gi";
import { CiGlobe } from "react-icons/ci";
import TrustBadge from "../../../shared/components/ui/TrustBadge";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const highlights = [
  {
    icon: PiPlantLight,
    title: "100% Natural",
    subtitle: "Ingredients",
  },
  {
    icon: MdVerified,
    title: "Quality Assured",
    subtitle: "Processing",
  },
  {
    icon: GiFarmer,
    title: "Direct Farm",
    subtitle: "Sourcing",
  },
  {
    icon: CiGlobe,
    title: "Global Quality",
    subtitle: "Standards",
  },
];

const profile1 =
  "https://res.cloudinary.com/dasvdkncm/image/upload/v1762571953/memoji-emoji-handsome-smiling-man-white-background_826801-6987-removebg-preview_tj0s79.png";
const profile2 =
  "https://res.cloudinary.com/dasvdkncm/image/upload/v1762422091/219983-removebg-preview_awsz6b.png";

const avatars = [profile1, profile1, profile2];

const ProductHeroSection = () => {
  return (
    <section>
      <div className="relative h-[90vh] md:h-[60vh] xl:h-screen overflow-hidden">
        <img
          src="https://res.cloudinary.com/dasvdkncm/image/upload/v1782127683/Rectangle_3463720_1_sizclo.png"
          alt="Organic Products"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-end pb-6">
          <div className="container 0mx-auto px-6 md:px-16">
            <TrustBadge avatars={avatars} />

            <h1 className="mt-4 text-[26px] md:text-4xl xl:text-[46px] font-semibold leading-tight text-[#FFFED4]">
              Premium Herbal Ingredients for
              <br />
              Natural Wellness
            </h1>

            <p className="mt-6 text-[18px] xl:text-[20px] text-white/80 max-w-xl">
              Premium herbal ingredients and wellness solutions sourced directly
              from farmers and delivered to consumers, businesses, and global
              partners.
            </p>

            <button className="mt-6 rounded-lg bg-white px-6 py-3 text-black">
              Explore <GoArrowRight className="inline ml-2" />
            </button>
            <div className="mt-8 flex flex-wrap gap-6 text-[#2E2E2E]">
              {highlights.map(({ icon: Icon, title, subtitle }, index) => (
                <div
                  key={title}
                  className={`flex flex-col items-center gap-3 text-center ${
                    index !== highlights.length - 1
                      ? "border-r border-black/20 pr-6"
                      : ""
                  }`}
                >
                  <Icon size={28} />
                  <p className="text-sm">
                    {title}
                    <br />
                    {subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHeroSection;
