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
  const buttons = [
    {
      label: "Explore",
      variant: "secondary",
    },
  ];

  return (
    <HeroSection
      backgroundImage="https://res.cloudinary.com/dasvdkncm/image/upload/v1783564641/powdered-matcha-plate-created-using-generative-ai-technology_qpkrit.jpg"
      badgeText="Wellness Collections"
      badgeColor="#fff"
      heading="Premium"
      headingHighlight="Herbal Ingredients for Natural Wellness"
      description="Premium herbal ingredients and wellness solutions sourced directly from farmers and delivered to consumers, businesses, and global partners."
      buttons={buttons}
      highlights={highlights}
      containerHeight="h-[100vh] md:h-[60vh] xl:h-screen"
      textColor="text-white"
    />
  );
};

export default ProductHeroSection;
