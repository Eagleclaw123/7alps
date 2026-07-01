const buttonStyles = {
  primary: "bg-[#008521] text-white hover:bg-[#006b19]",
  secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
  ghost: "bg-transparent text-[#008521] hover:text-[#006b19]",
};

const buttonSizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-base",
};

const Button = ({
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const variantClass = buttonStyles[variant] || buttonStyles.primary;
  const sizeClass = buttonSizes[size] || buttonSizes.md;

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition-all ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
