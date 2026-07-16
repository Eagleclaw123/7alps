import { logout as adminLogout } from "./auth.service";
import { b2bLogout } from "./b2b.service";
import { logoutCustomer } from "./customer.service";

const LOGOUT_BY_ROLE = {
  admin: adminLogout,
  b2b: b2bLogout,
  customer: logoutCustomer,
};

export const handleLogout = async (role, navigate) => {
  try {
    const logoutRequest = LOGOUT_BY_ROLE[role];
    if (logoutRequest) await logoutRequest();

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
