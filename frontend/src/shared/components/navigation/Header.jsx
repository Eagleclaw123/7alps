import { useState } from "react";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Our Process", href: "/our-process" },
  { label: "Why Choose Us", href: "/why-choose-us" },
  { label: "Global Trade", href: "/global-trade" },
  { label: "Partnerships", href: "/partnerships" },
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
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-[55] transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center gap-2 text-2xl text-gray-800 px-6 py-4">
          <h2 className="text-xl">7 ALP's</h2>
        </div>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
