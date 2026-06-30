import { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";

import ProductCard from "../../products/components/ProductCard";
import productsData from "../../products/data/productsData.json";

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

  const filteredProducts =
    activeTab === "All"
      ? productsData
      : productsData.filter((product) => product.ProductCategory === activeTab);

  return (
    <section className="our-featured-products mt-5 px-6 xl:px-0">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          className="space-y-4 py-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title text-[24px] text-[36px] xl:text-[44px]">
            Our Featured Products
          </h2>
          <p className="text-[16px] md:text-[20px] xl:text-[22px]">
            Our Journey from Farm to Wellness
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded border transition-all ${
                activeTab === tab
                  ? "bg-[#008521] text-white border-[#008521]"
                  : "bg-white text-gray-700 border-gray-300 hover:border-[#008521]"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeTab}
          className="products-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
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

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {" "}
          <button className="px-6 py-2 rounded border my-2">
            View All
            <GoArrowRight className="inline ml-1.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default OurFeaturedProducts;
