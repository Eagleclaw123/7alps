import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="min-h-screen bg-[#F8FAF6]">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
