import { useEffect, useMemo, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import ProductCard from "../../products/components/ProductCard";
import { getPublicProducts } from "../../../shared/services/product.service";
import { normalizeProducts } from "../../products/utils/normalizeProduct";

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

  /* =========================================================
     TABS
  ========================================================= */

  const tabs = useMemo(
    () => [
      "All",
      ...new Set(
        productsData.map((product) => product.ProductCategory).filter(Boolean),
      ),
    ],
    [productsData],
  );

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredProducts = useMemo(() => {
    if (activeTab === "All") {
      return productsData;
    }

    return productsData.filter(
      (product) => product.ProductCategory === activeTab,
    );
  }, [activeTab, productsData]);

  return (
    <section className="overflow-hidden bg-[#F5EFE5]">
      <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 md:pb-16 lg:px-12 xl:px-16">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div className="mb-16 grid gap-10 lg:grid-cols-[1fr_0.4fr] lg:items-end">
          <div>
            <div className="mb-7 flex items-center gap-4">
              <span className="font-ibm-mono text-[10px] font-medium uppercase tracking-[0.3em] text-[#A85F43]">
                02
              </span>

              <span className="h-px w-14 bg-[#A85F43]" />

              <span className="font-ibm-mono text-[10px] font-medium uppercase tracking-[0.3em] text-[#81776D]">
                Featured Collection
              </span>
            </div>

            <h2 className="max-w-5xl font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.075em] text-[#211B17]">
              Nature's
              <br />
              <span className="font-normal text-[#A85F43]">finest forms.</span>
            </h2>
          </div>

          <div className="lg:mb-2">
            <p className="max-w-sm font-manrope text-sm leading-7 text-[#71685F] md:text-base">
              A considered selection of botanical ingredients chosen for
              everyday beauty, nourishment and wellbeing.
            </p>
          </div>
        </div>

        {/* =====================================================
            FILTER NAVIGATION
        ====================================================== */}

        <div className="mb-14 flex items-center justify-between border-y border-[#D5CBBE]">
          <div className="flex min-w-0 overflow-x-auto scrollbar-hide">
            {tabs.map((tab, index) => {
              const active = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative flex shrink-0 items-center gap-3 px-5 py-5 transition-all duration-300 first:pl-0 ${
                    active
                      ? "text-[#211B17]"
                      : "text-[#958B80] hover:text-[#211B17]"
                  }`}
                >
                  <span className="font-ibm-mono text-[8px] tracking-[0.15em] text-[#A85F43]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="font-manrope text-sm font-medium">
                    {tab}
                  </span>

                  {active && (
                    <motion.span
                      layoutId="product-category-line"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A85F43]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <span className="hidden shrink-0 font-ibm-mono text-[9px] uppercase tracking-[0.18em] text-[#9A9085] md:block">
            {filteredProducts.length} Products
          </span>
        </div>

        {/* =====================================================
            PRODUCTS
        ====================================================== */}

        {loading ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item}>
                <div className="aspect-[0.88] animate-pulse bg-[#E5DCCF]" />

                <div className="mt-5 space-y-3">
                  <div className="h-5 w-2/3 animate-pulse bg-[#E1D7C9]" />
                  <div className="h-4 w-1/2 animate-pulse bg-[#E1D7C9]" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex min-h-[350px] items-center justify-center">
            <div className="text-center">
              <p className="font-manrope text-lg text-[#514940]">
                No products found.
              </p>

              <button
                type="button"
                onClick={() => setActiveTab("All")}
                className="mt-4 font-ibm-mono text-[9px] uppercase tracking-[0.2em] text-[#A85F43]"
              >
                View all products
              </button>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 xl:grid-cols-3"
            >
              {filteredProducts.slice(0, 6).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  // className={index === 0 ? "sm:col-span-2 xl:col-span-1" : ""}
                >
                  <ProductCard
                    product={product}
                    variants={undefined}
                    featured={index === 0}
                    showActions={false}
                    className="h-full"
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}

        <div className="mt-24 flex flex-col gap-6 border-t border-[#D5CBBE] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-ibm-mono text-[9px] uppercase tracking-[0.2em] text-[#968C81]">
              Crafted by nature
            </p>

            <p className="mt-2 font-manrope text-sm text-[#756B62]">
              Explore the complete 7ALP collection.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="group flex w-fit items-center gap-4 font-manrope text-sm font-medium text-[#211B17]"
          >
            View all products
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B9AEA1] transition-all duration-300 group-hover:border-[#211B17] group-hover:bg-[#211B17] group-hover:text-[#F5EFE5]">
              <GoArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurFeaturedProducts;
