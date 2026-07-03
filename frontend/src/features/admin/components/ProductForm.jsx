import { forwardRef } from "react";
import ProductImageUploader from "./ProductImageUploader";
import ProductTagInput from "./ProductTagInput";

const ProductForm = forwardRef(
  (
    {
      editingProductId,
      formData,
      categoryOptions,
      images,
      existingCoverImage,
      onFormChange,
      onFilesAdded,
      onRemoveImage,
      tags,
      onAddTag,
      onRemoveTag,
      onCancelEdit,
      onSubmit,
      submitting,
      error,
      getImageUrl,
    },
    ref,
  ) => (
    <div
      ref={ref}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          {editingProductId ? "Edit Product" : "Add Product"}
        </h3>
        {editingProductId ? (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Cancel edit
          </button>
        ) : null}
      </div>

      <form onSubmit={onSubmit}>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <ProductImageUploader
              images={images}
              onFilesAdded={onFilesAdded}
              onRemoveImage={onRemoveImage}
              existingCoverImage={existingCoverImage}
              editingProductId={editingProductId}
              getImageUrl={getImageUrl}
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={onFormChange}
                required
                placeholder="e.g. Navy Blue Sneakers Shoe"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#0F6B3E]"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={onFormChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#0F6B3E]"
                >
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Sub Category
                </label>
                <input
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={onFormChange}
                  placeholder="Optional"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#0F6B3E]"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  name="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={onFormChange}
                  required
                  placeholder="₹0"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#0F6B3E]"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  MRP
                </label>
                <input
                  name="mrp"
                  type="number"
                  min="0"
                  value={formData.mrp}
                  onChange={onFormChange}
                  placeholder="Optional"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#0F6B3E]"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={onFormChange}
                rows="4"
                placeholder="Tell customers what makes this product great..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#0F6B3E]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Tags
              </label>
              <ProductTagInput
                tags={tags}
                onAddTag={onAddTag}
                onRemoveTag={onRemoveTag}
              />
            </div>

            <div className="flex items-center gap-6 pt-1">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={onFormChange}
                />
                Active
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={onFormChange}
                />
                In stock
              </label>
            </div>
          </div>
        </div>

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        <div className="mt-6 flex justify-end gap-3">
          {editingProductId ? (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          ) : null}
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-[#0F6B3E] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#0b4f2f] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting
              ? editingProductId
                ? "Saving..."
                : "Publishing..."
              : editingProductId
                ? "Save Changes"
                : "Publish Product"}
          </button>
        </div>
      </form>
    </div>
  ),
);

export default ProductForm;
