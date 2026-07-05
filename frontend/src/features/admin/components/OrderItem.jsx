import { FileText } from "lucide-react";

const statusStyles = {
  "In-transit": { dot: "bg-orange-500", text: "text-orange-600" },
  "Picked up": { dot: "bg-blue-500", text: "text-blue-600" },
  Delivered: { dot: "bg-green-500", text: "text-green-600" },
  Failed: { dot: "bg-red-500", text: "text-red-600" },
  Delayed: { dot: "bg-gray-700", text: "text-gray-700" },
  Pending: { dot: "bg-orange-500", text: "text-orange-600" },
};

const paymentStyles = {
  Paid: "bg-green-50 text-green-600",
  COD: "bg-orange-50 text-orange-600",
};

const OrderItem = ({ item }) => {
  const status = statusStyles[item.status] || statusStyles.Pending;
  const payment = paymentStyles[item.payment] || "bg-gray-50 text-gray-600";

  return (
    <div className="grid grid-cols-[1.2fr_1.4fr_0.9fr_0.7fr_1fr_0.9fr_0.9fr] items-center gap-4 border-b border-gray-300 py-4">
      {/* Order ID */}
      <div>
        <p className="text-sm font-semibold text-blue-600">{item.id}</p>
        <p className="text-xs text-gray-400">{item.date}</p>
      </div>

      {/* Customer */}
      <span className="text-sm text-gray-700">{item.customer}</span>

      {/* Amount */}
      <span className="text-sm font-medium text-gray-800">
        ${item.amount.toFixed(2)}
      </span>

      {/* Items */}
      <span className="text-sm text-gray-700">{item.items}</span>

      {/* Payment */}
      <span
        className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${payment}`}
      >
        {item.payment}
      </span>

      {/* Status */}
      <span
        className={`flex items-center gap-1.5 text-sm font-semibold ${status.text}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
        {item.status}
      </span>

      {/* Invoice */}
      <button
        className="flex h-8 w-8 items-center justify-center rounded-md text-blue-500 hover:bg-blue-50"
        aria-label={`View invoice for ${item.id}`}
      >
        <FileText size={16} />
      </button>
    </div>
  );
};

export default OrderItem;
