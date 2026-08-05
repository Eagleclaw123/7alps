import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

const contactDetails = [
  {
    icon: <FiMapPin size={16} />,
    title: "Our Office",
    detail: "123 Main Street, Hyderabad, India",
  },
  {
    icon: <FiPhone size={16} />,
    title: "Call Center",
    detail: "+91 98765 43210",
  },
  {
    icon: <FiMail size={16} />,
    title: "Email",
    detail: "contact@7alps.com",
  },
  {
    icon: <FiClock size={16} />,
    title: "Working Hours",
    detail: "Mon - Sat: 9:00 AM - 6:00 PM",
  },
];

/* Dashed "perforation" strip — the seed-packet detail used across the site */
const Perforation = () => (
  <div
    className="h-px w-full"
    style={{
      backgroundImage:
        "repeating-linear-gradient(to right, #C9C2AE 0, #C9C2AE 6px, transparent 6px, transparent 13px)",
    }}
  />
);

const ContactInfoCard = () => {
  return (
    <div className="pt-10 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-2 text-[#16442C] font-semibold text-xs uppercase tracking-wide mb-4 border border-[#16442C] w-fit px-4 py-1.5 rounded-full">
          <FiPhone size={14} />
          <p>Contact Us</p>
        </div>

        <h3 className="font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#201F1B] leading-tight sm:leading-tight md:leading-[1.1] max-w-xl md:max-w-2xl xl:max-w-3xl">
          Get In Touch With Our Team
        </h3>

        <p className="mt-4 text-sm sm:text-base md:text-lg text-[#5B564A] leading-relaxed max-w-md md:max-w-lg xl:max-w-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
          cupiditate eaque ad eveniet deserunt.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {contactDetails.map((item) => (
          <div
            key={item.title}
            className="relative border border-[#E3DFD2] bg-[#FBF8F2]/60 transition-colors hover:border-[#16442C]"
          >
            <Perforation />
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#16442C]/10 text-[#16442C]">
                  {item.icon}
                </span>
                <h4 className="flex items-center gap-1.5 font-medium text-base text-[#201F1B]">
                  {item.title}
                </h4>
              </div>
              <p className="text-sm text-[#86806F]">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfoCard;
