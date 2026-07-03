import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import { globalTradeSEO, SEO } from "../../../shared/seo";
import FeatureMarquee from "../../home/sections/FeatureMarquee";
import GlobalTrade from "../sections/GlobalTrade";
import GlobalTradeHero from "../sections/GlobalTradeHero";
import Where7ALPTravels from "../sections/Where7ALPTravels";

const GlobalTradePage = () => {
  return (
    <>
      <SEO {...globalTradeSEO} />
      <AnimatedPage>
        <GlobalTradeHero />
        <FeatureMarquee />
        <GlobalTrade />
        <Where7ALPTravels />
      </AnimatedPage>
    </>
  );
};

export default GlobalTradePage;
