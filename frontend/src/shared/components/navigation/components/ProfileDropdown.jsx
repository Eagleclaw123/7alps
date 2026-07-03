import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:bg-white hover:text-gray-800"
      >
        <FiUser size={20} />
      </button>
      {isOpen && (
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
  );
};

export default ProfileDropdown;
