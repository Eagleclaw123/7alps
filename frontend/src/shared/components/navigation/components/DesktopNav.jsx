import { Link } from "react-router-dom";

import { navItems } from "./navItems";
import ProfileDropdown from "./ProfileDropdown";
import CartIcon from "./CartIcon";

const DesktopNav = ({ isActive, cartCount }) => {
  return (
    <div className="hidden justify-center lg:flex">
      <nav className="flex items-center gap-2 rounded-xl bg-[#26262645] px-4 py-2 text-white shadow-lg backdrop-blur-md">
        {navItems.map((item) => (
          <Link key={item.label} to={item.href}>
            <button
              className={`rounded-full px-4 py-2 transition-all duration-300 ${
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
};

export default DesktopNav;
