import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import OrderSummary from "../components/OrderSummary";
import NewsletterBanner from "../components/NewsletterBanner";
import CartList from "../components/CartList";
import EmptyCart from "../components/EmptyCart";
import {
  removeItem as removeCartItem,
  selectCartCount,
  selectCartItems,
  selectShipping,
  selectSubtotal,
  selectTotal,
  updateQuantity as updateCartQuantity,
} from "../../../store/slices/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const subtotal = useSelector(selectSubtotal);
  const shipping = useSelector(selectShipping);
  const total = useSelector(selectTotal);

  const updateQuantity = (id, type) => {
    dispatch(updateCartQuantity({ id, type }));
  };

  const removeItem = (id) => {
    dispatch(removeCartItem(id));
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="py-10 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-[#202020]">
            Shopping Cart
          </h1>

          <p className="mt-2 text-gray-500">
            Review your selected herbal products before checkout.
          </p>
        </div>

        {/* Top */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold text-[#202020]">
            Cart Items
            <span className="ml-2 text-lg font-medium text-[#047B22]">
              ({cartItems.length})
            </span>
          </h2>

          <button
            onClick={() => navigate("/products")}
            className="flex w-fit items-center gap-2 rounded-xl border border-[#047B22] px-5 py-3 text-sm font-semibold text-[#047B22] transition-all duration-300 hover:bg-[#047B22] hover:text-white"
          >
            <FiArrowLeft />
            Continue Shopping
          </button>
        </div>

        {/* Content */}
        <div className="grid items-start gap-8 xl:grid-cols-[2fr_420px]">
          <CartList
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />

          <OrderSummary subtotal={subtotal} shipping={shipping} total={total} />
        </div>
        <NewsletterBanner />
      </div>
    </section>
  );
};

export default CartPage;
