import { IoSearchOutline, IoClose } from "react-icons/io5";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import Button from "../../../shared/components/ui/Button";

const ProductFilter = ({
  onClose,
  searchTerm,
  onSearchChange,
  categories,
  selectedCategories,
  onToggleCategory,
  maxPrice,
  priceRangeMax,
  onPriceChange,
  ratingSort,
  onRatingSortChange,
  onResetFilters,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold">Filter</h3>
        <Button variant="secondary" size="sm" onClick={onClose}>
          <IoClose size={20} />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6">
        {/* Search */}
        <div className="md:col-span-2 xl:col-span-1">
          <div className="relative">
            <IoSearchOutline
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by product name or description"
              className="w-full bg-gray-100 rounded-md py-2 pl-10 pr-4 outline-none"
            />
          </div>
        </div>

        {/* Categories */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-medium">By Categories</h4>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => onToggleCategory("All")}
            >
              All
            </Button>
          </div>

          <div className="space-y-3">
            {categories.map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={
                    selectedCategories.includes("All")
                      ? item === "All"
                      : selectedCategories.includes(item)
                  }
                  onChange={() => onToggleCategory(item)}
                  className="w-5 h-5 accent-[#008521]"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-medium">By Price</h4>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => onPriceChange(priceRangeMax)}
            >
              Reset
            </Button>
          </div>

          <input
            type="range"
            min="100"
            max={priceRangeMax}
            value={maxPrice}
            onChange={(e) => onPriceChange(e.target.value)}
            className="w-full h-1 accent-[#008521]"
          />

          <p className="mt-2 text-gray-700">
            ₹100 - ₹{Number(maxPrice).toLocaleString()}+
          </p>
        </div>

        {/* Rating */}
        <div className="md:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-medium">Sort by Rating</h4>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={onResetFilters}
            >
              Reset All
            </Button>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              variant={ratingSort === "desc" ? "primary" : "secondary"}
              size="md"
              className="w-full justify-start"
              onClick={() => onRatingSortChange("desc")}
            >
              <HiOutlineArrowsUpDown />
              Highest to Lowest
            </Button>

            <Button
              type="button"
              variant={ratingSort === "asc" ? "primary" : "secondary"}
              size="md"
              className="w-full justify-start"
              onClick={() => onRatingSortChange("asc")}
            >
              <HiOutlineArrowsUpDown />
              Lowest to Highest
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
