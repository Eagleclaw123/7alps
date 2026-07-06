import { Link } from "react-router-dom";
import { FiUser, FiBriefcase, FiShield, FiX } from "react-icons/fi";
import { BsCart } from "react-icons/bs";
import { navItems } from "./navItems";

const MobileSidebar = ({ isOpen, onClose, isActive }) => (
  <>
    {isOpen && (
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
    )}

    <div
      className={`flex flex-col justify-between fixed top-0 left-0 h-full w-84 bg-white shadow-lg z-[55] transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div>
        <div className="flex justify-between items-center gap-2 text-2xl text-gray-800 px-6 py-4">
          <div>
            <h2 className="text-2xl font-bold text-[#0F6B3E]">7ALP's</h2>
            <p className="text-sm text-gray-500">Natural Herbal Powders</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <FiX size={30} />
          </button>
        </div>
        <hr className="text-gray-300" />

        <div className="flex flex-col gap-6 p-6">
          {navItems.map((item) => (
            <Link key={item.label} to={item.href} onClick={onClose}>
              <button
                className={`cursor-pointer text-left ${
                  isActive(item.href) ? "text-[#0F6B3E] font-semibold" : ""
                }`}
              >
                {item.label}
              </button>
            </Link>
          ))}
          <hr className="text-gray-300" />

          <Link
            to="/cart"
            onClick={onClose}
            className={`flex items-center gap-3 rounded-xl border p-4 transition ${
              isActive("/cart")
                ? "border-[#0F6B3E] bg-[#F8FAF7]"
                : "hover:border-[#0F6B3E] hover:bg-[#F8FAF7]"
            }`}
          >
            <BsCart className="text-xl text-[#0F6B3E]" />
            Cart
          </Link>

          <Link
            to="/customer/login"
            className="flex items-center gap-3 rounded-xl border p-4 transition hover:border-[#0F6B3E] hover:bg-[#F8FAF7]"
          >
            <FiUser className="text-xl text-[#0F6B3E]" />
            Login
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-300 px-6 py-5">
        <p className="text-sm text-gray-500">© 2026 7ALP's Global</p>
      </div>
    </div>
  </>
);

export default MobileSidebar;
