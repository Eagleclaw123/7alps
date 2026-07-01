import { useParams } from "react-router-dom";
import productsData from "../data/productsData.json";

import ProductGallery from "../sections/ProductGallery";
import ProductInfo from "../sections/ProductInfo";
import ProductBenefits from "../sections/ProductBenefits";
import ProductIngredients from "../sections/ProductIngredients";
import ProductReviews from "../sections/ProductReviews";
import RelatedProducts from "../sections/RelatedProducts";
import AnimatedPage from "../../../shared/components/ui/AnimatedPage";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const product = productsData.find((item) => item.id === Number(id));

  if (!product) {
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

      <ProductBenefits product={product} />
      <ProductIngredients product={product} />
      <ProductReviews product={product} />
      <RelatedProducts currentProduct={product} />
    </>
  );
};

export default ProductDetailsPage;
