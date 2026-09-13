import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCart, selectCartItems } from "../../../../store/slices/cartSlice";

import { fetchCustomerStatus } from "../../../../store/slices/authSlice";
import { fetchWishlist } from "../../../../store/slices/wishlistSlice";

import DesktopNav from "../components/DesktopNav";
import MobileSidebar from "../components/MobileSidebar";
import MobileToggle from "../components/MobileToggle";
import { useIsActive } from "../components/useIsActive";

const Header = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const cartCount = useSelector(selectCartItems);
  const isActive = useIsActive();

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchCustomerStatus());
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <div className="hidden lg:block">
          <DesktopNav isActive={isActive} cartCount={cartCount.length} />
        </div>

        <div className="lg:hidden">
          <MobileToggle
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            cartCount={cartCount.length}
          />

          <MobileSidebar
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            isActive={isActive}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
