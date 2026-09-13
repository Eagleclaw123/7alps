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
      badgeColor="#C56B4E"
      heading="From farm"
      headingHighlight="to final form."
      description="We carefully source, clean, process, and prepare every ingredient so its natural quality is preserved from the farm to the finished product."
      buttons={buttons}
      containerHeight="min-h-[720px] h-screen"
      textColor="text-[#211B17]"
    />
  );
};

export default OurProcessHeroSection;
