import { useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = ({ Sidebar, Header }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAF8]">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={`transition-all duration-300 ${
          collapsed ? "lg:ml-[80px]" : "lg:ml-[230px]"
        }`}
      >
        <Header />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
