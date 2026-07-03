import {
  FiHome,
  FiBox,
  FiGrid,
  FiShoppingCart,
  FiUsers,
  FiMessageSquare,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const adminMenu = [
  {
    id: 1,
    title: "Dashboard",
    icon: FiHome,
    path: "/admin",
  },
  {
    id: 2,
    title: "Products",
    icon: FiBox,
    path: "/admin/products",
  },
  {
    id: 3,
    title: "Categories",
    icon: FiGrid,
    path: "/admin/categories",
  },
  {
    id: 4,
    title: "Orders",
    icon: FiShoppingCart,
    path: "/admin/orders",
  },
  {
    id: 5,
    title: "Customers",
    icon: FiUsers,
    path: "/admin/customers",
  },
  {
    id: 6,
    title: "Reviews",
    icon: FiMessageSquare,
    path: "/admin/reviews",
  },
  {
    id: 7,
    title: "Settings",
    icon: FiSettings,
    path: "/admin/settings",
  },
  {
    id: 8,
    title: "Logout",
    icon: FiLogOut,
    path: "/logout",
    danger: true,
  },
];

export default adminMenu;
