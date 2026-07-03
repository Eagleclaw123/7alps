import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoIosStar } from "react-icons/io";

import { addItem } from "../../../store/slices/cartSlice";

const weights = [
  { id: 1, weight: "100g", price: 249 },
  { id: 2, weight: "250g", price: 499 },
  { id: 3, weight: "500g", price: 899 },
  { id: 4, weight: "1000g", price: 1599 },
];

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(weights[0]);
  const [isAdded, setIsAdded] = useState(false);

  const rating = Number(5);

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product.id,
        name: product.ProductName,
        image: product.ProductImage,
        weight: selectedWeight.weight,
        category: product.ProductCategory,
        price: selectedWeight.price,
        quantity,
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

          {/* Reviews */}
          {/* <span>{product.ProductReviews} Reviews</span> */}

          {/* Divider */}
          {/* <div className="h-5 w-px bg-gray-300" /> */}

          {/* Stock */}
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#047B22] mt-1" />

            <span className="font-medium text-[#047B22]">
              {product.InStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>
        <p className="text-3xl font-semibold text-[#0F6B3E]">
          ₹{product.ProductPrice}
        </p>
        <p className="text-gray-600">
          A modern reading of the classic Ayurvedic night oil. Saffron and
          sandalwood lift dullness and even tone, while 24 supporting botanicals
          steady the skin barrier — so you wake to a calmer, lit-from-within
          face. Non-greasy, never tested on animals.
        </p>

        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-[#2C2C2C]">
              Choose Weight
            </p>

            <p className="text-sm font-medium text-[#047B22]">
              250g • Best Seller
            </p>
          </div>

          {/* Weight Options */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {weights.map((item) => {
              const isSelected = selectedWeight.id === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedWeight(item)}
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
                      {item.weight}
                    </span>

                    <span
                      className={`text-sm ${
                        isSelected ? "text-[#047B22]" : "text-gray-500"
                      }`}
                    >
                      ₹{item.price}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
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
          className="rounded-xl bg-[#0F6B3E] px-8 py-4 text-white"
        >
          {isAdded ? "Added to Cart" : "Add to Cart"}
        </button>

        <button className="rounded-xl border px-8 py-4">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductInfo;
