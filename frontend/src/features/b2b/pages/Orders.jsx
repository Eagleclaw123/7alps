import { useEffect, useState } from "react";
import {
  FiPackage,
  FiDollarSign,
  FiCheckCircle,
  FiTruck,
} from "react-icons/fi";
import StatCard from "../../../shared/dashboard/components/StatCard";
import Badge from "../../../shared/dashboard/components/Badge";
import DataTable from "../../../shared/dashboard/components/DataTable";
import { getMyB2BOrders } from "../../../shared/services/b2b.service";

const STATUS_STYLES = {
  Confirmed: "bg-[#EEEDFE] text-[#3C3489]",
  Processing: "bg-[#FAEEDA] text-[#854F0B]",
  Shipped: "bg-[#E6F1FB] text-[#0C447C]",
  Delivered: "bg-[#EAF3DE] text-[#3B6D11]",
  Cancelled: "bg-[#FCEBEB] text-[#A32D2D]",
};

const PAGE_SIZE = 10;

const columns = [
  {
    key: "id",
    header: "Order ID",
    render: (o) => `#${o._id.slice(-8).toUpperCase()}`,
  },
  {
    key: "products",
    header: "Products",
    render: (o) =>
      o.items.map((i) => `${i.name} (${i.variantLabel})`).join(", "),
  },
  {
    key: "quantity",
    header: "Quantity",
    render: (o) => `${o.items.reduce((sum, i) => sum + i.quantity, 0)} units`,
  },
  {
    key: "totalAmount",
    header: "Total",
    render: (o) => `₹${o.totalAmount.toLocaleString()}`,
  },
  {
    key: "placedAt",
    header: "Date",
    render: (o) => new Date(o.placedAt).toLocaleDateString(),
  },
  {
    key: "status",
    header: "Status",
    render: (o) => <Badge value={o.status} styles={STATUS_STYLES} />,
  },
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyB2BOrders()
      .then(({ data }) => setOrders(data?.data?.orders || []))
      .finally(() => setLoading(false));
  }, []);

  const totalValue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;
  const inTransitCount = orders.filter((o) =>
    ["Confirmed", "Processing", "Shipped"].includes(o.status),
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[#202020] sm:text-2xl">
          Orders
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Bulk orders created once your quote requests are approved.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<FiPackage size={20} />}
          label="Total orders"
          value={orders.length}
        />
        <StatCard
          icon={<FiTruck size={20} />}
          label="In progress"
          value={inTransitCount}
        />
        <StatCard
          icon={<FiCheckCircle size={20} />}
          label="Delivered"
          value={deliveredCount}
        />
        <StatCard
          icon={<FiDollarSign size={20} />}
          label="Total value"
          value={`₹${totalValue.toLocaleString()}`}
        />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
        {loading ? (
          <p className="py-10 text-center text-gray-500">Loading orders...</p>
        ) : (
          <DataTable
            data={orders}
            columns={columns}
            rowKey={(o) => o._id}
            searchKeys={["productsText"]}
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
            pageSize={PAGE_SIZE}
            emptyMessage="No orders yet — approved quotes will show up here."
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
