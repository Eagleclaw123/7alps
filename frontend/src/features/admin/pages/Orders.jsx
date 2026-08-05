import { useEffect, useState } from "react";
import {
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiDollarSign,
  FiChevronDown,
} from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import StatCard from "../../../shared/dashboard/components/StatCard";
import Pagination from "../../../shared/components/ui/Pagination";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../../shared/services/admin.service";

const STATUS_OPTIONS = [
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const STATUS_FILTER_OPTIONS = ["All", ...STATUS_OPTIONS];

const STATUS_STYLES = {
  Delivered: "bg-[#EAF3DE] text-[#3B6D11]",
  Shipped: "bg-[#E6F1FB] text-[#0C447C]",
  Processing: "bg-[#FAEEDA] text-[#854F0B]",
  Confirmed: "bg-[#EEEDFE] text-[#3C3489]",
  Cancelled: "bg-[#FCEBEB] text-[#A32D2D]",
};

const PAYMENT_STYLES = {
  Paid: "text-[#3B6D11]",
  Pending: "text-[#854F0B]",
};

const PAGE_SIZE = 10;

const buyerName = (order) =>
  order.source === "B2B"
    ? `${order.b2bMember?.name || "B2B"} (${order.buyerBusinessName || "—"})`
    : order.customer?.name || "Guest";

const columns = [
  {
    key: "id",
    header: "Order ID",
    render: (o) => `#${o._id.slice(-8).toUpperCase()}`,
  },
  { key: "customer", header: "Customer", render: (o) => buyerName(o) },
  {
    key: "products",
    header: "Products",
    render: (o) =>
      o.items.map((i) => `${i.name} (${i.variantLabel})`).join(", "),
  },
  {
    key: "total",
    header: "Total",
    render: (o) => `₹${o.totalAmount.toLocaleString()}`,
  },
  {
    key: "placedAt",
    header: "Date",
    render: (o) => new Date(o.placedAt).toLocaleDateString(),
  },
  {
    key: "expectedDeliveryDate",
    header: "Expected Delivery",
    render: (o) =>
      o.expectedDeliveryDate
        ? new Date(o.expectedDeliveryDate).toLocaleDateString()
        : "—",
  },
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [summary, setSummary] = useState({
    totalOrders: 0,
    pendingCount: 0,
    deliveredCount: 0,
    totalRevenue: 0,
  });

  // Debounce the search box so we don't hit the API on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput.trim()), 350);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // A new search term or status filter always starts back at page 1.
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  useEffect(() => {
    setLoading(true);
    getAllOrders({
      page,
      limit: PAGE_SIZE,
      status: statusFilter === "All" ? undefined : statusFilter,
      search: search || undefined,
    })
      .then(({ data }) => {
        setOrders(data?.data?.orders || []);
        setTotalPages(data?.totalPages || 1);
        if (data?.summary) setSummary(data.summary);
      })
      .finally(() => setLoading(false));
  }, [page, search, statusFilter]);

  const handleStatusChange = async (id, status) => {
    await updateOrderStatus(id, status);
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
  };

  const renderStatusSelect = (order) => (
    <select
      value={order.status}
      onChange={(e) => handleStatusChange(order._id, e.target.value)}
      className={`rounded-full border-none px-3 py-1 text-xs font-medium outline-none ${STATUS_STYLES[order.status]}`}
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );

  const renderPayment = (order) => (
    <span
      className={`text-sm font-medium ${PAYMENT_STYLES[order.paymentStatus]}`}
    >
      {order.paymentStatus} ({order.paymentMethod})
    </span>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<FiShoppingBag size={20} />}
          label="Total orders"
          value={summary.totalOrders}
        />
        <StatCard
          icon={<FiClock size={20} />}
          label="Needs attention"
          value={summary.pendingCount}
        />
        <StatCard
          icon={<FiCheckCircle size={20} />}
          label="Delivered"
          value={summary.deliveredCount}
        />
        <StatCard
          icon={<FiDollarSign size={20} />}
          label="Revenue collected"
          value={`₹${summary.totalRevenue.toLocaleString()}`}
        />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <CiSearch
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search order ID, customer, product, address..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-[#202020] outline-none transition focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />
          </div>

          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setStatusDropdownOpen((v) => !v)}
              className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 sm:w-auto sm:justify-start"
            >
              {statusFilter === "All" ? "Status" : statusFilter}
              <FiChevronDown size={16} />
            </button>

            {statusDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-48 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                {STATUS_FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setStatusFilter(opt);
                      setStatusDropdownOpen(false);
                    }}
                    className={`flex w-full items-center px-4 py-2 text-left text-sm transition hover:bg-gray-50 ${
                      statusFilter === opt
                        ? "font-medium text-[#047B22]"
                        : "text-gray-600"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-400">
                {columns.map((col) => (
                  <th key={col.key} className="py-3 pr-4 font-medium">
                    {col.header}
                  </th>
                ))}
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 pr-4 font-medium">Payment</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length + 2}
                    className="py-10 text-center text-gray-400"
                  >
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 2}
                    className="py-10 text-center text-gray-400"
                  >
                    No orders match this filter.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-50 transition hover:bg-gray-50/60"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="py-3 pr-4">
                        {col.render(order)}
                      </td>
                    ))}
                    <td className="py-3 pr-4">{renderStatusSelect(order)}</td>
                    <td className="py-3 pr-4">{renderPayment(order)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Cards — mobile */}
        <div className="mt-5 space-y-3 md:hidden">
          {loading ? (
            <p className="py-10 text-center text-gray-400">
              Loading orders...
            </p>
          ) : orders.length === 0 ? (
            <p className="py-10 text-center text-gray-400">
              No orders match this filter.
            </p>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="rounded-xl border border-gray-100 p-4"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-[#202020]">
                    #{order._id.slice(-8).toUpperCase()}
                  </span>
                  {renderStatusSelect(order)}
                </div>
                <div className="divide-y divide-gray-50 text-sm">
                  {columns.slice(1).map((col) => (
                    <div
                      key={col.key}
                      className="flex items-center justify-between gap-3 py-2"
                    >
                      <span className="flex-shrink-0 text-gray-400">
                        {col.header}
                      </span>
                      <span className="text-right font-medium text-[#202020]">
                        {col.render(order)}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between gap-3 py-2">
                    <span className="flex-shrink-0 text-gray-400">
                      Payment
                    </span>
                    <span className="text-right">{renderPayment(order)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {!loading && orders.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
