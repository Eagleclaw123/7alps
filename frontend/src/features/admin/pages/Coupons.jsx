import { useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiTag } from "react-icons/fi";
import {
  getCoupons,
  createCoupon,
  updateCoupon,
  toggleCouponStatus,
  deleteCoupon,
} from "../../../shared/services/coupon.service";

const emptyForm = {
  code: "",
  description: "",
  discountType: "percentage",
  discountValue: "",
  minOrderAmount: "0",
  usageType: "reusable",
  active: true,
};

// Plain-English summary of a coupon's rule, shown on each card.
const describeCoupon = (coupon) => {
  const discount =
    coupon.discountType === "percentage"
      ? `${coupon.discountValue}% off`
      : `₹${coupon.discountValue} off`;
  const minimum =
    coupon.minOrderAmount > 0
      ? `on orders of ₹${coupon.minOrderAmount.toLocaleString("en-IN")} and above`
      : "on any order";
  const usage =
    coupon.usageType === "one-time" ? "one-time use per customer" : "reusable";

  return `${discount} ${minimum} · ${usage}`;
};

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadCoupons = () => {
    setLoading(true);
    getCoupons()
      .then(({ data }) => setCoupons(data?.data?.coupons || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return coupons;
    return coupons.filter(
      (c) =>
        c.code.toLowerCase().includes(query) ||
        (c.description || "").toLowerCase().includes(query),
    );
  }, [coupons, search]);

  const activeCount = coupons.filter((c) => c.active).length;

  const openAddForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setError("");
    setFormOpen(true);
  };

  const openEditForm = (coupon) => {
    setFormData({
      code: coupon.code,
      description: coupon.description || "",
      discountType: coupon.discountType,
      discountValue: String(coupon.discountValue),
      minOrderAmount: String(coupon.minOrderAmount ?? 0),
      usageType: coupon.usageType,
      active: coupon.active,
    });
    setEditingId(coupon._id);
    setError("");
    setFormOpen(true);
  };

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.code.trim()) {
      setError("Coupon code is required.");
      return;
    }
    if (formData.discountValue === "" || Number(formData.discountValue) < 1) {
      setError("Enter a discount value of at least 1.");
      return;
    }
    if (formData.discountType === "percentage" && Number(formData.discountValue) > 100) {
      setError("A percentage discount cannot exceed 100.");
      return;
    }

    const payload = {
      ...formData,
      code: formData.code.trim().toUpperCase(),
      discountValue: Number(formData.discountValue),
      minOrderAmount: Number(formData.minOrderAmount || 0),
    };

    try {
      setSubmitting(true);
      if (editingId) {
        await updateCoupon(editingId, payload);
      } else {
        await createCoupon(payload);
      }
      setFormOpen(false);
      loadCoupons();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save coupon.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (id) => {
    await toggleCouponStatus(id);
    loadCoupons();
  };

  const handleDelete = async (coupon) => {
    try {
      await deleteCoupon(coupon._id);
      loadCoupons();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to delete coupon.");
    }
  };

  const valueLabel =
    formData.discountType === "percentage" ? "Percent off (1–100)" : "Amount off (₹)";

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
      {/* Header */}
      <div className="mb-1 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#202020] sm:text-2xl">Coupons</h1>
          <p className="mt-1 text-sm text-gray-500">
            Discount codes customers can apply at checkout. Set the minimum order
            value, whether it's a percentage or a flat amount, and whether each
            customer can use it once or repeatedly.
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#047B22] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#03641c]"
        >
          <FiPlus size={16} />
          Add coupon
        </button>
      </div>

      {/* Stat strip */}
      <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <span className="font-semibold text-[#202020]">{coupons.length} coupons</span>
        <span className="text-gray-400">
          · {activeCount} active · {coupons.length - activeCount} inactive
        </span>
      </div>

      {/* Search */}
      <div className="mt-4 relative w-full sm:max-w-sm">
        <CiSearch
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search code or description"
          className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm text-[#202020] outline-none transition focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
        />
      </div>

      {/* Add/Edit form */}
      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="mt-5 grid gap-4 rounded-xl border border-gray-100 p-4 sm:grid-cols-2"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500">Coupon code</label>
            <input
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="e.g. SUMMER20"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 font-mono text-sm uppercase outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500">Description (shown to customers)</label>
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g. 20% off summer orders"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500">Discount type</label>
            <select
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            >
              <option value="percentage">Percentage off</option>
              <option value="flat">Flat amount off (cash)</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500">{valueLabel}</label>
            <input
              name="discountValue"
              type="number"
              min="1"
              max={formData.discountType === "percentage" ? 100 : undefined}
              value={formData.discountValue}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500">
              Valid on orders of at least (₹, before shipping)
            </label>
            <input
              name="minOrderAmount"
              type="number"
              min="0"
              value={formData.minOrderAmount}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500">Usage</label>
            <select
              name="usageType"
              value={formData.usageType}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            >
              <option value="reusable">Reusable (customers can use it every time)</option>
              <option value="one-time">One-time (each customer can use it once)</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm text-[#202020] sm:col-span-2">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="accent-[#047B22]"
            />
            Active (customers can apply it at checkout)
          </label>

          {error && <p className="text-sm text-red-600 sm:col-span-2">{error}</p>}

          <div className="flex justify-end gap-3 sm:col-span-2">
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              <FiX size={14} />
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-[#047B22] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#03641c] disabled:opacity-60"
            >
              {submitting ? "Saving..." : editingId ? "Save changes" : "Create coupon"}
            </button>
          </div>
        </form>
      )}

      {/* Coupon list */}
      {loading ? (
        <p className="py-10 text-center text-gray-500">Loading coupons...</p>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filtered.map((coupon) => (
            <div
              key={coupon._id}
              className="flex flex-col justify-between gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-gray-200 hover:shadow-sm"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-md bg-[#F4F7F1] px-2.5 py-1 font-mono text-sm font-semibold tracking-wide text-[#202020]">
                    <FiTag size={13} />
                    {coupon.code}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      coupon.active ? "bg-[#EAF3DE] text-[#3B6D11]" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {coupon.active ? "Active" : "Inactive"}
                  </span>
                </div>

                {coupon.description && (
                  <p className="mt-2 text-sm text-[#202020]">{coupon.description}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">{describeCoupon(coupon)}</p>
                <p className="mt-2 text-xs text-gray-400">
                  Used on {coupon.usedCount} order{coupon.usedCount === 1 ? "" : "s"}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-gray-50 pt-3">
                <button
                  onClick={() => handleToggleActive(coupon._id)}
                  aria-label={`Toggle ${coupon.code} active status`}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    coupon.active ? "bg-[#047B22]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                      coupon.active ? "left-[22px]" : "left-0.5"
                    }`}
                  />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditForm(coupon)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
                  >
                    <FiEdit2 size={13} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(coupon)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50"
                  >
                    <FiTrash2 size={13} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full py-14 text-center text-gray-400">
              {coupons.length === 0
                ? "No coupons yet. Create one to get started."
                : "No coupons match this search."}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Coupons;
