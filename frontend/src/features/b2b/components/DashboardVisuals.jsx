import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { FiTrendingUp } from "react-icons/fi";

const COLORS = ["#0f5132", "#34a870", "#a7e3c4"]; // emerald family, matches your brand green

/**
 * Fills the empty space below the stat cards with charts derived
 * purely from the `stats` object you already fetch via
 * getB2BDashboardStats() — no extra endpoint required.
 *
 * stats shape: { totalQuotes, pendingQuotes, totalOrders, totalSales }
 */
const DashboardVisuals = ({ stats }) => {
  const {
    totalQuotes = 0,
    pendingQuotes = 0,
    totalOrders = 0,
    totalSales = 0,
  } = stats || {};

  const reviewed = Math.max(totalQuotes - pendingQuotes, 0);

  const pieData = [
    { name: "Reviewed Quotes", value: reviewed },
    { name: "Awaiting Review", value: pendingQuotes },
    { name: "Bulk Orders", value: totalOrders },
  ].filter((d) => d.value > 0);

  const hasData = pieData.length > 0;

  // Simple progress metric: how much of your quote pipeline has moved past review
  const reviewProgress =
    totalQuotes > 0 ? Math.round((reviewed / totalQuotes) * 100) : 0;

  return (
    <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Donut chart: pipeline breakdown */}
      <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Pipeline Overview
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            How your quotes and orders are distributed
          </p>
        </div>

        {hasData ? (
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full sm:w-56 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex-1 w-full space-y-3">
              {pieData.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    />
                    <span className="text-sm text-gray-600">{d.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {d.value}
                  </span>
                </div>
              ))}

              <div className="pt-3 mt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-gray-600">Review progress</span>
                  <span className="font-semibold text-gray-900">
                    {reviewProgress}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all"
                    style={{ width: `${reviewProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-16 text-center text-gray-400">
            <FiTrendingUp className="mx-auto mb-3 text-3xl" />
            <p>
              Your pipeline chart will appear here once you have quotes or
              orders
            </p>
          </div>
        )}
      </div>

      {/* Sales highlight card */}
      <div className="bg-gradient-to-br from-[#0f5132] to-[#1a7a4c] rounded-2xl shadow-sm p-6 text-white flex flex-col justify-between">
        <div>
          <p className="text-sm text-white/80">Total Sales</p>
          <p className="text-4xl font-bold mt-1">
            ₹{totalSales.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="mt-8">
          <p className="text-sm text-white/80 mb-1">Avg. order value</p>
          <p className="text-2xl font-semibold">
            ₹
            {totalOrders > 0
              ? Math.round(totalSales / totalOrders).toLocaleString("en-IN")
              : totalSales.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-white/60 mt-1">
            Across {totalOrders} bulk {totalOrders === 1 ? "order" : "orders"}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/20 flex items-center gap-2 text-xs text-white/70">
          <FiTrendingUp />
          <span>Updated in real time from your dashboard stats</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardVisuals;
