import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiPlus, FiBox, FiClock, FiTruck, FiDollarSign } from "react-icons/fi";
import Badge from "../../../shared/dashboard/components/Badge";
import StatCard from "../../../shared/dashboard/components/StatCard";
import DataTable from "../../../shared/dashboard/components/DataTable";

const BULK_ORDERS = [
  {
    id: "BLK-1042",
    products: 6,
    quantity: 480,
    total: 96000,
    status: "Delivered",
    date: "2026-06-18",
  },
  {
    id: "BLK-1041",
    products: 3,
    quantity: 210,
    total: 42500,
    status: "Shipped",
    date: "2026-06-25",
  },
  {
    id: "BLK-1040",
    products: 4,
    quantity: 320,
    total: 61200,
    status: "Processing",
    date: "2026-06-29",
  },
  {
    id: "BLK-1039",
    products: 2,
    quantity: 150,
    total: 28800,
    status: "Awaiting approval",
    date: "2026-07-02",
  },
  {
    id: "BLK-1038",
    products: 8,
    quantity: 640,
    total: 118400,
    status: "Delivered",
    date: "2026-06-05",
  },
  {
    id: "BLK-1037",
    products: 1,
    quantity: 90,
    total: 16200,
    status: "Cancelled",
    date: "2026-05-30",
  },
  {
    id: "BLK-1036",
    products: 5,
    quantity: 400,
    total: 76000,
    status: "Awaiting approval",
    date: "2026-07-06",
  },
];

const STATUS_STYLES = {
  Delivered: "bg-[#EAF3DE] text-[#3B6D11]",
  Shipped: "bg-[#E6F1FB] text-[#0C447C]",
  Processing: "bg-[#FAEEDA] text-[#854F0B]",
  "Awaiting approval": "bg-[#EEEDFE] text-[#3C3489]",
  Cancelled: "bg-[#FCEBEB] text-[#A32D2D]",
};

const PAGE_SIZE = 10;

const columns = [
  { key: "id", header: "Order ID", render: (o) => o.id },
  {
    key: "products",
    header: "Products",
    render: (o) => `${o.products} products`,
  },
  {
    key: "quantity",
    header: "Quantity",
    render: (o) => `${o.quantity.toLocaleString()} units`,
  },
  {
    key: "total",
    header: "Total",
    render: (o) => `₹${o.total.toLocaleString()}`,
  },
  {
    key: "status",
    header: "Status",
    render: (o) => <Badge value={o.status} styles={STATUS_STYLES} />,
  },
  { key: "date", header: "Date placed" },
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

const BulkOrders = () => {
  const totalValue = BULK_ORDERS.reduce((sum, o) => sum + o.total, 0);
  const awaitingCount = BULK_ORDERS.filter(
    (o) => o.status === "Awaiting approval",
  ).length;
  const inTransitCount = BULK_ORDERS.filter(
    (o) => o.status === "Shipped" || o.status === "Processing",
  ).length;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#202020] sm:text-2xl">
            Bulk Orders
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your wholesale purchase requests and track fulfillment.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-[#047B22] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#03641c]">
          <FiPlus size={16} />
          New bulk order
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<FiBox size={20} />}
          label="Total bulk orders"
          value={BULK_ORDERS.length}
          delta="8%"
        />
        <StatCard
          icon={<FiClock size={20} />}
          label="Awaiting approval"
          value={awaitingCount}
        />
        <StatCard
          icon={<FiTruck size={20} />}
          label="In transit"
          value={inTransitCount}
          delta="3%"
        />
        <StatCard
          icon={<FiDollarSign size={20} />}
          label="Total value"
          value={`₹${totalValue.toLocaleString()}`}
          delta="12%"
        />
      </div>

      {/* Table card */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
        <DataTable
          data={BULK_ORDERS}
          columns={columns}
          rowKey={(o) => o.id}
          searchKeys={["id"]}
          searchPlaceholder="Search order ID"
          filters={[
            {
              field: "status",
              label: "Status",
              options: [
                "All",
                "Awaiting approval",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled",
              ],
            },
          ]}
          pageSize={PAGE_SIZE}
          emptyMessage="No bulk orders match this filter."
        />
      </div>
    </div>
  );
};

export default BulkOrders;
