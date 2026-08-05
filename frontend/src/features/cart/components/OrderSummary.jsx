import { Leaf, Truck } from "lucide-react";

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

/**
 * NOTE: this file wasn't part of the code you shared — reconstructed from
 * the screenshot ("You have N products in your cart" / "Expected Delivery").
 * If your real OrderSummary takes more props or computes delivery day
 * dynamically, send that file over and I'll fold this styling into it.
 */
const OrderSummary = ({ itemCount = 0 }) => {
  return (
    <div className="px-6 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5">
        <p className="flex items-center gap-2 text-sm text-[#5B564A]">
          <Leaf className="h-4 w-4 text-[#16442C]" />
          You have{" "}
          <span className="font-semibold text-[#201F1B]">{itemCount}</span>{" "}
          {itemCount === 1 ? "item" : "items"} in your cart
        </p>
        <p className="flex items-center gap-2 text-sm text-[#5B564A]">
          <Truck className="h-4 w-4 text-[#16442C]" />
          Expected Delivery:{" "}
          <span className="font-semibold text-[#201F1B]">Friday</span>
        </p>
      </div>
      <Perforation />
    </div>
  );
};

export default OrderSummary;
