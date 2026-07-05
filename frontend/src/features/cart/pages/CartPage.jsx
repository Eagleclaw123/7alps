import CartBanner from "../components/CartBanner";
import CartFooter from "../components/CartFooter";
import CartList from "../components/CartList";
import OrderSummary from "../components/OrderSummary";
import { useDispatch, useSelector } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  selectCartItems,
  selectSubtotal,
} from "../../../store/slices/cartSlice";
import NewsletterBanner from "../components/NewsletterBanner";

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotal);

  const updateQuantity = (id, delta) => {
    if (delta > 0) {
      dispatch(increaseQuantity(id));
    } else {
      dispatch(decreaseQuantity(id));
    }
  };

  return (
    <div className="py-8 mt-16 px-6 xl:px-0">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-sm">
        <CartBanner />

        <div className="py-6">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>

          <div>
            <OrderSummary itemCount={items.length} />
            <CartList
              items={items}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
            <CartFooter subtotal={subtotal} />
            <NewsletterBanner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
