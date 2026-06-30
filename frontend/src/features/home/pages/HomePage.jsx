import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import Banner from "../sections/Banner";
import Contact from "../sections/Contact";
import GlobalTrade from "../sections/GlobalTrade";
import HeroSection from "../sections/HeroSection";
import OurFeaturedProducts from "../sections/OurFeaturedProducts";
import OurProcess from "../sections/OurProcess";
import WhyChoose from "../sections/WhyChoose";

const HomePage = () => {
  return (
    <AnimatedPage>
      <HeroSection />
      <OurFeaturedProducts />
      <OurProcess />
      <WhyChoose />
      <Banner />
      <GlobalTrade />
      <Contact />
    </AnimatedPage>
  );
};

export default HomePage;
