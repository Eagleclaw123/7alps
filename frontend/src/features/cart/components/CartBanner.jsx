import { Phone } from "lucide-react";

const CartBanner = () => (
  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 py-3 text-xs text-gray-500">
    <span className="flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 font-medium text-orange-500">
      🔥 Hurry up! Your items are reserved for 10 minutes
    </span>

    <span className="flex items-center gap-1 text-gray-600">
      <Phone size={12} /> Help line: (02) 123 123 23
    </span>
  </div>
);

export default CartBanner;
