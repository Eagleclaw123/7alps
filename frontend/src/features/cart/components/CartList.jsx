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
}) => {
  return (
    <div className="sm:overflow-x-auto">
      <div className="sm:min-w-[720px]">
        <CartTableHeader columns={columns} />

        {items.length > 0 ? (
          <div className="space-y-3 px-4 py-4 sm:space-y-0 sm:px-0 sm:py-0">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={(id) => onUpdateQuantity(id, 1)}
                onDecrease={(id) => onUpdateQuantity(id, -1)}
                onRemove={onRemove}
                onAdd={onAdd}
              />
            ))}
          </div>
        ) : (
          <EmptyCart
            title="Your cart is empty"
            description="Add some herbal blends to get started — they'll show up here ready for checkout."
            buttonText="Shop Products"
            buttonHref="/products"
          />
        )}
      </div>
    </div>
  );
};

export default CartList;
