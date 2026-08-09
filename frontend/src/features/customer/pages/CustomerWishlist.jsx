import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../../cart/components/EmptyCart";
import NewsletterBanner from "../../cart/components/NewsletterBanner";
import CartList from "../../cart/components/CartList";
import { addToCart } from "../../../store/slices/cartSlice";

import {
  fetchWishlist,
  selectWishlistItems,
  toggleWishlistItem,
} from "../../../store/slices/wishlistSlice";
import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import HeroBanner from "../../../shared/components/ui/HeroBanner";
import { Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomerWishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectWishlistItems);
  const [quantities, setQuantities] = useState({});

  const handleRemove = (id) => {
    dispatch(toggleWishlistItem(id));
  };

  const handleWishlistQuantityChange = (id, delta) => {
    setQuantities((current) => {
      const existing = current[id] || 1;
      const next = Math.max(1, existing + delta);
      return { ...current, [id]: next };
    });
  };

  const handleAddToCart = (item) => {
    // item is the mapped cart-like item we passed into CartList
    const productId = item.productId || item.id;
    const variantLabel = item.variantLabel || "";
    dispatch(
      addToCart({
        productId,
        variantLabel,
        quantity: item.quantity || 1,
        name: item.name,
        image: item.image,
        category: item.category,
        price: item.price,
      }),
    );
    // Optionally remove from wishlist after adding to cart
    dispatch(toggleWishlistItem(productId));
  };

  // Convert wishlist product shape to the cart item shape expected by CartList/CartItem
  const wishlistAsCartItems = (products) =>
    products.map((p) => ({
      id: p.id,
      productId: p.id,
      variantLabel:
        (p.variants &&
          (p.variants.find((v) => v.isDefault) || p.variants[0])?.label) ||
        "",
      name: p.ProductName || p.name || p.title || "",
      image:
        p.ProductImage || (p.ProductImages && p.ProductImages[0]) || p.image,
      price: p.ProductPrice ?? p.price ?? 0,
      quantity: quantities[p.id] || 1,
      weight: p.weight || p.size || "",
      inStock: typeof p.inStock === "boolean" ? p.inStock : true,
      category: p.ProductCategory || p.category || "",
    }));

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <AnimatedPage>
      <div>
        <HeroBanner
          eyebrow="Wishlist"
          title="Your Wishlist"
          description="Products you've saved for later — add them to your cart whenever you're ready."
          image="https://res.cloudinary.com/dasvdkncm/image/upload/v1784788176/ChatGPT_Image_Jul_23_2026_11_57_14_AM_gbwvsk.png"
        />

        <div className="px-6 py-10 xl:px-0">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-7xl border border-[#E3DFD2] bg-white">
              <div className="py-6">
                {items.length === 0 ? (
                  <EmptyCart
                    title="Your wishlist is empty"
                    description="Save products you're curious about and they'll show up here, ready to add to cart whenever you're ready."
                    buttonText="Browse Products"
                    buttonHref="/products"
                  />
                ) : (
                  <div>
                    <div className="px-6">
                      <p className="flex items-center gap-2 text-sm text-[#5B564A]">
                        <Leaf className="h-4 w-4 text-[#16442C]" />
                        You have{" "}
                        <span className="font-semibold text-[#201F1B]">
                          {items.length}
                        </span>{" "}
                        {items.length === 1 ? "item" : "items"} in your cart
                      </p>
                    </div>

                    <CartList
                      items={wishlistAsCartItems(items)}
                      onUpdateQuantity={handleWishlistQuantityChange}
                      onRemove={handleRemove}
                      onAdd={handleAddToCart}
                      columns={[
                        "Product",
                        "In Stock",
                        "Price",
                        "Add to Cart",
                        "Total",
                      ]}
                      emptyState={{
                        title: "Your wishlist is empty.",
                        description:
                          "Save a product to your wishlist and add it to cart later.",
                        buttonText: "Browse Products",
                        buttonHref: "/products",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default CustomerWishlist;
