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
      badgeColor="#C56B4E"
      heading="Quality"
      headingHighlight="you can trust."
      description="From the farmers we work with to the way every ingredient is processed and prepared, we keep quality at the center of everything we do."
      values={values}
      containerHeight="min-h-[720px] h-screen"
      textColor="text-[#211B17]"
    />
  );
};

export default Why7ALPsHero;
