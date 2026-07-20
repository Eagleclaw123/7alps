import CartBanner from "../components/CartBanner";
import CartFooter from "../components/CartFooter";
import CartList from "../components/CartList";
import OrderSummary from "../components/OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  updateQuantity,
  removeCartItemAsync,
  parseItemId,
  selectCartItems,
  selectSubtotal,
  selectCartCount,
  updateQuantity as updateQuantityThunk,
} from "../../../store/slices/cartSlice";
import NewsletterBanner from "../components/NewsletterBanner";
import { selectCustomer } from "../../../store/slices/authSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotal);
  const itemCount = useSelector(selectCartCount);
  const customer = useSelector(selectCustomer);

  const handleUpdateQuantity = (id, delta) => {
    const { productId, variantLabel } = parseItemId(id);
    dispatch(
      updateQuantity({
        productId,
        variantLabel,
        type: delta > 0 ? "increase" : "decrease",
      }),
    );
  };

  const removeItemFromCart = (id) => {
    const { productId, variantLabel } = parseItemId(id);
    dispatch(removeCartItemAsync({ productId, variantLabel }));
  };

  return (
    <div className="py-8 mt-16 px-6 xl:px-0">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-sm">
        <div className="py-6">
          <h1 className="mb-6 text-3xl font-semibold text-gray-900">
            Shopping Cart
          </h1>

          <div>
            <OrderSummary itemCount={itemCount} />
            <CartList
              items={items}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={removeItemFromCart}
            />
            <CartFooter
              subtotal={subtotal}
              onCheckout={() =>
                navigate(customer ? "/checkout" : "/customer/login")
              }
            />
            <NewsletterBanner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
