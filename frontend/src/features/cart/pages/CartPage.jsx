import CartFooter from "../components/CartFooter";
import CartList from "../components/CartList";
import OrderSummary from "../components/OrderSummary";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  updateQuantity,
  removeCartItemAsync,
  parseItemId,
  selectCartItems,
  selectSubtotal,
  selectCartCount,
} from "../../../store/slices/cartSlice";

import { selectCustomer } from "../../../store/slices/authSlice";
import PageHero from "../../../shared/components/ui/PageHero";

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

    dispatch(
      removeCartItemAsync({
        productId,
        variantLabel,
      }),
    );
  };

  return (
    <div className="min-h-screen bg-[#F4EDE2] text-[#211B17]">
      {/* Hero */}

      <PageHero
        eyebrow="Your selection"
        title="Your"
        titleHighlight="cart."
        description="Review your selected herbal products before continuing to checkout."
        backgroundImage="https://res.cloudinary.com/dasvdkncm/image/upload/v1784788176/ChatGPT_Image_Jul_23_2026_11_57_14_AM_gbwvsk.png"
        imageAlt="7ALP herbal products"
        leftLabel="7ALP's / Cart"
        rightLabel="Personal / Delivery"
      />

      <main className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8  xl:px-16">
        {/* Header */}

        {/* Cart */}
        <div>
          {/* Delivery / count */}
          <OrderSummary itemCount={itemCount} />

          {/* Products */}
          <CartList
            items={items}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={removeItemFromCart}
          />

          {/* Footer */}
          {items.length > 0 && (
            <CartFooter
              subtotal={subtotal}
              onCheckout={() =>
                navigate(customer ? "/checkout" : "/customer/login")
              }
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default CartPage;
