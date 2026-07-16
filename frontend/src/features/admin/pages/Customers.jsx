import { useEffect, useState } from "react";
import DataTable from "../../../shared/dashboard/components/DataTable";
import { getCustomers } from "../../../shared/services/admin.service";

const PAGE_SIZE = 8;

const columns = [
  {
    key: "name",
    header: "Customer",
    render: (c) => (
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF3DE] text-xs font-semibold text-[#3B6D11]">
          {(c.name || "?").charAt(0).toUpperCase()}
        </span>
        <span className="font-medium text-[#202020]">{c.name}</span>
      </div>
    ),
  },
  { key: "mobile", header: "Mobile" },
  { key: "email", header: "Email", render: (c) => c.email || "—" },
  {
    key: "location",
    header: "Location",
    render: (c) => {
      const addr = c.addresses?.find((a) => a.isDefault) || c.addresses?.[0];
      return addr ? `${addr.city}, ${addr.state}` : "—";
    },
  },
  {
    key: "totalOrders",
    header: "Orders",
    render: (c) => (c.totalOrders > 0 ? `${c.totalOrders} orders` : "N/A"),
  },
  {
    key: "totalSpent",
    header: "Amount spent",
    render: (c) => `₹${(c.totalSpent || 0).toLocaleString()}`,
  },
  {
    key: "createdAt",
    header: "Joined",
    render: (c) => new Date(c.createdAt).toLocaleDateString(),
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCustomers()
      .then(({ data }) => setCustomers(data?.data?.customers || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
      {/* Header */}
      <div className="mb-1">
        <h1 className="text-xl font-semibold text-[#202020] sm:text-2xl">Customers</h1>
        <p className="mt-1 text-sm text-gray-500">
          Everyone who has created an account on the storefront.
        </p>
      </div>

      {/* Stat strip */}
      <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <span className="font-semibold text-[#202020]">{customers.length} customers</span>
      </div>

      <div className="mt-4">
        {loading ? (
          <p className="py-10 text-center text-gray-500">Loading customers...</p>
        ) : (
          <DataTable
            data={customers}
            columns={columns}
            rowKey={(c) => c._id}
            searchKeys={["name", "mobile", "email"]}
            searchPlaceholder="Search customer"
            pageSize={PAGE_SIZE}
            emptyMessage="No customers match this filter."
          />
        )}
      </div>
    </div>
  );
};

export default Customers;
