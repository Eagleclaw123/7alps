import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";

import SidebarItem from "./SidebarItem";
import Logo from "./Logo";
import ContactSupportModal from "./ContactSupportModal";
import { useState } from "react";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const sidebarVariants = {
  hidden: {
    x: "-100%",
  },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 28,
    },
  },
  exit: {
    x: "-100%",
    transition: {
      duration: 0.25,
    },
  },
};

const navVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const SidebarMobile = ({ open, onClose, menuItems, portal }) => {
  const [showSupportModal, setShowSupportModal] = useState(false);
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          />

          {/* Sidebar */}
          <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 z-50 flex h-screen w-80 flex-col bg-white shadow-2xl lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-5">
              <Logo />

              <button
                onClick={onClose}
                className="rounded-lg p-2 transition hover:bg-gray-100"
              >
                <FiX size={22} />
              </button>
            </div>

            {/* Navigation */}
            <motion.nav
              variants={navVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 space-y-2 overflow-y-auto px-4 py-6"
            >
              {menuItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  onClick={onClose}
                >
                  <SidebarItem item={item} collapsed={false} />
                </motion.div>
              ))}
            </motion.nav>

            {/* Footer */}
            {portal === "b2b" && (
              <div className="border-t border-gray-200 p-5">
                <div className="rounded-2xl bg-gradient-to-r from-[#0F6B3E] to-[#1A8F55] p-5 text-white">
                  <h3 className="font-semibold">Need Help?</h3>

                  <p className="mt-2 text-sm opacity-90">
                    Contact our support team anytime.
                  </p>

                  <button
                    className="mt-4 w-full rounded-xl bg-white py-2 text-sm font-semibold text-[#0F6B3E] transition hover:scale-[1.02]"
                    onClick={() => setShowSupportModal(true)}
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            )}
            {/* Modal — pure controlled component, renders null when isOpen is false */}
            {portal === "b2b" && (
              <ContactSupportModal
                isOpen={showSupportModal}
                onClose={() => setShowSupportModal(false)}
              />
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default SidebarMobile;
