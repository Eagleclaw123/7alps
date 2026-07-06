import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import Cookies from "js-cookie";
import { logout } from "../../../services/auth.service";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const initial = user?.name?.charAt(0).toUpperCase();

  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    if (!user) {
      navigate("/customer/login");
      return;
    }

    setIsOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      Cookies.remove("token");
      localStorage.removeItem("user");

      setIsOpen(false);

      navigate("/customer/login", {
        replace: true,
      });
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={handleProfileClick}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:bg-white hover:text-gray-800"
      >
        {user ? (
          <span className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold border">
            {initial}
          </span>
        ) : (
          <FiUser size={20} />
        )}
      </button>

      {user && isOpen && (
        <div className="absolute right-0 top-14 w-52 overflow-hidden rounded-xl bg-white text-gray-800 shadow-xl">
          <Link
            to="/customer/profile"
            className="block px-5 py-3 transition hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            My Profile
          </Link>

          <Link
            to="/customer/orders"
            className="block px-5 py-3 transition hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Orders
          </Link>

          <button
            onClick={handleLogout}
            className="block w-full cursor-pointer px-5 py-3 text-left text-red-600 transition hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
