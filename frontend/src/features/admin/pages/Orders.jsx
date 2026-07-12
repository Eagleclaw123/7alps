import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiDollarSign,
} from "react-icons/fi";
import StatCard from "../../../shared/dashboard/components/StatCard";
import DataTable from "../../../shared/dashboard/components/DataTable";
import Badge from "../../../shared/dashboard/components/Badge";

const ORDERS = [
  {
    id: "ORD-5231",
    customer: "Esther Howard",
    products: "Beetroot Powder, Ginger Powder",
    total: 1960,
    date: "2026-06-18",
    status: "Delivered",
    payment: "Paid",
  },
  {
    id: "ORD-5230",
    customer: "Leslie Alexander",
    products: "Sandalwood Face Pack",
    total: 1020,
    date: "2026-06-25",
    status: "Shipped",
    payment: "Paid",
  },
  {
    id: "ORD-5229",
    customer: "Guy Hawkins",
    products: "Brahmi Powder, Amla Powder",
    total: 1230,
    date: "2026-06-29",
    status: "Processing",
    payment: "Pending",
  },
  {
    id: "ORD-5228",
    customer: "Savannah Nguyen",
    products: "Ginger Powder",
    total: 360,
    date: "2026-07-02",
    status: "Confirmed",
    payment: "Pending",
  },
  {
    id: "ORD-5227",
    customer: "Bessie Cooper",
    products: "Beetroot Powder",
    total: 880,
    date: "2026-06-05",
    status: "Delivered",
    payment: "Paid",
  },
  {
    id: "ORD-5226",
    customer: "Ronald Richards",
    products: "Sandalwood Face Pack, Brahmi Powder",
    total: 340,
    date: "2026-05-30",
    status: "Cancelled",
    payment: "Refunded",
  },
  {
    id: "ORD-5225",
    customer: "Marvin McKinney",
    products: "Amla Powder",
    total: 1140,
    date: "2026-05-22",
    status: "Delivered",
    payment: "Paid",
  },
  {
    id: "ORD-5224",
    customer: "Kathryn Murphy",
    products: "Multani Mitti",
    total: 420,
    date: "2026-05-18",
    status: "Shipped",
    payment: "Paid",
  },
  {
    id: "ORD-5223",
    customer: "Eleanor Pena",
    products: "Ginger Powder, Amla Powder",
    total: 950,
    date: "2026-05-12",
    status: "Delivered",
    payment: "Paid",
  },
  {
    id: "ORD-5222",
    customer: "Esther Howard",
    products: "Brahmi Powder",
    total: 260,
    date: "2026-05-08",
    status: "Cancelled",
    payment: "Refunded",
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

const columns = [
  { key: "id", header: "Order ID", render: (o) => o.id },
  { key: "customer", header: "Customer" },
  { key: "products", header: "Products" },
  {
    key: "total",
    header: "Total",
    render: (o) => `₹${o.total.toLocaleString()}`,
  },
  { key: "date", header: "Date" },
  {
    key: "status",
    header: "Status",
    render: (o) => <Badge value={o.status} styles={STATUS_STYLES} />,
  },
  {
    key: "payment",
    header: "Payment",
    render: (o) => (
      <span className={`text-sm font-medium ${PAYMENT_STYLES[o.payment]}`}>
        {o.payment}
      </span>
    ),
  },
  {
    key: "action",
    header: "",
    className: "w-10 text-right",
    render: () => (
      <button className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600">
        <HiOutlineDotsVertical size={18} />
      </button>
    ),
  },
];

const Orders = () => {
  const totalRevenue = ORDERS.filter((o) => o.payment === "Paid").reduce(
    (sum, o) => sum + o.total,
    0,
  );
  const pendingCount = ORDERS.filter((o) =>
    ["Confirmed", "Processing"].includes(o.status),
  ).length;
  const deliveredCount = ORDERS.filter((o) => o.status === "Delivered").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<FiShoppingBag size={20} />}
          label="Total orders"
          value={ORDERS.length}
        />
        <StatCard
          icon={<FiClock size={20} />}
          label="Needs attention"
          value={pendingCount}
        />
        <StatCard
          icon={<FiCheckCircle size={20} />}
          label="Delivered"
          value={deliveredCount}
        />
        <StatCard
          icon={<FiDollarSign size={20} />}
          label="Revenue collected"
          value={`₹${totalRevenue.toLocaleString()}`}
        />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
        <DataTable
          data={ORDERS}
          columns={columns}
          rowKey={(o) => o.id}
          searchKeys={["id", "customer", "products"]}
          searchPlaceholder="Search order ID, customer, or product"
          filters={[
            {
              field: "status",
              label: "Status",
              options: [
                "All",
                "Confirmed",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled",
              ],
            },
          ]}
          pageSize={6}
          emptyMessage="No orders match this filter."
        />
      </div>
    </div>
  );
};

export default Orders;
