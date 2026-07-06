import CartItem from "./CartItem";
import CartTableHeader from "./CartTableHeader";
import EmptyCart from "./EmptyCart";

const CartList = ({ items, onUpdateQuantity, onRemove }) => {
  console.log("cart items:", items);
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[720px]">
        <CartTableHeader />

        {items.length > 0 ? (
          items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={(id) => onUpdateQuantity(id, 1)}
              onDecrease={(id) => onUpdateQuantity(id, -1)}
              onRemove={onRemove}
            />
          ))
        ) : (
          <p className="py-8 text-center text-gray-500">
            <EmptyCart />
          </p>
        )}
      </div>
    </div>
  );
};

export default CartList;
