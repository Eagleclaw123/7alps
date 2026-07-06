import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchCart,
  selectBuyNowItem,
  selectCartItems,
  selectShipping,
  selectSubtotal,
  selectTotal,
} from "../../../store/slices/cartSlice";
import { createOrder } from "../../../shared/services/order.service";

const initialAddress = {
  name: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const buyNowItem = useSelector(selectBuyNowItem);

  const items = buyNowItem ? [buyNowItem] : cartItems;

  const subtotal = buyNowItem
    ? buyNowItem.price * buyNowItem.quantity
    : useSelector(selectSubtotal);

  const shipping = subtotal > 999 ? 0 : subtotal > 0 ? 99 : 0;

  const total = subtotal + shipping;
  // const subtotal = useSelector(selectSubtotal);
  // const shipping = useSelector(selectShipping);
  // const total = useSelector(selectTotal);

  const [address, setAddress] = useState(initialAddress);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setSubmitting(true);
      await createOrder(address);
      if (buyNowItem) {
        dispatch(clearBuyNowItem());
      } else {
        await dispatch(fetchCart());
      }
      navigate("/customer/orders", { state: { justPlaced: true } });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to place order. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart", {
        replace: true,
      });
    }
  }, [items, navigate]);

  if (items.length === 0) return null;

  return (
    <section className="py-10 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        <div className="mb-8 flex items-center gap-3">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#202020]">
              Checkout
            </h1>
            <p className="text-sm text-gray-500">
              Review your details and confirm your order
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <form
            id="checkout-form"
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-gray-100 bg-white p-6"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-lg font-semibold text-[#202020]">
                Shipping Address
              </h2>
              <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Required
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500">
                  Full Name
                </label>
                <input
                  name="name"
                  value={address.name}
                  onChange={handleChange}
                  placeholder="e.g. Priya Sharma"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-[#202020] outline-none transition-colors focus:border-[#0F6B3E] focus:ring-2 focus:ring-[#0F6B3E]/10"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500">
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={address.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-[#202020] outline-none transition-colors focus:border-[#0F6B3E] focus:ring-2 focus:ring-[#0F6B3E]/10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500">
                Address Line 1
              </label>
              <input
                name="line1"
                value={address.line1}
                onChange={handleChange}
                placeholder="House no., street, area"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-[#202020] outline-none transition-colors focus:border-[#0F6B3E] focus:ring-2 focus:ring-[#0F6B3E]/10"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500">
                Address Line 2 (optional)
              </label>
              <input
                name="line2"
                value={address.line2}
                onChange={handleChange}
                placeholder="Landmark, apartment, etc."
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-[#202020] outline-none transition-colors focus:border-[#0F6B3E] focus:ring-2 focus:ring-[#0F6B3E]/10"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500">
                  City
                </label>
                <input
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-[#202020] outline-none transition-colors focus:border-[#0F6B3E] focus:ring-2 focus:ring-[#0F6B3E]/10"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500">
                  State
                </label>
                <input
                  name="state"
                  value={address.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-[#202020] outline-none transition-colors focus:border-[#0F6B3E] focus:ring-2 focus:ring-[#0F6B3E]/10"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500">
                  Pincode
                </label>
                <input
                  name="pincode"
                  value={address.pincode}
                  onChange={handleChange}
                  placeholder="6-digit pincode"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-[#202020] outline-none transition-colors focus:border-[#0F6B3E] focus:ring-2 focus:ring-[#0F6B3E]/10"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-[#F4F9F6] px-4 py-3 text-sm text-[#0F6B3E]">
              <span className="font-medium">Payment:</span>
              <span>
                Cash on Delivery. Online payment options are coming soon.
              </span>
            </div>

            {error ? (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            ) : null}
          </form>

          <aside className="h-fit space-y-4 rounded-2xl border border-gray-100 bg-white p-6 lg:top-24">
            <h2 className="text-lg font-semibold text-[#202020]">
              Order Summary
            </h2>

            <div className="max-h-64 space-y-3 overflow-y-auto pr-1 text-sm">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-3 text-gray-600"
                >
                  <span className="leading-snug">
                    {item.name}{" "}
                    <span className="text-gray-400">
                      ({item.variantLabel}) × {item.quantity}
                    </span>
                  </span>
                  <span className="whitespace-nowrap font-medium text-[#202020]">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <hr className="border-gray-100" />

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span
                  className={shipping === 0 ? "font-medium text-[#0F6B3E]" : ""}
                >
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="flex justify-between text-lg font-semibold text-[#202020]">
              <span>Total</span>
              <span className="text-[#047B22]">₹{total.toLocaleString()}</span>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={submitting}
              className="w-full rounded-xl bg-[#0F6B3E] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#0d5c34] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Placing Order..."
                : `Place Order — ₹${total.toLocaleString()}`}
            </button>

            <p className="text-center text-xs text-gray-400">
              By placing this order you agree to our terms of service.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
