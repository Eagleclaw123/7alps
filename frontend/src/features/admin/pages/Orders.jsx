import { useEffect, useState } from "react";
import { FiShoppingBag, FiClock, FiCheckCircle, FiDollarSign } from "react-icons/fi";
import StatCard from "../../../shared/dashboard/components/StatCard";
import DataTable from "../../../shared/dashboard/components/DataTable";
import { getAllOrders, updateOrderStatus } from "../../../shared/services/admin.service";

const STATUS_OPTIONS = ["Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"];

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

const buyerName = (order) =>
  order.source === "B2B"
    ? `${order.b2bMember?.name || "B2B"} (${order.buyerBusinessName || "—"})`
    : order.customer?.name || "Guest";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = () => {
    setLoading(true);
    getAllOrders()
      .then(({ data }) => setOrders(data?.data?.orders || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateOrderStatus(id, status);
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
  };

  const ordersWithSearchFields = orders.map((o) => ({
    ...o,
    buyerNameText: buyerName(o),
    productsText: o.items.map((i) => `${i.name} (${i.variantLabel})`).join(", "),
  }));

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "Paid")
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingCount = orders.filter((o) => ["Confirmed", "Processing"].includes(o.status)).length;
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;

  const columns = [
    { key: "id", header: "Order ID", render: (o) => `#${o._id.slice(-8).toUpperCase()}` },
    { key: "buyerNameText", header: "Customer" },
    { key: "productsText", header: "Products" },
    {
      key: "total",
      header: "Total",
      render: (o) => `₹${o.totalAmount.toLocaleString()}`,
    },
    { key: "placedAt", header: "Date", render: (o) => new Date(o.placedAt).toLocaleDateString() },
    {
      key: "status",
      header: "Status",
      render: (o) => (
        <select
          value={o.status}
          onChange={(e) => handleStatusChange(o._id, e.target.value)}
          className={`rounded-full border-none px-3 py-1 text-xs font-medium outline-none ${STATUS_STYLES[o.status]}`}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      ),
    },
    {
      key: "payment",
      header: "Payment",
      render: (o) => (
        <span className={`text-sm font-medium ${PAYMENT_STYLES[o.paymentStatus]}`}>
          {o.paymentStatus} ({o.paymentMethod})
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<FiShoppingBag size={20} />} label="Total orders" value={orders.length} />
        <StatCard icon={<FiClock size={20} />} label="Needs attention" value={pendingCount} />
        <StatCard icon={<FiCheckCircle size={20} />} label="Delivered" value={deliveredCount} />
        <StatCard
          icon={<FiDollarSign size={20} />}
          label="Revenue collected"
          value={`₹${totalRevenue.toLocaleString()}`}
        />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
        {loading ? (
          <p className="py-10 text-center text-gray-500">Loading orders...</p>
        ) : (
          <DataTable
            data={ordersWithSearchFields}
            columns={columns}
            rowKey={(o) => o._id}
            searchKeys={["buyerNameText", "productsText"]}
            searchPlaceholder="Search customer or product"
            filters={[
              {
                field: "status",
                label: "Status",
                options: ["All", ...STATUS_OPTIONS],
              },
            ]}
            pageSize={6}
            emptyMessage="No orders match this filter."
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
