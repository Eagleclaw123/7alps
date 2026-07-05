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
  const ref = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customer = useSelector(selectCustomer);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!customer) {
    return (
      <Link
        to="/customer/login"
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:bg-white hover:text-gray-800"
      >
        <FiUser size={20} />
      </Link>
    );
  }

  const handleLogout = async () => {
    setIsOpen(false);
    await dispatch(logoutCustomerThunk());
    navigate("/");
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:bg-white hover:text-gray-800"
      >
        <FiUser size={20} />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-14 w-60 overflow-hidden rounded-xl bg-white text-gray-800 shadow-xl">
          <div className="border-b border-gray-100 px-5 py-4">
            <p className="truncate font-semibold">{customer.name}</p>
            <p className="text-sm text-gray-500">+91 {customer.mobile}</p>
          </div>

          <Link
            to="/customer/orders"
            onClick={() => setIsOpen(false)}
            className="block px-5 py-3 transition hover:bg-gray-100"
          >
            My Orders
          </Link>

          <button
            onClick={handleLogout}
            className="block w-full px-5 py-3 text-left text-red-600 transition hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
