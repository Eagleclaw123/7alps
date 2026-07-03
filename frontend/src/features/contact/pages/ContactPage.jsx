import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import { contactSEO, SEO } from "../../../shared/seo";
// import ContactForm from "../components/ContactForm";
// import ContactInfoCard from "../components/ContactInfoCard";
import GoogleMap from "../sections/GoogleMap";
import { FiPhone } from "react-icons/fi";

const ContactPage = () => {
  return (
    <>
      <SEO {...contactSEO} />
      <AnimatedPage>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1>Contact Page</h1>
          <p>This is the contact page of the application.</p>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-0 mt-30">
          <ContactInfoCard
            icon={FiPhone}
            title="Call Us"
            value="+91 9876543210"
            description="Monday - Saturday"
          />{" "}
          <ContactForm />
        </div>
        <GoogleMap /> */}
      </AnimatedPage>
    </>
  );
};

export default ContactPage;
