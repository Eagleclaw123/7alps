import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    switch (role) {
      case "admin":
        return <Navigate to="/admin/login" replace />;

      case "b2b":
        return <Navigate to="/b2b/login" replace />;

      case "customer":
        return <Navigate to="/customer/login" replace />;

      default:
        return <Navigate to="/" replace />;
    }
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
