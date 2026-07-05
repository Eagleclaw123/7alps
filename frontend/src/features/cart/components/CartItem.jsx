import { Minus, Plus } from "lucide-react";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => (
  <div className="grid grid-cols-[2.2fr_1fr_0.8fr_1fr_0.8fr] items-center gap-4 border-t border-gray-100 py-4">
    {/* Product */}
    <div className="flex gap-3">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
        <button
          onClick={() => onRemove(item.id)}
          className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 bg-white text-[9px] text-gray-500 hover:border-red-400 hover:text-red-500"
          aria-label={`Remove ${item.name}`}
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
          Size: <span className="font-semibold text-gray-700">{item.size}</span>
        </p>
      </div>
    </div>

    {/* In Stock */}
    <p className="flex items-center gap-1 text-[14px] text-gray-500">
      <span className="h-1.5 w-1.5 rounded-full bg-black" />
      {item.stock}
    </p>

    {/* Price */}
    <span className="text-[14px] font-semibold text-gray-800">
      &#x20B9; {item.price.toFixed(2)}
    </span>

    {/* Quantity */}
    <div className="flex w-fit items-center gap-2 rounded-full border border-gray-200 px-2 py-1">
      <button
        onClick={() => onUpdateQuantity(item.id, -1)}
        className="flex h-6 w-6 items-center justify-center text-gray-500 hover:text-black "
        aria-label="Decrease quantity"
      >
        <Minus size={12} />
      </button>
      <span className="w-4 text-center text-[14px] font-semibold">
        {item.quantity}
      </span>
      <button
        onClick={() => onUpdateQuantity(item.id, 1)}
        className="flex h-5 w-5 items-center justify-center text-gray-500 hover:text-black"
        aria-label="Increase quantity"
      >
        <Plus size={12} />
      </button>
    </div>

    {/* Total */}
    <span className="text-[14px] font-semibold text-gray-800">
      &#x20B9; {(item.price * item.quantity).toFixed(2)}
    </span>
  </div>
);

export default CartItem;
