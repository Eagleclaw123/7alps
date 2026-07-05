import OrderItem from "./OrderItem";
import OrderTableHeader from "./OrderTableHeader";
const OrderList = ({ items }) => (
  <div className="overflow-x-auto">
    <div className="min-w-[720px]">
      <OrderTableHeader />

      {items.length > 0 ? (
        items.map((item) => <OrderItem key={item.id} item={item} />)
      ) : (
        <p className="py-8 text-center text-gray-500">No orders found.</p>
      )}
    </div>
  </div>
);

export default OrderList;
