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
    <header className="fixed top-5 left-0 w-full z-50 px-4">
      <DesktopNav isActive={isActive} cartCount={cartCount.length} />
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
    </header>
  );
};

export default Header;
