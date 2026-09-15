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
      backgroundImage="https://images.squarespace-cdn.com/content/v1/6938433e7f2f5671b551d3ec/f9405018-dd4b-483a-b173-dd1349caa18b/LANACCI_Ayurvedic_lepa_herbal_powder_fine_natural_earth-toned_abf4cd2e-0f6e-4ed1-bfdb-1becfc200186_0.png"
      badgeText="THE 7ALP COLLECTION"
      badgeColor="#C56B4E"
      heading="Nature"
      headingHighlight="made useful."
      description="Discover thoughtfully sourced botanical ingredients, prepared with care for modern wellness."
      highlights={highlights}
      containerHeight="min-h-[720px] h-screen"
      textColor="text-[#211B17]"
    />
  );
};

export default ProductHeroSection;
