import { useEffect, useState } from "react";
import {
  FiUsers,
  FiShoppingCart,
  FiPackage,
  FiDollarSign,
} from "react-icons/fi";
import StatCard from "../../../shared/dashboard/components/StatCard";
import { getDashboardStats } from "../../../shared/services/admin.service";

const initialStats = {
  totalCustomers: 0,
  totalOrders: 0,
  totalProducts: 0,
  totalRevenue: 0,
};

const Dashboard = () => {
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(({ data }) => setStats({ ...initialStats, ...data?.data }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<FiUsers size={20} />}
          label="Total Customers"
          value={loading ? "..." : stats.totalCustomers.toLocaleString()}
        />
        <StatCard
          icon={<FiShoppingCart size={20} />}
          label="Total Orders"
          value={loading ? "..." : stats.totalOrders.toLocaleString()}
        />
        <StatCard
          icon={<FiPackage size={20} />}
          label="Products"
          value={loading ? "..." : stats.totalProducts.toLocaleString()}
        />
        <StatCard
          icon={<FiDollarSign size={20} />}
          label="Revenue"
          value={loading ? "..." : `₹${stats.totalRevenue.toLocaleString()}`}
        />
      </div>
    </section>
  );
};

export default Dashboard;
