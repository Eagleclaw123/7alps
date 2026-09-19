import { useNavigate } from "react-router-dom";
import HeroSection from "../../../shared/components/hero/HeroSection";

const MainHeroSection = () => {
  const navigate = useNavigate();

  const buttons = [
    {
      label: "Explore Products",
      variant: "secondary",
      onClick: () => navigate("/products"),
    },
    {
      label: "Partner With Us",
      variant: "primary",
      onClick: () => navigate("/b2b/login"),
    },
  ];

  return (
    <HeroSection
      backgroundImage="https://www.rkwellbeinganddistributions.com/cdn/shop/files/ChatGPT_Image_Mar_17_2026_11_08_32_PM.png?v=1773769131"
      badgeText="Premium herbal wellness"
      badgeColor="#C56B4E"
      heading="Pure herbal"
      headingHighlight="ingredients."
      description="Premium herbal powders sourced from trusted farmers and carefully selected for quality, purity, and everyday natural wellness."
      buttons={buttons}
      containerHeight="min-h-[720px] h-screen"
    />
  );
};

export default MainHeroSection;
