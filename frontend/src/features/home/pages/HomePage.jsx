import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import { SEO, homeSEO } from "../../../shared/seo";

import Banner from "../sections/Banner";
import Categories from "../sections/Categories";
import FAQs from "../sections/FAQs";
import FeatureMarquee from "../sections/FeatureMarquee";
import GlobalTrade from "../sections/GlobalTrade";
import HeroSection from "../sections/HeroSection";
import OurFeaturedProducts from "../sections/OurFeaturedProducts";
import QualityAssuranceSection from "../sections/QualityAssuranceSection";
import Testimonials from "../sections/Testimonials";
import WhyChoose7Alps from "../sections/WhyChoose7Alps";

const HomePage = () => {
  return (
    <>
      <SEO {...homeSEO} />

      <AnimatedPage>
        <HeroSection />
        <FeatureMarquee />
        <Categories />
        <OurFeaturedProducts />
        <WhyChoose7Alps />
        {/* <GlobalTrade /> */}
        <QualityAssuranceSection />
        <Banner />
        <Testimonials />
        <FAQs />
      </AnimatedPage>
    </>
  );
};

export default HomePage;
