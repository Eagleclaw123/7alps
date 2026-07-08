import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

const contactDetails = [
  {
    icon: <FiMapPin size={18} />,
    title: "Our Office",
    detail: "123 Main Street, Hyderabad, India",
  },
  {
    icon: <FiPhone size={18} />,
    title: "Call Center",
    detail: "+91 98765 43210",
  },
  {
    icon: <FiMail size={18} />,
    title: "Email",
    detail: "contact@7alps.com",
  },
  {
    icon: <FiClock size={18} />,
    title: "Working Hours",
    detail: "Mon - Sat: 9:00 AM - 6:00 PM",
  },
];

const ContactInfoCard = () => {
  return (
    <div className="group rounded-3xl pt-10">
      <div className="flex items-center gap-2 text-[#0F6B3E] font-semibold text-sm mb-2 border border-[#0F6B3E] w-fit px-3 py-1 rounded-full">
        <FiPhone />
        <p>Contact Us</p>
      </div>

      <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl  font-semibold text-[#1E293B] leading-tight sm:leading-tight md:leading-[1.15] max-w-xl md:max-w-2xl xl:max-w-3xl">
        Get In Touch With Our Team
      </h3>

      <p className="mt-2 text-sm sm:text-base md:text-lg font-medium text-gray-600 leading-relaxed max-w-md md:max-w-lg xl:max-w-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
        cupiditate eaque ad eveniet deserunt.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {contactDetails.map((item) => (
          <div
            key={item.title}
            className="flex flex-col gap-2 rounded-xl border border-gray-200 p-4 transition hover:border-[#0F6B3E] hover:shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F6B3E]/10 text-[#0F6B3E]">
                {item.icon}
              </span>
              <h3 className="font-semibold text-[#1E293B]">{item.title}</h3>
            </div>
            <p className="text-sm text-gray-500">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfoCard;
