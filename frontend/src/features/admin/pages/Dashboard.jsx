import { useEffect, useState } from "react";
import {
  FiUsers,
  FiShoppingCart,
  FiPackage,
  FiDollarSign,
} from "react-icons/fi";
import StatCard from "../../../shared/dashboard/components/StatCard";

const Dashboard = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          (import.meta.env.VITE_API_BASE_URL ||
            "http://localhost:3000/api/v1") + "/products",
        );
        const json = await res.json();
        setProductsCount(json?.results || 0);
      } catch (err) {
        setProductsCount(0);
      } finally {
        setLoading(false);
      }
    };

    loadCounts();
  }, []);

  return (
    <section className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<FiUsers size={20} />}
          label="Total Customers"
          value="1,248"
          delta="12%"
        />
        <StatCard
          icon={<FiShoppingCart size={20} />}
          label="Total Orders"
          value="356"
          delta="9%"
        />
        <StatCard
          icon={<FiPackage size={20} />}
          label="Products"
          value={loading ? "..." : String(productsCount)}
        />
        <StatCard
          icon={<FiDollarSign size={20} />}
          label="Revenue"
          value="₹4.8L"
          delta="16%"
        />
      </div>
    </section>
  );
};

export default Dashboard;
