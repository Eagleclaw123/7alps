import { useEffect, useState } from "react";
import { Truck } from "lucide-react";

import { getPublicDeliverySettings } from "../../../shared/services/admin.service";

const formatEstimate = (days) => {
  const date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

  return date.toLocaleDateString("en-IN", {
    weekday: "long",
  });
};

const OrderSummary = ({ itemCount = 0 }) => {
  const [estimate, setEstimate] = useState(null);

  useEffect(() => {
    getPublicDeliverySettings()
      .then(({ data }) =>
        setEstimate(formatEstimate(data?.data?.expectedDeliveryDays)),
      )
      .catch(() => {});
  }, []);

  return (
    <div className="border-b border-[#D8CCC0]">
      <div className="flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Items */}
        <div>
          <span className="font-ibm-mono text-[8px] uppercase tracking-[0.24em] text-[#91847A]">
            Cart contents
          </span>

          <p className="mt-2 font-manrope text-sm text-[#211B17]">
            <span className="font-medium">{itemCount}</span>{" "}
            {itemCount === 1 ? "item" : "items"} selected
          </p>
        </div>

        {/* Delivery */}
        {estimate && (
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center border border-[#D8CCC0]">
              <Truck size={15} strokeWidth={1.3} className="text-[#C56B4E]" />
            </div>

            <div>
              <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#91847A]">
                Estimated delivery
              </span>

              <p className="mt-1 font-manrope text-sm font-medium text-[#211B17]">
                {estimate}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
