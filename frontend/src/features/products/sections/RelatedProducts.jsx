import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicProducts } from "../../../shared/services/product.service";
import { normalizeProducts } from "../utils/normalizeProduct";
import ProductCard from "../components/ProductCard";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const RelatedProducts = ({ currentProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    let cancelled = false;

    getPublicProducts({ category: currentProduct.ProductCategory }).then(
      ({ data }) => {
        if (cancelled) return;
        const products = normalizeProducts(data?.data?.products).filter(
          (item) => item.id !== currentProduct.id,
        );
        setRelatedProducts(products.slice(0, 4));
      },
    );

    return () => {
      cancelled = true;
    };
  }, [currentProduct.ProductCategory, currentProduct.id]);

  if (!relatedProducts.length) return null;

  return (
    <section className="pb-16 px-6 xl:px-0">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-10 text-4xl font-semibold">Related Products</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {relatedProducts.slice(0, 3).map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <ProductCard
                key={product.id}
                product={product}
                variants={cardVariants}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
