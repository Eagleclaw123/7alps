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
      backgroundImage="https://jurlique.com.au/cdn/shop/files/SEEDTOSKIN_BLOG2_HEADER_1920x1080_6e0632fc-d2f4-4afb-a1e2-62f4f92557a2.jpg?v=1708471554&width=1920"
      badgeText="WHY CHOOSE 7ALP"
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
