import { Minus, Plus } from "lucide-react";
import { RxCross2 } from "react-icons/rx";

/**
 * Defensive decode for category/name strings that may arrive
 * pre-escaped from the API.
 */
const decodeEntities = (value) => {
  if (!value) return value;

  return String(value)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
};

/* =========================================================
   QUANTITY STEPPER
========================================================= */

const QuantityStepper = ({ quantity, onIncrease, onDecrease, id }) => (
  <div className="inline-flex h-8 items-center border border-[#D8CCC0] bg-[#F7F2EB] sm:h-9">
    <button
      type="button"
      onClick={() => onDecrease(id)}
      className="flex h-8 w-8 shrink-0 items-center justify-center text-[#756A62] hover:bg-[#EAE0D4] hover:text-[#211B17] sm:h-9 sm:w-9"
      aria-label="Decrease quantity"
    >
      <Minus size={12} strokeWidth={1.7} />
    </button>

    <span className="flex h-8 min-w-8 shrink-0 items-center justify-center border-x border-[#D8CCC0] px-1 font-ibm-mono text-[10px] text-[#211B17] sm:h-9 sm:min-w-9">
      {quantity}
    </span>

    <button
      type="button"
      onClick={() => onIncrease(id)}
      className="flex h-8 w-8 shrink-0 items-center justify-center text-[#756A62] hover:bg-[#EAE0D4] hover:text-[#211B17] sm:h-9 sm:w-9"
      aria-label="Increase quantity"
    >
      <Plus size={12} strokeWidth={1.7} />
    </button>
  </div>
);

/* =========================================================
   CART ITEM
========================================================= */

