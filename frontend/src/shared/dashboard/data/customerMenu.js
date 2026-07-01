import {
  FiHome,
  FiShoppingBag,
  FiHeart,
  FiMapPin,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const customerMenu = [
  {
    id: 1,
    title: "Dashboard",
    icon: FiHome,
    path: "/customer",
  },
  {
    id: 2,
    title: "My Orders",
    icon: FiShoppingBag,
    path: "/customer/orders",
  },
  {
    id: 3,
    title: "Wishlist",
    icon: FiHeart,
    path: "/customer/wishlist",
  },
  {
    id: 4,
    title: "Addresses",
    icon: FiMapPin,
    path: "/customer/addresses",
  },
  {
    id: 5,
    title: "Profile",
    icon: FiUser,
    path: "/customer/profile",
  },
  {
    id: 6,
    title: "Settings",
    icon: FiSettings,
    path: "/customer/settings",
  },
  {
    id: 7,
    title: "Logout",
    icon: FiLogOut,
    path: "/logout",
    danger: true,
  },
];

export default customerMenu;
