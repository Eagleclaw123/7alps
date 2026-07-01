import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import Header from "../../shared/dashboard/components/Header";
import Sidebar from "../../shared/dashboard/components/Sidebar";
import adminMenu from "../../shared/dashboard/data/adminMenu";

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <DashboardLayout
      Sidebar={() => (
        <Sidebar
          menuItems={adminMenu}
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
