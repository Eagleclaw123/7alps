const ContactInfoCard = ({ icon: Icon, title, value, description }) => {
  return (
    <div className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F6B3E]/20 hover:shadow-xl">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF7EF] text-[#0F6B3E] transition-colors duration-300 group-hover:bg-[#0F6B3E] group-hover:text-white">
        <Icon size={26} />
      </div>

      <h3 className="text-xl font-semibold text-[#1E293B]">{title}</h3>

      <p className="mt-2 font-medium text-[#0F6B3E]">{value}</p>

      {description && (
        <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default ContactInfoCard;
