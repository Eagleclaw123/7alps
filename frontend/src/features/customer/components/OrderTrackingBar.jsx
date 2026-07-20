import { Check, X } from "lucide-react";

const OrderTrackingBar = ({ status, TRACKING_STEPS }) => {
  const isCancelled = status === "Cancelled";
  const currentIndex = TRACKING_STEPS.indexOf(status);
  // If status isn't a tracking step (e.g. Cancelled), fall back to -1 so
  // nothing after "Confirmed" appears complete.
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className="w-full px-1 py-2">
      <div className="flex items-center">
        {TRACKING_STEPS.map((step, index) => {
          const isCompleted = !isCancelled && index < activeIndex;
          const isCurrent = !isCancelled && index === activeIndex;
          const isLast = index === TRACKING_STEPS.length - 1;

          const circleState = isCancelled
            ? index === 0
              ? "cancelled-done"
              : "cancelled-pending"
            : isCompleted || isCurrent
              ? "done"
              : "pending";

          return (
            <div
              key={step}
              className={`flex items-center ${isLast ? "" : "flex-1"}`}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    circleState === "done"
                      ? "border-[#047B22] bg-[#047B22] text-white"
                      : circleState === "cancelled-done"
                        ? "border-red-500 bg-red-500 text-white"
                        : circleState === "cancelled-pending"
                          ? "border-red-200 bg-white text-red-200"
                          : "border-gray-200 bg-white text-gray-300"
                  }`}
                >
                  {circleState === "done" && <Check className="h-3.5 w-3.5" />}
                  {circleState === "cancelled-done" && (
                    <X className="h-3.5 w-3.5" />
                  )}
                  {(circleState === "pending" ||
                    circleState === "cancelled-pending") && (
                    <span className="h-2 w-2 rounded-full bg-current" />
                  )}
                </div>
                <span
                  className={`mt-1.5 whitespace-nowrap text-[11px] font-medium ${
                    circleState === "done"
                      ? "text-[#047B22]"
                      : circleState === "cancelled-done"
                        ? "text-red-500"
                        : "text-gray-400"
                  }`}
                >
                  {isCancelled && index === 0 ? "Cancelled" : step}
                </span>
              </div>

              {!isLast && (
                <div
                  className={`mx-2 h-0.5 flex-1 rounded-full ${
                    isCancelled
                      ? "bg-red-100"
                      : index < activeIndex
                        ? "bg-[#047B22]"
                        : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTrackingBar;
