import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Leaf } from "lucide-react";

const EmptyCart = ({
  title = "Your cart is empty.",
  description = "Add some herbal blends to get started.",
  buttonText = "Shop Products",
  buttonHref = "/products",
  buttonAction,
  Icon = Leaf,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (buttonAction) {
      buttonAction();
      return;
    }
    navigate(buttonHref);
  };

  return (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      <Icon className="h-6 w-6 text-[#B8B2A0]" />
      <p className="text-sm text-[#86806F]">{title}</p>
      <p className="text-sm text-[#86806F] max-w-md">{description}</p>
      <button
        onClick={handleClick}
        className="mt-3 group inline-flex items-center gap-4 bg-[#211B17] px-7 py-4 font-manrope text-sm font-medium text-[#F4EDE2] transition-colors hover:bg-[#C56B4E]"
      >
        {buttonText}
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4EDE2] text-[#211B17] transition-transform duration-300 group-hover:translate-x-1">
          <ArrowUpRight size={14} />
        </span>
      </button>
    </div>
  );
};

export default EmptyCart;
