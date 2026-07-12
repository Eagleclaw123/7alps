// MobileToggle.jsx
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import CartIcon from "./CartIcon";
import ProfileDropdown from "./ProfileDropdown";

const MobileToggle = ({ isOpen, onToggle, isActive, cartCount = 0 }) => (
  <div className="flex justify-end lg:hidden">
    <div className="flex items-center gap-2 rounded-2xl bg-[#1F2A1A]/50 p-1.5 backdrop-blur-md">
      <ProfileDropdown />
      <CartIcon isActive={isActive?.("/cart")} count={cartCount} />

      <button
        className="flex h-11 w-11 items-center justify-center rounded-full text-[#FAF6EF] transition hover:bg-[#FAF6EF] hover:text-[#3F4A2E]"
        onClick={onToggle}
      >
        {isOpen ? (
          <AiOutlineMenuFold className="text-2xl" />
        ) : (
          <AiOutlineMenuUnfold className="text-2xl" />
        )}
      </button>
    </div>
  </div>
);

export default MobileToggle;
