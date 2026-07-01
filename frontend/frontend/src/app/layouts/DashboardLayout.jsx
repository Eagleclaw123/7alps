import { Outlet } from "react-router-dom";

const DashboardLayout = ({ Sidebar, Header }) => {
  return (
    <div className="flex min-h-screen bg-[#F8FAF8]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <Header />

        {/* Page */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
