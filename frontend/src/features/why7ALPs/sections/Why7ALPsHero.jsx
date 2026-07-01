import { PiPlantLight } from "react-icons/pi";
import { MdVerified } from "react-icons/md";
import { GiFarmer } from "react-icons/gi";
import { CiGlobe } from "react-icons/ci";
import HeroSection from "../../../shared/components/hero/HeroSection";

const Why7ALPsHero = () => {
  const values = [
    "100% Natural",
    "Quality Assured",
    "Direct Farm",
    "Global Quality",
  ];

  return (
    <HeroSection
      backgroundImage="https://res.cloudinary.com/dasvdkncm/image/upload/v1782801719/742844d1c23e017015bb41e7a69a764aab58c640_szfgnd.png"
      badgeText="Why choose 7ALP"
      badgeColor="white"
      heading="Anyone can sell a powder. Few can stand behind one."
      // headingHighlight="We make them."
      description="Bring 7ALP's traceable, small-batch formulas to your shelves. Honest wholesale margins, a low first-order minimum, and the same root-to-bottle story your customers can trust."
      values={values}
      containerHeight="h-[100vh] md:h-[60vh] xl:h-screen"
      textColor="text-white"
    />
  );
};

export default Why7ALPsHero;
