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
  updateQuantity as updateQuantityThunk,
} from "../../../store/slices/cartSlice";
import NewsletterBanner from "../components/NewsletterBanner";
import { selectCustomer } from "../../../store/slices/authSlice";
import { Leaf } from "lucide-react";
import HeroBanner from "../../../shared/components/ui/HeroBanner";

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
    <div>
      {/* ── Hero banner ──────────────────────────────────────────── */}
      <HeroBanner
        eyebrow="Cart"
        title="Your Cart"
        description="Review your selected herbal blends before checking out."
        image="https://res.cloudinary.com/dasvdkncm/image/upload/v1784788176/ChatGPT_Image_Jul_23_2026_11_57_14_AM_gbwvsk.png"
      />
      <div className="py-8 px-6 xl:px-0">
        <div className="mx-auto max-w-7xl border border-[#E3DFD2] bg-white">
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
          </div>
        </div>
      </div>
      <NewsletterBanner />
    </div>
  );
};

export default CartPage;
