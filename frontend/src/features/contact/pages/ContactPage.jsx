import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import { contactSEO, SEO } from "../../../shared/seo";
import ContactSection from "../sections/ContactSection";
import GoogleMap from "../sections/GoogleMap";

const ContactPage = () => {
  return (
    <>
      <SEO {...contactSEO} />
      <AnimatedPage>
        <ContactSection />
        <GoogleMap />
      </AnimatedPage>
    </>
  );
};

export default ContactPage;
