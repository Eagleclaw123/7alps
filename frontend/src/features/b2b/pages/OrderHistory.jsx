import { useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  FiChevronDown,
  FiPackage,
  FiDollarSign,
  FiCheckCircle,
  FiTruck,
} from "react-icons/fi";

const ORDERS = [
  {
    id: "ORD-5231",
    products: "Beetroot Powder, Ginger Powder",
    quantity: 480,
    total: 96000,
    date: "2026-06-18",
    status: "Delivered",
    payment: "Paid",
  },
  {
    id: "ORD-5230",
    products: "Sandalwood Face Pack",
    quantity: 210,
    total: 42500,
    date: "2026-06-25",
    status: "Shipped",
    payment: "Paid",
  },
  {
    id: "ORD-5229",
    products: "Brahmi Powder, Amla Powder",
    quantity: 320,
    total: 61200,
    date: "2026-06-29",
    status: "Processing",
    payment: "Pending",
  },
  {
    id: "ORD-5228",
    products: "Ginger Powder",
    quantity: 150,
    total: 28800,
    date: "2026-07-02",
    status: "Confirmed",
    payment: "Pending",
  },
  {
    id: "ORD-5227",
    products: "Beetroot Powder",
    quantity: 640,
    total: 118400,
    date: "2026-06-05",
    status: "Delivered",
    payment: "Paid",
  },
  {
    id: "ORD-5226",
    products: "Sandalwood Face Pack, Brahmi Powder",
    quantity: 90,
    total: 16200,
    date: "2026-05-30",
    status: "Cancelled",
    payment: "Refunded",
  },
  {
    id: "ORD-5225",
    products: "Amla Powder",
    quantity: 400,
    total: 76000,
    date: "2026-05-22",
    status: "Delivered",
    payment: "Paid",
  },
];

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
  Refunded: "text-gray-500",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
  >
    {status}
  </span>
);

const StatCard = ({ icon, label, value }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-5">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3DE] text-[#047B22]">
      {icon}
    </div>
    <p className="mt-4 text-sm text-gray-500">{label}</p>
    <p className="mt-1 text-2xl font-semibold text-[#202020]">{value}</p>
  </div>
);

const OrderHistory = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    return ORDERS.filter((o) => {
      const matchesSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.products.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalSpent = ORDERS.filter((o) => o.payment === "Paid").reduce(
    (sum, o) => sum + o.total,
    0,
  );
  const deliveredCount = ORDERS.filter((o) => o.status === "Delivered").length;
  const inProgressCount = ORDERS.filter((o) =>
    ["Confirmed", "Processing", "Shipped"].includes(o.status),
  ).length;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-semibold text-[#202020] sm:text-2xl">
          Order History
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          A record of everything you've ordered, delivered or in progress.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<FiPackage size={20} />}
          label="Total orders"
          value={ORDERS.length}
        />
        <StatCard
          icon={<FiTruck size={20} />}
          label="In progress"
          value={inProgressCount}
        />
        <StatCard
          icon={<FiCheckCircle size={20} />}
          label="Delivered"
          value={deliveredCount}
        />
        <StatCard
          icon={<FiDollarSign size={20} />}
          label="Total spent"
          value={`₹${totalSpent.toLocaleString()}`}
        />
      </div>

      {/* Table card */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
        {/* Search + Filter row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <CiSearch
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order ID or product"
              className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm text-[#202020] outline-none transition focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />
          </div>

          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 sm:w-auto sm:justify-start"
            >
              Status
              {statusFilter !== "All" && (
                <span className="rounded-full bg-[#EAF3DE] px-2 py-0.5 text-xs font-medium text-[#3B6D11]">
                  {statusFilter}
                </span>
              )}
              <FiChevronDown size={16} />
            </button>

            {filterOpen && (
              <div className="absolute right-0 z-10 mt-2 w-44 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                {[
                  "All",
                  "Confirmed",
                  "Processing",
                  "Shipped",
                  "Delivered",
                  "Cancelled",
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setStatusFilter(opt);
                      setFilterOpen(false);
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

        {/* Table */}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-400">
                <th className="py-3 pr-4 font-medium">Order ID</th>
                <th className="py-3 pr-4 font-medium">Products</th>
                <th className="py-3 pr-4 font-medium">Quantity</th>
                <th className="py-3 pr-4 font-medium">Total</th>
                <th className="py-3 pr-4 font-medium">Date</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 pr-4 font-medium">Payment</th>
                <th className="w-10 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-gray-50 transition hover:bg-gray-50/60"
                >
                  <td className="py-3 pr-4 font-medium text-[#202020]">
                    {o.id}
                  </td>
                  <td className="py-3 pr-4 text-gray-600">{o.products}</td>
                  <td className="py-3 pr-4 text-gray-600">
                    {o.quantity.toLocaleString()} units
                  </td>
                  <td className="py-3 pr-4 text-gray-600">
                    ₹{o.total.toLocaleString()}
                  </td>
                  <td className="py-3 pr-4 text-gray-600">{o.date}</td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={o.status} />
                  </td>
                  <td
                    className={`py-3 pr-4 text-sm font-medium ${PAYMENT_STYLES[o.payment]}`}
                  >
                    {o.payment}
                  </td>
                  <td className="py-3 text-right">
                    <button className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600">
                      <HiOutlineDotsVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-gray-400">
                    No orders match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
