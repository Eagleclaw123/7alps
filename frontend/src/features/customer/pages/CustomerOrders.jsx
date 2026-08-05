import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Package,
  ShoppingBag,
  CreditCard,
  MapPin,
  BadgeIndianRupee,
  Leaf,
  Truck,
  Home,
  X,
} from "lucide-react";
import { LiaUndoAltSolid } from "react-icons/lia";

import { getMyOrders } from "../../../shared/services/order.service";
import { getPublicProducts } from "../../../shared/services/product.service";
import { normalizeProducts } from "../../products/utils/normalizeProduct";
import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import Pagination from "../../products/components/ProductPagination";
import HeroBanner from "../../../shared/components/ui/HeroBanner";

const TABS = [
  "All Orders",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

/**
 * Status badge treatment: in-progress states share the forest outline so
 * they read as one continuous journey, "Delivered" fills solid as the
 * completed end-state, and "Cancelled" breaks the leaf language entirely
 * (clay, X icon) so it never reads as "just a slow order".
 */
const STATUS_BADGE = {
  Confirmed: {
    className: "border border-[#16442C] text-[#16442C] bg-white",
    icon: Leaf,
  },
  Processing: {
    className: "border border-[#16442C] text-[#16442C] bg-white",
    icon: Leaf,
  },
  Shipped: {
    className: "border border-[#16442C] text-[#16442C] bg-white",
    icon: Truck,
  },
  Delivered: { className: "bg-[#16442C] text-white", icon: Home },
  Cancelled: {
    className: "border border-[#B4652F] text-[#B4652F] bg-[#B4652F]/5",
    icon: X,
  },
};

// Ordered tracking steps. Every non-cancelled order progresses left -> right through these.
const TRACKING_STEPS = [
  { key: "Confirmed", icon: Leaf },
  { key: "Processing", icon: Leaf },
  { key: "Shipped", icon: Truck },
  { key: "Delivered", icon: Home },
];

const PAGE_SIZE = 5;

/* Dashed "perforation" strip — the seed-packet detail used across the site */
const Perforation = () => (
  <div
    className="h-px w-full"
    style={{
      backgroundImage:
        "repeating-linear-gradient(to right, #C9C2AE 0, #C9C2AE 6px, transparent 6px, transparent 13px)",
    }}
  />
);

/**
 * Formats a Date (or date-string) as e.g. "23 Jul, 09:59 AM".
 * Returns null if the value is missing/invalid so callers can hide it.
 */
const formatStepTime = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Compact horizontal order-tracking stepper with leaf/truck/home icons and
 * an optional timestamp per step. Timestamps come from `order.statusHistory`
 * (an array of { status, timestamp }) if the API provides one; if not,
 * only the "Confirmed" step falls back to `order.placedAt` and the rest
 * are left blank rather than guessed.
 *
 * Only rendered for orders that are actually progressing — Cancelled orders
 * get a separate, non-progress treatment below instead of this bar grayed out.
 */
const OrderTrackingBar = ({ order }) => {
  const currentIndex = TRACKING_STEPS.findIndex(
    (step) => step.key === order.status,
  );

  const timeForStep = (stepKey) => {
    const fromHistory = order.statusHistory?.find(
      (entry) => entry.status === stepKey,
    )?.timestamp;

    if (fromHistory) return formatStepTime(fromHistory);
    if (stepKey === "Confirmed") return formatStepTime(order.placedAt);
    return null;
  };

  return (
    <div className="flex items-start">
      {TRACKING_STEPS.map((step, index) => {
        const isComplete = currentIndex >= index;
        const StepIcon = step.icon;
        const time = timeForStep(step.key);

        return (
          <div
            key={step.key}
            className="flex flex-1 items-start last:flex-none min-w-0"
          >
            <div className="flex flex-col items-center flex-shrink-0 w-9">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                  isComplete
                    ? "border-[#16442C] bg-[#16442C] text-white"
                    : "border-[#E3DFD2] bg-white text-[#B8B2A0]"
                }`}
              >
                <StepIcon className="h-3.5 w-3.5" />
              </span>
              <span
                className={`mt-2 text-[11px] font-semibold uppercase tracking-wide text-center whitespace-nowrap ${
                  isComplete ? "text-[#16442C]" : "text-[#B8B2A0]"
                }`}
              >
                {step.key}
              </span>
              {time ? (
                <span className="text-[10px] text-[#B8B2A0] whitespace-nowrap">
                  {time}
                </span>
              ) : null}
            </div>

            {index < TRACKING_STEPS.length - 1 ? (
              <div
                className={`mx-2 mt-[15px] h-px flex-1 ${
                  currentIndex > index ? "bg-[#16442C]" : "bg-[#E3DFD2]"
                }`}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

const CustomerOrders = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All Orders");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    getMyOrders()
      .then(({ data }) => setOrders(data?.data?.orders || []))
      .finally(() => setLoading(false));
  }, []);

  // Cross-sell strip — reuses the same public products endpoint the
  // storefront already uses, just capped to a handful of items.
  useEffect(() => {
    let cancelled = false;

    getPublicProducts()
      .then(({ data }) => {
        if (!cancelled) {
          setRecommended(normalizeProducts(data?.data?.products).slice(0, 4));
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const idMatch = order._id
        .slice(-8)
        .toUpperCase()
        .includes(search.trim().toUpperCase());

      const tabMatch =
        activeTab === "All Orders" ? true : order.status === activeTab;

      return idMatch && tabMatch;
    });
  }, [orders, activeTab, search]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));
  const pagedOrders = filteredOrders.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <AnimatedPage>
      {/* <div className="bg-[#FBF8F2]"> */}
      <div>
        <HeroBanner
          eyebrow="Orders"
          title="Your Orders"
          description="View past purchases, track shipments, and reorder your favorites."
          image="https://res.cloudinary.com/dasvdkncm/image/upload/v1784788176/ChatGPT_Image_Jul_23_2026_11_57_14_AM_gbwvsk.png"
        />

        <div className="px-6 py-10 xl:px-0">
          <div className="mx-auto max-w-7xl">
            {location.state?.justPlaced ? (
              <div className="mb-6 border border-[#16442C]/30 bg-[#16442C]/5 p-4 text-[#16442C]">
                Your order has been placed successfully!
              </div>
            ) : null}

            {/* Search */}
            <div className="mb-6 flex justify-end">
              <div className="relative w-full sm:w-80">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B8B2A0]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search your orders by ID..."
                  className="w-full rounded-full border border-[#E3DFD2] bg-white py-2.5 pl-10 pr-4 text-sm text-[#201F1B] outline-none focus:border-[#16442C]"
                />
              </div>
            </div>

            {/* (Status tabs kept available but hidden per existing design —
                re-enable by rendering TABS.map if wanted) */}

            {/* Orders list */}
            <div className="space-y-6">
              {loading ? (
                <p className="text-center text-[#86806F]">Loading orders...</p>
              ) : pagedOrders.length === 0 ? (
                <div className="border border-[#E3DFD2] bg-white p-10 text-center text-[#86806F]">
                  You haven't placed any orders yet.
                </div>
              ) : (
                pagedOrders.map((order) => {
                  const badge = STATUS_BADGE[order.status] || {
                    className:
                      "border border-[#E3DFD2] text-[#86806F] bg-white",
                    icon: Leaf,
                  };
                  const BadgeIcon = badge.icon;
                  const isCancelled = order.status === "Cancelled";

                  const itemsTotal = order.items.reduce(
                    (sum, i) => sum + i.subtotal,
                    0,
                  );
                  const extraCharges = order.totalAmount - itemsTotal;

                  return (
                    <div
                      key={order._id}
                      className="border border-[#E3DFD2] bg-white p-6"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF1E6]">
                            <Package className="h-5 w-5 text-[#16442C]" />
                          </span>
                          <div>
                            <p className="font-medium text-lg text-[#201F1B]">
                              Order #{order._id.slice(-8).toUpperCase()}
                            </p>
                            <p className="text-sm text-[#86806F]">
                              {new Date(order.placedAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${badge.className}`}
                        >
                          <BadgeIcon className="h-3 w-3" />
                          {order.status}
                        </span>
                      </div>

                      <div className="mt-5">
                        <Perforation />
                      </div>

                      {isCancelled ? (
                        <div className="mt-5 flex items-center gap-3 border border-dashed border-[#B4652F]/40 bg-[#B4652F]/5 px-6 py-4 text-sm text-[#B4652F]">
                          <X className="h-4 w-4 flex-shrink-0" />
                          This order was cancelled and is no longer being
                          processed.
                        </div>
                      ) : (
                        <div className="mt-5 border border-[#F0EEE3] bg-[#FBF8F2]/60 px-6 py-4">
                          <OrderTrackingBar order={order} />
                        </div>
                      )}

                      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
                        {/* Items */}
                        <div className="flex flex-col justify-between items-start border border-[#F0EEE3] bg-white p-5">
                          <div className="w-full divide-y divide-[#F0EEE3]">
                            {order.items.map((item) => (
                              <div
                                key={`${item.product}-${item.variantLabel}`}
                                className="flex items-center gap-4 py-3"
                              >
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-16 w-16 flex-shrink-0 object-cover"
                                  />
                                ) : (
                                  <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center bg-[#EEF1E6]">
                                    <Package className="h-6 w-6 text-[#16442C]" />
                                  </span>
                                )}
                                <div className="flex-1">
                                  <span className="text-sm font-medium text-[#201F1B]">
                                    {item.name}
                                  </span>
                                  <p className="text-xs text-[#86806F]">
                                    {item.variantLabel} · Qty {item.quantity}
                                  </p>
                                </div>
                                <span className="text-sm font-medium text-[#201F1B]">
                                  ₹{item.subtotal}
                                </span>
                              </div>
                            ))}
                          </div>

                          <button className="mt-4 flex items-center gap-1.5 rounded-full border border-[#16442C] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#16442C] hover:bg-[#16442C] hover:text-white">
                            Order Again
                            <LiaUndoAltSolid className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Summary */}
                        <div className="border border-[#F0EEE3] bg-white p-5">
                          <div className="space-y-4 text-sm">
                            <div className="flex items-start justify-between gap-3">
                              <span className="flex items-center gap-2 text-[#86806F]">
                                <ShoppingBag className="h-4 w-4" />
                                Total Items
                              </span>
                              <span className="font-medium text-[#201F1B]">
                                {order.items.reduce(
                                  (sum, i) => sum + i.quantity,
                                  0,
                                )}{" "}
                                Item(s)
                              </span>
                            </div>

                            <div className="flex items-start justify-between gap-3">
                              <span className="flex items-center gap-2 text-[#86806F]">
                                <CreditCard className="h-4 w-4" />
                                Payment Method
                              </span>
                              <span className="font-medium text-[#201F1B]">
                                {order.paymentMethod}
                              </span>
                            </div>

                            <div className="flex items-start justify-between gap-3">
                              <span className="flex items-center gap-2 text-[#86806F]">
                                <MapPin className="h-4 w-4" />
                                Shipping Address
                              </span>
                              <span className="max-w-[60%] text-right font-medium text-[#201F1B]">
                                {order.shippingAddress?.city},{" "}
                                {order.shippingAddress?.state}
                                <br />
                                {order.shippingAddress?.country} -{" "}
                                {order.shippingAddress?.pincode}
                              </span>
                            </div>

                            {extraCharges !== 0 &&
                            !Number.isNaN(extraCharges) ? (
                              <div className="flex items-start justify-between gap-3">
                                <span className="flex items-center gap-2 text-[#86806F]">
                                  <BadgeIndianRupee className="h-4 w-4" />
                                  Taxes &amp; Shipping
                                </span>
                                <span className="font-medium text-[#201F1B]">
                                  ₹{extraCharges}
                                </span>
                              </div>
                            ) : null}

                            <div className="flex items-center justify-between border-t border-[#F0EEE3] pt-4">
                              <span className="flex items-center gap-2 text-[#86806F]">
                                <BadgeIndianRupee className="h-4 w-4" />
                                Order Total
                              </span>
                              <span className="text-lg font-medium text-[#16442C]">
                                ₹{order.totalAmount}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {!loading && filteredOrders.length > 0 ? (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            ) : null}

            {/* ── Cross-sell CTA ─────────────────────────────────────── */}
            {!loading && orders.length > 0 ? (
              <div className="mt-10 flex flex-col items-center justify-between gap-4 border border-[#E3DFD2] bg-[#EEF1E6] p-6 sm:flex-row">
                <div>
                  <p className="font-medium text-lg text-[#201F1B]">
                    Need More Herbal Products?
                  </p>
                  <p className="text-sm text-[#5B564A]">
                    Continue your wellness journey with nature's best.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/products")}
                  className="flex items-center gap-2 rounded-full bg-[#16442C] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-[#0E3220]"
                >
                  <Leaf className="h-4 w-4" />
                  Shop Now
                </button>
              </div>
            ) : null}

            {/* ── You May Also Like ──────────────────────────────────── */}
            {!loading && recommended.length > 0 ? (
              <div className="mt-10">
                <p className="mb-4 flex items-center gap-2 font-medium text-xl text-[#201F1B]">
                  <Leaf className="h-4 w-4 text-[#16442C]" />
                  You May Also Like
                </p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {recommended.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="border border-[#E3DFD2] bg-white p-3 text-left hover:border-[#16442C]"
                    >
                      {product.ProductImage ? (
                        <img
                          src={product.ProductImage}
                          alt={product.ProductName}
                          className="mb-2 h-28 w-full object-cover"
                        />
                      ) : (
                        <span className="mb-2 flex h-28 w-full items-center justify-center bg-[#EEF1E6]">
                          <Package className="h-6 w-6 text-[#16442C]" />
                        </span>
                      )}
                      <p className="truncate text-sm font-medium text-[#201F1B]">
                        {product.ProductName}
                      </p>
                      <p className="text-sm font-medium text-[#16442C]">
                        ₹{product.ProductPrice}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default CustomerOrders;
