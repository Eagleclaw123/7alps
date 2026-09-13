import { Check, X } from "lucide-react";

const OrderTrackingBar = ({ status, TRACKING_STEPS }) => {
  const isCancelled = status === "Cancelled";

  const currentIndex = TRACKING_STEPS.indexOf(status);

  // Keep existing fallback behavior for non-tracking statuses.
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className="w-full py-3">
      <div className="flex items-start">
        {TRACKING_STEPS.map((step, index) => {
          const isCompleted = !isCancelled && index < activeIndex;

          const isCurrent = !isCancelled && index === activeIndex;

          const isLast = index === TRACKING_STEPS.length - 1;

          const isCancelledOrigin = isCancelled && index === 0;

          const isPending = !isCompleted && !isCurrent && !isCancelledOrigin;

          return (
            <div
              key={step}
              className={`flex min-w-0 items-start ${isLast ? "" : "flex-1"}`}
            >
              {/* Step */}
              <div className="flex min-w-[58px] flex-col items-center">
                {/* Marker */}
                <div
                  className={`
                    relative flex h-9 w-9 items-center justify-center
                    border transition-all duration-500
                    ${
                      isCompleted || isCurrent
                        ? "border-[#211B17] bg-[#211B17] text-[#F4EDE2]"
                        : isCancelledOrigin
                          ? "border-[#C56B4E] bg-[#C56B4E] text-white"
                          : "border-[#D8CCC0] bg-[#F4EDE2] text-[#91847A]"
                    }
                  `}
                >
                  {isCompleted || isCurrent ? (
                    <Check className="h-3.5 w-3.5" strokeWidth={1.8} />
                  ) : isCancelledOrigin ? (
                    <X className="h-3.5 w-3.5" strokeWidth={1.8} />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  )}

                  {/* Current status indicator */}
                  {isCurrent && !isCancelled ? (
                    <span className="absolute -right-1 -top-1 h-2 w-2 bg-[#C56B4E]" />
                  ) : null}
                </div>

                {/* Label */}
                <span
                  className={`
                    mt-3 whitespace-nowrap
                    font-ibm-mono text-[8px]
                    uppercase tracking-[0.14em]
                    transition-colors duration-300
                    ${
                      isCompleted || isCurrent
                        ? "text-[#211B17]"
                        : isCancelledOrigin
                          ? "text-[#C56B4E]"
                          : "text-[#91847A]"
                    }
                  `}
                >
                  {isCancelled && index === 0 ? "Cancelled" : step}
                </span>
              </div>

              {/* Connector */}
              {!isLast ? (
                <div className="relative mx-3 mt-[18px] h-px flex-1 overflow-hidden bg-[#D8CCC0]">
                  <div
                    className={`
                      absolute inset-y-0 left-0 transition-all
                      duration-700
                      ${
                        isCancelled
                          ? "w-0 bg-[#C56B4E]"
                          : index < activeIndex
                            ? "w-full bg-[#211B17]"
                            : "w-0"
                      }
                    `}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTrackingBar;
