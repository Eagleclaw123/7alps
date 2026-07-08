import ContactInfoCard from "../components/ContactInfoCard";
import ContactForm from "../components/ContactForm";

import { contactInfoData } from "../data/contactInfoData";

const ContactSection = () => {
  return (
    <section className="px-6 mt-25 xl:px-0 pb-10">
      <div className="mx-auto max-w-7xl">
        {/* Content */}
        <div className="grid gap-5 lg:gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left Side */}
          <ContactInfoCard />

          {/* Right Side */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
