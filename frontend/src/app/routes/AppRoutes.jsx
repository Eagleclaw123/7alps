import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../../features/home/pages/HomePage";
import ProductsPage from "../../features/products/pages/ProductsPage";
import OurProcessPage from "../../features/ourProcess/pages/OurProcessPage";
import GlobalTradePage from "../../features/globalTrade/pages/GlobalTradePage";
import PartnershipsPage from "../../features/partnerships/pages/PartnershipsPage";
import ContactPage from "../../features/contact/pages/ContactPage";
import Why7ALPsPage from "../../features/why7ALPs/pages/Why7ALPsPage";
import B2BPortal from "../../features/b2bPortal/pages/B2BPortal";
import CustomerLoginPage from "../../features/auth/pages/customer/CustomerLoginPage";
import B2BLoginPage from "../../features/auth/pages/b2b/B2BLoginPage";
import AdminLoginPage from "../../features/auth/pages/admin/AdminLoginPage";
import AuthLayout from "../layouts/AuthLayout";
import CustomerRegisterPage from "../../features/auth/pages/customer/CustomerRegisterPage";
import B2BForgotPasswordPage from "../../features/auth/pages/b2b/B2BForgotPasswordPage";
import AdminForgotPasswordPage from "../../features/auth/pages/admin/AdminForgotPasswordPage";
import CustomerVerifyOTPPage from "../../features/auth/pages/customer/CustomerVerifyOTPPage";
import AdminResetPasswordPage from "../../features/auth/pages/admin/AdminResetPasswordPage";
import B2BResetPasswordPage from "../../features/auth/pages/b2b/B2BResetPasswordPage";
import ProductDetailsPage from "../../features/products/pages/ProductDetailsPage";
import AdminLayout from "../layouts/AdminLayout";
import B2BLayout from "../layouts/B2BLayout";
import PageNotFound from "../../features/notFound/PageNotFound";
import B2BDashboard from "../../features/b2b/pages/B2BDashboard";
import AdminDashboard from "../../features/admin/pages/AdminDashboard";
import AdminProducts from "../../features/admin/pages/AdminProducts";
import CartPage from "../../features/cart/pages/CartPage";
import CheckoutPage from "../../features/cart/pages/CheckoutPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminOrders from "../../features/admin/pages/AdminOrders";
import CustomerOrders from "../../features/customer/pages/CustomerOrders";
import CustomerProfile from "../../features/customer/pages/CustomerProfile";
import AdminCustomers from "../../features/admin/pages/AdminCustomers";
import AdminCategories from "../../features/admin/pages/AdminCategories";
import AdminReviews from "../../features/admin/pages/AdminReviews";
import BulkOrders from "../../features/b2b/pages/BulkOrders";
import RequestQuote from "../../features/b2b/pages/RequestQuote";
import OrderHistory from "../../features/b2b/pages/OrderHistory";
import Catalog from "../../features/b2b/pages/Catalog";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/our-process" element={<OurProcessPage />} />
        <Route path="/why-7alps" element={<Why7ALPsPage />} />
        <Route path="/global-trade" element={<GlobalTradePage />} />
        <Route path="/partners" element={<PartnershipsPage />} />
        <Route path="/b2b-portal" element={<B2BPortal />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route
          path="checkout"
          element={
            <ProtectedRoute role="customer">
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/orders"
          element={
            <ProtectedRoute role="customer">
              <CustomerOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/profile"
          element={
            <ProtectedRoute role="customer">
              <CustomerProfile />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/b2b/"
        element={
          // <ProtectedRoute role="b2b">
          <B2BLayout />
          // </ProtectedRoute>
        }
      >
        <Route index element={<B2BDashboard />} />
        <Route path="bulk-orders" element={<BulkOrders />} />
        <Route path="request-quote" element={<RequestQuote />} />
        <Route path="orders" element={<OrderHistory />} />
        <Route path="catalog" element={<Catalog />} />
      </Route>

      <Route
        path="/admin/"
        element={
          // <ProtectedRoute role="admin">
          <AdminLayout />
          // </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="reviews" element={<AdminReviews />} />
        {/* Add more admin routes here */}
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/customer/login" element={<CustomerLoginPage />} />
        <Route path="/customer/register" element={<CustomerRegisterPage />} />
        <Route
          path="/customer/verify-otp"
          element={<CustomerVerifyOTPPage />}
        />

        <Route
          path="/admin/forgot-password"
          element={<AdminForgotPasswordPage />}
        />

        <Route
          path="/b2b/forgot-password"
          element={<B2BForgotPasswordPage />}
        />

        <Route
          path="/admin/reset-password"
          element={<AdminResetPasswordPage />}
        />

        <Route path="/b2b/reset-password" element={<B2BResetPasswordPage />} />

        <Route path="/b2b/login" element={<B2BLoginPage />} />
        {/* <Route path="/b2b/register" element={<B2BRegisterPage />} /> */}

        <Route path="/admin/login" element={<AdminLoginPage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
