import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import { globalTradeSEO, SEO } from "../../../shared/seo";

const GlobalTradePage = () => {
  return (
    <>
      <SEO {...globalTradeSEO} />
      <AnimatedPage>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1>Global Trade Page</h1>
          <p>This is the global trade page of the application.</p>
        </div>
      </AnimatedPage>
    </>
  );
};

export default GlobalTradePage;
