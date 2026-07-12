import HeroSection from "../../../shared/components/hero/HeroSection";

const OurProcessHeroSection = () => {
  const buttons = [
    {
      label: "Look at our process",
      variant: "primary",
    },
  ];

  return (
    <HeroSection
      backgroundImage="https://res.cloudinary.com/dasvdkncm/image/upload/v1783656984/wide-variety-spices-herbs-ai-generated-image_1_hggrp9.jpg"
      badgeText="Our process · root to powder"
      badgeColor="#fff"
      heading="We don't mix powders."
      headingHighlight="We make them."
      description="Bring 7ALP's traceable, small-batch formulas to your shelves. Honest wholesale margins, a low first-order minimum, and the same root-to-bottle story your customers can trust."
      buttons={buttons}
      textColor="text-white"
      overlayColor="bg-black/20"
    />
  );
};

export default OurProcessHeroSection;
