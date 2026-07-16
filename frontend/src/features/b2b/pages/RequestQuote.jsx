import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash2, FiFileText, FiClock, FiCheckCircle } from "react-icons/fi";
import Badge from "../../../shared/dashboard/components/Badge";
import StatCard from "../../../shared/dashboard/components/StatCard";
import DataTable from "../../../shared/dashboard/components/DataTable";
import {
  selectDraftItems,
  selectDraftTotal,
  updateDraftItem,
  removeDraftItem,
  clearDraft,
} from "../../../store/slices/b2bQuoteSlice";
import { createQuote, getMyQuotes } from "../../../shared/services/b2b.service";
import AddressMapPicker from "../../../shared/components/map/AddressMapPicker";

const MIN_BULK_QUANTITY = 10;

const initialBuyer = {
  buyerBusinessName: "",
  name: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

const validators = {
  buyerBusinessName: (v) => (!v.trim() ? "Business name is required" : ""),
  name: (v) => (!v.trim() ? "Contact name is required" : ""),
  phone: (v) => (!/^[6-9]\d{9}$/.test(v.trim()) ? "Enter a valid 10-digit mobile number" : ""),
  line1: (v) => (!v.trim() ? "Address line 1 is required" : ""),
  line2: () => "",
  city: (v) => (!v.trim() ? "City is required" : ""),
  state: (v) => (!v.trim() ? "State is required" : ""),
  pincode: (v) => (!/^\d{6}$/.test(v.trim()) ? "Enter a valid 6-digit pincode" : ""),
};

const STATUS_STYLES = {
  Pending: "bg-[#FAEEDA] text-[#854F0B]",
  Approved: "bg-[#EAF3DE] text-[#3B6D11]",
  Rejected: "bg-[#FCEBEB] text-[#A32D2D]",
};

const columns = [
  {
    key: "items",
    header: "Products",
    render: (q) => q.items.map((i) => `${i.name} (${i.variantLabel})`).join(", "),
  },
  {
    key: "quantity",
    header: "Quantity",
    render: (q) => `${q.items.reduce((sum, i) => sum + i.quantity, 0)} units`,
  },
  { key: "createdAt", header: "Requested", render: (q) => new Date(q.createdAt).toLocaleDateString() },
  { key: "totalAmount", header: "Proposed total", render: (q) => `₹${q.totalAmount.toLocaleString()}` },
  {
    key: "status",
    header: "Status",
    render: (q) => <Badge value={q.status} styles={STATUS_STYLES} />,
  },
];

const RequestQuote = () => {
  const dispatch = useDispatch();
  const draftItems = useSelector(selectDraftItems);
  const draftTotal = useSelector(selectDraftTotal);

  const [buyer, setBuyer] = useState(initialBuyer);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [quotes, setQuotes] = useState([]);
  const [loadingQuotes, setLoadingQuotes] = useState(true);

  const loadQuotes = () => {
    setLoadingQuotes(true);
    getMyQuotes()
      .then(({ data }) => setQuotes(data?.data?.quotes || []))
      .finally(() => setLoadingQuotes(false));
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setBuyer((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
    }
  };

  const handleBlur = ({ target: { name, value } }) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFieldErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
  };

  const handleMapAddressChange = (parsed) => {
    setBuyer((prev) => ({
      ...prev,
      line1: parsed.line1 || prev.line1,
      city: parsed.city || prev.city,
      state: parsed.state || prev.state,
      pincode: parsed.pincode || prev.pincode,
    }));
    setFieldErrors((prev) => ({
      ...prev,
      line1: parsed.line1 ? "" : prev.line1,
      city: parsed.city ? "" : prev.city,
      state: parsed.state ? "" : prev.state,
      pincode: parsed.pincode ? "" : prev.pincode,
    }));
  };

  const validateAll = () => {
    const nextErrors = {};
    Object.keys(validators).forEach((field) => {
      nextErrors[field] = validators[field](buyer[field] || "");
    });
    setFieldErrors(nextErrors);
    setTouched(Object.keys(validators).reduce((acc, f) => ({ ...acc, [f]: true }), {}));
    return Object.values(nextErrors).every((msg) => !msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!draftItems.length) {
      setError("Add at least one product from the Catalog before requesting a quote.");
      return;
    }

    if (!validateAll()) {
      setError("Please fix the errors below before submitting.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        buyerBusinessName: buyer.buyerBusinessName,
        shippingAddress: {
          name: buyer.name,
          phone: buyer.phone,
          line1: buyer.line1,
          line2: buyer.line2,
          city: buyer.city,
          state: buyer.state,
          pincode: buyer.pincode,
        },
        items: draftItems.map((item) => ({
          productId: item.productId,
          variantLabel: item.variantLabel,
          quantity: item.quantity,
          proposedPrice: item.proposedPrice,
        })),
      };

      await createQuote(payload);

      dispatch(clearDraft());
      setBuyer(initialBuyer);
      setTouched({});
      setSuccess("Quote request submitted. We'll notify you once it's reviewed.");
      loadQuotes();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to submit quote request.");
    } finally {
      setSubmitting(false);
    }
  };

  const pendingCount = quotes.filter((q) => q.status === "Pending").length;
  const approvedCount = quotes.filter((q) => q.status === "Approved").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[#202020] sm:text-2xl">
          Request Quote
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Review the products you've added from the Catalog, add buyer details, and
          submit for admin approval.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={<FiFileText size={20} />} label="Draft items" value={draftItems.length} />
        <StatCard icon={<FiClock size={20} />} label="Awaiting review" value={pendingCount} />
        <StatCard icon={<FiCheckCircle size={20} />} label="Approved" value={approvedCount} />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-[#202020]">Draft quote</h2>

        {draftItems.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">
            No products added yet. Go to the Catalog to add products at your proposed
            bulk price.
          </p>
        ) : (
          <div className="mt-4 divide-y divide-gray-50">
            {draftItems.map((item) => (
              <div key={item.id} className="flex flex-wrap items-center gap-3 py-3">
                <span className="flex-1 text-sm font-medium text-[#202020]">
                  {item.name} <span className="text-gray-400">({item.variantLabel})</span>
                </span>
                <input
                  type="number"
                  min={MIN_BULK_QUANTITY}
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(updateDraftItem({ id: item.id, quantity: Number(e.target.value) }))
                  }
                  className="w-24 rounded-lg border border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-[#047B22]"
                />
                <input
                  type="number"
                  min={1}
                  max={item.listedPrice}
                  value={item.proposedPrice}
                  onChange={(e) =>
                    dispatch(updateDraftItem({ id: item.id, proposedPrice: Number(e.target.value) }))
                  }
                  className="w-24 rounded-lg border border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-[#047B22]"
                />
                <span className="w-24 text-right text-sm font-medium text-[#202020]">
                  ₹{(item.proposedPrice * item.quantity).toLocaleString()}
                </span>
                <button
                  onClick={() => dispatch(removeDraftItem(item.id))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                >
                  <FiTrash2 size={15} />
                </button>
              </div>
            ))}
            <div className="flex justify-end pt-3 text-sm font-semibold text-[#202020]">
              Total: ₹{draftTotal.toLocaleString()}
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-gray-100 bg-white p-4 sm:p-6"
      >
        <h2 className="text-lg font-semibold text-[#202020]">Buyer & delivery details</h2>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500">Business name</label>
          <input
            name="buyerBusinessName"
            value={buyer.buyerBusinessName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Green Leaf Retailers"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
          />
          {fieldErrors.buyerBusinessName && (
            <p className="text-xs text-red-600">{fieldErrors.buyerBusinessName}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500">Contact name</label>
            <input
              name="name"
              value={buyer.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />
            {fieldErrors.name && <p className="text-xs text-red-600">{fieldErrors.name}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500">Phone number</label>
            <input
              name="phone"
              value={buyer.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={10}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />
            {fieldErrors.phone && <p className="text-xs text-red-600">{fieldErrors.phone}</p>}
          </div>
        </div>

        <AddressMapPicker onAddressChange={handleMapAddressChange} />

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500">Address line 1</label>
          <input
            name="line1"
            value={buyer.line1}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
          />
          {fieldErrors.line1 && <p className="text-xs text-red-600">{fieldErrors.line1}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500">Address line 2 (optional)</label>
          <input
            name="line2"
            value={buyer.line2}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500">City</label>
            <input
              name="city"
              value={buyer.city}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />
            {fieldErrors.city && <p className="text-xs text-red-600">{fieldErrors.city}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500">State</label>
            <input
              name="state"
              value={buyer.state}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />
            {fieldErrors.state && <p className="text-xs text-red-600">{fieldErrors.state}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500">Pincode</label>
            <input
              name="pincode"
              value={buyer.pincode}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={6}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />
            {fieldErrors.pincode && <p className="text-xs text-red-600">{fieldErrors.pincode}</p>}
          </div>
        </div>

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
        {success && (
          <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-[#0F6B3E]">{success}</p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-[#047B22] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#03641c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit quote request"}
          </button>
        </div>
      </form>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
        <h2 className="mb-4 text-lg font-semibold text-[#202020]">Your quote requests</h2>
        {loadingQuotes ? (
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
            pageSize={5}
            emptyMessage="No quote requests yet."
          />
        )}
      </div>
    </div>
  );
};

export default RequestQuote;
