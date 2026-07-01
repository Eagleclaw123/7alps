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
      backgroundImage="https://res.cloudinary.com/dasvdkncm/image/upload/v1782789076/50cafcfe95abcde89db9484a2e73fe8a3340650f_gcj3ez.png"
      badgeText="Our process · root to powder"
      badgeColor="#047B22"
      heading="We don't mix powders."
      headingHighlight="We make them."
      description="Bring 7ALP's traceable, small-batch formulas to your shelves. Honest wholesale margins, a low first-order minimum, and the same root-to-bottle story your customers can trust."
      buttons={buttons}
      textColor="text-[#FFFED4]"
    />
  );
};

export default OurProcessHeroSection;
