import { useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";

/**
 * NOTE: this file wasn't part of the code you shared — reconstructed since
 * CartList referenced it but its source wasn't provided. If your real
 * EmptyCart has different copy or behavior, send it over.
 */
const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      <Leaf className="h-6 w-6 text-[#B8B2A0]" />
      <p className="text-sm text-[#86806F]">
        Your cart is empty. Add some herbal blends to get started.
      </p>
      <button
        onClick={() => navigate("/products")}
        className="mt-2 rounded-full bg-[#16442C] px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-[#0E3220]"
      >
        Shop Products
      </button>
    </div>
  );
};

export default EmptyCart;
