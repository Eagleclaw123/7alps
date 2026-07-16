import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const itemContentClassName = (isActive, danger) => `
  group relative flex items-center gap-4 rounded-xl px-4 py-3
  transition-all duration-300 cursor-pointer

  ${
    isActive
      ? "bg-[#0F6B3E] text-white shadow-lg"
      : danger
        ? "text-red-500 hover:bg-red-50"
        : "text-gray-700 hover:bg-[#EEF7F1] hover:text-[#0F6B3E]"
  }
`;

const SidebarItem = ({ item, collapsed = false }) => {
  const Icon = item.icon;

  // Action items (e.g. Logout) run a handler instead of navigating to a route.
  if (item.onClick) {
    return (
      <button type="button" onClick={item.onClick} className="block w-full text-left">
        <motion.div
          whileHover={{ x: 6 }}
          whileTap={{ scale: 0.98 }}
          className={itemContentClassName(false, item.danger)}
        >
          <Icon
            size={22}
            className="shrink-0 transition-transform duration-300 group-hover:scale-110"
          />
          {!collapsed && <span className="font-medium">{item.title}</span>}
        </motion.div>
      </button>
    );
  }

  return (
    <NavLink
      to={item.path}
      end={item.path.split("/").length === 2}
      className="block"
    >
      {({ isActive }) => (
        <motion.div
          whileHover={{ x: 6 }}
          whileTap={{ scale: 0.98 }}
          className={itemContentClassName(isActive, item.danger)}
        >
          <Icon
            size={22}
            className="shrink-0 transition-transform duration-300 group-hover:scale-110"
          />

          {!collapsed && <span className="font-medium">{item.title}</span>}

          {isActive && (
            <motion.div
              layoutId="activeSidebar"
              className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-white"
            />
          )}
        </motion.div>
      )}
    </NavLink>
  );
};

export default SidebarItem;
