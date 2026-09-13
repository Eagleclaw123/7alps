import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import {
  Search,
  Package,
  ShoppingBag,
  CreditCard,
  MapPin,
  BadgeIndianRupee,
  Truck,
  Home,
  X,
  Star,
  ArrowUpRight,
  Check,
} from "lucide-react";

import { LiaUndoAltSolid } from "react-icons/lia";

import { getMyOrders } from "../../../shared/services/order.service";
import { getPublicProducts } from "../../../shared/services/product.service";
import {
  getMyReviews,
  createReview,
} from "../../../shared/services/review.service";

import { addToCart } from "../../../store/slices/cartSlice";
import { normalizeProducts } from "../../products/utils/normalizeProduct";

import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import Pagination from "../../products/components/ProductPagination";
import ReviewModal from "../../products/components/ReviewModal";
import PageHero from "../../../shared/components/ui/PageHero";

const TABS = [
  "All Orders",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const TRACKING_STEPS = [
  { key: "Confirmed" },
  { key: "Processing" },
  { key: "Shipped" },
  { key: "Delivered" },
];

const PAGE_SIZE = 5;

/* ─────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────── */

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

const formatOrderDate = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* ─────────────────────────────────────────────────────────
   Order Tracking
───────────────────────────────────────────────────────── */

const OrderTrackingBar = ({ order }) => {
  const isCancelled = order.status === "Cancelled";

  const currentIndex = TRACKING_STEPS.findIndex(
    (step) => step.key === order.status,
  );

  const timeForStep = (stepKey) => {
    const fromHistory = order.statusHistory?.find(
      (entry) => entry.status === stepKey,
    )?.timestamp;

    if (fromHistory) return formatStepTime(fromHistory);

    if (stepKey === "Confirmed") {
      return formatStepTime(order.placedAt);
    }

    return null;
  };

  return (
    <div className="w-full">
      <div className="flex items-start">
        {TRACKING_STEPS.map((step, index) => {
          const isComplete = !isCancelled && currentIndex >= index;

          const isCurrent = !isCancelled && currentIndex === index;

          const isLast = index === TRACKING_STEPS.length - 1;

          const isCancelledOrigin = isCancelled && index === 0;

          const time = timeForStep(step.key);

          return (
            <div
              key={step.key}
              className={`flex min-w-0 items-start ${isLast ? "" : "flex-1"}`}
            >
              {/* Step */}
              <div className="flex w-[58px] shrink-0 flex-col items-center sm:w-[76px]">
                <div
                  className={`
                    relative flex h-9 w-9 items-center justify-center
                    border transition-all duration-500
                    ${
                      isComplete
                        ? "border-[#211B17] bg-[#211B17] text-[#F4EDE2]"
                        : isCancelledOrigin
                          ? "border-[#C56B4E] bg-[#C56B4E] text-white"
                          : "border-[#D8CCC0] bg-[#F4EDE2] text-[#91847A]"
                    }
                  `}
                >
                  {isComplete ? (
                    <Check className="h-3.5 w-3.5" strokeWidth={1.8} />
                  ) : isCancelledOrigin ? (
                    <X className="h-3.5 w-3.5" strokeWidth={1.8} />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  )}

                  {isCurrent && (
                    <span className="absolute -right-1 -top-1 h-2 w-2 bg-[#C56B4E]" />
                  )}
                </div>

                <span
                  className={`
                    mt-3 whitespace-nowrap
                    font-ibm-mono text-[7px]
                    uppercase tracking-[0.14em]
                    sm:text-[8px]
                    ${
                      isComplete
                        ? "text-[#211B17]"
                        : isCancelledOrigin
                          ? "text-[#C56B4E]"
                          : "text-[#91847A]"
                    }
                  `}
                >
                  {isCancelled && index === 0 ? "Cancelled" : step.key}
                </span>

                {time && (
                  <span className="mt-1 whitespace-nowrap font-manrope text-[9px] text-[#A79A90]">
                    {time}
                  </span>
                )}
              </div>

              {/* Connector */}
              {!isLast && (
                <div className="relative mx-2 mt-[18px] h-px flex-1 overflow-hidden bg-[#D8CCC0]">
                  <div
                    className={`absolute inset-y-0 left-0 transition-all duration-700 ${
                      !isCancelled && currentIndex > index
                        ? "w-full bg-[#211B17]"
                        : "w-0"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   Status
───────────────────────────────────────────────────────── */

const getStatusStyle = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-[#211B17] text-[#F4EDE2]";

    case "Cancelled":
      return "border border-[#C56B4E] text-[#C56B4E] bg-[#C56B4E]/5";

    case "Confirmed":
    case "Processing":
    case "Shipped":
      return "border border-[#D8CCC0] text-[#211B17] bg-[#F4EDE2]";

    default:
      return "border border-[#D8CCC0] text-[#756A62] bg-[#F4EDE2]";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Shipped":
      return Truck;

    case "Delivered":
      return Home;

    case "Cancelled":
      return X;

    default:
      return Package;
  }
};

/* ─────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────── */

const CustomerOrders = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All Orders");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [reorderingId, setReorderingId] = useState(null);
  const [reorderMessage, setReorderMessage] = useState(null);

  const [recommended, setRecommended] = useState([]);

  const [reviewedProductIds, setReviewedProductIds] = useState(new Set());

  const [reviewTarget, setReviewTarget] = useState(null);

  /* ─────────────────────────────────────────────────────
     Reorder
  ───────────────────────────────────────────────────── */

  const handleOrderAgain = async (order) => {
    setReorderingId(order._id);
    setReorderMessage(null);

    const failed = [];

    for (const item of order.items) {
      try {
        await dispatch(
          addToCart({
            productId: item.product,
            variantLabel: item.variantLabel,
            quantity: item.quantity,
            name: item.name,
            image: item.image,
            price: item.price,
          }),
        ).unwrap();
      } catch {
        failed.push(item.name);
      }
    }

    setReorderingId(null);

    if (failed.length) {
      setReorderMessage({
        orderId: order._id,
        text: `${
          failed.length === order.items.length
            ? "These items are"
            : "Some items are"
        } no longer available: ${failed.join(", ")}.`,
      });
    } else {
      navigate("/cart");
    }
  };

  /* ─────────────────────────────────────────────────────
     Fetch Orders / Reviews
  ───────────────────────────────────────────────────── */

  useEffect(() => {
    getMyOrders()
      .then(({ data }) => {
        setOrders(data?.data?.orders || []);
      })
      .finally(() => {
        setLoading(false);
      });

    getMyReviews()
      .then(({ data }) => {
        const ids = (data?.data?.reviews || []).map(
          (r) => r.product?._id || r.product,
        );

        setReviewedProductIds(new Set(ids));
      })
      .catch(() => {});
  }, []);

  /* ─────────────────────────────────────────────────────
     Review
  ───────────────────────────────────────────────────── */

  const handleSubmitReview = async ({ rating, comment }) => {
    await createReview({
      productId: reviewTarget.productId,
      rating,
      comment,
    });

    setReviewedProductIds((prev) => new Set([...prev, reviewTarget.productId]));

    setReviewTarget(null);
  };

  /* ─────────────────────────────────────────────────────
     Recommendations
  ───────────────────────────────────────────────────── */

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

  /* ─────────────────────────────────────────────────────
     Search / Filter
  ───────────────────────────────────────────────────── */

  const filteredOrders = useMemo(() => {
    const term = search.trim().toLowerCase();

    return orders.filter((order) => {
      const tabMatch =
        activeTab === "All Orders" ? true : order.status === activeTab;

      if (!tabMatch) return false;

      if (!term) return true;

      const address = order.shippingAddress || {};

      const haystack = [
        order._id.slice(-8),
        order.status,
        order.paymentMethod,
        order.paymentStatus,
        order.source,
        order.buyerBusinessName,
        String(order.totalAmount ?? ""),
        new Date(order.placedAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        address.name,
        address.line1,
        address.line2,
        address.city,
        address.state,
        address.pincode,
        ...order.items.flatMap((item) => [item.name, item.variantLabel]),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
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
    setPage(1);
  }, [search]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  /* ─────────────────────────────────────────────────────
     UI
  ───────────────────────────────────────────────────── */

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-[#F4EDE2] text-[#211B17]">
        {/* HERO */}

        <PageHero
          eyebrow="Your account"
          title="Your"
          titleHighlight="orders."
          description="Track your purchases and see where your wellness journey is headed."
          backgroundImage="https://res.cloudinary.com/dasvdkncm/image/upload/v1784788176/ChatGPT_Image_Jul_23_2026_11_57_14_AM_gbwvsk.png"
          imageAlt="7ALP orders"
          leftLabel="7ALP's / Orders"
          rightLabel="Personal / Delivery"
        />
        <section className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 xl:px-16">
          {/* Success message */}
          {location.state?.justPlaced && (
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mb-12 border-l-2 border-[#C56B4E] bg-white/50 px-6 py-5"
            >
              <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#C56B4E]">
                Order confirmed
              </span>

              <p className="mt-2 font-manrope text-sm text-[#211B17]">
                Your order has been placed successfully.
              </p>
            </motion.div>
          )}

          {/* PAGE HEADER */}
          <div className="flex flex-col gap-8  pb-8 lg:flex-row lg:items-end lg:justify-between">
            {/* Search */}
            <div className="w-full lg:max-w-[380px]">
              <label className="mb-2 block font-ibm-mono text-[8px] uppercase tracking-[0.24em] text-[#91847A]">
                Search orders
              </label>

              <div className="relative border-b border-[#CFC2B5]">
                <Search
                  className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#91847A]"
                  strokeWidth={1.4}
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Order ID, product, address..."
                  className="w-full bg-transparent py-3 pl-7 pr-2 font-manrope text-sm text-[#211B17] outline-none placeholder:text-[#A79A90] focus:border-[#C56B4E]"
                />
              </div>
            </div>
          </div>

          {/* ORDERS */}
          <div className="mt-10">
            {loading ? (
              <div className="py-24 text-center">
                <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
                  Loading / Orders
                </span>
              </div>
            ) : pagedOrders.length === 0 ? (
              <div className="border-t border-[#D8CCC0] py-20">
                <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
                  Orders / Empty
                </span>

                <h3 className="mt-5 font-manrope text-3xl font-medium tracking-[-0.05em]">
                  No orders found.
                </h3>

                <p className="mt-3 font-manrope text-sm leading-6 text-[#756A62]">
                  You haven&apos;t placed any orders matching your search.
                </p>
              </div>
            ) : (
              <div className="space-y-14">
                {pagedOrders.map((order, orderIndex) => {
                  const statusIcon = getStatusIcon(order.status);

                  const StatusIcon = statusIcon;

                  const isCancelled = order.status === "Cancelled";

                  const itemsTotal = order.items.reduce(
                    (sum, item) => sum + item.subtotal,
                    0,
                  );

                  const extraCharges = order.totalAmount - itemsTotal;

                  return (
                    <motion.article
                      key={order._id}
                      initial={{
                        opacity: 0,
                        y: 25,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.08,
                      }}
                      transition={{
                        duration: 0.7,
                        delay: orderIndex * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="border-t border-[#CFC2B5]"
                    >
                      {/* ORDER HEADER */}
                      <div className="flex flex-col gap-6 py-7 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-11 w-11 items-center justify-center border border-[#D8CCC0]">
                            <Package size={18} strokeWidth={1.3} />
                          </div>

                          <div>
                            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.22em] text-[#91847A]">
                              Order
                            </span>

                            <h3 className="mt-1 font-manrope text-lg font-medium tracking-[-0.025em]">
                              #{order._id.slice(-8).toUpperCase()}
                            </h3>

                            <p className="mt-1 font-manrope text-xs text-[#91847A]">
                              {formatOrderDate(order.placedAt)}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`inline-flex w-fit items-center gap-2 px-3 py-2 font-ibm-mono text-[8px] uppercase tracking-[0.16em] ${getStatusStyle(
                            order.status,
                          )}`}
                        >
                          <StatusIcon size={12} strokeWidth={1.5} />

                          {order.status}
                        </div>
                      </div>

                      {/* TRACKING */}
                      {isCancelled ? (
                        <div className="border-y border-[#C56B4E]/20 bg-[#C56B4E]/5 px-5 py-5">
                          <div className="flex items-center gap-3">
                            <X size={16} className="shrink-0 text-[#C56B4E]" />

                            <div>
                              <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#C56B4E]">
                                Order cancelled
                              </span>

                              <p className="mt-1 font-manrope text-xs leading-5 text-[#756A62]">
                                This order was cancelled and is no longer being
                                processed.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="border-y border-[#D8CCC0] py-7">
                          <OrderTrackingBar order={order} />
                        </div>
                      )}

                      {/* CONTENT */}
                      <div className="grid gap-10 py-8 lg:grid-cols-[1.55fr_0.85fr]">
                        {/* ITEMS */}
                        <div>
                          <div className="mb-5 flex items-center justify-between">
                            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
                              Items
                            </span>

                            <span className="font-ibm-mono text-[8px] text-[#B0A49A]">
                              {order.items.length.toString().padStart(2, "0")}
                            </span>
                          </div>

                          <div className="border-t border-[#D8CCC0]">
                            {order.items.map((item) => (
                              <div
                                key={`${item.product}-${item.variantLabel}`}
                                className="flex gap-5 border-b border-[#D8CCC0] py-5"
                              >
                                {/* Image */}
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-20 w-20 shrink-0 object-cover bg-[#EAE0D4]"
                                  />
                                ) : (
                                  <div className="flex h-20 w-20 shrink-0 items-center justify-center bg-[#EAE0D4]">
                                    <Package
                                      size={22}
                                      strokeWidth={1.2}
                                      className="text-[#91847A]"
                                    />
                                  </div>
                                )}

                                {/* Product */}
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                      <p className="font-manrope text-sm font-medium text-[#211B17]">
                                        {item.name}
                                      </p>

                                      <p className="mt-1 font-manrope text-xs text-[#91847A]">
                                        {item.variantLabel || "Standard"} · Qty{" "}
                                        {item.quantity}
                                      </p>
                                    </div>

                                    <span className="font-manrope text-sm font-medium text-[#211B17]">
                                      ₹{item.subtotal}
                                    </span>
                                  </div>

                                  {/* Review */}
                                  {order.status === "Delivered" && (
                                    <div className="mt-3">
                                      {reviewedProductIds.has(item.product) ? (
                                        <span className="flex items-center gap-1.5 font-ibm-mono text-[8px] uppercase tracking-[0.15em] text-[#91847A]">
                                          <Star
                                            size={11}
                                            fill="currentColor"
                                            strokeWidth={1}
                                          />
                                          Reviewed
                                        </span>
                                      ) : (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setReviewTarget({
                                              productId: item.product,
                                              name: item.name,
                                            })
                                          }
                                          className="flex items-center gap-1.5 font-ibm-mono text-[8px] uppercase tracking-[0.15em] text-[#C56B4E] transition-colors hover:text-[#211B17]"
                                        >
                                          <Star size={11} strokeWidth={1.4} />
                                          Rate this product
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Reorder */}
                          <div className="pt-6">
                            <button
                              type="button"
                              onClick={() => handleOrderAgain(order)}
                              disabled={reorderingId === order._id}
                              className="group inline-flex items-center gap-4 border border-[#211B17] px-6 py-3 font-manrope text-xs font-medium text-[#211B17] transition-all duration-300 hover:bg-[#211B17] hover:text-[#F4EDE2] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {reorderingId === order._id
                                ? "Adding to cart..."
                                : "Order again"}

                              <span className="transition-transform duration-300 group-hover:translate-x-1">
                                <LiaUndoAltSolid size={14} />
                              </span>
                            </button>

                            {reorderMessage?.orderId === order._id && (
                              <p className="mt-3 max-w-xl font-manrope text-xs leading-5 text-[#C56B4E]">
                                {reorderMessage.text}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* SUMMARY */}
                        <div className="border-t border-[#D8CCC0] lg:border-l lg:border-t-0 lg:pl-8">
                          <div className="mb-5">
                            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
                              Order summary
                            </span>
                          </div>

                          <div className="space-y-5">
                            <div className="flex items-start justify-between gap-5">
                              <span className="flex items-center gap-2 font-manrope text-xs text-[#91847A]">
                                <ShoppingBag size={14} />
                                Total items
                              </span>

                              <span className="font-manrope text-xs font-medium">
                                {order.items.reduce(
                                  (sum, item) => sum + item.quantity,
                                  0,
                                )}
                              </span>
                            </div>

                            <div className="flex items-start justify-between gap-5">
                              <span className="flex items-center gap-2 font-manrope text-xs text-[#91847A]">
                                <CreditCard size={14} />
                                Payment
                              </span>

                              <span className="max-w-[55%] text-right font-manrope text-xs font-medium">
                                {order.paymentMethod}
                              </span>
                            </div>

                            {!isCancelled && order.expectedDeliveryDate && (
                              <div className="flex items-start justify-between gap-5">
                                <span className="flex items-center gap-2 font-manrope text-xs text-[#91847A]">
                                  <Truck size={14} />
                                  Delivery
                                </span>

                                <span className="text-right font-manrope text-xs font-medium">
                                  {new Date(
                                    order.expectedDeliveryDate,
                                  ).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                            )}

                            <div className="flex items-start justify-between gap-5">
                              <span className="flex items-center gap-2 font-manrope text-xs text-[#91847A]">
                                <MapPin size={14} />
                                Shipping
                              </span>

                              <span className="max-w-[55%] text-right font-manrope text-xs font-medium leading-5">
                                {order.shippingAddress?.city},{" "}
                                {order.shippingAddress?.state}
                                <br />
                                {order.shippingAddress?.country} -{" "}
                                {order.shippingAddress?.pincode}
                              </span>
                            </div>

                            {extraCharges !== 0 &&
                              !Number.isNaN(extraCharges) && (
                                <div className="flex items-start justify-between gap-5">
                                  <span className="flex items-center gap-2 font-manrope text-xs text-[#91847A]">
                                    <BadgeIndianRupee size={14} />
                                    Taxes & shipping
                                  </span>

                                  <span className="font-manrope text-xs font-medium">
                                    ₹{extraCharges}
                                  </span>
                                </div>
                              )}

                            {/* Total */}
                            <div className="mt-6 border-t border-[#211B17] pt-5">
                              <div className="flex items-end justify-between gap-5">
                                <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#756A62]">
                                  Order total
                                </span>

                                <span className="font-manrope text-2xl font-medium tracking-[-0.04em] text-[#211B17]">
                                  ₹{order.totalAmount}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </div>

          {/* PAGINATION */}
          {!loading && filteredOrders.length > 0 && (
            <div className="mt-14 border-t border-[#D8CCC0] pt-8">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}

          {/* ─────────────────────────────────────────
              SHOP CTA
          ───────────────────────────────────────── */}
          {!loading && orders.length > 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="mt-10"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#C56B4E]">
                    Continue exploring
                  </span>

                  <h3 className="mt-3 font-manrope text-3xl font-medium tracking-[-0.055em] md:text-4xl">
                    More good things
                    <br />
                    <span className="font-normal text-[#91847A]">
                      start naturally.
                    </span>
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/products")}
                  className="group inline-flex w-fit items-center gap-4 bg-[#211B17] px-7 py-4 font-manrope text-sm font-medium text-[#F4EDE2] transition-colors hover:bg-[#C56B4E]"
                >
                  Shop products
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4EDE2] text-[#211B17] transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowUpRight size={14} />
                  </span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ─────────────────────────────────────────
              RECOMMENDED
          ───────────────────────────────────────── */}
          {!loading && recommended.length > 0 && (
            <motion.section
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="mt-24"
            >
              <div className="mb-8 flex items-end justify-between border-b border-[#D8CCC0] pb-6">
                <div>
                  <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#C56B4E]">
                    You might like
                  </span>

                  <h3 className="mt-3 font-manrope text-3xl font-medium tracking-[-0.055em]">
                    Worth another look.
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-[#CFC2B5] md:grid-cols-4">
                {recommended.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="group bg-[#F4EDE2] p-4 text-left md:p-5"
                  >
                    <div className="overflow-hidden bg-[#EAE0D4]">
                      {product.ProductImage ? (
                        <img
                          src={product.ProductImage}
                          alt={product.ProductName}
                          className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex aspect-square items-center justify-center">
                          <Package
                            size={28}
                            strokeWidth={1.2}
                            className="text-[#91847A]"
                          />
                        </div>
                      )}
                    </div>

                    <div className="mt-5">
                      <p className="truncate font-manrope text-sm font-medium text-[#211B17]">
                        {product.ProductName}
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-manrope text-sm text-[#756A62]">
                          ₹{product.ProductPrice}
                        </span>

                        <ArrowUpRight
                          size={14}
                          className="text-[#91847A] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.section>
          )}
        </section>
      </div>

      {/* REVIEW MODAL */}
      {reviewTarget ? (
        <ReviewModal
          onClose={() => setReviewTarget(null)}
          onSubmit={handleSubmitReview}
        />
      ) : null}
    </AnimatedPage>
  );
};

export default CustomerOrders;
