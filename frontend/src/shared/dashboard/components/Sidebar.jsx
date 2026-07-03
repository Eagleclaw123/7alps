import SidebarDesktop from "./SidebarDesktop";
import SidebarMobile from "./SidebarMobile";

const Sidebar = ({
  menuItems,
  collapsed,
  setCollapsed,
  mobileOpen,
  onClose,
}) => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <SidebarDesktop
          menuItems={menuItems}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
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
