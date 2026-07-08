import { useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  FiChevronDown,
  FiPlus,
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";

const QUOTES = [
  {
    id: "QT-2081",
    products: "Beetroot Powder, Ginger Powder",
    quantity: 500,
    requestedDate: "2026-07-05",
    status: "Pending",
    quotedPrice: null,
    validUntil: null,
  },
  {
    id: "QT-2080",
    products: "Sandalwood Face Pack",
    quantity: 300,
    requestedDate: "2026-07-01",
    status: "Quoted",
    quotedPrice: 54000,
    validUntil: "2026-07-15",
  },
  {
    id: "QT-2079",
    products: "Brahmi Powder, Amla Powder",
    quantity: 800,
    requestedDate: "2026-06-24",
    status: "Approved",
    quotedPrice: 128000,
    validUntil: "2026-07-08",
  },
  {
    id: "QT-2078",
    products: "Ginger Powder",
    quantity: 200,
    requestedDate: "2026-06-18",
    status: "Expired",
    quotedPrice: 32000,
    validUntil: "2026-06-30",
  },
  {
    id: "QT-2077",
    products: "Beetroot Powder",
    quantity: 150,
    requestedDate: "2026-06-10",
    status: "Rejected",
    quotedPrice: null,
    validUntil: null,
  },
];

const STATUS_STYLES = {
  Pending: "bg-[#FAEEDA] text-[#854F0B]",
  Quoted: "bg-[#E6F1FB] text-[#0C447C]",
  Approved: "bg-[#EAF3DE] text-[#3B6D11]",
  Rejected: "bg-[#FCEBEB] text-[#A32D2D]",
  Expired: "bg-gray-100 text-gray-500",
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

const RequestQuote = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [products, setProducts] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");

  const filtered = useMemo(() => {
    return QUOTES.filter((q) => {
      const matchesSearch =
        q.id.toLowerCase().includes(search.toLowerCase()) ||
        q.products.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || q.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const pendingCount = QUOTES.filter((q) => q.status === "Pending").length;
  const quotedCount = QUOTES.filter((q) => q.status === "Quoted").length;
  const approvedCount = QUOTES.filter((q) => q.status === "Approved").length;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormOpen(false);
    setProducts("");
    setQuantity("");
    setNotes("");
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#202020] sm:text-2xl">
            Request Quote
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Ask for wholesale pricing on the products and quantities you need.
          </p>
        </div>
        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#047B22] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#03641c]"
        >
          <FiPlus size={16} />
          New quote request
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={<FiClock size={20} />}
          label="Awaiting a quote"
          value={pendingCount}
        />
        <StatCard
          icon={<FiFileText size={20} />}
          label="Quoted, awaiting your response"
          value={quotedCount}
        />
        <StatCard
          icon={<FiCheckCircle size={20} />}
          label="Approved"
          value={approvedCount}
        />
      </div>

      {/* New request form */}
      {formOpen && (
        <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#202020]">
              New quote request
            </h2>
            <button
              onClick={() => setFormOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close"
            >
              <FiX size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500">
                Products
              </label>
              <input
                value={products}
                onChange={(e) => setProducts(e.target.value)}
                placeholder="e.g. Beetroot Powder, Ginger Powder"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-[#202020] outline-none transition focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500">
                  Total quantity (units)
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 500"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-[#202020] outline-none transition focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500">
                  Needed by (optional)
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-[#202020] outline-none transition focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500">
                Notes for the sales team (optional)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Packaging preferences, delivery location, anything else we should know"
                className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-[#202020] outline-none transition focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#047B22] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#03641c]"
              >
                Submit request
              </button>
            </div>
          </form>
        </div>
      )}

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
              placeholder="Search quote ID or product"
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
                  "Pending",
                  "Quoted",
                  "Approved",
                  "Rejected",
                  "Expired",
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
                <th className="py-3 pr-4 font-medium">Quote ID</th>
                <th className="py-3 pr-4 font-medium">Products</th>
                <th className="py-3 pr-4 font-medium">Quantity</th>
                <th className="py-3 pr-4 font-medium">Requested</th>
                <th className="py-3 pr-4 font-medium">Quoted price</th>
                <th className="py-3 pr-4 font-medium">Valid until</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="w-10 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((q) => (
                <tr
                  key={q.id}
                  className="border-b border-gray-50 transition hover:bg-gray-50/60"
                >
                  <td className="py-3 pr-4 font-medium text-[#202020]">
                    {q.id}
                  </td>
                  <td className="py-3 pr-4 text-gray-600">{q.products}</td>
                  <td className="py-3 pr-4 text-gray-600">
                    {q.quantity.toLocaleString()} units
                  </td>
                  <td className="py-3 pr-4 text-gray-600">{q.requestedDate}</td>
                  <td className="py-3 pr-4 text-gray-600">
                    {q.quotedPrice ? `₹${q.quotedPrice.toLocaleString()}` : "—"}
                  </td>
                  <td className="py-3 pr-4 text-gray-600">
                    {q.validUntil || "—"}
                  </td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={q.status} />
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
                    No quote requests match this filter.
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

export default RequestQuote;
