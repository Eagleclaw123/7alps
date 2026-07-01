import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiShoppingBag,
  FiHeart,
  FiMapPin,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

const menuItems = [
  {
    title: "Dashboard",
    path: "/customer",
    icon: FiHome,
  },
  {
    title: "Orders",
    path: "/customer/orders",
    icon: FiShoppingBag,
  },
  {
    title: "Wishlist",
    path: "/customer/wishlist",
    icon: FiHeart,
  },
  {
    title: "Addresses",
    path: "/customer/addresses",
    icon: FiMapPin,
  },
  {
    title: "Profile",
    path: "/customer/profile",
    icon: FiUser,
  },
];

const Sidebar = () => {
  return (
    <aside className="hidden w-72 border-r bg-white lg:block">
      <div className="border-b p-6">
        <img
          src="https://res.cloudinary.com/dasvdkncm/image/upload/v1781664574/7_ALP_s_Logo-removebg-preview_e7kr1k.png"
          alt="7ALP's"
          className="h-12"
        />
      </div>

      <nav className="space-y-2 p-5">
        {menuItems.map(({ title, path, icon: Icon }) => (
          <NavLink
            key={title}
            to={path}
            end={path === "/customer"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-[#0F6B3E] text-white"
                  : "text-gray-700 hover:bg-[#F4F8F5]"
              }`
            }
          >
            <Icon size={20} />
            {title}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-6 w-72 px-5">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-50">
          <FiLogOut />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
