import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import Sidebar from "../../shared/dashboard/components/Sidebar";
import Header from "../../shared/dashboard/components/Header";
import b2bMenu from "../../shared/dashboard/data/b2bMenu";

const B2BLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <DashboardLayout
      Sidebar={() => (
        <Sidebar
          menuItems={b2bMenu}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      )}
      Header={() => (
        <Header
          title="Business Dashboard"
          subtitle="Welcome back! Manage your account and orders."
          onMenuClick={() => setMobileOpen(true)}
        />
      )}
    />
  );
};

export default B2BLayout;
