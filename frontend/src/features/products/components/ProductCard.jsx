import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addToCart,
  updateQuantity,
  removeCartItemAsync,
  selectCartItems,
} from "../../../store/slices/cartSlice";

import {
  toggleWishlistItem,
  selectIsWishlisted,
} from "../../../store/slices/wishlistSlice";

import { selectIsCustomerLoggedIn } from "../../../store/slices/authSlice";

const ProductCard = ({ product, variants, className = "" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const isLoggedIn = useSelector(selectIsCustomerLoggedIn);
  const isWishlisted = useSelector(selectIsWishlisted(product.id));

  const defaultVariant =
    product.variants?.find((v) => v.isDefault) || product.variants?.[0];

  const availableStock = defaultVariant?.stock ?? 0;
  const isOutOfStock = !defaultVariant || availableStock <= 0;

  const cartItem = defaultVariant
    ? cartItems.find(
        (item) =>
          item.productId === product.id &&
          item.variantLabel === defaultVariant.label,
      )
    : null;

  const quantity = cartItem?.quantity || 0;

  const productImage = Array.isArray(product.ProductImages)
    ? product.ProductImages[0]
    : product.ProductImage;

  /* =========================================================
     CART
  ========================================================= */

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!defaultVariant || isOutOfStock) return;

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
    e.stopPropagation();

    if (!defaultVariant || quantity >= availableStock) return;

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

  /* =========================================================
     WISHLIST
  ========================================================= */

  const handleToggleWishlist = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      navigate("/customer/login");
      return;
    }

    dispatch(toggleWishlistItem(product.id));
  };

  return (
    <motion.article
      variants={variants}
      onClick={() => navigate(`/products/${product.id}`)}
      className={`group cursor-pointer ${className}`}
    >
      {/* =====================================================
          IMAGE
      ====================================================== */}

      <div className="relative overflow-hidden rounded-[20px] bg-[#E5DDD0]">
        <motion.img
          src={productImage}
          alt={product.ProductName}
          className="aspect-[1.22] w-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.035 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* Very subtle hover overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* -------------------------------------------------
            CATEGORY
        -------------------------------------------------- */}

        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-[#F7F3EB]/95 px-3 py-1.5 font-ibm-mono text-[8px] font-medium uppercase tracking-[0.18em] text-[#625A52] backdrop-blur-sm">
            {product.ProductCategory || "Herbal"}
          </span>
        </div>

        {/* -------------------------------------------------
            WISHLIST
        -------------------------------------------------- */}

        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F3EB]/95 text-[#241B16] shadow-sm transition-all duration-300 hover:scale-105 hover:bg-white"
        >
          {isWishlisted ? (
            <FaHeart size={15} className="text-[#B65F43]" />
          ) : (
            <CiHeart size={22} />
          )}
        </button>

        {/* -------------------------------------------------
            RATING
        -------------------------------------------------- */}

        <div className="absolute bottom-4 right-4">
          <span className="rounded-full bg-[#F7F3EB]/95 px-3 py-1.5 font-manrope text-xs font-medium text-[#241B16] shadow-sm backdrop-blur-sm">
            {product.ProductRatingCount > 0
              ? `★ ${product.ProductRating.toFixed(1)}`
              : "New"}
          </span>
        </div>
      </div>

      {/* =====================================================
          INFORMATION
      ====================================================== */}

      <div className="pt-5">
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
            <h3 className="font-manrope text-[21px] font-semibold leading-tight tracking-[-0.035em] text-[#211B17] transition-colors duration-300 group-hover:text-[#A85F43]">
              {product.ProductName}
            </h3>

            <p className="mt-2 line-clamp-1 font-manrope text-sm leading-6 text-[#827970]">
              {product.ProductDescription}
            </p>
          </div>

          <span className="shrink-0 pt-0.5 font-manrope text-lg font-semibold tracking-[-0.02em] text-[#211B17]">
            ₹{product.ProductPrice}
          </span>
        </div>

        {/* =================================================
            PRODUCT META
        ================================================== */}

        <div className="mt-4 flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#B65F43]" />

          <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#91877D]">
            {defaultVariant?.label || "Standard"}
          </span>

          {!isOutOfStock && (
            <>
              <span className="h-px w-4 bg-[#D0C5B8]" />

              <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#91877D]">
                In stock
              </span>
            </>
          )}
        </div>

        {/* =================================================
            ACTION
        ================================================== */}

        <div className="mt-5">
          {isOutOfStock ? (
            <div className="flex h-12 items-center justify-center rounded-full border border-[#D2C8BB] font-ibm-mono text-[9px] uppercase tracking-[0.2em] text-[#A07868]">
              Out of stock
            </div>
          ) : quantity === 0 ? (
            <button
              type="button"
              onClick={handleAddToCart}
              className="group/add flex h-12 w-full items-center justify-between rounded-full border border-[#C8BDB0] px-5 font-manrope text-sm font-medium text-[#211B17] transition-all duration-300 hover:border-[#211B17] hover:bg-[#211B17] hover:text-[#F7F3EB]"
            >
              <span>Add to cart</span>

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#211B17] text-[#F7F3EB] transition-all duration-300 group-hover/add:bg-[#B65F43]">
                <GoArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover/add:rotate-45"
                />
              </span>
            </button>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex h-12 items-center justify-between rounded-full border border-[#211B17] px-2"
            >
              <button
                type="button"
                onClick={handleDecrease}
                className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-[#211B17] transition-colors hover:bg-[#211B17] hover:text-white"
              >
                −
              </button>

              <span className="font-ibm-mono text-xs font-medium text-[#211B17]">
                {quantity}
              </span>

              <button
                type="button"
                onClick={handleIncrease}
                disabled={quantity >= availableStock}
                className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-[#211B17] transition-colors hover:bg-[#211B17] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;