const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  onAdd,
  showTotal = true,
}) => {
  const price = Number(item.price || 0);
  const quantity = Number(item.quantity || 1);
  const total = price * quantity;

  const name = decodeEntities(item.name);
  const category = decodeEntities(item.category);

  const hasAddAction = Boolean(onAdd);

  // Desktop/table grid only kicks in at lg (1024px+), giving enough room
  // for all columns. Between sm/md it still uses the card layout.
  const desktopGridClass = showTotal
    ? "lg:grid-cols-[2fr_0.9fr_0.7fr_1fr_0.8fr]"
    : "lg:grid-cols-[2fr_0.9fr_0.7fr_1fr]";

  return (
    <div className="w-full min-w-0">
      {/* =====================================================
          CARD LAYOUT (mobile + tablet, < lg)
          Fully fluid: wraps, shrinks, and reflows as needed.
      ===================================================== */}

      <div className="w-full min-w-0 border-b border-[#D8CCC0] py-4 lg:hidden">
        {/* PRODUCT TOP */}

        <div className="flex w-full min-w-0 items-start gap-3">
          {/* IMAGE */}

          <div className="h-16 w-16 shrink-0 overflow-hidden bg-[#EAE0D4] sm:h-[72px] sm:w-[72px]">
            <img
              src={
                item.image ||
                "https://images.unsplash.com/photo-1515377905703-c4788e51af15"
              }
              alt={name || "Product"}
              className="block h-full w-full object-cover"
            />
          </div>

          {/* DETAILS */}

          <div className="min-w-0 flex-1">
            <div className="flex w-full items-start gap-2">
              <div className="min-w-0 flex-1">
                <p className="break-words font-manrope text-[13px] font-medium leading-5 text-[#211B17] sm:text-[14px]">
                  {name}
                </p>

                {category && (
                  <p className="mt-1 truncate font-manrope text-[11px] leading-4 text-[#91847A]">
                    {category}
                  </p>
                )}

                {item.weight && (
                  <p className="mt-0.5 font-manrope text-[11px] leading-4 text-[#91847A]">
                    Size / {item.weight}
                  </p>
                )}
              </div>

              {/* REMOVE */}

              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="flex h-6 w-6 shrink-0 items-center justify-center text-[#91847A]"
                aria-label="Remove item"
              >
                <RxCross2 size={14} />
              </button>
            </div>

            {/* STOCK */}

            <div className="mt-2">
              <span
                className={`font-ibm-mono text-[8px] uppercase tracking-[0.14em] ${
                  item.inStock ? "text-[#756A62]" : "text-[#C56B4E]"
                }`}
              >
                {item.inStock ? "In stock" : "Out of stock"}
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM */}

        <div className="mt-4 flex w-full min-w-0 flex-wrap items-center justify-between gap-3 border-t border-[#D8CCC0] pt-3">
          {/* QUANTITY */}

          <div className="shrink-0">
            {hasAddAction ? (
              <button
                type="button"
                onClick={() => onAdd(item)}
                className="whitespace-nowrap border border-[#211B17] px-3.5 py-2 font-ibm-mono text-[8px] uppercase tracking-[0.14em] text-[#211B17]"
              >
                Add to cart
              </button>
            ) : (
              <QuantityStepper
                id={item.id}
                quantity={quantity}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
              />
            )}
          </div>

          {/* PRICE */}

          <div className="min-w-0 text-right">
            <p className="whitespace-nowrap font-manrope text-[10px] text-[#91847A]">
              ₹{price.toFixed(2)} each
            </p>

            {showTotal && (
              <p className="mt-0.5 whitespace-nowrap font-manrope text-sm font-semibold text-[#211B17]">
                ₹{total.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          TABLE ROW (desktop, lg and up)
      ===================================================== */}

      <div
        className={`hidden w-full border-b border-[#D8CCC0] py-5 lg:grid xl:py-6 ${desktopGridClass} lg:items-center lg:gap-3`}
      >
        {/* PRODUCT */}

        <div className="flex min-w-0 gap-4 pr-4 xl:gap-5 xl:pr-5">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-[#EAE0D4] xl:h-20 xl:w-20">
            <img
              src={
                item.image ||
                "https://images.unsplash.com/photo-1515377905703-c4788e51af15"
              }
              alt={name || "Product"}
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center bg-[#F4EDE2]/90 text-[#756A62] hover:bg-[#C56B4E] hover:text-white"
              aria-label="Remove item"
            >
              <RxCross2 size={11} />
            </button>
          </div>

          <div className="min-w-0">
            <p className="truncate font-manrope text-sm font-medium text-[#211B17]">
              {name}
            </p>

            {category && (
              <p className="mt-2 truncate font-manrope text-xs text-[#91847A]">
                {category}
              </p>
            )}

            {item.weight && (
              <p className="mt-1 truncate font-manrope text-xs text-[#91847A]">
                Size / {item.weight}
              </p>
            )}
          </div>
        </div>

        {/* STOCK */}

        <div className="min-w-0 border-l border-[#D8CCC0] pl-3 xl:pl-5">
          <span
            className={`whitespace-nowrap font-ibm-mono text-[8px] uppercase tracking-[0.16em] ${
              item.inStock ? "text-[#756A62]" : "text-[#C56B4E]"
            }`}
          >
            {item.inStock ? "In stock" : "Out of stock"}
          </span>
        </div>

        {/* PRICE */}

        <div className="min-w-0 border-l border-[#D8CCC0] pl-3 xl:pl-5">
          <span className="whitespace-nowrap font-manrope text-sm font-medium text-[#211B17]">
            ₹{price.toFixed(2)}
          </span>
        </div>

        {/* QUANTITY */}

        <div className="min-w-0 border-l border-[#D8CCC0] pl-3 xl:pl-5">
          {hasAddAction ? (
            <button
              type="button"
              onClick={() => onAdd(item)}
              className="w-fit whitespace-nowrap border border-[#211B17] px-3 py-2 font-ibm-mono text-[8px] uppercase tracking-[0.14em] text-[#211B17] xl:px-4"
            >
              Add to cart
            </button>
          ) : (
            <QuantityStepper
              id={item.id}
              quantity={quantity}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          )}
        </div>

        {/* TOTAL */}

        {showTotal && (
          <div className="min-w-0 border-l border-[#D8CCC0] pl-3 xl:pl-5">
            <span className="whitespace-nowrap font-manrope text-base font-medium text-[#211B17]">
              ₹{total.toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
