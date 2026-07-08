import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import Banner from "../../home/sections/Banner";
import FeatureMarquee from "../../home/sections/FeatureMarquee";
import B2BHeroSection from "../sections/B2BHeroSection";
import Contact from "../sections/Contact";
import HowItWorks from "../sections/HowItWorks";
import OrderBuilder from "../sections/OrderBuilder";
import WholesaleTiers from "../sections/WholesaleTiers";
import WhyPartnerWithUs from "../sections/WhyPartnerWithUs";

const B2BPortal = () => {
  return (
    <>
      <AnimatedPage>
        <B2BHeroSection />
        <FeatureMarquee />
        <WhyPartnerWithUs />
        <WholesaleTiers />
        <OrderBuilder />
        <HowItWorks />
        <Banner />
        <Contact />
      </AnimatedPage>
    </>
  );
};

export default B2BPortal;
