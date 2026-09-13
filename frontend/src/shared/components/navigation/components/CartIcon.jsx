import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";

const CartIcon = ({ isActive, count, scrolled }) => (
  <Link
    to="/cart"
    aria-label="Shopping cart"
    className={`
      group
      relative
      flex
      h-10
      w-10
      items-center
      justify-center
      rounded-full
      transition-all
      duration-300
      ${
        isActive
          ? scrolled
            ? "bg-[#211B17] text-[#F4EDE2]"
            : "bg-white text-[#211B17]"
          : scrolled
            ? "text-[#211B17] hover:bg-[#E7DCCE]"
            : "text-white hover:bg-white/15"
      }
    `}
  >
    <BsCart3
      size={19}
      className="transition-transform duration-300 group-hover:scale-110"
    />

    {count > 0 && (
      <span
        className="
          absolute
          -right-0.5
          -top-0.5
          flex
          h-[18px]
          min-w-[18px]
          items-center
          justify-center
          rounded-full
          bg-[#C56B4E]
          px-1
          font-ibm-mono
          text-[8px]
          font-semibold
          text-white
        "
      >
        {count > 99 ? "99+" : count}
      </span>
    )}
  </Link>
);

export default CartIcon;
