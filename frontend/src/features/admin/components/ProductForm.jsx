import { forwardRef, useState } from "react";
import ProductImageUploader from "./ProductImageUploader";
import ProductTagInput from "./ProductTagInput";
import ProductVariantInput from "./ProductVariantInput";

const validateFormData = ({ formData, images, existingImages, variants }) => {
  const errors = {};

  if (!formData.name || !formData.name.trim()) {
    errors.name = "Product name is required";
  } else if (formData.name.trim().length < 3) {
    errors.name = "Product name must be at least 3 characters";
  }

  if (!formData.category || !formData.category.trim()) {
    errors.category = "Please select a category";
  }

  if (!formData.shortDescription || !formData.shortDescription.trim()) {
    errors.shortDescription = "Short description is required";
  } else if (formData.shortDescription.trim().length > 150) {
    errors.shortDescription = "Keep short description under 150 characters";
  }

  if (!formData.description || !formData.description.trim()) {
    errors.description = "Full description is required";
  } else if (formData.description.trim().length < 20) {
    errors.description = "Description should be at least 20 characters";
  }

  const totalImages = (images?.length || 0) + (existingImages?.length || 0);
  if (totalImages === 0) {
    errors.images = "Add at least one product image";
  }

  if (!variants || variants.length === 0) {
    errors.variants = "Add at least one product variant";
  } else {
    const invalidVariant = variants.some((variant) => {
      const price = Number(variant.price);
      const stock = Number(variant.stock);
      return (
        !variant.label ||
        !String(variant.label).trim() ||
        Number.isNaN(price) ||
        price <= 0 ||
        (variant.stock !== undefined && (Number.isNaN(stock) || stock < 0))
      );
    });
    if (invalidVariant) {
      errors.variants =
        "Each variant needs a label and a valid price (and non-negative stock)";
    }
  }

  return errors;
};

const ProductForm = forwardRef(
  (
    {
      editingProductId,
      formData,
      categoryOptions,
      images,
      existingImages,
      onFormChange,
      onFilesAdded,
      onRemoveImage,
      variants,
      onVariantsChange,
      lists,
      onAddListItem,
      onRemoveListItem,
      onCancelEdit,
      onSubmit,
      submitting,
      error,
      getImageUrl,
    },
    ref,
  ) => {
    const [fieldErrors, setFieldErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleBlur = ({ target: { name } }) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const errors = validateFormData({
        formData,
        images,
        existingImages,
        variants,
      });
      setFieldErrors((prev) => ({ ...prev, [name]: errors[name] || "" }));
    };

    const handleChange = (e) => {
      onFormChange(e);
      const { name } = e.target;
      if (touched[name]) {
        setFieldErrors((prev) => ({ ...prev, [name]: "" }));
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      const errors = validateFormData({
        formData,
        images,
        existingImages,
        variants,
      });

      setFieldErrors(errors);
      setTouched({
        name: true,
        category: true,
        shortDescription: true,
        description: true,
        images: true,
        variants: true,
      });

      if (Object.keys(errors).length > 0) {
        return;
      }

      onSubmit(e);
    };

    const fieldClass = (field) =>
      `w-full rounded-lg border px-3 py-2 text-sm outline-none ${
        fieldErrors[field]
          ? "border-red-400 focus:border-red-400"
          : "border-gray-300 focus:border-[#0F6B3E]"
      }`;

    return (
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

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <ProductImageUploader
                images={images}
                onFilesAdded={onFilesAdded}
                onRemoveImage={onRemoveImage}
                existingImages={existingImages}
                editingProductId={editingProductId}
                getImageUrl={getImageUrl}
              />
              {fieldErrors.images ? (
                <p className="mt-1 text-xs text-red-600">
                  {fieldErrors.images}
                </p>
              ) : null}
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="e.g. Sun-Dried Organic Sandalwood Powder"
                  className={fieldClass("name")}
                />
                {fieldErrors.name ? (
                  <p className="mt-1 text-xs text-red-600">
                    {fieldErrors.name}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={fieldClass("category")}
                  >
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.category ? (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldErrors.category}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Sub Category
                  </label>
                  <input
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#0F6B3E]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Short Description
                </label>
                <textarea
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="2"
                  placeholder="One-liner shown on product cards..."
                  className={fieldClass("shortDescription")}
                />
                {fieldErrors.shortDescription ? (
                  <p className="mt-1 text-xs text-red-600">
                    {fieldErrors.shortDescription}
                  </p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Full Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="4"
                  placeholder="Tell customers what makes this product great..."
                  className={fieldClass("description")}
                />
                {fieldErrors.description ? (
                  <p className="mt-1 text-xs text-red-600">
                    {fieldErrors.description}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <ProductVariantInput
              variants={variants}
              onChange={onVariantsChange}
            />
            {fieldErrors.variants ? (
              <p className="mt-1 text-xs text-red-600">
                {fieldErrors.variants}
              </p>
            ) : null}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Taglines
              </label>
              <ProductTagInput
                tags={lists.taglines}
                onAddTag={(value) => onAddListItem("taglines", value)}
                onRemoveTag={(value) => onRemoveListItem("taglines", value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Tags
              </label>
              <ProductTagInput
                tags={lists.tags}
                onAddTag={(value) => onAddListItem("tags", value)}
                onRemoveTag={(value) => onRemoveListItem("tags", value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Key Highlights
              </label>
              <ProductTagInput
                tags={lists.keyHighlights}
                onAddTag={(value) => onAddListItem("keyHighlights", value)}
                onRemoveTag={(value) =>
                  onRemoveListItem("keyHighlights", value)
                }
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Ingredients
              </label>
              <ProductTagInput
                tags={lists.ingredients}
                onAddTag={(value) => onAddListItem("ingredients", value)}
                onRemoveTag={(value) => onRemoveListItem("ingredients", value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Usage Suggestions
              </label>
              <ProductTagInput
                tags={lists.usageSuggestions}
                onAddTag={(value) => onAddListItem("usageSuggestions", value)}
                onRemoveTag={(value) =>
                  onRemoveListItem("usageSuggestions", value)
                }
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Storage Instructions
              </label>
              <textarea
                name="storageInstructions"
                value={formData.storageInstructions}
                onChange={handleChange}
                rows="4"
                placeholder="Store in a cool and dry place..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#0F6B3E]"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-6 pt-1">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
              />
              Active
            </label>
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
    );
  },
);

export default ProductForm;
