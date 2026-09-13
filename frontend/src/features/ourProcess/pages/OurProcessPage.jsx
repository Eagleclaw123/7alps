import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import { processSEO, SEO } from "../../../shared/seo";

import HonestHerb from "../sections/HonestHerb";
import OurProcessHeroSection from "../sections/OurProcessHeroSection";
import PowderTimeline from "../sections/PowderTimeline";
import QualityBanner from "../sections/QualityBanner";

const ProcessPage = () => {
  return (
    <>
      <SEO {...processSEO} />

      <AnimatedPage>
        <OurProcessHeroSection />

        <QualityBanner />

        <PowderTimeline />

        <HonestHerb />
      </AnimatedPage>
    </>
  );
};

export default ProcessPage;
