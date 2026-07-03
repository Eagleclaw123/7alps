import { useEffect, useState } from "react";
import {
  FiUsers,
  FiShoppingCart,
  FiPackage,
  FiDollarSign,
} from "react-icons/fi";

import StatCard from "../../../shared/dashboard/components/StatCard";

const AdminDashboard = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

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
          title="Total Customers"
          value="1,248"
          growth="+12%"
          icon={FiUsers}
        />
        <StatCard
          title="Total Orders"
          value="356"
          growth="+9%"
          icon={FiShoppingCart}
        />
        <StatCard
          title="Products"
          value={loading ? "..." : String(productsCount)}
          growth="count"
          icon={FiPackage}
        />
        <StatCard
          title="Revenue"
          value="₹4.8L"
          growth="+16%"
          icon={FiDollarSign}
        />
      </div>
    </section>
  );
};

export default AdminDashboard;
