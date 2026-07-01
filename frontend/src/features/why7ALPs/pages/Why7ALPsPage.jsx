import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import { SEO, why7ALPsSEO } from "../../../shared/seo";
import Comparison from "../sections/Comparison";
import WhatWeStandFor from "../sections/WhatWeStandFor";
import Why7ALPsHero from "../sections/Why7ALPsHero";
import Why7ALPsSection from "../sections/Why7ALPsSection";
import WhyChooseUs from "../sections/WhyChooseUs";

const Why7ALPsPage = () => {
  return (
    <>
      <SEO {...why7ALPsSEO} />
      <AnimatedPage>
        <Why7ALPsHero />
        <WhyChooseUs />
        <Comparison />
        <WhatWeStandFor />
      </AnimatedPage>
    </>
  );
};

export default Why7ALPsPage;
