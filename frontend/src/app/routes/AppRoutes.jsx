import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import B2BLayout from "../layouts/B2BLayout";
import ProtectedRoute from "./ProtectedRoute";
import PageLoader from "../../shared/components/ui/PageLoader";

// ── Public / customer pages ─────────────────────────────────
const HomePage = lazy(() => import("../../features/home/pages/HomePage"));
const ProductsPage = lazy(
  () => import("../../features/products/pages/ProductsPage"),
);
const ProductDetailsPage = lazy(
  () => import("../../features/products/pages/ProductDetailsPage"),
);
const OurProcessPage = lazy(
  () => import("../../features/ourProcess/pages/OurProcessPage"),
);
const Why7ALPsPage = lazy(
  () => import("../../features/why7ALPs/pages/Why7ALPsPage"),
);
const GlobalTradePage = lazy(
  () => import("../../features/globalTrade/pages/GlobalTradePage"),
);
const PartnershipsPage = lazy(
  () => import("../../features/partnerships/pages/PartnershipsPage"),
);
const B2BPortal = lazy(
  () => import("../../features/b2bPortal/pages/B2BPortal"),
);
const ContactPage = lazy(
  () => import("../../features/contact/pages/ContactPage"),
);
const CartPage = lazy(() => import("../../features/cart/pages/CartPage"));
const CheckoutPage = lazy(
  () => import("../../features/cart/pages/CheckoutPage"),
);
const CustomerOrders = lazy(
  () => import("../../features/customer/pages/CustomerOrders"),
);
const CustomerProfile = lazy(
  () => import("../../features/customer/pages/CustomerProfile"),
);
const PageNotFound = lazy(() => import("../../features/notFound/PageNotFound"));

// ── Auth pages ───────────────────────────────────────────────
const CustomerLoginPage = lazy(
  () => import("../../features/auth/pages/customer/CustomerLoginPage"),
);
const CustomerRegisterPage = lazy(
  () => import("../../features/auth/pages/customer/CustomerRegisterPage"),
);
const CustomerVerifyOTPPage = lazy(
  () => import("../../features/auth/pages/customer/CustomerVerifyOTPPage"),
);
const B2BLoginPage = lazy(
  () => import("../../features/auth/pages/b2b/B2BLoginPage"),
);
const B2BForgotPasswordPage = lazy(
  () => import("../../features/auth/pages/b2b/B2BForgotPasswordPage"),
);
const B2BResetPasswordPage = lazy(
  () => import("../../features/auth/pages/b2b/B2BResetPasswordPage"),
);
const AdminLoginPage = lazy(
  () => import("../../features/auth/pages/admin/AdminLoginPage"),
);
const AdminForgotPasswordPage = lazy(
  () => import("../../features/auth/pages/admin/AdminForgotPasswordPage"),
);
const AdminResetPasswordPage = lazy(
  () => import("../../features/auth/pages/admin/AdminResetPasswordPage"),
);

// ── B2B pages ────────────────────────────────────────────────
const B2BDashboard = lazy(
  () => import("../../features/b2b/pages/B2BDashboard"),
);
const RequestQuote = lazy(
  () => import("../../features/b2b/pages/RequestQuote"),
);
const B2BOrders = lazy(() => import("../../features/b2b/pages/Orders"));
const Catalog = lazy(() => import("../../features/b2b/pages/Catalog"));

// ── Admin pages ──────────────────────────────────────────────
const Dashboard = lazy(() => import("../../features/admin/pages/Dashboard"));
const Products = lazy(() => import("../../features/admin/pages/Products"));
const Orders = lazy(() => import("../../features/admin/pages/Orders"));
const Customers = lazy(() => import("../../features/admin/pages/Customers"));
const Categories = lazy(() => import("../../features/admin/pages/Categories"));
const Reviews = lazy(() => import("../../features/admin/pages/Reviews"));
const B2BTeam = lazy(() => import("../../features/admin/pages/B2BTeam"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
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
            <ProtectedRoute role="b2b">
              <B2BLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<B2BDashboard />} />
          <Route path="request-quote" element={<RequestQuote />} />
          <Route path="orders" element={<B2BOrders />} />
          <Route path="catalog" element={<Catalog />} />
        </Route>

        <Route
          path="/admin/"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="categories" element={<Categories />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="b2b" element={<B2BTeam />} />
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
          <Route
            path="/b2b/reset-password"
            element={<B2BResetPasswordPage />}
          />
          <Route path="/b2b/login" element={<B2BLoginPage />} />
          {/* <Route path="/b2b/register" element={<B2BRegisterPage />} /> */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
