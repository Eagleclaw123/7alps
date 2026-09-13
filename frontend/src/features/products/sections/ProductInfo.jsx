import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { GoArrowRight } from "react-icons/go";
import { FiMinus, FiPlus } from "react-icons/fi";

import { addToCart } from "../../../store/slices/cartSlice";

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const variants = Array.isArray(product.variants) ? product.variants : [];
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    variants.find((v) => v.isDefault) || variants[0],
  );

  const [isAdded, setIsAdded] = useState(false);

  const rating = Number(product.ProductRating) || 0;
  const ratingCount = Number(product.ProductRatingCount) || 0;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    dispatch(
      addToCart({
        productId: product.id,
        variantLabel: selectedVariant.label,
        quantity,
        name: product.ProductName,
        image: product.ProductImage,
        price: Number(selectedVariant.price ?? product.ProductPrice ?? 0),
      }),
    );

    setIsAdded(true);
  };

  // Buy Now never touches the cart — it takes the customer straight to
  // checkout with just this one item, via navigation state, so an existing
  // cart (or one they build up later) is completely unaffected.
  const handleBuyNow = () => {
    if (!selectedVariant) return;

    navigate("/checkout", {
      state: {
        buyNow: {
          items: [
            {
              id: `${product.id}::${selectedVariant.label}`,
              productId: product.id,
              variantLabel: selectedVariant.label,
              quantity,
              name: product.ProductName,
              image: product.ProductImage,
              price: selectedVariant.price,
            },
          ],
        },
      },
    });
  };

  const formatWeight = (grams) => {
    const value = Number(grams);
    if (Number.isNaN(value)) return grams;

    if (value >= 1000) {
      const kg = value / 1000;
      // show up to 2 decimals, but trim trailing zeros (1.5kg, not 1.50kg)
      return `${parseFloat(kg.toFixed(2))}KG`;
    }

    return `${value} G`;
  };

  return (
    <div className="max-w-xl">
      {/* Category */}
      <p className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
        {product.ProductCategory}
      </p>

      {/* Name */}
      <h1 className="mt-5 font-manrope text-[clamp(2.8rem,5vw,5.2rem)] font-medium leading-[0.92] tracking-[-0.07em] text-[#211B17]">
        {product.ProductName}
      </h1>

      {/* Rating */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        {ratingCount > 0 ? (
          <>
            <div className="flex text-[#C56B4E]">
              {[...Array(fullStars)].map((_, index) => (
                <IoIosStar key={`full-${index}`} />
              ))}

              {hasHalfStar && <IoIosStarHalf />}

              {[...Array(emptyStars)].map((_, index) => (
                <IoIosStarOutline key={`empty-${index}`} />
              ))}
            </div>

            <span className="font-manrope text-xs text-[#756A62]">
              {rating.toFixed(1)} · {ratingCount} reviews
            </span>
          </>
        ) : (
          <span className="border border-[#D8CCC0] px-3 py-1 font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#756A62]">
            New arrival
          </span>
        )}

        <span className="h-4 w-px bg-[#D8CCC0]" />

        <span className="flex items-center gap-2 font-manrope text-xs text-[#756A62]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C56B4E]" />

          {selectedVariant?.stock > 0 ? "In stock" : "Currently unavailable"}
        </span>
      </div>

      {/* Price */}
      <div className="mt-8 border-y border-[#D8CCC0] py-6">
        <div className="flex items-end gap-3">
          <span className="font-manrope text-3xl font-medium text-[#211B17]">
            ₹{selectedVariant?.price ?? product.ProductPrice}
          </span>

          {selectedVariant?.mrp > selectedVariant?.price && (
            <>
              <span className="font-manrope text-lg text-[#91847A] line-through">
                ₹{selectedVariant.mrp}
              </span>

              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.15em] text-[#C56B4E]">
                {Math.round(
                  ((selectedVariant.mrp - selectedVariant.price) /
                    selectedVariant.mrp) *
                    100,
                )}
                % off
              </span>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mt-7 font-manrope text-sm leading-7 text-[#756A62] md:text-[15px]">
        {product.description || product.ProductDescription}
      </p>

      {/* Variants */}
      {variants.length > 0 && (
        <div className="mt-9">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-manrope text-sm font-medium text-[#211B17]">
              Choose weight
            </p>

            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#91847A]">
              Size
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {variants.map((variant) => {
              const isSelected = selectedVariant?.label === variant.label;

              return (
                <button
                  key={variant.label}
                  type="button"
                  onClick={() => {
                    setSelectedVariant(variant);
                    setIsAdded(false);
                  }}
                  className={`relative min-w-[92px] border px-5 py-3 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-[#211B17] bg-[#211B17] text-[#F4EDE2]"
                      : "border-[#D8CCC0] bg-transparent text-[#211B17] hover:border-[#756A62]"
                  }`}
                >
                  <span className="font-manrope text-sm font-medium">
                    {formatWeight(variant.label)}
                  </span>

                  {isSelected && (
                    <span className="absolute right-2 top-1 text-[8px] text-[#C56B4E]">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mt-9 flex items-center justify-between border-y border-[#D8CCC0] py-5">
        <span className="font-manrope text-sm font-medium">Quantity</span>

        <div className="flex items-center border border-[#D8CCC0]">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 items-center justify-center text-[#211B17] transition hover:bg-[#EAE0D4]"
          >
            <FiMinus size={14} />
          </button>

          <span className="flex h-10 w-10 items-center justify-center border-x border-[#D8CCC0] font-manrope text-sm">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-10 w-10 items-center justify-center text-[#211B17] transition hover:bg-[#EAE0D4]"
          >
            <FiPlus size={14} />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-7 grid grid-cols-2 gap-3">
        <button
          onClick={handleAddToCart}
          disabled={!selectedVariant || selectedVariant.stock <= 0}
          className="group flex items-center justify-between bg-[#211B17] px-5 py-4 font-manrope text-sm font-medium text-[#F4EDE2] transition hover:bg-[#C56B4E] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>{isAdded ? "Added to Cart" : "Add to Cart"}</span>

          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4EDE2] text-[#211B17] transition-transform group-hover:translate-x-1">
            <GoArrowRight size={14} />
          </span>
        </button>

        <button
          onClick={handleBuyNow}
          disabled={!selectedVariant || selectedVariant.stock <= 0}
          className="border border-[#211B17] px-5 py-4 font-manrope text-sm font-medium text-[#211B17] transition hover:bg-[#211B17] hover:text-[#F4EDE2] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Buy Now
        </button>
      </div>

      {/* Trust line */}
      <div className="mt-7 flex items-center gap-3">
        <span className="h-px w-8 bg-[#C56B4E]" />

        <p className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#91847A]">
          Carefully sourced · Quality assured
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
