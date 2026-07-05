import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchCart,
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
  const subtotal = useSelector(selectSubtotal);
  const shipping = useSelector(selectShipping);
  const total = useSelector(selectTotal);

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
      await dispatch(fetchCart());
      navigate("/customer/orders", { state: { justPlaced: true } });
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to place order. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (cartItems.length === 0) navigate("/cart", { replace: true });
  }, [cartItems.length, navigate]);

  if (cartItems.length === 0) return null;

  return (
    <section className="py-10 mt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-0">
        <h1 className="mb-8 text-3xl font-semibold text-[#202020]">
          Checkout
        </h1>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6"
          >
            <h2 className="mb-2 text-xl font-semibold text-[#202020]">
              Shipping Address
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="name"
                value={address.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#0F6B3E]"
              />
              <input
                name="phone"
                value={address.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#0F6B3E]"
              />
            </div>

            <input
              name="line1"
              value={address.line1}
              onChange={handleChange}
              placeholder="Address Line 1"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#0F6B3E]"
            />
            <input
              name="line2"
              value={address.line2}
              onChange={handleChange}
              placeholder="Address Line 2 (optional)"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#0F6B3E]"
            />

            <div className="grid gap-4 sm:grid-cols-3">
              <input
                name="city"
                value={address.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#0F6B3E]"
              />
              <input
                name="state"
                value={address.state}
                onChange={handleChange}
                placeholder="State"
                required
                className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#0F6B3E]"
              />
              <input
                name="pincode"
                value={address.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                required
                className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#0F6B3E]"
              />
            </div>

            <p className="text-sm text-gray-500">
              Payment: Cash on Delivery. Online payment options are coming soon.
            </p>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-[#0F6B3E] px-6 py-3.5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Placing Order..." : `Place Order — ₹${total.toLocaleString()}`}
            </button>
          </form>

          <aside className="h-fit space-y-4 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-semibold text-[#202020]">
              Order Summary
            </h2>
            <div className="space-y-3 text-sm">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-600">
                  <span>
                    {item.name} ({item.variantLabel}) × {item.quantity}
                  </span>
                  <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <hr />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-semibold text-[#202020]">
              <span>Total</span>
              <span className="text-[#047B22]">₹{total.toLocaleString()}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
