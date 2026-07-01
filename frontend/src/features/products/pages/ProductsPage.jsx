import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import Banner from "../../home/sections/Banner";
import Products from "../sections/Products";
import CategorySection from "../sections/CategorySection";
import ProductHeroSection from "../sections/ProductHeroSection";
import { productsSEO, SEO } from "../../../shared/seo";

const ProductsPage = () => {
  return (
    <>
      <SEO {...productsSEO} />

      <AnimatedPage>
        <ProductHeroSection />
        <CategorySection />
        <Products />
        <Banner />
      </AnimatedPage>
    </>
  );
};

export default ProductsPage;
