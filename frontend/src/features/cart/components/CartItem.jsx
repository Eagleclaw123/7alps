import { Minus, Plus, Leaf } from "lucide-react";
import { RxCross2 } from "react-icons/rx";

/**
 * Defensive decode for category/name strings that may arrive pre-escaped
 * from the API (e.g. "Health &amp; Wellness" instead of "Health & Wellness").
 * The real fix belongs wherever that string is written, but this keeps the
 * UI from ever showing a raw HTML entity in the meantime.
 */
const decodeEntities = (value) => {
  if (!value) return value;
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
};

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

const QuantityStepper = ({ quantity, onIncrease, onDecrease, id }) => (
  <div className="flex w-fit items-center gap-2 rounded-full border border-[#E3DFD2] px-2 py-1">
    <button
      onClick={() => onDecrease(id)}
      className="flex h-6 w-6 items-center justify-center text-[#86806F] transition hover:text-[#16442C]"
    >
      <Minus size={12} />
    </button>
    <span className="w-4 text-center text-[14px] font-semibold text-[#201F1B]">
      {quantity}
    </span>
    <button
      onClick={() => onIncrease(id)}
      className="flex h-6 w-6 items-center justify-center text-[#86806F] transition hover:text-[#16442C]"
    >
      <Plus size={12} />
    </button>
  </div>
);

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const price = Number(item.price || 0);
  const quantity = Number(item.quantity || 1);
  const total = price * quantity;
  const name = decodeEntities(item.name);
  const category = decodeEntities(item.category);

  return (
    <div>
      {/* ── Mobile card (below sm) ─────────────────────────────── */}
      <div className="border border-[#E3DFD2] bg-white p-4 sm:hidden">
        <div className="flex gap-3">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-[#EEF1E6]">
            <img
              src={
                item.image ||
                "https://images.unsplash.com/photo-1515377905703-c4788e51af15"
              }
              alt={name || "Product"}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <p className="font-serif text-base leading-snug text-[#201F1B]">
                {name}
              </p>
              <button
                onClick={() => onRemove(item.id)}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#E3DFD2] text-[#86806F] hover:border-red-400 hover:text-red-500"
                aria-label="Remove item"
              >
                <RxCross2 size={12} />
              </button>
            </div>
            <p className="mt-1 text-xs text-[#86806F]">
              {category} · Size {item.weight}
            </p>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#EEF1E6] px-2 py-0.5 text-[11px] font-medium text-[#16442C]">
              <Leaf className="h-2.5 w-2.5" />
              {item.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>

        <div className="my-3">
          <Perforation />
        </div>

        <div className="flex items-center justify-between">
          <QuantityStepper
            id={item.id}
            quantity={quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
          <div className="text-right">
            <p className="text-[11px] text-[#86806F]">
              ₹{price.toFixed(2)} each
            </p>
            <p className="font-serif text-lg text-[#16442C]">
              ₹{total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* ── Desktop / tablet row (sm and up) ──────────────────────── */}
      <div className="hidden border-t border-[#F0EEE3] px-6 py-4 sm:grid sm:grid-cols-[2.2fr_1fr_0.8fr_1fr_0.8fr] sm:items-center sm:gap-4">
        {/* Product */}
        <div className="flex gap-3">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-[#EEF1E6]">
            <img
              src={
                item.image ||
                "https://images.unsplash.com/photo-1515377905703-c4788e51af15"
              }
              alt={name || "Product"}
              className="h-full w-full object-cover"
            />
            <button
              onClick={() => onRemove(item.id)}
              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-[#E3DFD2] bg-white text-[9px] text-[#86806F] hover:border-red-400 hover:text-red-500"
            >
              <RxCross2 size={10} />
            </button>
          </div>

          <div className="text-xs">
            <p className="text-base font-medium leading-snug text-[#201F1B]">
              {name}
            </p>
            <p className="mt-1 text-[#86806F]">
              Category:{" "}
              <span className="font-medium text-[#5B564A]">{category}</span>
            </p>
            <p className="text-[#86806F]">
              Size:{" "}
              <span className="font-medium text-[#5B564A]">{item.weight}</span>
            </p>
          </div>
        </div>

        {/* Stock */}
        <p className="flex items-center gap-1.5 text-[13px] text-[#5B564A]">
          <Leaf className="h-3 w-3 text-[#16442C]" />
          {item.inStock ? "In Stock" : "Out of Stock"}
        </p>

        {/* Price */}
        <span className="text-[14px] font-medium text-[#201F1B]">
          ₹{price.toFixed(2)}
        </span>

        {/* Quantity */}
        <QuantityStepper
          id={item.id}
          quantity={quantity}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />

        {/* Total */}
        <span className="text-[15px] font-medium text-[#16442C]">
          ₹{total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
