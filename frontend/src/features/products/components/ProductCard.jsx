import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { GrCart } from "react-icons/gr";
import { motion } from "framer-motion";
import Button from "../../../shared/components/ui/Button";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  product,
  variants,
  onBuyClick,
  onCartClick,
  onFavoriteClick,
  buyButtonLabel = "Add to Cart",
  className = "",
}) => {
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();

    setQuantity(1);

    onCartClick?.(product);
  };

  const increaseQuantity = (e) => {
    e.stopPropagation();

    setQuantity((prev) => prev + 1);

    onCartClick?.({
      ...product,
      quantity: quantity + 1,
    });
  };

  const decreaseQuantity = (e) => {
    e.stopPropagation();

    if (quantity === 1) {
      setQuantity(0);
    } else {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <motion.div
      className={`product-card overflow-hidden  ${className}`}
      onClick={() => navigate(`/products/${product.id}`)}
      variants={variants}
    >
      <div className="relative group">
        <img
          src={product.ProductImage}
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
              onClick={(e) => handleAddToCart(e, product)}
            >
              Add to Cart
            </Button>
          ) : (
            <div
              className="flex items-center overflow-hidden rounded-xl border border-[#047B22]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={decreaseQuantity}
                className="flex h-10 w-10 items-center justify-center bg-[#047B22] text-xl font-semibold text-white transition hover:bg-[#03641c]"
              >
                −
              </button>

              <span className="flex w-10 items-center justify-center font-semibold">
                {quantity}
              </span>

              <button
                onClick={increaseQuantity}
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
