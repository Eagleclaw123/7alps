import { FiTag, FiTruck, FiShield } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/ui/Button";

const OrderSummary = ({ subtotal, shipping, total, discount = 0 }) => {
  const navigate = useNavigate();

  return (
    <aside className="self-start h-fit rounded-xl border border-gray-200 bg-white p-6">
      {" "}
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-[#202020]">Order Summary</h2>
      {/* Price Details */}
      <div className="mt-8 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Subtotal</span>

          <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Discount</span>

          <span className="font-semibold text-green-600">
            -₹{discount.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Shipping</span>

          <span className="font-semibold">
            {shipping === 0 ? (
              <span className="text-green-600">FREE</span>
            ) : (
              `₹${shipping}`
            )}
          </span>
        </div>

        <hr />

        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold">Total</span>

          <span className="text-2xl font-bold text-[#047B22]">
            ₹{(total - discount).toLocaleString()}
          </span>
        </div>
      </div>
      {/* Checkout */}
      <div className="mt-8">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </Button>
      </div>
      {/* Features */}
      <div className="mt-8 space-y-4 rounded-2xl bg-[#F8FAF8] p-5">
        <div className="flex items-center gap-3">
          <FiShield size={20} className="text-[#047B22]" />

          <span className="text-sm text-gray-700">Secure Payment</span>
        </div>

        <div className="flex items-center gap-3">
          <FiTruck size={20} className="text-[#047B22]" />

          <span className="text-sm text-gray-700">
            Fast Delivery Across India
          </span>
        </div>

        <div className="flex items-center gap-3">
          <FiTag size={20} className="text-[#047B22]" />

          <span className="text-sm text-gray-700">Premium Herbal Products</span>
        </div>
      </div>
    </aside>
  );
};

export default OrderSummary;
