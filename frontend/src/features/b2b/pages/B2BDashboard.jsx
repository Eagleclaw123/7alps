import { FiPackage, FiFileText, FiTruck, FiUsers } from "react-icons/fi";
import StatCard from "../../../shared/dashboard/components/StatCard";

const B2BDashboard = () => {
  return (
    <section className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<FiPackage size={20} />}
          label="Bulk Orders"
          value="42"
          delta="8%"
        />

        <StatCard
          icon={<FiFileText size={20} />}
          label="Quotations"
          value="18"
          delta="5%"
        />

        <StatCard
          icon={<FiTruck size={20} />}
          label="Shipments"
          value="27"
          delta="3%"
        />

        <StatCard
          icon={<FiUsers size={20} />}
          label="Business Clients"
          value="14"
          delta="2%"
        />
      </div>
    </section>
  );
};

export default B2BDashboard;
