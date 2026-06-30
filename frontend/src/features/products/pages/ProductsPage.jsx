import AnimatedPage from "../../../shared/components/ui/AnimatedPage";
import Banner from "../../home/sections/Banner";
import Testimonials from "../sections/Testimonials";
import Features from "../sections/Features";
import Products from "../sections/Products";
import CategorySection from "../sections/CategorySection";
import ProductHeroSection from "../sections/ProductHeroSection";

const ProductsPage = () => {
  return (
    <AnimatedPage>
      <ProductHeroSection />
      <CategorySection />
      <Products />
      <Banner />
      <Features />
      <Testimonials />
    </AnimatedPage>
  );
};

export default ProductsPage;
