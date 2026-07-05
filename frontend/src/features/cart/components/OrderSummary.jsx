const OrderSummary = ({ itemCount }) => (
  <div className="flex items-center justify-between py-4 text-sm">
    <span className="text-gray-700">
      You have <span className="font-semibold text-gray-900">{itemCount}</span>{" "}
      products in your cart
    </span>
    <span className="text-gray-500">
      Expected Delivery:{" "}
      <span className="font-semibold text-gray-900">Friday</span>
    </span>
  </div>
);

export default OrderSummary;
