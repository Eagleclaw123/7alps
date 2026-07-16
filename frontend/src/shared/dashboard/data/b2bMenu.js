import {
  FiHome,
  FiFileText,
  FiShoppingBag,
  FiDownload,
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
    title: "Catalog",
    icon: FiDownload,
    path: "/b2b/catalog",
  },
  {
    id: 3,
    title: "Request Quote",
    icon: FiFileText,
    path: "/b2b/request-quote",
  },
  {
    id: 4,
    title: "Orders",
    icon: FiShoppingBag,
    path: "/b2b/orders",
  },
  {
    id: 5,
    title: "Logout",
    icon: FiLogOut,
    path: "/logout",
    danger: true,
  },
];

export default b2bMenu;
