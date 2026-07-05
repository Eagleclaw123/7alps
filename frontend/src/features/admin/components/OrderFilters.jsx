import { useState } from "react";
import Dropdown from "./Dropdown";
import { Search as SearchIcon, ArrowUpDown } from "lucide-react";

const OrderFilters = () => {
  const [status, setStatus] = useState("");
  const [shipping, setShipping] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 ">
      <div className="flex flex-wrap gap-3">
        <Dropdown
          label="Status"
          value={status}
          onChange={setStatus}
          options={[
            "Delivered",
            "Processing",
            "Shipped",
            "Cancelled",
            "Pending",
          ]}
        />
        <Dropdown
          label="Payment Status"
          value={paymentStatus}
          onChange={setPaymentStatus}
          options={["Paid", "COD"]}
        />
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 lg:w-64">
          <SearchIcon
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm"
          />
        </div>

        <button className="flex items-center gap-2 whitespace-nowrap rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <ArrowUpDown size={14} />
          Sort by
        </button>
      </div>
    </div>
  );
};

export default OrderFilters;
