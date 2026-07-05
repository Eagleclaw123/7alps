// import ContactHeader from "../components/ContactHeader";
import ContactInfoCard from "../components/ContactInfoCard";
import ContactForm from "../components/ContactForm";

import { contactInfoData } from "../data/contactInfoData";

const ContactSection = () => {
  return (
    <section className="px-6 mt-30 xl:px-0">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        {/* <ContactHeader /> */}

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
