import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiUser, FiArrowUpRight } from "react-icons/fi";

import {
  selectCustomer,
  logoutCustomerThunk,
} from "../../../../store/slices/authSlice";

const ProfileDropdown = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const customer = useSelector(selectCustomer);
  const initial = customer?.name?.charAt(0).toUpperCase();

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

  if (!customer) {
    return (
      <Link
        to="/customer/login"
        aria-label="Login"
        className={`
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          transition-all
          duration-300
          ${
            scrolled
              ? "text-[#211B17] hover:bg-[#E7DCCE]"
              : "text-white hover:bg-white/15"
          }
        `}
      >
        <FiUser size={19} />
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Account menu"
        className={`
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          transition-all
          duration-300
          ${
            isOpen
              ? scrolled
                ? "bg-[#211B17] text-[#F4EDE2]"
                : "bg-white text-[#211B17]"
              : scrolled
                ? "text-[#211B17] hover:bg-[#E7DCCE]"
                : "text-white hover:bg-white/15"
          }
        `}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-current font-manrope text-[10px] font-semibold">
          {initial}
        </span>
      </button>

      {isOpen && (
        <div
          className="
            absolute
            right-0
            top-14
            z-50
            w-56
            overflow-hidden
            border
            border-[#D8CDC2]
            bg-[#F7F2EB]
            text-[#211B17]
            shadow-[0_20px_60px_rgba(33,27,23,0.16)]
          "
        >
          <div className="border-b border-[#D8CDC2] px-5 py-4">
            <p className="font-manrope text-sm font-semibold">
              {customer.name || "My account"}
            </p>

            <p className="mt-1 font-ibm-mono text-[8px] uppercase tracking-[0.16em] text-[#95887F]">
              7ALP's account
            </p>
          </div>

          <div className="p-2">
            {[
              {
                label: "My Profile",
                href: "/customer/profile",
              },
              {
                label: "Orders",
                href: "/customer/orders",
              },
              {
                label: "Wishlist",
                href: "/customer/wishlist",
              },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between px-4 py-3 font-manrope text-sm text-[#514740] transition hover:bg-[#EDE3D8] hover:text-[#C56B4E]"
              >
                {item.label}

                <FiArrowUpRight
                  size={13}
                  className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="mt-1 w-full border-t border-[#D8CDC2] px-4 py-3 text-left font-manrope text-sm text-[#B05442] transition hover:bg-[#B05442]/5"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
