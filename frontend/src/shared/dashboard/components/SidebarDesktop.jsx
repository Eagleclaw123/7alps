import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FiHeadphones } from "react-icons/fi";

import SidebarItem from "./SidebarItem";
import Logo from "./Logo";

const SidebarDesktop = ({ menuItems, collapsed, setCollapsed }) => {
  return (
    <motion.aside
      animate={{
        width: collapsed ? 88 : 280,
      }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed left-0 top-0 z-40 hidden h-screen border-r border-gray-200 bg-white shadow-sm lg:flex lg:flex-col"
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
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F6B3E] to-[#1A8F55] py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <FiHeadphones size={18} />
            Contact Support
          </button>
        </div>
      )}
    </motion.aside>
  );
};

export default SidebarDesktop;
