import { useEffect, useState } from "react";
import { Leaf, Truck } from "lucide-react";

import { getPublicDeliverySettings } from "../../../shared/services/admin.service";

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

const formatEstimate = (days) => {
  const date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  return date.toLocaleDateString("en-IN", { weekday: "long" });
};

const OrderSummary = ({ itemCount = 0 }) => {
  // Pre-checkout estimate only — the real per-order date is computed and
  // snapshotted by the backend once an order is actually placed.
  const [estimate, setEstimate] = useState(null);

  useEffect(() => {
    getPublicDeliverySettings()
      .then(({ data }) => setEstimate(formatEstimate(data?.data?.expectedDeliveryDays)))
      .catch(() => {});
  }, []);

  return (
    <div className="px-6 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5">
        <p className="flex items-center gap-2 text-sm text-[#5B564A]">
          <Leaf className="h-4 w-4 text-[#16442C]" />
          You have{" "}
          <span className="font-semibold text-[#201F1B]">{itemCount}</span>{" "}
          {itemCount === 1 ? "item" : "items"} in your cart
        </p>
        {estimate ? (
          <p className="flex items-center gap-2 text-sm text-[#5B564A]">
            <Truck className="h-4 w-4 text-[#16442C]" />
            Expected Delivery:{" "}
            <span className="font-semibold text-[#201F1B]">{estimate}</span>
          </p>
        ) : null}
      </div>
      <Perforation />
    </div>
  );
};

export default OrderSummary;
