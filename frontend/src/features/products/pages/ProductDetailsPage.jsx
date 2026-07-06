import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicProduct } from "../../../shared/services/product.service";
import { normalizeProduct } from "../utils/normalizeProduct";

import ProductGallery from "../sections/ProductGallery";
import ProductInfo from "../sections/ProductInfo";
import ProductIngredients from "../sections/ProductIngredients";
import ProductReviews from "../sections/ProductReviews";
import RelatedProducts from "../sections/RelatedProducts";
import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import ProductHighlights from "../sections/ProductHighlights";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    getPublicProduct(id)
      .then(({ data }) => {
        if (!cancelled) setProduct(normalizeProduct(data?.data?.product));
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <div className="py-20 text-center">Loading product...</div>;
  }

  if (notFound || !product) {
    return <div className="py-20 text-center">Product not found</div>;
  }

  return (
    <>
      <section className="py-20 mt-20 px-6">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>
      </section>

      <ProductHighlights product={product} />
      <ProductIngredients product={product} />
      <ProductReviews product={product} />
      <RelatedProducts currentProduct={product} />
    </>
  );
};

export default ProductDetailsPage;
