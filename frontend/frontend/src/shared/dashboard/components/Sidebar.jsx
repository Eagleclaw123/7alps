import SidebarDesktop from "./SidebarDesktop";
import SidebarMobile from "./SidebarMobile";

const Sidebar = ({ menuItems, mobileOpen, onClose }) => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <SidebarDesktop menuItems={menuItems} />
      </div>

      {/* Mobile */}
      <SidebarMobile
        open={mobileOpen}
        onClose={onClose}
        menuItems={menuItems}
      />
    </>
  );
};

export default Sidebar;
