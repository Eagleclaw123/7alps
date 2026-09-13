import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartFooter = ({ subtotal, onCheckout }) => {
  const navigate = useNavigate();

  return (
    <div className=" py-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        {/* Continue shopping */}
        <div>
          <span className="font-ibm-mono text-[8px] uppercase tracking-[0.24em] text-[#91847A]">
            Almost there
          </span>

          <p className="mt-3 max-w-md font-manrope text-sm leading-6 text-[#756A62]">
            Review your selection before continuing to checkout.
          </p>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="mt-5 inline-flex items-center gap-2 font-ibm-mono text-[8px] uppercase tracking-[0.18em] text-[#211B17] transition-colors hover:text-[#C56B4E]"
          >
            Continue shopping
            <ArrowUpRight size={12} />
          </button>
        </div>

        {/* Total / Checkout */}
        <div className="w-full md:max-w-[360px]">
          <div className="flex items-end justify-between border-b border-[#D8CCC0] pb-4">
            <div>
              <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#91847A]">
                Subtotal
              </span>

              <p className="mt-2 font-manrope text-xs text-[#91847A]">
                Excl. tax & delivery
              </p>
            </div>

            <span className="font-manrope text-2xl font-medium tracking-[-0.04em] text-[#211B17]">
              ₹{subtotal.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={onCheckout}
            className="group mt-5 flex w-full items-center justify-between bg-[#211B17] px-6 py-4 font-manrope text-sm font-medium text-[#F4EDE2] transition-colors hover:bg-[#C56B4E]"
          >
            <span>Proceed to checkout</span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4EDE2] text-[#211B17] transition-transform duration-300 group-hover:translate-x-1">
              <ArrowUpRight size={14} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartFooter;
