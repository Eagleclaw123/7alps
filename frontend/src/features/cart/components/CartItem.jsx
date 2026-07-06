import { Minus, Plus } from "lucide-react";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const price = Number(item.price || 0);
  const quantity = Number(item.quantity || 1);

  return (
    <div className="grid grid-cols-[2.2fr_1fr_0.8fr_1fr_0.8fr] items-center gap-4 border-t border-gray-100 py-4">
      {/* Product */}
      <div className="flex gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
          <img
            src={
              item.image ||
              "https://images.unsplash.com/photo-1515377905703-c4788e51af15"
            }
            alt={item.name || "Product"}
            className="h-full w-full object-cover"
          />

          <button
            onClick={() => onRemove(item.id)}
            className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 bg-white text-[9px] text-gray-500 hover:border-red-400 hover:text-red-500"
          >
            ×
          </button>
        </div>

        <div className="text-xs">
          <p className="text-[16px] font-semibold uppercase leading-snug text-gray-800">
            {item.name}
          </p>

          <p className="mt-1 text-gray-500">
            Category:{" "}
            <span className="font-semibold text-gray-700">{item.category}</span>
          </p>

          <p className="text-gray-500">
            Size:{" "}
            <span className="font-semibold text-gray-700">{item.weight}</span>
          </p>
        </div>
      </div>

      {/* Stock */}
      <p className="flex items-center gap-1 text-[14px] text-gray-500">
        <span className="h-1.5 w-1.5 rounded-full bg-[#047B22]" />
        {item.inStock ? "In Stock" : "Out of Stock"}
      </p>

      {/* Price */}
      <span className="text-[14px] font-semibold text-gray-800">
        ₹{price.toFixed(2)}
      </span>

      {/* Quantity */}
      <div className="flex w-fit items-center gap-2 rounded-full border border-gray-200 px-2 py-1">
        <button
          onClick={() => onDecrease(item.id)}
          className="flex h-6 w-6 items-center justify-center text-gray-500 transition hover:text-black"
        >
          <Minus size={12} />
        </button>

        <span className="w-4 text-center text-[14px] font-semibold">
          {quantity}
        </span>

        <button
          onClick={() => onIncrease(item.id)}
          className="flex h-6 w-6 items-center justify-center text-gray-500 transition hover:text-black"
        >
          <Plus size={12} />
        </button>
      </div>

      {/* Total */}
      <span className="text-[15px] font-semibold text-[#047B22]">
        ₹{(price * quantity).toFixed(2)}
      </span>
    </div>
  );
};

export default CartItem;
