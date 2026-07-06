import { CiHeart } from "react-icons/ci";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../../../shared/components/ui/Button";
import ImageCarousel from "../../../shared/components/ui/ImageCarousel";
import {
  addToCart,
  updateQuantity,
  removeCartItemAsync,
  selectCartItems,
} from "../../../store/slices/cartSlice";

const ProductCard = ({
  product,
  variants,
  onFavoriteClick,
  className = "",
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const defaultVariant =
    product.variants?.find((v) => v.isDefault) || product.variants?.[0];

  const cartItem = defaultVariant
    ? cartItems.find(
        (item) =>
          item.productId === product.id &&
          item.variantLabel === defaultVariant.label,
      )
    : null;
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!defaultVariant) return;

    dispatch(
      addToCart({
        productId: product.id,
        variantLabel: defaultVariant.label,
        quantity: 1,
        name: product.ProductName,
        image: product.ProductImage,
        category: product.ProductCategory,
        price: defaultVariant.price,
      }),
    );
  };

  const handleIncrease = (e) => {
    handleAddToCart(e);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (!defaultVariant) return;

    if (quantity <= 1) {
      dispatch(
        removeCartItemAsync({
          productId: product.id,
          variantLabel: defaultVariant.label,
        }),
      );
    } else {
      dispatch(
        updateQuantity({
          productId: product.id,
          variantLabel: defaultVariant.label,
          type: "decrease",
        }),
      );
    }
  };

  return (
    <motion.div
      className={`product-card overflow-hidden  ${className}`}
      onClick={() => navigate(`/products/${product.id}`)}
      variants={variants}
    >
      <div className="relative group h-72">
        <img
          src={
            Array.isArray(product.ProductImages)
              ? product.ProductImages[0]
              : product.ProductImage
          }
          alt={product.ProductName}
          className="w-full h-72 object-cover"
        />

        <div className="absolute top-4 right-4 opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-all duration-300">
          <button
            className="bg-white w-10 h-10 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteClick?.(product);
            }}
          >
            <CiHeart size={22} />
          </button>
        </div>

        <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full shadow-md text-sm font-medium">
          ⭐ {product.ProductRating}
        </div>
      </div>

      <div className="space-y-6 py-4">
        <h3 className="text-xl font-semibold mb-2">{product.ProductName}</h3>

        <p className="text-gray-600 mb-2">{product.ProductDescription}</p>

        <div className="flex items-center justify-between gap-4">
          <div className="text-lg font-semibold">₹{product.ProductPrice}</div>
          {quantity === 0 ? (
            <Button
              variant="primary"
              size="md"
              className="w-30"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          ) : (
            <div
              className="flex items-center overflow-hidden rounded-xl border border-[#047B22]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleDecrease}
                className="flex h-10 w-10 items-center justify-center bg-[#047B22] text-xl font-semibold text-white transition hover:bg-[#03641c]"
              >
                −
              </button>

              <span className="flex w-10 items-center justify-center font-semibold">
                {quantity}
              </span>

              <button
                onClick={handleIncrease}
                className="flex h-10 w-10 items-center justify-center bg-[#047B22] text-xl font-semibold text-white transition hover:bg-[#03641c]"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
