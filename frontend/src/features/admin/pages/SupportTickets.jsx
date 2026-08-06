import { useEffect, useState } from "react";
import {
  FiHeadphones,
  FiClock,
  FiCheckCircle,
  FiChevronDown,
  FiTrash2,
} from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import StatCard from "../../../shared/dashboard/components/StatCard";
import Pagination from "../../../shared/components/ui/Pagination";
import {
  getSupportTickets,
  updateSupportTicketStatus,
  deleteSupportTicket,
} from "../../../shared/services/admin.service";

const STATUS_OPTIONS = ["New", "Read", "Resolved"];
const STATUS_FILTER_OPTIONS = ["All", ...STATUS_OPTIONS];

const STATUS_STYLES = {
  New: "bg-[#FCEBEB] text-[#A32D2D]",
  Read: "bg-[#FAEEDA] text-[#854F0B]",
  Resolved: "bg-[#EAF3DE] text-[#3B6D11]",
};

const PAGE_SIZE = 10;

const memberLabel = (ticket) =>
  ticket.b2bMember
    ? `${ticket.b2bMember.name || "—"}${ticket.b2bMember.businessName ? ` (${ticket.b2bMember.businessName})` : ""}`
    : "—";

const columns = [
  { key: "subject", header: "Subject", render: (t) => t.subject },
  { key: "member", header: "From", render: (t) => memberLabel(t) },
  {
    key: "message",
    header: "Message",
    render: (t) =>
      t.message.length > 60 ? `${t.message.slice(0, 60)}…` : t.message,
  },
  {
    key: "createdAt",
    header: "Received",
    render: (t) => new Date(t.createdAt).toLocaleDateString(),
  },
];

const SupportTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [summary, setSummary] = useState({
    totalTickets: 0,
    newCount: 0,
    resolvedCount: 0,
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
    getSupportTickets({
      page,
      limit: PAGE_SIZE,
      status: statusFilter === "All" ? undefined : statusFilter,
      search: search || undefined,
    })
      .then(({ data }) => {
        setTickets(data?.data?.tickets || []);
        setTotalPages(data?.totalPages || 1);
        if (data?.summary) setSummary(data.summary);
      })
      .finally(() => setLoading(false));
  }, [page, search, statusFilter]);

  const handleStatusChange = async (id, status) => {
    await updateSupportTicketStatus(id, status);
    setTickets((prev) => prev.map((t) => (t._id === id ? { ...t, status } : t)));
  };

  const handleDelete = async (id) => {
    await deleteSupportTicket(id);
    setTickets((prev) => prev.filter((t) => t._id !== id));
  };

  const renderStatusSelect = (ticket) => (
    <select
      value={ticket.status}
      onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
      className={`rounded-full border-none px-3 py-1 text-xs font-medium outline-none ${STATUS_STYLES[ticket.status]}`}
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[#202020] sm:text-2xl">
          Support Tickets
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Messages submitted by B2B partners through Contact Support.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={<FiHeadphones size={20} />}
          label="Total tickets"
          value={summary.totalTickets}
        />
        <StatCard icon={<FiClock size={20} />} label="New" value={summary.newCount} />
        <StatCard
          icon={<FiCheckCircle size={20} />}
          label="Resolved"
          value={summary.resolvedCount}
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
              placeholder="Search subject, message, member..."
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
                <th className="py-3 pr-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length + 2}
                    className="py-10 text-center text-gray-400"
                  >
                    Loading tickets...
                  </td>
                </tr>
              ) : tickets.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 2}
                    className="py-10 text-center text-gray-400"
                  >
                    No support tickets match this filter.
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => (
                  <tr
                    key={ticket._id}
                    className="border-b border-gray-50 transition hover:bg-gray-50/60"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="py-3 pr-4">
                        {col.render(ticket)}
                      </td>
                    ))}
                    <td className="py-3 pr-4">{renderStatusSelect(ticket)}</td>
                    <td className="py-3 pr-4">
                      <button
                        onClick={() => handleDelete(ticket._id)}
                        title="Delete"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-[#FCEBEB] hover:text-[#A32D2D]"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </td>
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
              Loading tickets...
            </p>
          ) : tickets.length === 0 ? (
            <p className="py-10 text-center text-gray-400">
              No support tickets match this filter.
            </p>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="rounded-xl border border-gray-100 p-4"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-[#202020]">
                    {ticket.subject}
                  </span>
                  {renderStatusSelect(ticket)}
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
                        {col.render(ticket)}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleDelete(ticket._id)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2 text-sm text-[#A32D2D] transition hover:bg-[#FCEBEB]"
                >
                  <FiTrash2 size={14} />
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {!loading && tickets.length > 0 && (
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

export default SupportTickets;
