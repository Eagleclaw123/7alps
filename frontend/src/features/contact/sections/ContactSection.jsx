// import ContactHeader from "../components/ContactHeader";
import ContactInfoCard from "../components/ContactInfoCard";
import ContactForm from "../components/ContactForm";

import { contactInfoData } from "../data/contactInfoData";

const ContactSection = () => {
  return (
    <section className="bg-[#F8FAF6] px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        {/* <ContactHeader /> */}

        {/* Content */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left Side */}
          <div className="flex flex-col justify-between">
            {/* Contact Cards */}
            <div className="grid gap-6 sm:grid-cols-2">
              {contactInfoData.map((item) => (
                <ContactInfoCard key={item.id} {...item} />
              ))}
            </div>

            {/* Trust Card */}
            <div className="mt-8 rounded-3xl bg-[#0F6B3E] p-8 text-white">
              <h3 className="text-2xl font-semibold">Why Contact 7ALP's?</h3>

              <p className="mt-3 text-white/80">
                Our experts are ready to assist you with product inquiries,
                wholesale partnerships, export opportunities, and custom herbal
                solutions.
              </p>

              <ul className="mt-8 space-y-4">
                <li className="flex items-center gap-3">
                  ✅ Reply within 24 Hours
                </li>

                <li className="flex items-center gap-3">
                  ✅ Global Export Support
                </li>

                <li className="flex items-center gap-3">
                  ✅ Bulk Order Assistance
                </li>

                <li className="flex items-center gap-3">
                  ✅ Dedicated Business Support
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
