import { FiPlus, FiTrash2 } from "react-icons/fi";

const emptyVariant = () => ({
  label: "",
  price: "",
  mrp: "",
  stock: "",
  isDefault: false,
});

const ProductVariantInput = ({ variants, onChange }) => {
  const updateVariant = (index, field, value) => {
    const next = variants.map((variant, i) =>
      i === index ? { ...variant, [field]: value } : variant,
    );
    onChange(next);
  };

  const setDefault = (index) => {
    const next = variants.map((variant, i) => ({
      ...variant,
      isDefault: i === index,
    }));
    onChange(next);
  };

  const addVariant = () => {
    onChange([...variants, emptyVariant()]);
  };

  const removeVariant = (index) => {
    const next = variants.filter((_, i) => i !== index);
    if (next.length && !next.some((v) => v.isDefault)) next[0].isDefault = true;
    onChange(next);
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Variants (weight / size options)
        </label>
        <button
          type="button"
          onClick={addVariant}
          className="flex items-center gap-1 text-sm font-medium text-[#0F6B3E] hover:underline"
        >
          <FiPlus size={14} />
          Add variant
        </button>
      </div>

      <div className="space-y-3">
        {variants.map((variant, index) => (
          <div
            key={index}
            className="grid grid-cols-2 gap-2 rounded-lg border border-gray-200 p-3 sm:grid-cols-5 sm:items-center"
          >
            <input
              value={variant.label}
              onChange={(e) => updateVariant(index, "label", e.target.value)}
              placeholder="e.g. 100g"
              required
              className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm outline-none focus:border-[#0F6B3E]"
            />
            <input
              type="number"
              min="0"
              value={variant.price}
              onChange={(e) => updateVariant(index, "price", e.target.value)}
              placeholder="Price"
              required
              className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm outline-none focus:border-[#0F6B3E]"
            />
            <input
              type="number"
              min="0"
              value={variant.mrp}
              onChange={(e) => updateVariant(index, "mrp", e.target.value)}
              placeholder="MRP"
              className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm outline-none focus:border-[#0F6B3E]"
            />
            <input
              type="number"
              min="0"
              value={variant.stock}
              onChange={(e) => updateVariant(index, "stock", e.target.value)}
              placeholder="Stock"
              className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm outline-none focus:border-[#0F6B3E]"
            />
            <div className="flex items-center justify-between gap-2">
              <label className="flex items-center gap-1.5 text-xs text-gray-600">
                <input
                  type="radio"
                  name="defaultVariant"
                  checked={variant.isDefault}
                  onChange={() => setDefault(index)}
                />
                Default
              </label>
              {variants.length > 1 ? (
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                  aria-label="Remove variant"
                >
                  <FiTrash2 size={14} />
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductVariantInput;
