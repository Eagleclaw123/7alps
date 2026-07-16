import { useEffect, useState } from "react";
import { FiFileText, FiClock, FiPackage, FiDollarSign } from "react-icons/fi";
import StatCard from "../../../shared/dashboard/components/StatCard";
import { getB2BDashboardStats } from "../../../shared/services/b2b.service";

const initialStats = {
  totalQuotes: 0,
  pendingQuotes: 0,
  totalOrders: 0,
  totalSales: 0,
};

const B2BDashboard = () => {
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getB2BDashboardStats()
      .then(({ data }) => setStats({ ...initialStats, ...data?.data }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<FiFileText size={20} />}
          label="Total Quotes"
          value={loading ? "..." : stats.totalQuotes}
        />
        <StatCard
          icon={<FiClock size={20} />}
          label="Awaiting Review"
          value={loading ? "..." : stats.pendingQuotes}
        />
        <StatCard
          icon={<FiPackage size={20} />}
          label="Bulk Orders"
          value={loading ? "..." : stats.totalOrders}
        />
        <StatCard
          icon={<FiDollarSign size={20} />}
          label="Total Sales"
          value={loading ? "..." : `₹${stats.totalSales.toLocaleString()}`}
        />
      </div>
    </section>
  );
};

export default B2BDashboard;
