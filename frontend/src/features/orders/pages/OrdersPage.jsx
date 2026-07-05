import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMyOrders } from "../../../shared/services/order.service";

const STATUS_STYLES = {
  Confirmed: "bg-blue-100 text-blue-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const OrdersPage = () => {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(({ data }) => setOrders(data?.data?.orders || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-8 mt-16 px-6 xl:px-0">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">My Orders</h2>
          <p className="mt-2 text-gray-500">Track and review your past orders.</p>
        </div>

        {location.state?.justPlaced ? (
          <div className="rounded-xl bg-green-50 p-4 text-green-700">
            Your order has been placed successfully!
          </div>
        ) : null}

        {loading ? (
          <p className="text-gray-500">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl border border-gray-200 bg-white p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(order.placedAt).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      STATUS_STYLES[order.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="mt-4 divide-y divide-gray-100 border-t border-gray-100">
                  {order.items.map((item) => (
                    <div
                      key={`${item.product}-${item.variantLabel}`}
                      className="flex justify-between py-2 text-sm text-gray-600"
                    >
                      <span>
                        {item.name} ({item.variantLabel}) × {item.quantity}
                      </span>
                      <span>₹{item.subtotal}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex justify-end border-t border-gray-100 pt-3">
                  <span className="text-lg font-semibold text-[#047B22]">
                    Total: ₹{order.totalAmount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
