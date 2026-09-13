import { PiPlantLight } from "react-icons/pi";
import { MdVerified } from "react-icons/md";
import { GiFarmer } from "react-icons/gi";
import { CiGlobe } from "react-icons/ci";

import HeroSection from "../../../shared/components/hero/HeroSection";

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

const ProductHeroSection = () => {
  return (
    <HeroSection
      backgroundImage="https://www.rkwellbeinganddistributions.com/cdn/shop/files/ChatGPT_Image_Mar_17_2026_11_08_32_PM.png?v=1773769131"
      badgeText="Our product collection"
      badgeColor="#C56B4E"
      heading="Nature"
      headingHighlight="made useful."
      description="Explore carefully selected herbal ingredients and wellness products, sourced from trusted farmers and prepared with uncompromising attention to quality."
      highlights={highlights}
      containerHeight="min-h-[720px] h-screen"
      textColor="text-[#211B17]"
    />
  );
};

export default ProductHeroSection;
