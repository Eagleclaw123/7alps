import { useState } from "react";
import { useSelector } from "react-redux";

import { selectCartItems } from "../../../../store/slices/cartSlice";
import DesktopNav from "../components/DesktopNav";
import MobileSidebar from "../components/MobileSidebar";
import MobileToggle from "../components/MobileToggle";
import { useIsActive } from "../components/useIsActive";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const isActive = useIsActive();

  return (
    <header className="fixed top-5 left-0 w-full z-50 px-4">
      <DesktopNav isActive={isActive} cartCount={cartItems.length} />
      <MobileToggle isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      <MobileSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isActive={isActive}
      />
    </header>
  );
};

export default Header;
