const ContactInput = ({
  label,
  type = "text",
  name,
  placeholder,
  required = false,
  error,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-[#1E293B]">
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        {...props}
        className={`
          h-12 rounded-xl border bg-white px-4 text-gray-700
          outline-none transition-all duration-300
          placeholder:text-gray-400
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-200 focus:border-[#0F6B3E] focus:ring-4 focus:ring-[#0F6B3E]/10"
          }
        `}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default ContactInput;
