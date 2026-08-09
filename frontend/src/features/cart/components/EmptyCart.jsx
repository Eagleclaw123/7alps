import { useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";

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
        className="mt-2 rounded-full bg-[#16442C] px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-[#0E3220]"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default EmptyCart;
