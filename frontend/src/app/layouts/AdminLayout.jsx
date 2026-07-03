import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "./DashboardLayout";
import Header from "../../shared/dashboard/components/Header";
import Sidebar from "../../shared/dashboard/components/Sidebar";
import adminMenu from "../../shared/dashboard/data/adminMenu";
import { handleLogout } from "../../shared/services/logoutService";

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = adminMenu.map((item) =>
    item.title === "Logout"
      ? {
          ...item,
          onClick: () => handleLogout("admin", navigate),
        }
      : item,
  );

  return (
    <DashboardLayout
      Sidebar={(props) => (
        <Sidebar
          {...props}
          menuItems={menuItems}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      )}
      Header={() => (
        <Header
          title="Admin Dashboard"
          subtitle="Welcome back! Manage your account and orders."
          onMenuClick={() => setMobileOpen(true)}
        />
      )}
    />
  );
};

export default AdminLayout;
