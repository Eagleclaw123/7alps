import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CgMenuRight } from "react-icons/cg";

import { getPublicProducts } from "../../../shared/services/product.service";
import { normalizeProducts } from "../utils/normalizeProduct";
import ProductFilter from "../components/ProductFilter";
import ProductPagination from "../components/ProductPagination";
import ProductCard from "../components/ProductCard";

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

const Products = () => {
  const productsPerPage = 9;
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [ratingSort, setRatingSort] = useState("none");

  useEffect(() => {
    let cancelled = false;

    getPublicProducts()
      .then(({ data }) => {
        if (cancelled) return;
        const products = normalizeProducts(data?.data?.products);
        setProductsData(products);
        setMaxPrice(Math.max(...products.map((p) => p.ProductPrice || 0), 0));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const categories = [
    "All",
    ...new Set(productsData.map((product) => product.ProductCategory)),
  ];

  const priceRangeMax = Math.max(
    100,
    ...productsData.map((product) => Number(product.ProductPrice) || 0),
  );

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
        return parseFloat(a.ProductRating) - parseFloat(b.ProductRating);
      }
      if (ratingSort === "desc") {
        return parseFloat(b.ProductRating) - parseFloat(a.ProductRating);
      }
      return 0;
    });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / productsPerPage),
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, maxPrice, ratingSort]);

  const toggleCategory = (category) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
      return;
    }

    setSelectedCategories((prevCategories) => {
      const nextCategories = prevCategories.includes("All")
        ? [category]
        : prevCategories.includes(category)
          ? prevCategories.filter((item) => item !== category)
          : [...prevCategories, category];

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

  const priceResetValue = priceRangeMax;

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    (currentPage - 1) * productsPerPage + productsPerPage,
  );

  const onClose = () => {
    setShowFilters(!showFilters);
  };

  const handleAddToCart = (product) => {
    const defaultVariant =
      product.variants?.find((v) => v.isDefault) || product.variants?.[0];
    if (!defaultVariant) return;

    dispatch(
      addToCart({
        productId: product.id,
        variantLabel: defaultVariant.label,
        quantity: 1,
      }),
    );
  };

  return (
    <section className="py-10 px-6 xl:px-0">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => onClose()}
          className="mb-6 bg-[#E4E4E4] py-2 px-6 rounded hover:bg-[#d0d0d0] transition-colors cursor-pointer font-medium"
        >
          Filters
          <CgMenuRight className="inline ml-2" />
        </button>
        <div className="flex flex-col xl:flex-row gap-8 ">
          {showFilters && (
            <aside className="w-full xl:w-72 shrink-0">
              <ProductFilter
                onClose={onClose}
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
                onResetFilters={() => {
                  setSearchTerm("");
                  setSelectedCategories(["All"]);
                  setMaxPrice(priceResetValue);
                  setRatingSort("none");
                }}
              />
            </aside>
          )}
          <motion.div
            className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {loading ? (
              <div className="col-span-full py-24 text-center text-gray-500">
                Loading products...
              </div>
            ) : currentProducts.length === 0 ? (
              <div className="col-span-full py-24 text-center text-gray-500">
                No products match your filters.
              </div>
            ) : (
              currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variants={cardVariants}
                />
              ))
            )}
          </motion.div>
        </div>

        <ProductPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default Products;
