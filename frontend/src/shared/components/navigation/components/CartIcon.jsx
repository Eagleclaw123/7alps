import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";

const CartIcon = ({ isActive, count }) => (
  <Link
    to="/cart"
    className={`relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
      isActive
        ? "bg-white text-gray-800"
        : "text-white hover:bg-white hover:text-gray-800"
    }`}
  >
    <BsCart size={22} />
    {count > 0 && (
      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-semibold text-white">
        {count}
      </span>
    )}
  </Link>
);

export default CartIcon;
