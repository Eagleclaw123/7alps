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
    <aside className="h-full bg-[#F7F2EB] text-[#211B17]">
      <div className="p-6 md:p-8">
        {/* ================================================
            HEADER
        ================================================= */}
        <div className="flex items-start justify-between border-b border-[#D8CDC2] pb-7">
          <div>
            <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
              Filter collection
            </span>

            <h3 className="mt-3 font-manrope text-3xl font-medium tracking-[-0.05em]">
              Our Collection
            </h3>

            <p className="mt-2 max-w-xs font-manrope text-sm leading-6 text-[#81756D]">
              Sourced by science, grown by nature.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              border
              border-[#D8CDC2]
              text-[#211B17]
              transition-all
              duration-300
              hover:border-[#C56B4E]
              hover:bg-[#C56B4E]
              hover:text-white
            "
          >
            <IoClose size={18} />
          </button>
        </div>

        <div className="mt-8 space-y-9">
          {/* ================================================
              SEARCH
          ================================================= */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.25em] text-[#8A7D74]">
                Search
              </span>
            </div>

            <div
              className="
                group
                relative
                border-b
                border-[#CFC2B7]
                transition-colors
                duration-300
                focus-within:border-[#C56B4E]
              "
            >
              <IoSearchOutline
                size={18}
                className="
                  absolute
                  left-0
                  top-1/2
                  -translate-y-1/2
                  text-[#8A7D74]
                  transition-colors
                  duration-300
                  group-focus-within:text-[#C56B4E]
                "
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products..."
                className="
                  w-full
                  bg-transparent
                  py-3
                  pl-8
                  pr-2
                  font-manrope
                  text-sm
                  text-[#211B17]
                  outline-none
                  placeholder:text-[#A69A92]
                "
              />
            </div>
          </div>

          {/* ================================================
              CATEGORIES
          ================================================= */}
          <div>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <span className="font-ibm-mono text-[9px] uppercase tracking-[0.25em] text-[#8A7D74]">
                  01
                </span>

                <h4 className="mt-1 font-manrope text-lg font-medium">
                  Categories
                </h4>
              </div>

              <button
                type="button"
                onClick={() => onToggleCategory("All")}
                className="
                  font-ibm-mono
                  text-[9px]
                  uppercase
                  tracking-[0.18em]
                  text-[#C56B4E]
                  transition-colors
                  hover:text-[#211B17]
                "
              >
                All
              </button>
            </div>

            <div className="space-y-1">
              {categories.map((item) => {
                const checked = selectedCategories.includes("All")
                  ? item === "All"
                  : selectedCategories.includes(item);

                return (
                  <label
                    key={item}
                    className="
                      group
                      flex
                      cursor-pointer
                      items-center
                      justify-between
                      border-b
                      border-[#D8CDC2]/60
                      py-3
                    "
                  >
                    <span
                      className={`
                        font-manrope
                        text-sm
                        transition-colors
                        duration-300
                        ${
                          checked
                            ? "font-medium text-[#211B17]"
                            : "text-[#756960] group-hover:text-[#211B17]"
                        }
                      `}
                    >
                      {item}
                    </span>

                    <span
                      className={`
                        flex
                        h-5
                        w-5
                        items-center
                        justify-center
                        border
                        transition-all
                        duration-300
                        ${
                          checked
                            ? "border-[#C56B4E] bg-[#C56B4E]"
                            : "border-[#CFC2B7] bg-transparent group-hover:border-[#C56B4E]"
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleCategory(item)}
                        className="sr-only"
                      />

                      {checked && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* ================================================
              PRICE
          ================================================= */}
          <div>
            <div className="mb-5 flex items-end justify-between">
              <div>
                <span className="font-ibm-mono text-[9px] uppercase tracking-[0.25em] text-[#8A7D74]">
                  02
                </span>

                <h4 className="mt-1 font-manrope text-lg font-medium">Price</h4>
              </div>

              <button
                type="button"
                onClick={() => onPriceChange(priceRangeMax)}
                className="
                  font-ibm-mono
                  text-[9px]
                  uppercase
                  tracking-[0.18em]
                  text-[#C56B4E]
                  transition-colors
                  hover:text-[#211B17]
                "
              >
                Reset
              </button>
            </div>

            <div className="px-1">
              <input
                type="range"
                min="100"
                max={priceRangeMax}
                value={maxPrice}
                onChange={(e) => onPriceChange(e.target.value)}
                className="
                  h-[2px]
                  w-full
                  cursor-pointer
                  appearance-none
                  bg-[#CFC2B7]
                  accent-[#C56B4E]
                "
              />

              <div className="mt-4 flex items-center justify-between">
                <span className="font-manrope text-xs text-[#8A7D74]">
                  ₹100
                </span>

                <span className="font-manrope text-sm font-medium text-[#211B17]">
                  ₹{Number(maxPrice).toLocaleString()}+
                </span>
              </div>
            </div>
          </div>

          {/* ================================================
              RATING
          ================================================= */}
          <div>
            <div className="mb-5">
              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.25em] text-[#8A7D74]">
                03
              </span>

              <h4 className="mt-1 font-manrope text-lg font-medium">
                Sort by rating
              </h4>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onRatingSortChange("desc")}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  border
                  px-4
                  py-3.5
                  font-manrope
                  text-sm
                  transition-all
                  duration-300
                  ${
                    ratingSort === "desc"
                      ? "border-[#211B17] bg-[#211B17] text-[#F7F2EB]"
                      : "border-[#D8CDC2] text-[#756960] hover:border-[#211B17] hover:text-[#211B17]"
                  }
                `}
              >
                <span>Highest to Lowest</span>

                <HiOutlineArrowsUpDown
                  size={16}
                  className={
                    ratingSort === "desc" ? "text-[#C56B4E]" : "text-[#9A8D84]"
                  }
                />
              </button>

              <button
                type="button"
                onClick={() => onRatingSortChange("asc")}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  border
                  px-4
                  py-3.5
                  font-manrope
                  text-sm
                  transition-all
                  duration-300
                  ${
                    ratingSort === "asc"
                      ? "border-[#211B17] bg-[#211B17] text-[#F7F2EB]"
                      : "border-[#D8CDC2] text-[#756960] hover:border-[#211B17] hover:text-[#211B17]"
                  }
                `}
              >
                <span>Lowest to Highest</span>

                <HiOutlineArrowsUpDown
                  size={16}
                  className={
                    ratingSort === "asc" ? "text-[#C56B4E]" : "text-[#9A8D84]"
                  }
                />
              </button>
            </div>
          </div>
        </div>

        {/* ================================================
            RESET ALL
        ================================================= */}
        <div className="mt-10 border-t border-[#D8CDC2] pt-6">
          <button
            type="button"
            onClick={onResetFilters}
            className="
              group
              flex
              w-full
              items-center
              justify-between
              border
              border-[#211B17]
              px-5
              py-3.5
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
            <span>Reset all filters</span>

            <span
              className="
                text-[#C56B4E]
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ProductFilter;
