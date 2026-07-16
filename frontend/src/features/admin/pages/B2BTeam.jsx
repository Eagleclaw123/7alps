import { useEffect, useState } from "react";
import { FiPlus, FiCheck, FiX, FiUsers, FiFileText, FiDollarSign } from "react-icons/fi";
import DataTable from "../../../shared/dashboard/components/DataTable";
import Badge from "../../../shared/dashboard/components/Badge";
import StatCard from "../../../shared/dashboard/components/StatCard";
import {
  getB2BMembers,
  createB2BMember,
  updateB2BMember,
  getAllQuotes,
  approveQuote,
  rejectQuote,
} from "../../../shared/services/admin.service";

const STATUS_STYLES = {
  Active: "bg-[#EAF3DE] text-[#3B6D11]",
  Inactive: "bg-gray-100 text-gray-500",
};

const QUOTE_STATUS_STYLES = {
  Pending: "bg-[#FAEEDA] text-[#854F0B]",
  Approved: "bg-[#EAF3DE] text-[#3B6D11]",
  Rejected: "bg-[#FCEBEB] text-[#A32D2D]",
};

const initialMemberForm = {
  name: "",
  email: "",
  phoneNumber: "",
  businessName: "",
  password: "",
  passwordConfirm: "",
};

const MembersTab = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState(initialMemberForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadMembers = () => {
    setLoading(true);
    getB2BMembers()
      .then(({ data }) => setMembers(data?.data?.members || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);
      await createB2BMember(formData);
      setFormData(initialMemberForm);
      setFormOpen(false);
      loadMembers();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create B2B member.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (member) => {
    await updateB2BMember(member._id, { active: !member.active });
    loadMembers();
  };

  const totalSales = members.reduce((sum, m) => sum + (m.totalSales || 0), 0);
  const totalOrders = members.reduce((sum, m) => sum + (m.totalOrders || 0), 0);

  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "businessName", header: "Business", render: (m) => m.businessName || "—" },
    { key: "totalOrders", header: "Orders", render: (m) => m.totalOrders || 0 },
    {
      key: "totalSales",
      header: "Total Sales",
      render: (m) => `₹${(m.totalSales || 0).toLocaleString()}`,
    },
    {
      key: "active",
      header: "Status",
      render: (m) => (
        <button onClick={() => handleToggleActive(m)}>
          <Badge value={m.active ? "Active" : "Inactive"} styles={STATUS_STYLES} />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={<FiUsers size={20} />} label="B2B Members" value={members.length} />
        <StatCard icon={<FiFileText size={20} />} label="Total Bulk Orders" value={totalOrders} />
        <StatCard
          icon={<FiDollarSign size={20} />}
          label="Total B2B Sales"
          value={`₹${totalSales.toLocaleString()}`}
        />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#202020]">B2B Members</h2>
          <button
            onClick={() => setFormOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg bg-[#047B22] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#03641c]"
          >
            <FiPlus size={16} />
            Add member
          </button>
        </div>

        {formOpen && (
          <form onSubmit={handleCreate} className="mt-4 grid gap-4 border-t border-gray-100 pt-4 sm:grid-cols-2">
            <input
              required
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              name="name"
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />
            <input
              required
              placeholder="Phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              name="phoneNumber"
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />
            <input
              placeholder="Business name (optional)"
              value={formData.businessName}
              onChange={handleChange}
              name="businessName"
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />
            <input
              required
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              minLength={8}
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />
            <input
              required
              type="password"
              placeholder="Confirm password"
              value={formData.passwordConfirm}
              onChange={handleChange}
              name="passwordConfirm"
              minLength={8}
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />

            {error && <p className="text-sm text-red-600 sm:col-span-2">{error}</p>}

            <div className="flex justify-end gap-3 sm:col-span-2">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-[#047B22] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#03641c] disabled:opacity-60"
              >
                {submitting ? "Creating..." : "Create member"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-5">
          {loading ? (
            <p className="py-10 text-center text-gray-500">Loading members...</p>
          ) : (
            <DataTable
              data={members}
              columns={columns}
              rowKey={(m) => m._id}
              searchKeys={["name", "email", "businessName"]}
              searchPlaceholder="Search members"
              pageSize={8}
              emptyMessage="No B2B members yet."
            />
          )}
        </div>
      </div>
    </div>
  );
};

const QuotesTab = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [editableItems, setEditableItems] = useState([]);
  const [rejectReason, setRejectReason] = useState("");
  const [actionError, setActionError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadQuotes = () => {
    setLoading(true);
    getAllQuotes()
      .then(({ data }) => setQuotes(data?.data?.quotes || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  const openReview = (quote) => {
    setSelectedQuote(quote);
    setEditableItems(quote.items.map((item) => ({ ...item })));
    setRejectReason("");
    setActionError("");
  };

  const closeReview = () => {
    setSelectedQuote(null);
    setEditableItems([]);
  };

  const updateItem = (index, field, value) => {
    setEditableItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: Number(value) } : item)),
    );
  };

  const handleApprove = async () => {
    setActionError("");
    try {
      setSubmitting(true);
      await approveQuote(selectedQuote._id, {
        items: editableItems.map((item) => ({
          product: item.product,
          variantLabel: item.variantLabel,
          quantity: item.quantity,
          proposedPrice: item.proposedPrice,
        })),
      });
      closeReview();
      loadQuotes();
    } catch (err) {
      setActionError(err.response?.data?.message || "Unable to approve quote.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    setActionError("");
    try {
      setSubmitting(true);
      await rejectQuote(selectedQuote._id, rejectReason);
      closeReview();
      loadQuotes();
    } catch (err) {
      setActionError(err.response?.data?.message || "Unable to reject quote.");
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { key: "member", header: "Member", render: (q) => q.b2bMember?.name || "—" },
    {
      key: "items",
      header: "Products",
      render: (q) => q.items.map((i) => `${i.name} (${i.variantLabel})`).join(", "),
    },
    { key: "totalAmount", header: "Total", render: (q) => `₹${q.totalAmount.toLocaleString()}` },
    { key: "createdAt", header: "Requested", render: (q) => new Date(q.createdAt).toLocaleDateString() },
    {
      key: "status",
      header: "Status",
      render: (q) => <Badge value={q.status} styles={QUOTE_STATUS_STYLES} />,
    },
    {
      key: "actions",
      header: "",
      render: (q) =>
        q.status === "Pending" ? (
          <button
            onClick={() => openReview(q)}
            className="rounded-lg border border-[#047B22] px-3 py-1.5 text-xs font-medium text-[#047B22] hover:bg-[#EAF3DE]"
          >
            Review
          </button>
        ) : (
          <span className="text-xs text-gray-400">Reviewed</span>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-[#202020]">Quote Requests</h2>
        <div className="mt-4">
          {loading ? (
            <p className="py-10 text-center text-gray-500">Loading quotes...</p>
          ) : (
            <DataTable
              data={quotes}
              columns={columns}
              rowKey={(q) => q._id}
              filters={[
                {
                  field: "status",
                  label: "Status",
                  options: ["All", "Pending", "Approved", "Rejected"],
                },
              ]}
              pageSize={8}
              emptyMessage="No quote requests yet."
            />
          )}
        </div>
      </div>

      {selectedQuote && (
        <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-semibold text-[#202020]">
                Review quote — {selectedQuote.b2bMember?.name}
              </h2>
              <p className="text-sm text-gray-500">
                {selectedQuote.buyerBusinessName} · {selectedQuote.shippingAddress?.city},{" "}
                {selectedQuote.shippingAddress?.state}
              </p>
            </div>
            <button onClick={closeReview} className="text-gray-400 hover:text-gray-600">
              <FiX size={20} />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {editableItems.map((item, index) => (
              <div key={`${item.product}-${item.variantLabel}`} className="flex flex-wrap items-center gap-3">
                <span className="flex-1 text-sm font-medium text-[#202020]">
                  {item.name} <span className="text-gray-400">({item.variantLabel})</span>
                </span>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400">Qty</label>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", e.target.value)}
                    className="w-24 rounded-lg border border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-[#047B22]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400">Price/unit</label>
                  <input
                    type="number"
                    min={1}
                    value={item.proposedPrice}
                    onChange={(e) => updateItem(index, "proposedPrice", e.target.value)}
                    className="w-24 rounded-lg border border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-[#047B22]"
                  />
                </div>
                <span className="w-24 text-right text-sm font-medium text-[#202020]">
                  ₹{(item.proposedPrice * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-1.5">
            <label className="text-xs font-medium text-gray-500">
              Rejection reason (only needed if rejecting)
            </label>
            <input
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Discount too steep for this volume"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />
          </div>

          {actionError && <p className="mt-3 text-sm text-red-600">{actionError}</p>}

          <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={handleReject}
              disabled={submitting}
              className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-60"
            >
              <FiX size={16} />
              Reject
            </button>
            <button
              onClick={handleApprove}
              disabled={submitting}
              className="flex items-center gap-2 rounded-lg bg-[#047B22] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#03641c] disabled:opacity-60"
            >
              <FiCheck size={16} />
              Approve &amp; create order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const B2BTeam = () => {
  const [tab, setTab] = useState("members");

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[#202020] sm:text-2xl">B2B Team</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage marketing team logins and review their bulk quote requests.
        </p>
      </div>

      <div className="flex gap-2 border-b border-gray-100">
        {[
          { key: "members", label: "Members" },
          { key: "quotes", label: "Quotes" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition ${
              tab === t.key
                ? "border-[#047B22] text-[#047B22]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "members" ? <MembersTab /> : <QuotesTab />}
    </section>
  );
};

export default B2BTeam;
