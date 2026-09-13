import { Link } from "react-router-dom";

import { navItems } from "./navItems";
import ProfileDropdown from "./ProfileDropdown";
import CartIcon from "./CartIcon";

const DesktopNav = ({ isActive, cartCount }) => {
  return (
    <div className="hidden justify-center lg:flex">
      <nav className="flex items-center gap-2 rounded-xl bg-[#26262645] px-4 py-2 text-white shadow-lg backdrop-blur-md">
        <Link
          to="/"
          className="
            group
            flex
            h-full
            shrink-0
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-[#211B17]
              transition-transform
              duration-300
              group-hover:scale-105
            "
          >
            <img
              src="https://res.cloudinary.com/dasvdkncm/image/upload/v1781664574/7_ALP_s_Logo-removebg-preview_e7kr1k.png"
              alt="7ALP's"
              className="h-7 w-7 object-contain"
            />
          </div>

          <div className="hidden xl:block">
            <p
              className="
                leading-none
                tracking-[-0.04em]
            text-white
              "
            >
              7ALP's
            </p>
          </div>
        </Link>

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
