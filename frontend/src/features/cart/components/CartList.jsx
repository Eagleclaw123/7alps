import CartItem from "./CartItem";
import CartTableHeader from "./CartTableHeader";
import EmptyCart from "./EmptyCart";

const CartList = ({ items, onUpdateQuantity, onRemove }) => {
  return (
    <div className="sm:overflow-x-auto">
      <div className="sm:min-w-[720px]">
        <CartTableHeader />

        {items.length > 0 ? (
          // space-y-3 gives the mobile cards breathing room between them;
          // at sm+ each CartItem's own row uses border-t instead, so the
          // spacing here is neutralized (sm:space-y-0) to avoid double gaps.
          <div className="space-y-3 px-4 py-4 sm:space-y-0 sm:px-0 sm:py-0">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={(id) => onUpdateQuantity(id, 1)}
                onDecrease={(id) => onUpdateQuantity(id, -1)}
                onRemove={onRemove}
              />
            ))}
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
};

export default CartList;
