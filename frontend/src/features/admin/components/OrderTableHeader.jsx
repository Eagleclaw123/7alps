const OrderTableHeader = () => (
  <div className="grid grid-cols-[1.2fr_1.4fr_0.9fr_0.7fr_1fr_0.9fr_0.9fr] gap-4 border-b border-gray-300 py-4 text-md font-semibold text-gray-800">
    <span>Order ID</span>
    <span>Customer</span>
    <span>Amount</span>
    <span>Items</span>
    <span>Payment</span>
    <span>Status</span>
    <span>Invoice</span>
  </div>
);

export default OrderTableHeader;
