import { GoArrowRight } from "react-icons/go";

const ContactButton = ({
  children,
  type = "button",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        group flex h-14 w-full items-center justify-center gap-2
        rounded-xl bg-[#0F6B3E]
        px-6 text-base font-medium text-white
        shadow-lg shadow-[#0F6B3E]/20
        transition-all duration-300

        hover:-translate-y-0.5
        hover:bg-[#0C5933]
        hover:shadow-xl hover:shadow-[#0F6B3E]/30

        active:translate-y-0

        disabled:cursor-not-allowed
        disabled:opacity-70

        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Sending...
        </>
      ) : (
        <>
          {children}

          <GoArrowRight
            size={20}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </>
      )}
    </button>
  );
};

export default ContactButton;
