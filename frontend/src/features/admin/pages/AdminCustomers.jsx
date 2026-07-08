import { useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiChevronDown, FiDownload, FiUpload, FiPlus } from "react-icons/fi";

const CUSTOMERS = [
  {
    id: 1,
    name: "Esther Howard",
    avatar: "https://i.pravatar.cc/80?img=47",
    location: "Great Falls, Maryland",
    orders: 2,
    amountSpent: 250,
    type: "Normal",
  },
  {
    id: 2,
    name: "Leslie Alexander",
    avatar: "https://i.pravatar.cc/80?img=12",
    location: "Pasadena, Oklahoma",
    orders: 3,
    amountSpent: 350,
    type: "B2B",
  },
  {
    id: 3,
    name: "Guy Hawkins",
    avatar: "https://i.pravatar.cc/80?img=13",
    location: "Corona, Michigan",
    orders: 0,
    amountSpent: 0,
    type: "Normal",
  },
  {
    id: 4,
    name: "Savannah Nguyen",
    avatar: "https://i.pravatar.cc/80?img=32",
    location: "Syracuse, Connecticut",
    orders: 0,
    amountSpent: 0,
    type: "B2B",
  },
  {
    id: 5,
    name: "Bessie Cooper",
    avatar: "https://i.pravatar.cc/80?img=26",
    location: "Lansing, Illinois",
    orders: 1,
    amountSpent: 470,
    type: "Normal",
  },
  {
    id: 6,
    name: "Ronald Richards",
    avatar: "https://i.pravatar.cc/80?img=15",
    location: "Great Falls, Maryland",
    orders: 2,
    amountSpent: 250,
    type: "B2B",
  },
  {
    id: 7,
    name: "Marvin McKinney",
    avatar: "https://i.pravatar.cc/80?img=51",
    location: "Coppell, Virginia",
    orders: 2,
    amountSpent: 150,
    type: "Normal",
  },
  {
    id: 8,
    name: "Kathryn Murphy",
    avatar: "https://i.pravatar.cc/80?img=44",
    location: "Lafayette, California",
    orders: 3,
    amountSpent: 250,
    type: "Normal",
  },
  {
    id: 9,
    name: "Eleanor Pena",
    avatar: "https://i.pravatar.cc/80?img=48",
    location: "Corona, Michigan",
    orders: 1,
    amountSpent: 250,
    type: "B2B",
  },
];

const TYPE_STYLES = {
  B2B: "bg-[#EAF3DE] text-[#3B6D11]",
  Normal: "bg-gray-100 text-gray-600",
};

const CustomerTypeBadge = ({ type }) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${TYPE_STYLES[type]}`}
  >
    {type === "B2B" ? "B2B customer" : "Normal customer"}
  </span>
);

const AdminCustomers = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    return CUSTOMERS.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "All" || c.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  const b2bCount = CUSTOMERS.filter((c) => c.type === "B2B").length;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
      {/* Header */}
      <div className="mb-1 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#202020] sm:text-2xl">
            Customers
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            As a new member, get ready for an exciting shopping journey with
            perks.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 sm:px-4">
            <FiUpload size={16} />
            <span className="hidden sm:inline">Import</span>
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 sm:px-4">
            <FiDownload size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#047B22] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#03641c] sm:flex-none sm:px-4">
            <FiPlus size={16} />
            Add customers
          </button>
        </div>
      </div>

      {/* Stat strip */}
      <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <span className="font-semibold text-[#202020]">
          {CUSTOMERS.length} customers
        </span>
        <span className="text-gray-400">
          · {Math.round((b2bCount / CUSTOMERS.length) * 100)}% B2B customer base
        </span>
      </div>

      {/* Search + Filter row */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <CiSearch
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer"
            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm text-[#202020] outline-none transition focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
          />
        </div>

        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => setFilterOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 sm:w-auto sm:justify-start"
          >
            Customer type
            {typeFilter !== "All" && (
              <span className="rounded-full bg-[#EAF3DE] px-2 py-0.5 text-xs font-medium text-[#3B6D11]">
                {typeFilter}
              </span>
            )}
            <FiChevronDown size={16} />
          </button>

          {filterOpen && (
            <div className="absolute right-0 z-10 mt-2 w-44 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
              {["All", "B2B", "Normal"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setTypeFilter(opt);
                    setFilterOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition hover:bg-gray-50 ${
                    typeFilter === opt
                      ? "font-medium text-[#047B22]"
                      : "text-gray-600"
                  }`}
                >
                  {opt === "All" ? "All customers" : `${opt} customer`}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-gray-400">
              <th className="py-3 pr-4 font-medium">Customers</th>
              <th className="py-3 pr-4 font-medium">Location</th>
              <th className="py-3 pr-4 font-medium">Orders</th>
              <th className="py-3 pr-4 font-medium">Amount spent</th>
              <th className="py-3 pr-4 font-medium">Customer type</th>
              <th className="w-10 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                className="border-b border-gray-50 transition hover:bg-gray-50/60"
              >
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="font-medium text-[#202020]">{c.name}</span>
                  </div>
                </td>
                <td className="py-3 pr-4 text-gray-600">{c.location}</td>
                <td className="py-3 pr-4 text-gray-600">
                  {c.orders > 0 ? `${c.orders} orders` : "N/A"}
                </td>
                <td className="py-3 pr-4 text-gray-600">
                  ${c.amountSpent.toFixed(2)}
                </td>
                <td className="py-3 pr-4">
                  <CustomerTypeBadge type={c.type} />
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
                <td colSpan={6} className="py-10 text-center text-gray-400">
                  No customers match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-center text-xs text-gray-400">
        Learn more about{" "}
        <span className="cursor-pointer font-medium text-[#047B22] underline">
          customers
        </span>
      </p>
    </div>
  );
};

export default AdminCustomers;
