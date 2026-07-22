import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { FiTrendingUp } from "react-icons/fi";

const COLORS = ["#0f5132", "#34a870", "#a7e3c4"]; // emerald family, matches your brand green

/**
 * Fills the empty space below the Admin stat cards with a bar chart
 * comparing store counts, plus a revenue highlight card.
 * Derived purely from stats you already fetch for the admin dashboard —
 * no extra endpoint required.
 *
 * stats shape: { totalCustomers, totalOrders, totalProducts, revenue }
 */
const AdminDashboardVisuals = ({ stats }) => {
  const {
    totalCustomers = 0,
    totalOrders = 0,
    totalProducts = 0,
    totalRevenue = 0,
  } = stats || {};

  const barData = [
    { name: "Customers", value: totalCustomers },
    { name: "Orders", value: totalOrders },
    { name: "Products", value: totalProducts },
  ];

  const hasData = barData.some((d) => d.value > 0);
  const avgOrderValue =
    totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const ordersPerCustomer =
    totalCustomers > 0 ? (totalOrders / totalCustomers).toFixed(1) : "0";

  return (
    <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Bar chart: store overview */}
      <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Store Overview
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Customers, orders, and catalog size at a glance
          </p>
        </div>

        {hasData ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f1f1"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 13, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip cursor={{ fill: "#f9fafb" }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={64}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="py-16 text-center text-gray-400">
            <FiTrendingUp className="mx-auto mb-3 text-3xl" />
            <p>
              Your store overview will appear here once you have customers or
              orders
            </p>
          </div>
        )}
      </div>

      {/* Revenue highlight card */}
      <div className="bg-gradient-to-br from-[#0f5132] to-[#1a7a4c] rounded-2xl shadow-sm p-6 text-white flex flex-col justify-between">
        <div>
          <p className="text-sm text-white/80">Revenue</p>
          <p className="text-4xl font-bold mt-1">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="mt-8 space-y-5">
          <div>
            <p className="text-sm text-white/80 mb-1">Avg. order value</p>
            <p className="text-2xl font-semibold">
              ₹{avgOrderValue.toLocaleString("en-IN")}
            </p>
          </div>
          <div>
            <p className="text-sm text-white/80 mb-1">Orders per customer</p>
            <p className="text-2xl font-semibold">{ordersPerCustomer}</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/20 flex items-center gap-2 text-xs text-white/70">
          <FiTrendingUp />
          <span>Updated in real time from your dashboard stats</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardVisuals;
