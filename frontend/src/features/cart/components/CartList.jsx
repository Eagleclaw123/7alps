import CartItem from "./CartItem";
import CartTableHeader from "./CartTableHeader";
import EmptyCart from "./EmptyCart";

const CartList = ({
  items,
  onUpdateQuantity,
  onRemove,
  onAdd,
  columns,
  emptyState,
  showTotal = true,
}) => {
  return (
    <div className="mt-2 w-full min-w-0">
      <div className="w-full min-w-0 overflow-hidden border border-[#D8CCC0] bg-[#F4EDE2]">
        {/* Desktop table header */}
        <CartTableHeader columns={columns} showTotal={showTotal} />

        {items.length > 0 ? (
          <div className="w-full min-w-0">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={(id) => onUpdateQuantity(id, 1)}
                onDecrease={(id) => onUpdateQuantity(id, -1)}
                onRemove={onRemove}
                onAdd={onAdd}
                showTotal={showTotal}
              />
            ))}
          </div>
        ) : (
          <div className="w-full min-w-0">
            <EmptyCart
              title="Your cart is empty"
              description="Add some herbal products to get started."
              buttonText="Shop Products"
              buttonHref="/products"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartList;
