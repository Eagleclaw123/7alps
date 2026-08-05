import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";

import {
  fetchWishlist,
  selectWishlistItems,
} from "../../../store/slices/wishlistSlice";
import ProductCard from "../../products/components/ProductCard";
import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import HeroBanner from "../../../shared/components/ui/HeroBanner";

const CustomerWishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectWishlistItems);

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
            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-4 border border-[#E3DFD2] bg-white p-16 text-center text-[#86806F]">
                <Heart className="h-8 w-8 text-[#B8B2A0]" />
                <p>Nothing in your wishlist yet.</p>
                <button
                  onClick={() => navigate("/products")}
                  className="rounded-full bg-[#16442C] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-[#0E3220]"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default CustomerWishlist;
