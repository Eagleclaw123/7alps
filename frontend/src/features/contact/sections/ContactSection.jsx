import HeroBanner from "../../../shared/components/ui/HeroBanner";
import ContactInfoCard from "../components/ContactInfoCard";
import ContactForm from "../components/ContactForm";

const ContactSection = () => {
  return (
    // <div className="bg-[#FBF8F2]">
    <div>
      {/* ── Hero banner ──────────────────────────────────────────── */}
      <HeroBanner
        eyebrow="Contact"
        title="Contact Us"
        description="Track your herbal wellness orders, delivery updates, and purchase history."
        image="https://res.cloudinary.com/dasvdkncm/image/upload/v1784788176/ChatGPT_Image_Jul_23_2026_11_57_14_AM_gbwvsk.png"
      />
      <section className="px-6 xl:px-0 pb-10">
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
    </div>
  );
};

export default ContactSection;
