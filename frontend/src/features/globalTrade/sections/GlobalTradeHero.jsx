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
      badgeColor="#C56B4E"
      heading="Indian roots."
      headingHighlight="Worldwide reach."
      description="From carefully sourced Indian botanicals to international markets, we make premium herbal ingredients easier to source, trust, and bring to customers around the world."
      buttons={buttons}
      containerHeight="min-h-[720px] h-screen"
      textColor="text-[#211B17]"
    />
  );
};

export default GlobalTradeHero;
