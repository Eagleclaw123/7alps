import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowDown, FiSliders } from "react-icons/fi";

import { getPublicProducts } from "../../../shared/services/product.service";
import { normalizeProducts } from "../utils/normalizeProduct";
import ProductFilter from "../components/ProductFilter";
import ProductCard from "../components/ProductCard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Products = () => {
  const productsPerLoad = 15;

  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(productsPerLoad);

  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [ratingSort, setRatingSort] = useState("none");

  /* ============================================================
     FETCH PRODUCTS
  ============================================================ */

  useEffect(() => {
    let cancelled = false;

    getPublicProducts()
      .then(({ data }) => {
        if (cancelled) return;

        const products = normalizeProducts(data?.data?.products);

        setProductsData(products);

        setMaxPrice(
          Math.max(
            ...products.map((product) => Number(product.ProductPrice) || 0),
            0,
          ),
        );
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /* ============================================================
     CATEGORIES
  ============================================================ */

  const categories = [
    "All",
    ...new Set(productsData.map((product) => product.ProductCategory)),
  ];

  /* ============================================================
     PRICE RANGE
  ============================================================ */

  const priceRangeMax = Math.max(
    100,
    ...productsData.map((product) => Number(product.ProductPrice) || 0),
  );

  /* ============================================================
     FILTER + SORT
  ============================================================ */

  const filteredProducts = productsData
    .filter((product) => {
      const search = searchTerm.trim().toLowerCase();

      const matchesSearch =
        !search ||
        product.ProductName.toLowerCase().includes(search) ||
        product.ProductDescription.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategories.includes("All") ||
        selectedCategories.includes(product.ProductCategory);

      const productPrice = Number(product.ProductPrice || 0);

      const matchesPrice = productPrice <= Number(maxPrice);

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (ratingSort === "asc") {
        return a.ProductRating - b.ProductRating;
      }

      if (ratingSort === "desc") {
        return b.ProductRating - a.ProductRating;
      }

      return 0;
    });

  /* ============================================================
     RESET LOAD MORE WHEN FILTERS CHANGE
  ============================================================ */

  useEffect(() => {
    setVisibleCount(productsPerLoad);
  }, [searchTerm, selectedCategories, maxPrice, ratingSort]);

  /* ============================================================
     LOAD MORE
  ============================================================ */

  const currentProducts = filteredProducts.slice(0, visibleCount);

  const hasMoreProducts = visibleCount < filteredProducts.length;

  const loadMoreProducts = () => {
    setVisibleCount((previousCount) =>
      Math.min(previousCount + productsPerLoad, filteredProducts.length),
    );
  };

  /* ============================================================
     CATEGORY TOGGLE
  ============================================================ */

  const toggleCategory = (category) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
      return;
    }

    setSelectedCategories((previousCategories) => {
      const nextCategories = previousCategories.includes("All")
        ? [category]
        : previousCategories.includes(category)
          ? previousCategories.filter((item) => item !== category)
          : [...previousCategories, category];

      const categoryKeys = categories.filter((item) => item !== "All");

      if (!nextCategories.length) {
        return ["All"];
      }

      if (categoryKeys.every((item) => nextCategories.includes(item))) {
        return ["All"];
      }

      return nextCategories;
    });
  };

  /* ============================================================
     FILTER TOGGLE
  ============================================================ */

  const toggleFilters = () => {
    setShowFilters((previous) => !previous);
  };

  /* ============================================================
     RESET
  ============================================================ */

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategories(["All"]);
    setMaxPrice(priceRangeMax);
    setRatingSort("none");
  };

  /* ============================================================
     UI
  ============================================================ */

  return (
    <section className="bg-[#F7F2EB] px-5 py-24 text-[#211B17] sm:px-8 lg:py-32 xl:px-12">
      <div className="mx-auto max-w-[1600px]">
        {/* ======================================================
            COLLECTION INTRO
        ====================================================== */}

        <div className="mb-14 border-b border-[#D8CDC2] pb-10 lg:mb-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3">
                <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#A85F43]">
                  01
                </span>
                <span className="h-px w-10 bg-[#C56B4E]" />

                <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
                  The 7ALP collection
                </span>
              </div>

              <h2 className="font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.075em]">
                Discover
                <br />
                <span className="font-normal text-[#C56B4E]">
                  natural wellness.
                </span>
              </h2>

              <p className="mt-7 max-w-xl font-manrope text-sm leading-7 text-[#81756D] md:text-base">
                Premium herbal powders and natural ingredients, carefully
                sourced and prepared for everyday wellness.
              </p>
            </div>

            {/* Collection Count */}

            <div className="flex shrink-0 items-end gap-5 lg:pb-1">
              <div>
                <p className="font-ibm-mono text-[9px] uppercase tracking-[0.25em] text-[#91847A]">
                  Collection
                </p>

                <p className="mt-2 font-manrope text-4xl font-medium tracking-[-0.05em]">
                  {filteredProducts.length.toString().padStart(2, "0")}
                </p>
              </div>

              <div className="mb-1 h-10 w-px bg-[#D8CDC2]" />

              <p className="mb-1 max-w-[130px] font-manrope text-xs leading-5 text-[#91847A]">
                Products available
                <br />
                to explore
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================
            FILTER TOOLBAR
        ====================================================== */}

        <div className="mb-10 flex flex-col gap-5 border-b border-[#D8CDC2] pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={toggleFilters}
              className="
                group
                flex
                items-center
                gap-3
                border
                border-[#211B17]
                bg-[#211B17]
                px-5
                py-3
                font-ibm-mono
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-[#F7F2EB]
                transition-all
                duration-300
                hover:border-[#C56B4E]
                hover:bg-[#C56B4E]
              "
            >
              <FiSliders
                size={14}
                className="transition-transform duration-300 group-hover:rotate-90"
              />

              <span>{showFilters ? "Hide filters" : "Filter collection"}</span>
            </button>

            <span className="hidden h-5 w-px bg-[#D8CDC2] sm:block" />

            <span className="font-manrope text-xs text-[#81756D]">
              Showing{" "}
              <strong className="font-medium text-[#211B17]">
                {Math.min(visibleCount, filteredProducts.length)}
              </strong>{" "}
              of{" "}
              <strong className="font-medium text-[#211B17]">
                {filteredProducts.length}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C56B4E]" />

            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.22em] text-[#91847A]">
              Farm sourced · Quality assured
            </span>
          </div>
        </div>

        {/* ======================================================
            MAIN CONTENT

            IMPORTANT:
            Both FILTERS and PRODUCTS are in normal document flow.

            There is:
            - NO sticky
            - NO fixed position
            - NO overflow-y-auto
            - NO max-height
            - NO independent scrollbar

            Therefore the browser provides ONE scrollbar and
            both columns move together.
        ====================================================== */}

        <div
          className={`flex flex-col gap-10 ${
            showFilters ? "xl:flex-row xl:items-start" : ""
          }`}
        >
          {/* ====================================================
              LEFT — FILTERS
          ==================================================== */}

          {showFilters && (
            <aside className="w-full shrink-0 xl:w-[310px]">
              <ProductFilter
                onClose={toggleFilters}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                categories={categories}
                selectedCategories={selectedCategories}
                onToggleCategory={toggleCategory}
                maxPrice={maxPrice}
                priceRangeMax={priceRangeMax}
                onPriceChange={setMaxPrice}
                ratingSort={ratingSort}
                onRatingSortChange={setRatingSort}
                onResetFilters={resetFilters}
              />
            </aside>
          )}

          {/* ====================================================
              RIGHT — PRODUCT GRID
          ==================================================== */}

          <div className="min-w-0 flex-1">
            <motion.div
              key={`${searchTerm}-${selectedCategories.join(
                ",",
              )}-${maxPrice}-${ratingSort}`}
              className="
                grid
                grid-cols-1
                gap-x-6
                gap-y-12
                sm:grid-cols-2
                lg:grid-cols-3
              "
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* ==================================================
                  LOADING
              ================================================== */}

              {loading ? (
                <div className="col-span-full py-32 text-center">
                  <div className="mx-auto mb-5 h-8 w-8 animate-spin rounded-full border-2 border-[#D8CDC2] border-t-[#C56B4E]" />

                  <p className="font-ibm-mono text-[9px] uppercase tracking-[0.25em] text-[#91847A]">
                    Preparing collection
                  </p>
                </div>
              ) : currentProducts.length === 0 ? (
                /* ==================================================
                   EMPTY STATE
                ================================================== */

                <div className="col-span-full border-y border-[#D8CDC2] py-28 text-center">
                  <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
                    Nothing found
                  </span>

                  <h3 className="mt-4 font-manrope text-3xl font-medium tracking-[-0.04em]">
                    No products match your filters.
                  </h3>

                  <p className="mx-auto mt-3 max-w-md font-manrope text-sm leading-6 text-[#81756D]">
                    Try adjusting your search, category, price range, or rating
                    filters.
                  </p>

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="
                      mt-7
                      border
                      border-[#211B17]
                      px-6
                      py-3
                      font-ibm-mono
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-[#211B17]
                      transition-all
                      duration-300
                      hover:bg-[#211B17]
                      hover:text-[#F7F2EB]
                    "
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                /* ==================================================
                   PRODUCTS
                ================================================== */

                currentProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={cardVariants}
                    className="relative"
                  >
                    <ProductCard product={product} variants={cardVariants} />
                  </motion.div>
                ))
              )}
            </motion.div>

            {/* ==================================================
                LOAD MORE
            ================================================== */}

            {!loading && currentProducts.length > 0 && hasMoreProducts && (
              <div className="mt-20 flex flex-col items-center border-t border-[#D8CDC2] pt-12">
                <p className="mb-5 font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
                  {filteredProducts.length - visibleCount} more products
                </p>

                <button
                  type="button"
                  onClick={loadMoreProducts}
                  className="
                      group
                      flex
                      items-center
                      gap-5
                      border
                      border-[#211B17]
                      bg-transparent
                      px-8
                      py-4
                      font-manrope
                      text-sm
                      font-medium
                      text-[#211B17]
                      transition-all
                      duration-300
                      hover:bg-[#211B17]
                      hover:text-[#F7F2EB]
                    "
                >
                  <span>Load more products</span>

                  <span
                    className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        bg-[#C56B4E]
                        text-white
                        transition-transform
                        duration-300
                        group-hover:translate-y-1
                      "
                  >
                    <FiArrowDown size={14} />
                  </span>
                </button>
              </div>
            )}

            {/* ==================================================
                END OF COLLECTION
            ================================================== */}

            {!loading && currentProducts.length > 0 && !hasMoreProducts && (
              <div className="mt-20 flex items-center justify-center gap-4 border-t border-[#D8CDC2] pt-10">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C56B4E]" />

                <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
                  End of collection
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
