import {
  FiHome,
  FiPackage,
  FiFileText,
  FiShoppingBag,
  FiDownload,
  FiBriefcase,
  FiHeadphones,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const b2bMenu = [
  {
    id: 1,
    title: "Dashboard",
    icon: FiHome,
    path: "/b2b",
  },
  {
    id: 2,
    title: "Bulk Orders",
    icon: FiPackage,
    path: "/b2b/bulk-orders",
  },
  {
    id: 3,
    title: "Request Quote",
    icon: FiFileText,
    path: "/b2b/request-quote",
  },
  {
    id: 4,
    title: "Order History",
    icon: FiShoppingBag,
    path: "/b2b/orders",
  },
  {
    id: 5,
    title: "Catalog",
    icon: FiDownload,
    path: "/b2b/catalog",
  },
  {
    id: 6,
    title: "Business Profile",
    icon: FiBriefcase,
    path: "/b2b/profile",
  },
  {
    id: 7,
    title: "Support",
    icon: FiHeadphones,
    path: "/b2b/support",
  },
  {
    id: 8,
    title: "Settings",
    icon: FiSettings,
    path: "/b2b/settings",
  },
  {
    id: 9,
    title: "Logout",
    icon: FiLogOut,
    path: "/logout",
    danger: true,
  },
];

export default b2bMenu;
