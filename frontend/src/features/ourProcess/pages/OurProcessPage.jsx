import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import { processSEO, SEO } from "../../../shared/seo";
import HonestHerb from "../sections/HonestHerb";
import HowItWorks from "../sections/HowItWorks";
import OurProcessHeroSection from "../sections/OurProcessHeroSection";
import PowderTimeline from "../sections/PowderTimeline";
import ProcessIntro from "../sections/ProcessIntro";
import QualityBanner from "../sections/QualityBanner";

const ProcessPage = () => {
  return (
    <>
      <SEO {...processSEO} />

      <AnimatedPage>
        <OurProcessHeroSection />
        {/* <HowItWorks />
         */}
        {/* <ProcessIntro /> */}
        <QualityBanner />
        <PowderTimeline />
        <HonestHerb />
      </AnimatedPage>
    </>
  );
};

export default ProcessPage;
