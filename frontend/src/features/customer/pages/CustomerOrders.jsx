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

const STATUS_STYLES = {
  Confirmed: "bg-[#EAF3E4] text-[#3F6B2C]",
  Processing: "bg-[#FBF1DD] text-[#96731C]",
  Shipped: "bg-[#EFEAF7] text-[#5B4A9E]",
  Delivered: "bg-[#E7F0F7] text-[#2F5D82]",
  Cancelled: "bg-[#FBEAEA] text-[#B14444]",
};

// Ordered tracking steps. Every order progresses left -> right through these.
const TRACKING_STEPS = [
  { key: "Confirmed", icon: Leaf },
  { key: "Processing", icon: Leaf },
  { key: "Shipped", icon: Truck },
  { key: "Delivered", icon: Home },
];

const PAGE_SIZE = 5;

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
 * Horizontal order-tracking stepper with leaf/truck/home icons and an
 * optional timestamp per step. Timestamps come from `order.statusHistory`
 * (an array of { status, timestamp }) if the API provides one; if not,
 * only the "Confirmed" step falls back to `order.placedAt` and the rest
 * are left blank rather than guessed.
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
    <div className="flex items-center">
      {TRACKING_STEPS.map((step, index) => {
        const isComplete = currentIndex >= index;
        const StepIcon = step.icon;
        const time = timeForStep(step.key);

        return (
          <div
            key={step.key}
            className="flex flex-1 items-center last:flex-none"
          >
            <div className="flex flex-col items-center">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors ${
                  isComplete
                    ? "border-[#3F6B2C] bg-[#3F6B2C] text-white"
                    : "border-[#D9D4C4] bg-white text-[#B7B29F]"
                }`}
              >
                <StepIcon className="h-4 w-4" />
              </span>
              <span
                className={`mt-2 text-xs font-medium ${
                  isComplete ? "text-[#3F6B2C]" : "text-[#B7B29F]"
                }`}
              >
                {step.key}
              </span>
              {time ? (
                <span className="text-[11px] text-[#B7B29F]">{time}</span>
              ) : null}
            </div>

            {index < TRACKING_STEPS.length - 1 ? (
              <div
                className={`mx-2 h-[2px] flex-1 rounded-full ${
                  currentIndex > index ? "bg-[#3F6B2C]" : "bg-[#E5E1D4]"
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
              <div className="mb-6 rounded-xl bg-[#EAF3E4] p-4 text-[#3F6B2C]">
                Your order has been placed successfully!
              </div>
            ) : null}

            {/* Search */}
            <div className="mb-6 flex justify-end">
              <div className="relative w-full sm:w-80">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B7B29F]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search your orders by ID..."
                  className="w-full rounded-full border border-[#E5E1D4] bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none focus:border-[#3F6B2C] focus:ring-1 focus:ring-[#3F6B2C]"
                />
              </div>
            </div>

            {/* (Status tabs kept available but hidden per existing design —
                re-enable by rendering TABS.map if wanted) */}

            {/* Orders list */}
            <div className="space-y-6">
              {loading ? (
                <p className="text-center text-gray-500">Loading orders...</p>
              ) : pagedOrders.length === 0 ? (
                <div className="rounded-2xl border border-[#E5E1D4] bg-white p-10 text-center text-gray-500">
                  You haven't placed any orders yet.
                </div>
              ) : (
                pagedOrders.map((order) => (
                  <div
                    key={order._id}
                    className="rounded-2xl border border-[#E5E1D4] bg-white p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF3E4]">
                          <Package className="h-5 w-5 text-[#3F6B2C]" />
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </p>
                          <p className="text-sm text-gray-400">
                            {new Date(order.placedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                          STATUS_STYLES[order.status] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <Leaf className="h-3 w-3" />
                        {order.status}
                      </span>
                    </div>

                    <div className="mt-5 rounded-xl border border-[#F0EEE3] bg-[#FBFAF6] px-4 py-4">
                      <OrderTrackingBar order={order} />
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
                      {/* Items */}
                      <div className="flex flex-col justify-between items-start rounded-xl border border-[#F0EEE3] bg-white p-5">
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
                                  className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                                />
                              ) : (
                                <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-[#EAF3E4]">
                                  <Package className="h-6 w-6 text-[#3F6B2C]" />
                                </span>
                              )}
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-gray-900">
                                    {item.name}
                                  </span>
                                  <span className="flex items-center gap-1 rounded-full bg-[#EAF3E4] px-2 py-0.5 text-[10px] font-medium text-[#3F6B2C]">
                                    <Leaf className="h-2.5 w-2.5" />
                                    Natural
                                  </span>
                                </div>
                                <p className="text-xs text-gray-400">
                                  {item.variantLabel} · Qty {item.quantity}
                                </p>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                ₹{item.subtotal}
                              </span>
                            </div>
                          ))}
                        </div>

                        <button className="mt-4 rounded-lg border border-[#3F6B2C] px-4 py-2 text-sm font-medium text-[#3F6B2C] hover:bg-[#EAF3E4]">
                          Order Again
                          <LiaUndoAltSolid className="inline-block ml-1" />
                        </button>
                      </div>

                      {/* Summary */}
                      <div className="rounded-xl border border-[#F0EEE3] bg-white p-5">
                        <div className="space-y-4 text-sm">
                          <div className="flex items-start justify-between gap-3">
                            <span className="flex items-center gap-2 text-gray-500">
                              <ShoppingBag className="h-4 w-4" />
                              Total Items
                            </span>
                            <span className="font-medium text-gray-900">
                              {order.items.reduce(
                                (sum, i) => sum + i.quantity,
                                0,
                              )}{" "}
                              Item(s)
                            </span>
                          </div>

                          <div className="flex items-start justify-between gap-3">
                            <span className="flex items-center gap-2 text-gray-500">
                              <CreditCard className="h-4 w-4" />
                              Payment Method
                            </span>
                            <span className="font-medium text-gray-900">
                              {order.paymentMethod}
                            </span>
                          </div>

                          <div className="flex items-start justify-between gap-3">
                            <span className="flex items-center gap-2 text-gray-500">
                              <MapPin className="h-4 w-4" />
                              Shipping Address
                            </span>
                            <span className="max-w-[60%] text-right font-medium text-gray-900">
                              {order.shippingAddress?.city},{" "}
                              {order.shippingAddress?.state}
                              <br />
                              {order.shippingAddress?.country} -{" "}
                              {order.shippingAddress?.pincode}
                            </span>
                          </div>

                          <div className="flex items-center justify-between border-t border-[#F0EEE3] pt-4">
                            <span className="flex items-center gap-2 text-gray-500">
                              <BadgeIndianRupee className="h-4 w-4" />
                              Order Total
                            </span>
                            <span className="text-lg font-semibold text-[#3F6B2C]">
                              ₹{order.totalAmount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
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
              <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#EFEBDD] p-6 sm:flex-row">
                <div>
                  <p className="text-lg font-semibold text-[#1A1A18]">
                    Need More Herbal Products?
                  </p>
                  <p className="text-sm text-[#6B6A63]">
                    Continue your wellness journey with nature's best.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/products")}
                  className="flex items-center gap-2 rounded-lg bg-[#3F6B2C] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#345A24]"
                >
                  <Leaf className="h-4 w-4" />
                  Shop Now
                </button>
              </div>
            ) : null}

            {/* ── You May Also Like ──────────────────────────────────── */}
            {!loading && recommended.length > 0 ? (
              <div className="mt-10">
                <p className="mb-4 flex items-center gap-2 font-serif text-lg text-[#1A1A18]">
                  <Leaf className="h-4 w-4 text-[#3F6B2C]" />
                  You May Also Like
                </p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {recommended.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="rounded-xl border border-[#E5E1D4] bg-white p-3 text-left hover:border-[#3F6B2C]"
                    >
                      {product.ProductImage ? (
                        <img
                          src={product.ProductImage}
                          alt={product.ProductName}
                          className="mb-2 h-28 w-full rounded-lg object-cover"
                        />
                      ) : (
                        <span className="mb-2 flex h-28 w-full items-center justify-center rounded-lg bg-[#EAF3E4]">
                          <Package className="h-6 w-6 text-[#3F6B2C]" />
                        </span>
                      )}
                      <p className="truncate text-sm font-medium text-gray-900">
                        {product.ProductName}
                      </p>
                      <p className="text-sm font-semibold text-[#3F6B2C]">
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
