import { useState } from "react";

import DashboardLayout from "./DashboardLayout";

import Sidebar from "../../shared/dashboard/components/Sidebar";
import Header from "../../shared/dashboard/components/Header";

import customerMenu from "../../shared/dashboard/data/customerMenu";

const CustomerLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <DashboardLayout
      Sidebar={() => (
        <Sidebar
          menuItems={customerMenu}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      )}
      Header={() => (
        <Header
          title="Customer Dashboard"
          subtitle="Welcome back! Manage your account and orders."
          onMenuClick={() => setMobileOpen(true)}
        />
      )}
    />
  );
};

export default CustomerLayout;
