import { useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  FiChevronDown,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiPackage,
} from "react-icons/fi";

const CATEGORIES = [
  {
    id: 1,
    name: "Hair Care",
    image:
      "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=200&h=200&fit=crop",
    productCount: 12,
    active: true,
  },
  {
    id: 2,
    name: "Skin Care",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop",
    productCount: 18,
    active: true,
  },
  {
    id: 3,
    name: "Health & Wellness",
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=200&h=200&fit=crop",
    productCount: 7,
    active: true,
  },
  {
    id: 4,
    name: "Bath & Body",
    image:
      "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=200&h=200&fit=crop",
    productCount: 5,
    active: false,
  },
  {
    id: 5,
    name: "Ayurveda",
    image:
      "https://images.unsplash.com/photo-1611071536463-a6b285f9a4a1?w=200&h=200&fit=crop",
    productCount: 9,
    active: true,
  },
  {
    id: 6,
    name: "Gift Sets",
    image:
      "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=200&h=200&fit=crop",
    productCount: 0,
    active: false,
  },
];

const AdminCategories = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [categories, setCategories] = useState(CATEGORIES);

  const filtered = useMemo(() => {
    return categories.filter((cat) => {
      const matchesSearch = cat.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" && cat.active) ||
        (statusFilter === "Inactive" && !cat.active);
      return matchesSearch && matchesStatus;
    });
  }, [categories, search, statusFilter]);

  const activeCount = categories.filter((c) => c.active).length;

  const toggleActive = (id) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)),
    );
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
      {/* Header */}
      <div className="mb-1 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#202020] sm:text-2xl">
            Categories
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Organize your catalog so customers can find what they need faster.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-[#047B22] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#03641c]">
          <FiPlus size={16} />
          Add category
        </button>
      </div>

      {/* Stat strip */}
      <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <span className="font-semibold text-[#202020]">
          {categories.length} categories
        </span>
        <span className="text-gray-400">
          · {activeCount} active · {categories.length - activeCount} inactive
        </span>
      </div>

      {/* Search + Filter row */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <CiSearch
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search category"
            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm text-[#202020] outline-none transition focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
          />
        </div>

        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => setFilterOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 sm:w-auto sm:justify-start"
          >
            Status
            {statusFilter !== "All" && (
              <span className="rounded-full bg-[#EAF3DE] px-2 py-0.5 text-xs font-medium text-[#3B6D11]">
                {statusFilter}
              </span>
            )}
            <FiChevronDown size={16} />
          </button>

          {filterOpen && (
            <div className="absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
              {["All", "Active", "Inactive"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setStatusFilter(opt);
                    setFilterOpen(false);
                  }}
                  className={`flex w-full items-center px-4 py-2 text-left text-sm transition hover:bg-gray-50 ${
                    statusFilter === opt
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

      {/* Category grid */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cat) => (
          <div
            key={cat.id}
            className="group relative overflow-hidden rounded-xl border border-gray-100 transition hover:border-gray-200 hover:shadow-sm"
          >
            <div className="relative h-32 w-full overflow-hidden bg-gray-100">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover"
              />
              <span
                className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${
                  cat.active
                    ? "bg-[#EAF3DE] text-[#3B6D11]"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {cat.active ? "Active" : "Inactive"}
              </span>

              <div className="absolute right-3 top-3 opacity-0 transition group-hover:opacity-100">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-gray-500 shadow-sm hover:text-gray-700">
                  <HiOutlineDotsVertical size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 p-4">
              <div>
                <h3 className="font-medium text-[#202020]">{cat.name}</h3>
                <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                  <FiPackage size={13} />
                  {cat.productCount} products
                </p>
              </div>

              <button
                onClick={() => toggleActive(cat.id)}
                aria-label={`Toggle ${cat.name} active status`}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  cat.active ? "bg-[#047B22]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                    cat.active ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center gap-2 border-t border-gray-50 px-4 py-2.5">
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50">
                <FiEdit2 size={13} />
                Edit
              </button>
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50">
                <FiTrash2 size={13} />
                Delete
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-14 text-center text-gray-400">
            No categories match this filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
