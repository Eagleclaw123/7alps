import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import { partnershipsSEO, SEO } from "../../../shared/seo";
import PartnersHero from "../sections/PartnersHero";

const PartnershipsPage = () => {
  return (
    <>
      <SEO {...partnershipsSEO} />
      <AnimatedPage>
        <PartnersHero />
      </AnimatedPage>
    </>
  );
};

export default PartnershipsPage;
