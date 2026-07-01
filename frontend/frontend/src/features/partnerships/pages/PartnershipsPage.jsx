import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import { partnershipsSEO, SEO } from "../../../shared/seo";

const PartnershipsPage = () => {
  return (
    <>
      <SEO {...partnershipsSEO} />
      <AnimatedPage>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1>Partnerships Page</h1>
          <p>This is the partnerships page of the application.</p>
        </div>
      </AnimatedPage>
    </>
  );
};

export default PartnershipsPage;
