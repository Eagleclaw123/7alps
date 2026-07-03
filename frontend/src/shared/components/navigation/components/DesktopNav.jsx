import { Link } from "react-router-dom";
import { navItems } from "./navItems";
import ProfileDropdown from "./ProfileDropdown";
import CartIcon from "./CartIcon";

const DesktopNav = ({ isActive, cartCount }) => (
  <div className="hidden lg:flex justify-center">
    <nav className="flex items-center gap-2 rounded-xl bg-[#26262645] px-4 py-2 backdrop-blur-md text-white shadow-lg">
      {navItems.map((item) => (
        <Link key={item.label} to={item.href}>
          <button
            className={`cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ${
              isActive(item.href)
                ? "bg-white text-gray-800"
                : "hover:bg-white hover:text-gray-800"
            }`}
          >
            {item.label}
          </button>
        </Link>
      ))}
      <ProfileDropdown />
      <CartIcon isActive={isActive("/cart")} count={cartCount} />
    </nav>
  </div>
);

export default DesktopNav;
