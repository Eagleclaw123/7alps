import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  clearCart,
  selectCartItems,
  selectCartStatus,
  selectShipping,
  selectSubtotal,
  selectTotal,
} from "../../../store/slices/cartSlice";

import { selectCustomer } from "../../../store/slices/authSlice";
import { createOrder } from "../../../shared/services/order.service";

import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../../../shared/services/payment.service";

import { loadRazorpayScript } from "../../../shared/utils/loadRazorpayScript";
import AddressMapPicker from "../../../shared/components/map/AddressMapPicker";
import HeroBanner from "../../../shared/components/ui/HeroBanner";
import PageHero from "../../../shared/components/ui/PageHero";

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

    if (!/^[A-Za-z\s.'-]{3,50}$/.test(value.trim())) {
      return "Enter a valid name (letters only, 3-50 characters)";
    }

    return "";
  },

  phone: (value) => {
    if (!value.trim()) return "Phone number is required";

    if (!/^[6-9]\d{9}$/.test(value.trim())) {
      return "Enter a valid 10-digit mobile number";
    }

    return "";
  },

  line1: (value) => {
    if (!value.trim()) return "Address line 1 is required";

    if (value.trim().length < 5) {
      return "Address seems too short";
    }

    return "";
  },

  line2: () => "",

  city: (value) => {
    if (!value.trim()) return "City is required";

    if (!/^[A-Za-z\s.'-]{2,50}$/.test(value.trim())) {
      return "Enter a valid city name";
    }

    return "";
  },

  state: (value) => {
    if (!value.trim()) return "State is required";

    if (!/^[A-Za-z\s.'-]{2,50}$/.test(value.trim())) {
      return "Enter a valid state name";
    }

    return "";
  },

  pincode: (value) => {
    if (!value.trim()) return "Pincode is required";

    if (!/^\d{6}$/.test(value.trim())) {
      return "Enter a valid 6-digit pincode";
    }

    return "";
  },
};

const FieldLabel = ({ children }) => (
  <label className="block font-ibm-mono text-[9px] uppercase tracking-[0.2em] text-[#91847A]">
    {children}
  </label>
);

const underlineInput = (hasError) =>
  `w-full border-0 border-b bg-transparent px-0 py-3 font-manrope text-sm text-[#211B17] outline-none transition-colors placeholder:text-[#A89D93] ${
    hasError
      ? "border-red-400 focus:border-red-500"
      : "border-[#D8CCC0] focus:border-[#C56B4E]"
  }`;

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 99;

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const customer = useSelector(selectCustomer);

  /*
   * Buy Now arrives through navigation state.
   * It does not modify the persisted cart.
   */
  const buyNowItems = location.state?.buyNow?.items || null;
  const isBuyNow = Boolean(buyNowItems);

  const cartItems = useSelector(selectCartItems);
  const cartStatus = useSelector(selectCartStatus);
  const cartSubtotal = useSelector(selectSubtotal);
  const cartShipping = useSelector(selectShipping);
  const cartTotal = useSelector(selectTotal);

  const displayItems = isBuyNow ? buyNowItems : cartItems;

  const subtotal = isBuyNow
    ? buyNowItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0,
      )
    : cartSubtotal;

  const shipping = isBuyNow
    ? subtotal > 0 && subtotal <= FREE_SHIPPING_THRESHOLD
      ? SHIPPING_FEE
      : 0
    : cartShipping;

  const total = isBuyNow ? subtotal + shipping : cartTotal;

  const [address, setAddress] = useState(initialAddress);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});

  const orderJustPlacedRef = useRef(false);
  const addressPrefilledRef = useRef(false);

  /*
   * Prefill saved customer address once.
   */
  useEffect(() => {
    if (addressPrefilledRef.current || !customer?.addresses?.length) {
      return;
    }

    const defaultAddress =
      customer.addresses.find((a) => a.isDefault) || customer.addresses[0];

    addressPrefilledRef.current = true;

    setAddress((prev) => ({
      ...prev,
      name: customer.name || prev.name,
      phone: defaultAddress.phone || customer.mobile || prev.phone,
      line1: defaultAddress.line1 || prev.line1,
      line2: defaultAddress.line2 || prev.line2,
      city: defaultAddress.city || prev.city,
      state: defaultAddress.state || prev.state,
      pincode: defaultAddress.pincode || prev.pincode,
    }));
  }, [customer]);

  const handleChange = ({ target: { name, value } }) => {
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: validators[name] ? validators[name](value) : "",
      }));
    }
  };

  /*
   * AddressMapPicker can automatically fill
   * address, city, state and pincode.
   */
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
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

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

    return Object.values(nextErrors).every((message) => !message);
  };

  /*
   * Razorpay payment flow.
   * API behavior is unchanged.
   */
  const payWithRazorpay = async () => {
    const { data: orderData } = await createRazorpayOrder(
      isBuyNow ? buyNowItems : undefined,
    );

    const { razorpayOrderId, amount, currency, keyId } = orderData.data;

    const Razorpay = await loadRazorpayScript();

    return new Promise((resolve, reject) => {
      let settled = false;

      const rzp = new Razorpay({
        key: keyId,
        amount,
        currency,
        order_id: razorpayOrderId,
        name: "7ALP's",
        description: "Order payment",

        prefill: {
          name: address.name,
          contact: address.phone,
        },

        theme: {
          color: "#211B17",
        },

        handler: async (response) => {
          settled = true;

          try {
            const { data: verifyData } = await verifyRazorpayPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              shippingAddress: address,
              ...(isBuyNow ? { items: buyNowItems } : {}),
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
        await createOrder(address, isBuyNow ? buyNowItems : undefined);
      }

      orderJustPlacedRef.current = true;

      navigate("/customer/orders", {
        state: {
          justPlaced: true,
        },
      });

      /*
       * Buy Now does not touch the cart.
       * Normal checkout clears local cart state after
       * successful order creation.
       */
      if (!isBuyNow) {
        dispatch(clearCart());
      }
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

  /*
   * Redirect only when a normal cart checkout has
   * finished loading and is actually empty.
   */
  useEffect(() => {
    if (isBuyNow) return;

    if (orderJustPlacedRef.current) return;

    if (cartStatus === "succeeded" && cartItems.length === 0) {
      navigate("/cart", {
        replace: true,
      });
    }
  }, [isBuyNow, cartItems.length, cartStatus, navigate]);

  if (!isBuyNow) {
    if (cartStatus !== "succeeded" && cartItems.length === 0) {
      return (
        <div className="min-h-screen bg-[#F4EDE2]">
          <p className="mt-15 py-20 text-center font-manrope text-sm text-[#91847A]">
            Loading your cart...
          </p>
        </div>
      );
    }

    if (cartItems.length === 0) {
      return null;
    }
  }

  return (
    <div className="min-h-screen bg-[#F4EDE2] text-[#211B17]">
      {/* =========================================================
          HERO
      ========================================================= */}

      <PageHero
        eyebrow="Almost there"
        title="Complete"
        titleHighlight="your order."
        description="Confirm your delivery details and choose your preferred payment method."
        backgroundImage="https://res.cloudinary.com/dasvdkncm/image/upload/v1784788176/ChatGPT_Image_Jul_23_2026_11_57_14_AM_gbwvsk.png"
        imageAlt="7ALP order checkout"
        leftLabel="7ALP's / Checkout"
        rightLabel="Secure / Delivery"
      />

      {/* =========================================================
          CHECKOUT
      ========================================================= */}

      <section className="px-5 py-14 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-[1500px]">
          {/* PAGE INTRO */}

          <div className="mb-12 flex flex-col justify-between gap-6 border-b border-[#D8CCC0] pb-7 md:flex-row md:items-end">
            <div>
              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.25em] text-[#C56B4E]">
                01 / Delivery
              </span>

              <h2 className="mt-4 font-manrope text-4xl font-medium tracking-[-0.05em] text-[#211B17] md:text-5xl">
                Where should we
                <br />
                send it?
              </h2>
            </div>

            <p className="max-w-sm font-manrope text-sm leading-6 text-[#756A62]">
              Enter your delivery details carefully. Your saved address has been
              pre-filled when available.
            </p>
          </div>

          {/* =====================================================
              IMPORTANT:
              NO STICKY
              NO INTERNAL SCROLL
              BOTH COLUMNS USE THE SAME PAGE SCROLL
          ===================================================== */}

          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.65fr)_420px] xl:gap-20">
            {/* ===================================================
                LEFT — SHIPPING + PAYMENT
            =================================================== */}

            <form
              id="checkout-form"
              onSubmit={handleSubmit}
              noValidate
              className="min-w-0"
            >
              {/* SHIPPING ADDRESS */}

              <div className="border-y border-[#D8CCC0]">
                <div className="flex items-start justify-between gap-6 py-6">
                  <div>
                    <span className="font-ibm-mono text-[9px] uppercase tracking-[0.2em] text-[#C56B4E]">
                      01
                    </span>

                    <h3 className="mt-2 font-manrope text-xl font-medium text-[#211B17]">
                      Shipping address
                    </h3>
                  </div>

                  <span className="font-ibm-mono text-[8px] uppercase tracking-[0.18em] text-[#91847A]">
                    Required
                  </span>
                </div>

                {/* MAP */}

                <div className="border-t border-[#D8CCC0] py-7">
                  <AddressMapPicker onAddressChange={handleMapAddressChange} />
                </div>

                {/* NAME + PHONE */}

                <div className="grid gap-x-10 gap-y-8 border-t border-[#D8CCC0] py-8 sm:grid-cols-2">
                  <div>
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

                    {fieldErrors.name && (
                      <p className="mt-2 font-manrope text-xs text-red-600">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
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

                    {fieldErrors.phone && (
                      <p className="mt-2 font-manrope text-xs text-red-600">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* ADDRESS LINE 1 */}

                  <div className="sm:col-span-2">
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

                    {fieldErrors.line1 && (
                      <p className="mt-2 font-manrope text-xs text-red-600">
                        {fieldErrors.line1}
                      </p>
                    )}
                  </div>

                  {/* ADDRESS LINE 2 */}

                  <div className="sm:col-span-2">
                    <FieldLabel>Address Line 2 · Optional</FieldLabel>

                    <input
                      name="line2"
                      value={address.line2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Landmark, apartment, etc."
                      className={underlineInput(false)}
                    />
                  </div>

                  {/* CITY */}

                  <div>
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

                    {fieldErrors.city && (
                      <p className="mt-2 font-manrope text-xs text-red-600">
                        {fieldErrors.city}
                      </p>
                    )}
                  </div>

                  {/* STATE */}

                  <div>
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

                    {fieldErrors.state && (
                      <p className="mt-2 font-manrope text-xs text-red-600">
                        {fieldErrors.state}
                      </p>
                    )}
                  </div>

                  {/* PINCODE */}

                  <div>
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

                    {fieldErrors.pincode && (
                      <p className="mt-2 font-manrope text-xs text-red-600">
                        {fieldErrors.pincode}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* =================================================
                  PAYMENT
              ================================================= */}

              <div className="mt-12 border-y border-[#D8CCC0]">
                <div className="py-6">
                  <span className="font-ibm-mono text-[9px] uppercase tracking-[0.2em] text-[#C56B4E]">
                    02
                  </span>

                  <h3 className="mt-2 font-manrope text-xl font-medium text-[#211B17]">
                    Payment method
                  </h3>
                </div>

                <div className="border-t border-[#D8CCC0]">
                  {/* COD */}

                  <label
                    className={`group flex cursor-pointer items-center justify-between gap-5 border-b border-[#D8CCC0] px-5 py-6 transition-colors sm:px-6 ${
                      paymentMethod === "COD"
                        ? "bg-[#EAE0D4]"
                        : "hover:bg-[#EEE5DA]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                        className="h-4 w-4 accent-[#211B17]"
                      />

                      <div>
                        <p className="font-manrope text-sm font-medium text-[#211B17]">
                          Cash on Delivery
                        </p>

                        <p className="mt-1 font-manrope text-xs text-[#91847A]">
                          Pay when your order arrives.
                        </p>
                      </div>
                    </div>

                    <span className="font-ibm-mono text-[8px] uppercase tracking-[0.16em] text-[#91847A]">
                      COD
                    </span>
                  </label>

                  {/* ONLINE */}

                  <label
                    className={`group flex cursor-pointer items-center justify-between gap-5 px-5 py-6 transition-colors sm:px-6 ${
                      paymentMethod === "Razorpay"
                        ? "bg-[#EAE0D4]"
                        : "hover:bg-[#EEE5DA]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Razorpay"
                        checked={paymentMethod === "Razorpay"}
                        onChange={() => setPaymentMethod("Razorpay")}
                        className="h-4 w-4 accent-[#211B17]"
                      />

                      <div>
                        <p className="font-manrope text-sm font-medium text-[#211B17]">
                          Pay Online
                        </p>

                        <p className="mt-1 font-manrope text-xs text-[#91847A]">
                          Cards, UPI, Netbanking & more.
                        </p>
                      </div>
                    </div>

                    <span className="font-ibm-mono text-[8px] uppercase tracking-[0.16em] text-[#91847A]">
                      ONLINE
                    </span>
                  </label>
                </div>
              </div>

              {/* ERROR */}

              {error && (
                <div className="mt-8 border border-red-200 bg-red-50 px-5 py-4">
                  <p className="font-manrope text-sm text-red-600">{error}</p>
                </div>
              )}
            </form>

            {/* ===================================================
                RIGHT — ORDER SUMMARY

                IMPORTANT:
                No sticky
                No max-height
                No overflow-y-auto
            =================================================== */}

            <aside className="h-fit">
              <div className="border border-[#D8CCC0] bg-[#EAE0D4]">
                {/* SUMMARY HEADER */}

                <div className="border-b border-[#D8CCC0] px-6 py-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-ibm-mono text-[9px] uppercase tracking-[0.2em] text-[#C56B4E]">
                        03
                      </span>

                      <h3 className="mt-2 font-manrope text-xl font-medium text-[#211B17]">
                        Your order
                      </h3>
                    </div>

                    {isBuyNow && (
                      <span className="font-ibm-mono text-[8px] uppercase tracking-[0.16em] text-[#C56B4E]">
                        Buy now
                      </span>
                    )}
                  </div>
                </div>

                {/* =================================================
                    ORDER ITEMS

                    NO INTERNAL SCROLL
                ================================================= */}

                <div>
                  {displayItems.map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-[#D8CCC0] px-6 py-5"
                    >
                      <div className="flex justify-between gap-5">
                        <div className="min-w-0">
                          <p className="font-manrope text-sm font-medium leading-5 text-[#211B17]">
                            {item.name}
                          </p>

                          <p className="mt-1 font-ibm-mono text-[8px] uppercase tracking-[0.12em] text-[#91847A]">
                            {item.variantLabel} × {item.quantity}
                          </p>
                        </div>

                        <span className="shrink-0 font-manrope text-sm font-medium text-[#211B17]">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* TOTALS */}

                <div className="px-6 py-6">
                  <div className="space-y-4">
                    {/* SUBTOTAL */}

                    <div className="flex justify-between gap-4 font-manrope text-sm text-[#756A62]">
                      <span>Subtotal</span>

                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>

                    {/* SHIPPING */}

                    <div className="flex justify-between gap-4 font-manrope text-sm text-[#756A62]">
                      <span>Shipping</span>

                      <span
                        className={
                          shipping === 0
                            ? "font-medium text-[#C56B4E]"
                            : "text-[#211B17]"
                        }
                      >
                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                      </span>
                    </div>
                  </div>

                  <div className="my-6 border-t border-[#CFC2B6]" />

                  {/* TOTAL */}

                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <span className="font-ibm-mono text-[8px] uppercase tracking-[0.18em] text-[#91847A]">
                        Total
                      </span>

                      <p className="mt-2 font-manrope text-xs leading-5 text-[#91847A]">
                        Inclusive of selected delivery charges
                      </p>
                    </div>

                    <span className="font-manrope text-2xl font-medium tracking-[-0.04em] text-[#211B17]">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={submitting}
                    className="group mt-7 flex w-full items-center justify-between bg-[#211B17] px-5 py-4 font-manrope text-sm font-medium text-[#F4EDE2] transition-colors hover:bg-[#C56B4E] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span>
                      {submitting
                        ? "Processing..."
                        : paymentMethod === "Razorpay"
                          ? `Pay — ₹${total.toLocaleString()}`
                          : `Place Order — ₹${total.toLocaleString()}`}
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4EDE2] text-[#211B17] transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </button>

                  <p className="mt-5 font-manrope text-[11px] leading-5 text-[#91847A]">
                    By placing this order you agree to our terms of service.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
