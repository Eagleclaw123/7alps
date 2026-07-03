import HeroSection from "../../../shared/components/hero/HeroSection";

const PartnersHero = () => {
  const buttons = [
    {
      label: "Explore the trade",
      variant: "primary",
    },
  ];

  return (
    <HeroSection
      backgroundImage="https://res.cloudinary.com/dasvdkncm/image/upload/v1782789076/50cafcfe95abcde89db9484a2e73fe8a3340650f_gcj3ez.png"
      badgeText="Global trade · export division"
      badgeColor="#047B22"
      heading="Indian roots. Worldwide reach."
      description="From our facility in Udaipur, 7ALP ships single-origin Ayurvedic powders to retailers, distributors and importers across five regions — with the documentation, traceability and cold-chain care that international trade demands."
      buttons={buttons}
      textColor="text-[#FFFED4]"
    />
  );
};

export default PartnersHero;
