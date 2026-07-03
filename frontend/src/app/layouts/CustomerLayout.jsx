import { useState } from "react";

import DashboardLayout from "./DashboardLayout";

import Sidebar from "../../shared/dashboard/components/Sidebar";
import Header from "../../shared/dashboard/components/Header";

import customerMenu from "../../shared/dashboard/data/customerMenu";
import { useNavigate } from "react-router-dom";

const CustomerLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = customerMenu.map((item) =>
    item.title === "Logout"
      ? {
          ...item,
          onClick: () => handleLogout("customer", navigate),
        }
      : item,
  );

  return (
    <DashboardLayout
      Sidebar={(props) => (
        <Sidebar
          {...props}
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
