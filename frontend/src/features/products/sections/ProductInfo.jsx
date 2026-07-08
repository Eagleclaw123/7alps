import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

import { addToCart } from "../../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const variants = Array.isArray(product.variants) ? product.variants : [];
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    variants.find((v) => v.isDefault) || variants[0],
  );

  const [isAdded, setIsAdded] = useState(false);

  const rating = Number(5);

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
      }),
    );
    setIsAdded(true);
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) return;

    await dispatch(
      addToCart({
        productId: product.id,
        variantLabel: selectedVariant.label,
        quantity,
      }),
    );

    navigate("/checkout");
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
    <div>
      <div className="space-y-4">
        <span className="rounded-full bg-[#F3F8F2] px-4 py-2 text-sm text-[#0F6B3E] inline-block">
          {product.ProductCategory}
        </span>
        <h1 className="text-5xl font-semibold">{product.ProductName}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center text-[#E6A43A]">
              {[...Array(fullStars)].map((_, index) => (
                <IoIosStar key={`full-${index}`} />
              ))}

              {hasHalfStar && <IoIosStarHalf />}

              {[...Array(emptyStars)].map((_, index) => (
                <IoIosStarOutline key={`empty-${index}`} />
              ))}
            </div>

            <span className="font-medium text-[#2C2C2C]">
              {product.ProductRating}
            </span>
          </div>

          {/* Divider */}
          <div className="h-5 w-px bg-gray-300" />

          {/* Stock */}
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#047B22] mt-1" />

            <span className="font-medium text-[#047B22]">
              {selectedVariant && selectedVariant.stock > 0
                ? "In Stock"
                : "Out of Stock"}
            </span>
          </div>
        </div>
        <div className="flex items-end gap-3">
          <span className="text-3xl font-semibold text-[#0F6B3E]">
            ₹{selectedVariant?.price ?? product.ProductPrice}
          </span>

          {selectedVariant?.mrp > selectedVariant?.price && (
            <>
              <span className="text-xl text-gray-400 line-through">
                ₹{selectedVariant.mrp}
              </span>

              <span className="rounded-full bg-[#E9F8EE] px-2 py-1 text-xs font-semibold text-[#047B22]">
                {Math.round(
                  ((selectedVariant.mrp - selectedVariant.price) /
                    selectedVariant.mrp) *
                    100,
                )}
                % OFF
              </span>
            </>
          )}
        </div>
        <p className="text-gray-600">
          {product.description || product.ProductDescription}
        </p>

        {variants.length ? (
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-[#2C2C2C]">
                Choose Weight
              </p>
            </div>

            {/* Variant Options */}
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
                    className={`relative w-fit rounded-full border-2 px-4 py-2 transition-all duration-200 ${
                      isSelected
                        ? "border-[#047B22] bg-[#F4FBF6]"
                        : "border-gray-200 bg-white hover:border-[#047B22]/50 hover:bg-[#F8FAF8]"
                    }`}
                  >
                    <span
                      className={`font-semibold ${
                        isSelected ? "text-[#047B22]" : "text-[#2C2C2C]"
                      }`}
                    >
                      {formatWeight(variant.label)}
                    </span>

                    {isSelected ? (
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#047B22] text-[10px] font-bold text-white">
                        ✓
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="mt-8 flex items-center gap-5">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="h-12 w-12 rounded-xl border"
          >
            -
          </button>

          <span className="text-xl">{quantity}</span>

          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="h-12 w-12 rounded-xl border"
          >
            +
          </button>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant || selectedVariant.stock <= 0}
            className="rounded-xl bg-[#0F6B3E] px-8 py-4 text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isAdded ? "Added to Cart" : "Add to Cart"}
          </button>
          <button
            onClick={handleBuyNow}
            disabled={!selectedVariant || selectedVariant.stock <= 0}
            className="rounded-xl border px-8 py-4 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Buy Now
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
