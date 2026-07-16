import { useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import {
  FiChevronDown,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiPackage,
  FiX,
} from "react-icons/fi";
import {
  getCategories,
  createCategory,
  updateCategory,
  toggleCategoryStatus,
  deleteCategory,
} from "../../../shared/services/category.service";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop";

const emptyForm = { name: "", description: "", image: "", active: true };

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadCategories = () => {
    setLoading(true);
    getCategories()
      .then(({ data }) => setCategories(data?.data?.categories || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const filtered = useMemo(() => {
    return categories.filter((cat) => {
      const matchesSearch = cat.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" && cat.active) ||
        (statusFilter === "Inactive" && !cat.active);
      return matchesSearch && matchesStatus;
    });
  }, [categories, search, statusFilter]);

  const activeCount = categories.filter((c) => c.active).length;

  const handleToggleActive = async (id) => {
    await toggleCategoryStatus(id);
    loadCategories();
  };

  const openAddForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setError("");
    setFormOpen(true);
  };

  const openEditForm = (cat) => {
    setFormData({
      name: cat.name,
      description: cat.description || "",
      image: cat.image || "",
      active: cat.active,
    });
    setEditingId(cat._id);
    setError("");
    setFormOpen(true);
  };

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Category name is required.");
      return;
    }

    try {
      setSubmitting(true);
      if (editingId) {
        await updateCategory(editingId, formData);
      } else {
        await createCategory(formData);
      }
      setFormOpen(false);
      loadCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save category.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (cat) => {
    try {
      await deleteCategory(cat._id);
      loadCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to delete category.");
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
      {/* Header */}
      <div className="mb-1 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#202020] sm:text-2xl">Categories</h1>
          <p className="mt-1 text-sm text-gray-500">
            Organize your catalog so customers can find what they need faster.
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#047B22] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#03641c]"
        >
          <FiPlus size={16} />
          Add category
        </button>
      </div>

      {/* Stat strip */}
      <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <span className="font-semibold text-[#202020]">{categories.length} categories</span>
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
                    statusFilter === opt ? "font-medium text-[#047B22]" : "text-gray-600"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit form */}
      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="mt-5 grid gap-4 rounded-xl border border-gray-100 p-4 sm:grid-cols-2"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Bath & Body"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500">Image URL (optional)</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-medium text-gray-500">Description (optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={2}
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#047B22] focus:ring-2 focus:ring-[#047B22]/10"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-[#202020]">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="accent-[#047B22]"
            />
            Active
          </label>

          {error && <p className="text-sm text-red-600 sm:col-span-2">{error}</p>}

          <div className="flex justify-end gap-3 sm:col-span-2">
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              <FiX size={14} />
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-[#047B22] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#03641c] disabled:opacity-60"
            >
              {submitting ? "Saving..." : editingId ? "Save changes" : "Create category"}
            </button>
          </div>
        </form>
      )}

      {/* Category grid */}
      {loading ? (
        <p className="py-10 text-center text-gray-500">Loading categories...</p>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cat) => (
            <div
              key={cat._id}
              className="group relative overflow-hidden rounded-xl border border-gray-100 transition hover:border-gray-200 hover:shadow-sm"
            >
              <div className="relative h-32 w-full overflow-hidden bg-gray-100">
                <img
                  src={cat.image || FALLBACK_IMAGE}
                  alt={cat.name}
                  className="h-full w-full object-cover"
                />
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${
                    cat.active ? "bg-[#EAF3DE] text-[#3B6D11]" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {cat.active ? "Active" : "Inactive"}
                </span>
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
                  onClick={() => handleToggleActive(cat._id)}
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
                <button
                  onClick={() => openEditForm(cat)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
                >
                  <FiEdit2 size={13} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50"
                >
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
      )}
    </div>
  );
};

export default Categories;
