import { useState, useRef, useEffect } from "react";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FiUser, FiBriefcase, FiShield, FiX } from "react-icons/fi";
import { BsCart } from "react-icons/bs";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Our Process", href: "/our-process" },
  { label: "Why 7ALP's", href: "/why-7alps" },
  { label: "Global Trade", href: "/global-trade" },
  { label: "Partners", href: "/partners" },
  { label: "B2B Portal", href: "/b2b-portal" },
  { label: "Contact", href: "/contact" },
];

const handleScroll = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const Header = () => {
  const [activeNav, setActiveNav] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header className="fixed top-5 left-0 w-full z-50 px-4">
      {/* Desktop Navbar */}
      <div className="hidden lg:flex justify-center">
        <nav className="flex items-center gap-2 rounded-xl bg-[#26262645] px-4 py-2 backdrop-blur-md text-white shadow-lg">
          {navItems.map((item) => (
            <Link key={item.label} to={item.href}>
              <button
                onClick={() => {
                  handleScroll(item.href.replace("/", ""));
                  setActiveNav(item.label.toLowerCase());
                }}
                className={`cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ${
                  activeNav === item.label.toLowerCase()
                    ? "bg-white text-gray-800"
                    : "hover:bg-white hover:text-gray-800"
                }`}
              >
                {item.label}
              </button>
            </Link>
          ))}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:bg-white hover:text-gray-800"
            >
              <FiUser size={20} />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 top-14 w-52 overflow-hidden rounded-xl bg-white text-gray-800 shadow-xl">
                <Link
                  to="/customer/login"
                  className="block px-5 py-3 transition hover:bg-gray-100"
                >
                  Customer Login
                </Link>

                <Link
                  to="/b2b/login"
                  className="block px-5 py-3 transition hover:bg-gray-100"
                >
                  B2B Login
                </Link>

                <Link
                  to="/admin/login"
                  className="block px-5 py-3 transition hover:bg-gray-100"
                >
                  Admin Login
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:bg-white hover:text-gray-800"
          >
            <BsCart size={22} />

            {/* {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-semibold text-white">
                {cartItems.length}
              </span>
            )} */}
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-semibold text-white">
              0
            </span>
          </Link>
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden flex justify-end">
        <button
          className="text-white bg-[#26262645] p-3 rounded-xl backdrop-blur-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <AiOutlineMenuFold className="text-2xl" />
          ) : (
            <AiOutlineMenuUnfold className="text-2xl" />
          )}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`flex flex-col justify-between fixed top-0 left-0 h-full w-84 bg-white shadow-lg z-[55] transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div>
          <div className="flex justify-between items-center gap-2 text-2xl text-gray-800 px-6 py-4">
            <div>
              <h2 className="text-2xl font-bold text-[#0F6B3E]">7ALP's</h2>
              <p className="text-sm text-gray-500">Natural Herbal Powders</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 transition hover:bg-gray-100"
            >
              <FiX size={30} />
            </button>
          </div>
          <hr className="text-gray-300" />

          <div className="flex flex-col gap-6 p-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsOpen(false)}
              >
                <button
                  onClick={() => {
                    handleScroll(item.href.replace("#", ""));
                    setActiveNav(item.label.toLowerCase());
                    setIsOpen(false);
                  }}
                  className="cursor-pointer text-left"
                >
                  {item.label}
                </button>
              </Link>
            ))}
            <hr className="text-gray-300" />

            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl border p-4 transition hover:border-[#0F6B3E] hover:bg-[#F8FAF7]"
            >
              <BsCart className="text-xl text-[#0F6B3E]" />
              Cart
            </Link>

            <Link
              to="/customer/login"
              className="flex items-center gap-3 rounded-xl border p-4 transition hover:border-[#0F6B3E] hover:bg-[#F8FAF7]"
            >
              <FiUser className="text-xl text-[#0F6B3E]" />
              Customer Login
            </Link>

            <Link
              to="/b2b/login"
              className="flex items-center gap-3 rounded-xl border p-4 transition hover:border-[#0F6B3E] hover:bg-[#F8FAF7]"
            >
              <FiBriefcase className="text-xl text-[#0F6B3E]" />
              B2B Login
            </Link>

            <Link
              to="/admin/login"
              className="flex items-center gap-3 rounded-xl border p-4 transition hover:border-[#0F6B3E] hover:bg-[#F8FAF7]"
            >
              <FiShield className="text-xl text-[#0F6B3E]" />
              Admin Login
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-300 px-6 py-5">
          <p className="text-sm text-gray-500">© 2026 7ALP's Global</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
