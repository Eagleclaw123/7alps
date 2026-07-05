import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

import { addToCart } from "../../../store/slices/cartSlice";

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
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
        name: product.ProductName,
        image: product.ProductImage,
        category: product.ProductCategory,
        price: selectedVariant.price,
      }),
    );
    setIsAdded(true);
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
        <p className="text-3xl font-semibold text-[#0F6B3E]">
          ₹{selectedVariant?.price ?? product.ProductPrice}
        </p>
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
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
                    className={`rounded-xl border px-5 py-4 transition-all duration-300 ${
                      isSelected
                        ? "border-[#047B22] bg-[#F4FBF6]"
                        : "border-gray-200 bg-white hover:border-[#047B22] hover:bg-[#F8FAF8]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-semibold ${
                          isSelected ? "text-[#047B22]" : "text-[#2C2C2C]"
                        }`}
                      >
                        {variant.label}
                      </span>

                      <span
                        className={`text-sm ${
                          isSelected ? "text-[#047B22]" : "text-gray-500"
                        }`}
                      >
                        ₹{variant.price}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

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

        <button className="rounded-xl border px-8 py-4">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductInfo;
