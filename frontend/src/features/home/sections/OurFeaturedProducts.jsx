import { useEffect, useMemo, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";

import ProductCard from "../../products/components/ProductCard";
import { getPublicProducts } from "../../../shared/services/product.service";
import { normalizeProducts } from "../../products/utils/normalizeProduct";
import SectionHeading from "../components/SectionHeading";
import { useNavigate } from "react-router-dom";

const tabs = ["All", "Hair Care", "Skin Care", "Health & Wellness"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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

const OurFeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const { data } = await getPublicProducts();

        if (!cancelled) {
          setProductsData(normalizeProducts(data?.data?.products));
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return activeTab === "All"
      ? productsData
      : productsData.filter((product) => product.ProductCategory === activeTab);
  }, [activeTab, productsData]);

  return (
    <section className="px-6 xl:px-0 mt-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeading
            eyebrow="Our Collection"
            title={
              <>
                Discover Our Best-Selling{" "}
                <span className="font-manrope text-[#008521] font-normal">
                  Herbal Products
                </span>
              </>
            }
            description="Explore our carefully selected herbal products, crafted with natural ingredients to support your daily health, beauty, and wellness journey."
          />
        </motion.div>

        <div className="mb-8 flex flex-col gap-5 md:flex-row lg:items-center md:justify-between mt-10">
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg border px-4 py-2 text-sm lg:text-base sm:px-6 transition-all ${
                  activeTab === tab
                    ? "border-[#008521] bg-[#008521] text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-[#008521]"
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          <button className="w-full rounded-lg bg-[#A39200] px-4 py-2 text-white sm:w-auto lg:shrink-0">
            Enquiry for B2B Purpose
          </button>
        </div>

        {loading ? (
          <p className="py-10 text-center text-gray-500">Loading products...</p>
        ) : (
          <motion.div
            key={activeTab}
            className="products-grid grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.slice(0, 6).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variants={cardVariants}
                showActions={false}
                className="h-full"
              />
            ))}
          </motion.div>
        )}

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <button
            className="px-6 py-2 rounded-lg border mt-10"
            onClick={() => navigate("/products")}
          >
            View all catalog
            <GoArrowRight className="inline ml-1.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default OurFeaturedProducts;
