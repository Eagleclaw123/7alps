import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import Products from "../sections/Products";
import CategorySection from "../sections/CategorySection";
import ProductHeroSection from "../sections/ProductHeroSection";
import { productsSEO, SEO } from "../../../shared/seo";
import ProductBanner from "../sections/ProductBanner";

const ProductsPage = () => {
  return (
    <>
      <SEO {...productsSEO} />

      <AnimatedPage>
        <ProductHeroSection />
        <CategorySection />
        <Products />
        <ProductBanner />
      </AnimatedPage>
    </>
  );
};

export default ProductsPage;
