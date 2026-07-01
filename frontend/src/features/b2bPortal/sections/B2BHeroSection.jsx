import HeroSection from "../../../shared/components/hero/HeroSection";

const B2BHeroSection = () => {
  const buttons = [
    {
      label: "Build a bulk order",
      variant: "primary",
    },
    {
      label: "See wholesale pricing",
      variant: "secondary",
      showArrow: false,
    },
  ];

  return (
    <HeroSection
      backgroundImage="https://res.cloudinary.com/dasvdkncm/image/upload/v1782748454/41f8b0042c2f71e9051016d1228eba43d5772be4_w8vtq2.png"
      badgeText="Wholesale · Private label · Distribution"
      badgeColor="#047B22"
      heading="Stock the"
      headingHighlight="Ayurveda people come back for."
      description="Bring 7ALP's traceable, small-batch formulas to your shelves. Honest wholesale margins, a low first-order minimum, and the same root-to-bottle story your customers can trust."
      buttons={buttons}
      textColor="text-[#FFFED4]"
    />
  );
};

export default B2BHeroSection;
