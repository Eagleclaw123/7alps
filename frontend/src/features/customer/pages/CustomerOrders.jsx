import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  Package,
  ShoppingBag,
  CreditCard,
  MapPin,
  BadgeIndianRupee,
} from "lucide-react";
import { getMyOrders } from "../../../shared/services/order.service";
import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import Pagination from "../../products/components/ProductPagination";

const TABS = [
  "All Orders",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const STATUS_STYLES = {
  Confirmed: "bg-green-50 text-[#047B22]",
  Processing: "bg-yellow-50 text-yellow-700",
  Shipped: "bg-purple-50 text-purple-700",
  Delivered: "bg-blue-50 text-blue-700",
  Cancelled: "bg-red-50 text-red-700",
};

const PAGE_SIZE = 5;

const CustomerOrders = () => {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All Orders");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMyOrders()
      .then(({ data }) => setOrders(data?.data?.orders || []))
      .finally(() => setLoading(false));
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

  // Scroll back to the top of the page whenever the pagination page changes,
  // so switching pages doesn't leave the user stranded near the bottom.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <AnimatedPage>
      <div className="py-10 px-6 xl:px-0 mt-20">
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#9C8F73]">
              Orders
            </p>
            <h2 className="mt-1 text-3xl tracking-tight text-[#1A1A18] font-semibold">
              My Orders
            </h2>
            <p className="mt-2 text-sm text-[#6B6A63]">
              Vie and manage your orders.
            </p>
          </div>

          {location.state?.justPlaced ? (
            <div className="mt-4 rounded-xl bg-green-50 p-4 text-green-700">
              Your order has been placed successfully!
            </div>
          ) : null}

          {/* Search + Filter */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <div className="relative w-full sm:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by order ID"
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-700 outline-none focus:border-[#047B22] focus:ring-1 focus:ring-[#047B22]"
              />
            </div>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white px-6">
            <div className="flex gap-8 whitespace-nowrap">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`border-b-2 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "border-[#047B22] text-[#047B22]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Orders list */}
          <div className="mt-6 space-y-6">
            {loading ? (
              <p className="text-gray-500 text-center">Loading orders...</p>
            ) : pagedOrders.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500">
                You haven't placed any orders yet.
              </div>
            ) : (
              pagedOrders.map((order) => (
                <div
                  key={order._id}
                  className="rounded-2xl border border-gray-200 bg-white p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                        <Package className="h-5 w-5 text-[#047B22]" />
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
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        STATUS_STYLES[order.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
                    {/* Items */}
                    <div className="flex flex-col justify-between items-start rounded-xl bg-white border border-gray-100 p-5">
                      <div className="divide-y divide-gray-100">
                        {order.items.map((item) => (
                          <div
                            key={`${item.product}-${item.variantLabel}`}
                            className="flex items-center gap-4 py-3"
                          >
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-14 w-14 flex-shrink-0 rounded-lg object-cover"
                              />
                            ) : (
                              <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-green-50">
                                <Package className="h-6 w-6 text-[#047B22]" />
                              </span>
                            )}
                            <span className="flex-1 text-sm text-gray-700">
                              {item.name} ({item.variantLabel}) ×{" "}
                              {item.quantity}
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              ₹{item.subtotal}
                            </span>
                          </div>
                        ))}
                      </div>

                      <button className="mt-4 rounded-lg border border-[#047B22] px-4 py-2 text-sm font-medium text-[#047B22] hover:bg-green-50">
                        View Details
                      </button>
                    </div>

                    {/* Summary */}
                    <div className="rounded-xl bg-white border border-gray-100 p-5">
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
                            Items
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

                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                          <span className="flex items-center gap-2 text-gray-500">
                            <BadgeIndianRupee className="h-4 w-4" />
                            Order Total
                          </span>
                          <span className="text-lg font-semibold text-[#047B22]">
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

          {/* Pagination */}
          {!loading && filteredOrders.length > 0 ? (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          ) : null}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default CustomerOrders;
