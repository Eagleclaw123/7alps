import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import SidebarItem from "./SidebarItem";
import Logo from "./Logo";

const SidebarDesktop = ({ menuItems }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{
        width: collapsed ? 88 : 280,
      }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative hidden min-h-full border-r border-gray-200 bg-white shadow-sm lg:flex lg:flex-col"
    >
      {/* Header */}
      <div
        className={`relative flex h-20 items-center border-b border-gray-200 transition-all duration-300 ${
          collapsed ? "justify-center px-2" : "justify-between px-5"
        }`}
      >
        <Logo collapsed={collapsed} />

        {/* Floating Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`absolute top-1/2 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-md transition-all duration-300 hover:bg-gray-100 hover:shadow-lg ${
            collapsed ? "-right-4" : "right-4"
          }`}
        >
          {collapsed ? (
            <FiChevronRight size={18} />
          ) : (
            <FiChevronLeft size={18} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-6">
        {menuItems.map((item) => (
          <SidebarItem key={item.id} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="border-t border-gray-200 p-5">
          <div className="rounded-2xl bg-gradient-to-r from-[#0F6B3E] to-[#1A8F55] p-5 text-white">
            <h3 className="font-semibold">Need Help?</h3>

            <p className="mt-2 text-sm opacity-90">
              Contact our support team anytime.
            </p>

            <button className="mt-4 w-full rounded-xl bg-white py-2 text-sm font-semibold text-[#0F6B3E] transition hover:scale-[1.02]">
              Contact Support
            </button>
          </div>
        </div>
      )}
    </motion.aside>
  );
};

export default SidebarDesktop;
