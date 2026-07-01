import { FiPackage, FiFileText, FiTruck, FiUsers } from "react-icons/fi";

import StatCard from "../../../shared/dashboard/components/StatCard";

const B2BDashboard = () => {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Business Dashboard</h2>

        <p className="mt-2 text-gray-500">
          Here's a quick overview of your business account.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Bulk Orders"
          value="42"
          growth="+8%"
          icon={FiPackage}
        />

        <StatCard
          title="Quotations"
          value="18"
          growth="+5%"
          icon={FiFileText}
        />

        <StatCard title="Shipments" value="27" growth="+3%" icon={FiTruck} />

        <StatCard
          title="Business Clients"
          value="14"
          growth="+2%"
          icon={FiUsers}
        />
      </div>
    </section>
  );
};

export default B2BDashboard;
