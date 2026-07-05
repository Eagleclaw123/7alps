import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import { contactSEO, SEO } from "../../../shared/seo";
import ContactForm from "../components/ContactForm";
import ContactInfoCard from "../components/ContactInfoCard";
import ContactSection from "../sections/ContactSection";
import GoogleMap from "../sections/GoogleMap";
import { FiPhone } from "react-icons/fi";

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
