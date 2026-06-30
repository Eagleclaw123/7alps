import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../../features/home/pages/HomePage";
import ProductsPage from "../../features/products/pages/ProductsPage";
import ProcessPage from "../../features/process/pages/ProcessPage";
import WhyChooseUsPage from "../../features/whyChooseUs/pages/WhyChooseUsPage";
import GlobalTradePage from "../../features/globalTrade/pages/GlobalTradePage";
import PartnershipsPage from "../../features/partnerships/pages/PartnershipsPage";
import ContactPage from "../../features/contact/pages/ContactPage";
import AdminLoginPage from "../../features/admin/pages/AdminLoginPage";
import AdminDashboard from "../../features/admin/pages/AdminDashboard";
import { useAuth } from "../providers/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/admin" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/our-process" element={<ProcessPage />} />
        <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
        <Route path="/global-trade" element={<GlobalTradePage />} />
        <Route path="/partnerships" element={<PartnershipsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      <Route path="/admin" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
