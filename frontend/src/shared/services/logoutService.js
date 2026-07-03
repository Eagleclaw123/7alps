import { logout } from "./auth.service";

export const handleLogout = async (role, navigate) => {
  try {
    await logout();

    localStorage.removeItem("user");

    switch (role) {
      case "admin":
        navigate("/admin/login", { replace: true });
        break;

      case "b2b":
        navigate("/b2b/login", { replace: true });
        break;

      case "customer":
        navigate("/customer/login", { replace: true });
        break;

      default:
        navigate("/", { replace: true });
    }
  } catch (error) {
    console.error(error);
  }
};
