import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  FiPlus,
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";
import Badge from "../../../shared/dashboard/components/Badge";
import StatCard from "../../../shared/dashboard/components/StatCard";
import DataTable from "../../../shared/dashboard/components/DataTable";

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

const PAGE_SIZE = 5;

const columns = [
  { key: "id", header: "Quote ID" },
  { key: "products", header: "Products" },
  {
    key: "quantity",
    header: "Quantity",
    render: (q) => `${q.quantity.toLocaleString()} units`,
  },
  { key: "requestedDate", header: "Requested" },
  {
    key: "quotedPrice",
    header: "Quoted price",
    render: (q) => (q.quotedPrice ? `₹${q.quotedPrice.toLocaleString()}` : "—"),
  },
  {
    key: "validUntil",
    header: "Valid until",
    render: (q) => q.validUntil || "—",
  },
  {
    key: "status",
    header: "Status",
    render: (q) => <Badge value={q.status} styles={STATUS_STYLES} />,
  },
  {
    key: "actions",
    header: "Action",
    className: "w-10 text-right",
    render: () => (
      <button className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600">
        <HiOutlineDotsVertical size={18} />
      </button>
    ),
  },
];

const RequestQuote = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [products, setProducts] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");

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
        <DataTable
          data={QUOTES}
          columns={columns}
          rowKey={(q) => q.id}
          searchKeys={["id", "products"]}
          searchPlaceholder="Search quote ID or product"
          filters={[
            {
              field: "status",
              label: "Status",
              options: [
                "All",
                "Pending",
                "Quoted",
                "Approved",
                "Rejected",
                "Expired",
              ],
            },
          ]}
          pageSize={PAGE_SIZE}
          emptyMessage="No quote requests match this filter."
        />
      </div>
    </div>
  );
};

export default RequestQuote;
