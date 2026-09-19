import { Link } from "react-router-dom";

import { navItems } from "./navItems";
import ProfileDropdown from "./ProfileDropdown";
import CartIcon from "./CartIcon";

const DesktopNav = ({ isActive, cartCount }) => {
  return (
    <div className="hidden justify-center lg:flex">
      <nav className="flex items-center gap-2 rounded-xl bg-black/30 px-4 py-2 text-white shadow-lg backdrop-blur-md">
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
          {/* <div
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
              src="https://res.cloudinary.com/dasvdkncm/image/upload/v1789745013/7alps-logo-removebg-preview_hjvqpf.png"
              alt="7ALP's"
              className="h-7 w-7 object-contain"
            />
          </div> */}

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center

              transition-transform
              duration-300
              group-hover:scale-105
            "
          >
            <img
              src="https://res.cloudinary.com/dasvdkncm/image/upload/v1789824060/7_ALPs_logo_q69vip.jpg"
              alt="7ALP's"
              className="h-full w-full object-contain rounded-xl"
            />
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
