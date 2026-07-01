import {
  FiUsers,
  FiShoppingCart,
  FiPackage,
  FiDollarSign,
} from "react-icons/fi";

import StatCard from "../../../shared/dashboard/components/StatCard";

const AdminDashboard = () => {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>

        <p className="mt-2 text-gray-500">
          Here's a quick overview of your platform.
        </p>
      </div>

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

        <StatCard title="Products" value="82" growth="+4%" icon={FiPackage} />

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
