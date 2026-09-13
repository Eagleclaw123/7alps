import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowUpRight } from "lucide-react";

import CartList from "../../cart/components/CartList";

import { addToCart } from "../../../store/slices/cartSlice";

import {
  fetchWishlist,
  selectWishlistItems,
  toggleWishlistItem,
} from "../../../store/slices/wishlistSlice";

import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import PageHero from "../../../shared/components/ui/PageHero";

const CustomerWishlist = () => {
  const dispatch = useDispatch();

  const items = useSelector(selectWishlistItems);

  const [quantities, setQuantities] = useState({});

  const handleRemove = (id) => {
    dispatch(toggleWishlistItem(id));
  };

  const handleWishlistQuantityChange = (id, delta) => {
    setQuantities((current) => {
      const existing = current[id] || 1;
      const next = Math.max(1, existing + delta);

      return {
        ...current,
        [id]: next,
      };
    });
  };

  const handleAddToCart = (item) => {
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

    dispatch(toggleWishlistItem(productId));
  };

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
      <div className="min-h-screen bg-[#F4EDE2] text-[#211B17]">
        {/* ─────────────────────────────────────────────
            HERO
        ───────────────────────────────────────────── */}

        <PageHero
          eyebrow="Your account"
          title="Your"
          titleHighlight="wishlist."
          description="Keep the products you love close."
          backgroundImage="https://res.cloudinary.com/dasvdkncm/image/upload/v1784788176/ChatGPT_Image_Jul_23_2026_11_57_14_AM_gbwvsk.png"
          imageAlt="7ALP herbal wellness wishlist"
          leftLabel="7ALP's / Wishlist"
          rightLabel="Personal / Delivery"
        />

        {/* ─────────────────────────────────────────────
            WISHLIST
        ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 md:pb-24 xl:px-16">
          {/* Header */}

          {/* ─────────────────────────────────────────
              EMPTY STATE
          ───────────────────────────────────────── */}
          {items.length === 0 ? (
            <div className="py-10">
              <div className="max-w-2xl">
                <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
                  Wishlist / Empty
                </span>

                <h3 className="mt-5 font-manrope text-3xl font-medium leading-tight tracking-[-0.055em] md:text-4xl">
                  Nothing saved yet.
                </h3>

                <p className="mt-5 max-w-lg font-manrope text-sm leading-7 text-[#756A62] md:text-base">
                  Save products you&apos;re curious about and come back to them
                  whenever you&apos;re ready.
                </p>

                <div className="mt-8">
                  <a
                    href="/products"
                    className="group inline-flex items-center gap-4 bg-[#211B17] px-7 py-4 font-manrope text-sm font-medium text-[#F4EDE2] transition-colors hover:bg-[#C56B4E]"
                  >
                    Browse products
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4EDE2] text-[#211B17] transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowUpRight size={14} />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* ───────────────────────────────────────
               PRODUCT LIST
            ─────────────────────────────────────── */
            <div className="mt-10">
              {/* Intro strip */}
              <div className="mb-8 flex flex-col gap-4 border-b border-[#D8CCC0] pb-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-manrope text-sm text-[#756A62]">
                  Keep the products you love close.
                </p>

                <span className="font-ibm-mono text-[8px] uppercase tracking-[0.22em] text-[#91847A]">
                  Saved products / 7ALP&apos;s
                </span>
              </div>

              {/* Existing CartList */}
              <CartList
                items={wishlistAsCartItems(items)}
                onUpdateQuantity={handleWishlistQuantityChange}
                onRemove={handleRemove}
                onAdd={handleAddToCart}
                showTotal={false}
                columns={["Product", "In Stock", "Price", "Add to Cart"]}
                emptyState={{
                  title: "Your wishlist is empty.",
                  description:
                    "Save a product to your wishlist and add it to cart later.",
                  buttonText: "Browse Products",
                  buttonHref: "/products",
                }}
              />

              {/* Bottom statement */}
              <div className="mt-16 pt-8">
                <p className="max-w-3xl font-manrope text-xl font-medium leading-tight tracking-[-0.04em] md:text-2xl">
                  Good choices don&apos;t have to be rushed.
                  <br />
                  <span className="font-normal text-[#91847A]">
                    Save them. Come back when you&apos;re ready.
                  </span>
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </AnimatedPage>
  );
};

export default CustomerWishlist;
