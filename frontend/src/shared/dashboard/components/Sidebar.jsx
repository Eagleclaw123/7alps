import SidebarDesktop from "./SidebarDesktop";
import SidebarMobile from "./SidebarMobile";

const Sidebar = ({
  menuItems,
  collapsed,
  setCollapsed,
  mobileOpen,
  onClose,
  portal,
}) => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <SidebarDesktop
          menuItems={menuItems}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          portal={portal}
        />
      </div>

      {/* Mobile */}
      <SidebarMobile
        open={mobileOpen}
        onClose={onClose}
        menuItems={menuItems}
        portal={portal}
      />
    </>
  );
};

export default Sidebar;
