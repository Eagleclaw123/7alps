import { FiShoppingBag, FiHeart, FiTruck, FiMapPin } from "react-icons/fi";

import StatCard from "../../../shared/dashboard/components/StatCard";

const CustomerDashboard = () => {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>

        <p className="mt-2 text-gray-500">
          Here's a quick overview of your account.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Orders"
          value="18"
          growth="+3%"
          icon={FiShoppingBag}
        />

        <StatCard title="Wishlist" value="12" growth="+1%" icon={FiHeart} />

        <StatCard title="Delivered" value="15" growth="+5%" icon={FiTruck} />

        <StatCard title="Addresses" value="3" icon={FiMapPin} />
      </div>
    </section>
  );
};

export default CustomerDashboard;
