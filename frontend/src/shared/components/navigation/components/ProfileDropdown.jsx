// ProfileDropdown.jsx
import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";

import {
  selectCustomer,
  logoutCustomerThunk,
} from "../../../../store/slices/authSlice";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const customer = useSelector(selectCustomer);
  const user = customer;

  const initial = user?.name?.charAt(0).toUpperCase();

  const ref = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!customer) {
    return (
      <Link
        to="/customer/login"
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-[#FAF6EF] transition-all duration-300 hover:bg-[#FAF6EF] hover:text-[#3F4A2E]"
      >
        <FiUser size={20} />
      </Link>
    );
  }

  const handleLogout = async () => {
    setIsOpen(false);

    try {
      await dispatch(logoutCustomerThunk()).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("user");
      navigate("/", { replace: true });
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-[#FAF6EF] transition-all duration-300 hover:bg-[#FAF6EF] hover:text-[#3F4A2E]"
      >
        {customer ? (
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-current text-sm font-bold">
            {initial}
          </span>
        ) : (
          <FiUser size={20} />
        )}
      </button>

      {customer && isOpen && (
        <div className="absolute right-0 top-14 z-50 w-52 overflow-hidden rounded-xl border border-[#E3D9C7] bg-white text-[#3F4A2E] shadow-xl">
          <Link
            to="/customer/profile"
            className="block px-5 py-3 transition hover:bg-[#FAF6EF]"
            onClick={() => setIsOpen(false)}
          >
            My Profile
          </Link>

          <Link
            to="/customer/orders"
            className="block px-5 py-3 transition hover:bg-[#FAF6EF]"
            onClick={() => setIsOpen(false)}
          >
            Orders
          </Link>

          <button
            onClick={handleLogout}
            className="block w-full cursor-pointer px-5 py-3 text-left text-[#C0503A] transition hover:bg-[#C0503A]/10"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
