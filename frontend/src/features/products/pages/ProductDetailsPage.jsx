import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPublicProduct } from "../../../shared/services/product.service";
import { normalizeProduct } from "../utils/normalizeProduct";

import ProductGallery from "../sections/ProductGallery";
import ProductInfo from "../sections/ProductInfo";
import ProductIngredients from "../sections/ProductIngredients";
import ProductReviews from "../sections/ProductReviews";
import RelatedProducts from "../sections/RelatedProducts";
import ProductHighlights from "../sections/ProductHighlights";

const ProductDetailsLoader = () => {
  return (
    <main className="min-h-screen bg-[#F4EDE2] px-5 pt-28 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-[1600px]">
        {/* Loading header */}
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-10 bg-[#C56B4E]" />

          <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
            7ALP / Loading product
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] xl:gap-20">
          {/* Gallery skeleton */}
          <div>
            <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden bg-[#EAE0D4] md:min-h-[620px]">
              <div className="h-[65%] w-[55%] animate-pulse bg-[#DED1C4]" />

              <div className="absolute bottom-6 left-6">
                <div className="h-2 w-32 animate-pulse bg-[#CFC1B4]" />
              </div>

              <div className="absolute right-6 top-6">
                <div className="h-2 w-12 animate-pulse bg-[#CFC1B4]" />
              </div>
            </div>

            {/* Thumbnail skeletons */}
            <div className="mt-5 flex gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-20 w-20 shrink-0 animate-pulse bg-[#EAE0D4]"
                />
              ))}
            </div>
          </div>

          {/* Product info skeleton */}
          <div className="space-y-7 lg:pt-4">
            {/* Category */}
            <div className="h-2 w-32 animate-pulse bg-[#D8CCC0]" />

            {/* Title */}
            <div className="space-y-3">
              <div className="h-12 w-[85%] animate-pulse bg-[#EAE0D4]" />
              <div className="h-12 w-[65%] animate-pulse bg-[#EAE0D4]" />
            </div>

            {/* Rating */}
            <div className="h-4 w-40 animate-pulse bg-[#EAE0D4]" />

            {/* Price */}
            <div className="h-9 w-28 animate-pulse bg-[#EAE0D4]" />

            {/* Description */}
            <div className="space-y-3 border-t border-[#D8CCC0] pt-7">
              <div className="h-3 w-full animate-pulse bg-[#EAE0D4]" />
              <div className="h-3 w-[90%] animate-pulse bg-[#EAE0D4]" />
              <div className="h-3 w-[75%] animate-pulse bg-[#EAE0D4]" />
            </div>

            {/* Variants */}
            <div className="border-t border-[#D8CCC0] pt-7">
              <div className="mb-4 h-2 w-20 animate-pulse bg-[#D8CCC0]" />

              <div className="flex gap-3">
                <div className="h-12 w-24 animate-pulse bg-[#EAE0D4]" />
                <div className="h-12 w-24 animate-pulse bg-[#EAE0D4]" />
                <div className="h-12 w-24 animate-pulse bg-[#EAE0D4]" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 border-t border-[#D8CCC0] pt-7">
              <div className="h-14 flex-1 animate-pulse bg-[#211B17]/15" />
              <div className="h-14 flex-1 animate-pulse bg-[#EAE0D4]" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const ProductDetailsPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setProduct(null);
    setLoading(true);
    setNotFound(false);

    getPublicProduct(id)
      .then(({ data }) => {
        if (cancelled) return;

        const normalizedProduct = normalizeProduct(data?.data?.product);

        if (!normalizedProduct) {
          setNotFound(true);
          return;
        }

        setProduct(normalizedProduct);
      })
      .catch(() => {
        if (!cancelled) {
          setNotFound(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  /*
   * Show loading BEFORE rendering any product details.
   */
  if (loading) {
    return <ProductDetailsLoader />;
  }

  /*
   * Product not found
   */
  if (notFound || !product) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F4EDE2] px-6">
        <div className="text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C56B4E]" />

            <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
              7ALP
            </span>

            <span className="h-px w-8 bg-[#C56B4E]" />
          </div>

          <h1 className="font-manrope text-4xl font-medium tracking-[-0.05em] text-[#211B17]">
            Product not found
          </h1>

          <p className="mt-3 font-manrope text-sm text-[#756A62]">
            The product you're looking for is unavailable.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F4EDE2] text-[#211B17]">
      {/* Product Hero */}
      <section className="px-5 pb-20 pt-28 sm:px-8 lg:px-12 lg:pb-28 xl:px-16">
        <div className="mx-auto max-w-[1600px]">
          {/* Breadcrumb / Collection */}
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-[#C56B4E]" />

            <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
              7ALP / Herbal collection
            </span>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start xl:gap-20">
            {/* Gallery */}
            <ProductGallery product={product} />

            {/* Product Information */}
            <div className="lg:sticky lg:top-28">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <ProductHighlights product={product} />

      {/* Ingredients */}
      <ProductIngredients product={product} />

      {/* Reviews */}
      <ProductReviews product={product} />

      {/* Related Products */}
      <RelatedProducts currentProduct={product} />
    </main>
  );
};

export default ProductDetailsPage;
