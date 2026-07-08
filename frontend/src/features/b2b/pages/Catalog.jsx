import { useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiChevronDown, FiDownload, FiPlus, FiPackage } from "react-icons/fi";

const CATEGORIES = ["All", "Hair Care", "Skin Care", "Health & Wellness"];

const PRODUCTS = [
  {
    id: 1,
    name: "Beetroot Powder",
    category: "Health & Wellness",
    image:
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=300&h=300&fit=crop",
    unit: "100g pack",
    tiers: [
      { moq: 50, price: 220 },
      { moq: 200, price: 195 },
      { moq: 500, price: 175 },
    ],
    inStock: true,
  },
  {
    id: 2,
    name: "Ginger Powder",
    category: "Health & Wellness",
    image:
      "https://images.unsplash.com/photo-1615485500833-72c2e4d1d5b6?w=300&h=300&fit=crop",
    unit: "100g pack",
    tiers: [
      { moq: 50, price: 180 },
      { moq: 200, price: 160 },
      { moq: 500, price: 145 },
    ],
    inStock: true,
  },
  {
    id: 3,
    name: "Sandalwood Face Pack",
    category: "Skin Care",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
    unit: "250g jar",
    tiers: [
      { moq: 30, price: 340 },
      { moq: 100, price: 310 },
      { moq: 300, price: 280 },
    ],
    inStock: true,
  },
  {
    id: 4,
    name: "Brahmi Powder",
    category: "Hair Care",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=300&h=300&fit=crop",
    unit: "100g pack",
    tiers: [
      { moq: 50, price: 260 },
      { moq: 200, price: 235 },
      { moq: 500, price: 210 },
    ],
    inStock: false,
  },
  {
    id: 5,
    name: "Amla Powder",
    category: "Hair Care",
    image:
      "https://images.unsplash.com/photo-1615485291234-5e00c9e9c8f4?w=300&h=300&fit=crop",
    unit: "100g pack",
    tiers: [
      { moq: 50, price: 190 },
      { moq: 200, price: 170 },
      { moq: 500, price: 150 },
    ],
    inStock: true,
  },
  {
    id: 6,
    name: "Multani Mitti",
    category: "Skin Care",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop",
    unit: "250g pack",
    tiers: [
      { moq: 30, price: 210 },
      { moq: 100, price: 190 },
      { moq: 300, price: 170 },
    ],
    inStock: true,
  },
];

const Catalog = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [categoryOpen, setCategoryOpen] = useState(false);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#202020] sm:text-2xl">
            Catalog
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Browse wholesale pricing tiers and add products straight to a bulk
            order.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50">
          <FiDownload size={16} />
          Download catalog
        </button>
      </div>

      {/* Search + category filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <CiSearch
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products"
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-[#202020] outline-none transition focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
          />
        </div>

        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => setCategoryOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 sm:w-auto sm:justify-start"
          >
            {category === "All" ? "Category" : category}
            <FiChevronDown size={16} />
          </button>

          {categoryOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
              {CATEGORIES.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setCategory(opt);
                    setCategoryOpen(false);
                  }}
                  className={`flex w-full items-center px-4 py-2 text-left text-sm transition hover:bg-gray-50 ${
                    category === opt
                      ? "font-medium text-[#047B22]"
                      : "text-gray-600"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:border-gray-200 hover:shadow-sm"
          >
            <div className="relative h-40 w-full overflow-hidden bg-gray-100">
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover"
              />
              {!p.inStock && (
                <span className="absolute left-3 top-3 rounded-full bg-gray-900/80 px-2.5 py-1 text-xs font-medium text-white">
                  Out of stock
                </span>
              )}
            </div>

            <div className="p-4">
              <p className="text-xs text-gray-400">{p.category}</p>
              <h3 className="mt-0.5 font-medium text-[#202020]">{p.name}</h3>
              <p className="mt-0.5 text-xs text-gray-500">{p.unit}</p>

              <div className="mt-3 space-y-1.5 border-t border-gray-50 pt-3">
                {p.tiers.map((tier, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <FiPackage size={13} />
                      {tier.moq}+ units
                    </span>
                    <span className="font-medium text-[#202020]">
                      ₹{tier.price}/unit
                    </span>
                  </div>
                ))}
              </div>

              <button
                disabled={!p.inStock}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#047B22] py-2 text-sm font-medium text-white transition hover:bg-[#03641c] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
              >
                <FiPlus size={16} />
                Add to bulk order
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-14 text-center text-gray-400">
            No products match this search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
