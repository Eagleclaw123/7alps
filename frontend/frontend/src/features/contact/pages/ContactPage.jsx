import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import { contactSEO, SEO } from "../../../shared/seo";
import GoogleMap from "../sections/GoogleMap";

const ContactPage = () => {
  return (
    <>
      <SEO {...contactSEO} />
      <AnimatedPage>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1>Contact Page</h1>
          <p>This is the contact page of the application.</p>
        </div>
        <GoogleMap />
      </AnimatedPage>
    </>
  );
};

export default ContactPage;
