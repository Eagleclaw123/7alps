import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  clearCart,
  selectCartItems,
  selectCartStatus,
  selectShipping,
  selectSubtotal,
  selectTotal,
} from "../../../store/slices/cartSlice";
import { createOrder } from "../../../shared/services/order.service";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../../../shared/services/payment.service";
import { loadRazorpayScript } from "../../../shared/utils/loadRazorpayScript";
import AddressMapPicker from "../../../shared/components/map/AddressMapPicker";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";
import HeroBanner from "../../../shared/components/ui/HeroBanner";

const initialAddress = {
  name: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

const validators = {
  name: (value) => {
    if (!value.trim()) return "Full name is required";
    if (!/^[A-Za-z\s.'-]{3,50}$/.test(value.trim()))
      return "Enter a valid name (letters only, 3-50 characters)";
    return "";
  },
  phone: (value) => {
    if (!value.trim()) return "Phone number is required";
    if (!/^[6-9]\d{9}$/.test(value.trim()))
      return "Enter a valid 10-digit mobile number";
    return "";
  },
  line1: (value) => {
    if (!value.trim()) return "Address line 1 is required";
    if (value.trim().length < 5) return "Address seems too short";
    return "";
  },
  line2: () => "",
  city: (value) => {
    if (!value.trim()) return "City is required";
    if (!/^[A-Za-z\s.'-]{2,50}$/.test(value.trim()))
      return "Enter a valid city name";
    return "";
  },
  state: (value) => {
    if (!value.trim()) return "State is required";
    if (!/^[A-Za-z\s.'-]{2,50}$/.test(value.trim()))
      return "Enter a valid state name";
    return "";
  },
  pincode: (value) => {
    if (!value.trim()) return "Pincode is required";
    if (!/^\d{6}$/.test(value.trim())) return "Enter a valid 6-digit pincode";
    return "";
  },
};

/* Dashed "perforation" strip — the seed-packet detail used across the site */
const Perforation = () => (
  <div
    className="h-px w-full"
    style={{
      backgroundImage:
        "repeating-linear-gradient(to right, #C9C2AE 0, #C9C2AE 6px, transparent 6px, transparent 13px)",
    }}
  />
);

/* Tracked-out field label, matches the profile/contact/cart label system */
const FieldLabel = ({ children }) => (
  <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#86806F]">
    {children}
  </label>
);

const underlineInput = (hasError) =>
  `w-full border-0 border-b bg-transparent px-0 py-2 text-[15px] text-[#201F1B] outline-none transition-colors placeholder:text-[#B8B2A0] ${
    hasError
      ? "border-red-400 focus:border-red-500"
      : "border-[#E3DFD2] focus:border-[#16442C]"
  }`;

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartStatus = useSelector(selectCartStatus);
  const subtotal = useSelector(selectSubtotal);
  const shipping = useSelector(selectShipping);
  const total = useSelector(selectTotal);
  const [address, setAddress] = useState(initialAddress);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  // Synchronous (unlike state) so the empty-cart-redirect effect below can see
  // it immediately — a state flag wouldn't apply until the next render, by
  // which point the effect may already have fired once more with stale info.
  const orderJustPlacedRef = useRef(false);

  const handleChange = ({ target: { name, value } }) => {
    setAddress((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: validators[name] ? validators[name](value) : "",
      }));
    }
  };

  // Auto-fills whatever the map picker resolved; leaves fields the picker
  // couldn't determine (e.g. name/phone) untouched so manual entry still works.
  const handleMapAddressChange = (parsed) => {
    setAddress((prev) => ({
      ...prev,
      line1: parsed.line1 || prev.line1,
      city: parsed.city || prev.city,
      state: parsed.state || prev.state,
      pincode: parsed.pincode || prev.pincode,
    }));
    setFieldErrors((prev) => ({
      ...prev,
      line1: parsed.line1 ? "" : prev.line1,
      city: parsed.city ? "" : prev.city,
      state: parsed.state ? "" : prev.state,
      pincode: parsed.pincode ? "" : prev.pincode,
    }));
  };

  const handleBlur = ({ target: { name, value } }) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFieldErrors((prev) => ({
      ...prev,
      [name]: validators[name] ? validators[name](value) : "",
    }));
  };

  const validateAll = () => {
    const nextErrors = {};
    Object.keys(validators).forEach((field) => {
      nextErrors[field] = validators[field](address[field] || "");
    });
    setFieldErrors(nextErrors);
    setTouched(
      Object.keys(validators).reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {}),
    );
    return Object.values(nextErrors).every((msg) => !msg);
  };

  const payWithRazorpay = async () => {
    const { data: orderData } = await createRazorpayOrder();
    const { razorpayOrderId, amount, currency, keyId } = orderData.data;

    const Razorpay = await loadRazorpayScript();

    return new Promise((resolve, reject) => {
      // Razorpay's modal can fire `ondismiss` while it's closing *after* a
      // successful payment too (not just on genuine user cancellation) — since
      // our handler below has to await the backend verify call, that dismiss
      // event can otherwise win the race and reject this promise as "cancelled"
      // a moment before the verify call actually succeeds. This flag makes sure
      // once Razorpay has called `handler` at all, nothing else can override it.
      let settled = false;

      const rzp = new Razorpay({
        key: keyId,
        amount,
        currency,
        order_id: razorpayOrderId,
        name: "7ALP's",
        description: "Order payment",
        prefill: { name: address.name, contact: address.phone },
        theme: { color: "#16442C" },
        handler: async (response) => {
          settled = true;
          try {
            const { data: verifyData } = await verifyRazorpayPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              shippingAddress: address,
            });
            resolve(verifyData);
          } catch (err) {
            reject(err);
          }
        },
        modal: {
          ondismiss: () => {
            if (settled) return;
            settled = true;
            reject(new Error("Payment cancelled"));
          },
        },
      });

      rzp.on("payment.failed", () => {
        if (settled) return;
        settled = true;
        reject(new Error("Payment failed. Please try again."));
      });
      rzp.open();
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateAll()) {
      setError("Please fix the errors below before placing your order.");
      return;
    }

    try {
      setSubmitting(true);

      if (paymentMethod === "Razorpay") {
        await payWithRazorpay();
      } else {
        await createOrder(address);
      }

      // Set before navigating/clearing: React can batch the route change and
      // the cart-clear into the same render, so the empty-cart-redirect effect
      // below could still fire once more on this (still technically mounted)
      // page and steal the navigation. The ref is synchronous, so the effect
      // sees it immediately, unlike a state flag which would need a re-render.
      orderJustPlacedRef.current = true;

      navigate("/customer/orders", { state: { justPlaced: true } });

      // The backend already cleared the cart as part of placing the order —
      // sync local state to match so the header badge doesn't show stale items
      // until a hard refresh.
      dispatch(clearCart());
    } catch (err) {
      if (err.message === "Payment cancelled") {
        setError("Payment was cancelled.");
      } else {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to place order. Please try again.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    // Skip if we just placed an order — the cart is legitimately empty now
    // because of that, not because the user has nothing to check out.
    if (orderJustPlacedRef.current) return;

    // Wait for the cart to actually finish loading (it's server-backed for a
    // logged-in customer) before deciding it's empty — otherwise a hard refresh
    // on this page redirects away before the real cart has even been fetched.
    if (cartStatus === "succeeded" && cartItems.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [cartItems.length, cartStatus, navigate]);

  if (cartStatus !== "succeeded" && cartItems.length === 0) {
    return (
      <p className="py-20 text-center text-[#86806F]">Loading your cart...</p>
    );
  }

  if (cartItems.length === 0) return null;

  return (
    // <div className="bg-[#FBF8F2]">
    <div>
      {/* ── Hero banner ──────────────────────────────────────────── */}

      <HeroBanner
        eyebrow="Checkout"
        title="Checkout"
        description="Just a few steps away from your next wellness ritual."
        image="https://res.cloudinary.com/dasvdkncm/image/upload/v1784788176/ChatGPT_Image_Jul_23_2026_11_57_14_AM_gbwvsk.png"
      />
      <section className="py-10 px-6 xl:px-0">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <form
              id="checkout-form"
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6 border border-[#E3DFD2] bg-white p-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Leaf size={16} className="text-[#16442C]" />
                  <h2 className="font-medium text-xl text-[#201F1B]">
                    Shipping Address
                  </h2>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-[#B4652F]">
                  Required
                </span>
              </div>
              <Perforation />

              <AddressMapPicker onAddressChange={handleMapAddressChange} />

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <FieldLabel>Full Name</FieldLabel>
                  <input
                    name="name"
                    value={address.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Priya Sharma"
                    required
                    className={underlineInput(fieldErrors.name)}
                  />
                  {fieldErrors.name ? (
                    <p className="text-xs text-red-600">{fieldErrors.name}</p>
                  ) : null}
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Phone Number</FieldLabel>
                  <input
                    name="phone"
                    value={address.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="10-digit mobile number"
                    required
                    inputMode="numeric"
                    maxLength={10}
                    className={underlineInput(fieldErrors.phone)}
                  />
                  {fieldErrors.phone ? (
                    <p className="text-xs text-red-600">{fieldErrors.phone}</p>
                  ) : null}
                </div>
              </div>

              <div className="space-y-1.5">
                <FieldLabel>Address Line 1</FieldLabel>
                <input
                  name="line1"
                  value={address.line1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="House no., street, area"
                  required
                  className={underlineInput(fieldErrors.line1)}
                />
                {fieldErrors.line1 ? (
                  <p className="text-xs text-red-600">{fieldErrors.line1}</p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <FieldLabel>Address Line 2 (optional)</FieldLabel>
                <input
                  name="line2"
                  value={address.line2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Landmark, apartment, etc."
                  className={underlineInput(false)}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <FieldLabel>City</FieldLabel>
                  <input
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="City"
                    required
                    className={underlineInput(fieldErrors.city)}
                  />
                  {fieldErrors.city ? (
                    <p className="text-xs text-red-600">{fieldErrors.city}</p>
                  ) : null}
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>State</FieldLabel>
                  <input
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="State"
                    required
                    className={underlineInput(fieldErrors.state)}
                  />
                  {fieldErrors.state ? (
                    <p className="text-xs text-red-600">{fieldErrors.state}</p>
                  ) : null}
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Pincode</FieldLabel>
                  <input
                    name="pincode"
                    value={address.pincode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="6-digit pincode"
                    required
                    inputMode="numeric"
                    maxLength={6}
                    className={underlineInput(fieldErrors.pincode)}
                  />
                  {fieldErrors.pincode ? (
                    <p className="text-xs text-red-600">
                      {fieldErrors.pincode}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Perforation />
                <div className="flex items-center gap-2 pt-2">
                  <Leaf size={16} className="text-[#16442C]" />
                  <h2 className="font-medium text-xl text-[#201F1B]">
                    Payment Method
                  </h2>
                </div>

                <label
                  className={`flex cursor-pointer items-center gap-3 border px-4 py-3.5 text-sm transition-colors ${
                    paymentMethod === "COD"
                      ? "border-[#16442C] bg-[#EEF1E6]"
                      : "border-[#E3DFD2] hover:border-[#B8B2A0]"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="accent-[#16442C]"
                  />
                  <span className="font-medium text-[#201F1B]">
                    Cash on Delivery
                  </span>
                </label>

                <label
                  className={`flex cursor-pointer items-center gap-3 border px-4 py-3.5 text-sm transition-colors ${
                    paymentMethod === "Razorpay"
                      ? "border-[#16442C] bg-[#EEF1E6]"
                      : "border-[#E3DFD2] hover:border-[#B8B2A0]"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Razorpay"
                    checked={paymentMethod === "Razorpay"}
                    onChange={() => setPaymentMethod("Razorpay")}
                    className="accent-[#16442C]"
                  />
                  <span className="font-medium text-[#201F1B]">Pay Online</span>
                  <span className="text-xs text-[#86806F]">
                    Cards, UPI, Netbanking &amp; more
                  </span>
                </label>
              </div>

              {error ? (
                <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </p>
              ) : null}
            </form>

            <aside className="h-fit space-y-5 border border-[#E3DFD2] bg-white p-7 lg:top-24">
              <div className="flex items-center gap-2">
                <Leaf size={16} className="text-[#16442C]" />
                <h2 className="font-medium text-xl text-[#201F1B]">
                  Order Summary
                </h2>
              </div>
              <Perforation />

              <div className="max-h-64 space-y-3 overflow-y-auto pr-1 text-sm">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-3 text-[#5B564A]"
                  >
                    <span className="leading-snug">
                      {item.name}{" "}
                      <span className="text-[#86806F]">
                        ({item.variantLabel}) × {item.quantity}
                      </span>
                    </span>
                    <span className="whitespace-nowrap font-medium text-[#201F1B]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <Perforation />

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-[#5B564A]">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-[#5B564A]">
                  <span>Shipping</span>
                  <span
                    className={
                      shipping === 0 ? "font-medium text-[#16442C]" : ""
                    }
                  >
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
              </div>

              <Perforation />

              <div className="flex justify-between font-medium text-lg text-[#201F1B]">
                <span>Total</span>
                <span className="text-[#16442C]">
                  ₹{total.toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={submitting}
                className="w-full rounded-full bg-[#16442C] px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#0E3220] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? "Processing..."
                  : paymentMethod === "Razorpay"
                    ? `Pay — ₹${total.toLocaleString()}`
                    : `Place Order — ₹${total.toLocaleString()}`}
              </button>

              <p className="text-center text-xs text-[#86806F]">
                By placing this order you agree to our terms of service.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
