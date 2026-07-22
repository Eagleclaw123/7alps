import HeroSection from "../../../shared/components/hero/HeroSection";

const GlobalTradeHero = () => {
  const buttons = [
    {
      label: "Explore the trade",
      variant: "primary",
    },
  ];

  return (
    <HeroSection
      backgroundImage="https://res.cloudinary.com/dasvdkncm/image/upload/v1784523969/61766_b4ssw2.jpg"
      badgeText="Global trade · export division"
      badgeColor="white"
      heading="Indian roots. Worldwide reach."
      description="From our facility in Udaipur, 7ALP ships single-origin Ayurvedic powders to retailers, distributors and importers across five regions — with the documentation, traceability and cold-chain care that international trade demands."
      buttons={buttons}
      textColor="text-white"
      overlayColor="bg-black/20"
    />
  );
};

export default GlobalTradeHero;
