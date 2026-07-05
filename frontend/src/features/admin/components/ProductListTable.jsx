import { FiEdit2, FiToggleLeft, FiTrash2 } from "react-icons/fi";

const formatPriceRange = (variants) => {
  if (!Array.isArray(variants) || !variants.length) return "—";
  const prices = variants.map((v) => v.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `₹${min}` : `₹${min} – ₹${max}`;
};

const totalStock = (variants) =>
  Array.isArray(variants) ? variants.reduce((sum, v) => sum + (v.stock || 0), 0) : 0;

const ProductListTable = ({
  products,
  loading,
  onEdit,
  onToggleStatus,
  onDelete,
  getImageUrl,
}) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-800">Products</h3>
      <p className="text-sm text-gray-500">
        Manage your catalog from the backend.
      </p>
    </div>

    {loading ? (
      <p className="text-sm text-gray-500">Loading products...</p>
    ) : products.length === 0 ? (
      <p className="text-sm text-gray-500">No products found yet.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-200 text-xs font-medium uppercase tracking-wide text-gray-500">
              <th className="py-3 pr-4">Product</th>
              <th className="py-3 pr-4">Category</th>
              <th className="py-3 pr-4">Price</th>
              <th className="py-3 pr-4">Stock</th>
              <th className="py-3 pr-4">Status</th>
              <th className="py-3 pr-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product._id} className="text-sm">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    {product.images?.length ? (
                      <div className="flex flex-shrink-0 -space-x-3">
                        {product.images.map((url, i) => (
                          <img
                            key={url}
                            src={getImageUrl(url)}
                            alt={`${product.name} ${i + 1}`}
                            className="h-11 w-11 rounded-lg border-2 border-white object-cover shadow-sm"
                            style={{ zIndex: product.images.length - i }}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="h-11 w-11 flex-shrink-0 rounded-lg bg-gray-100" />
                    )}
                    <span className="font-medium text-gray-800">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 pr-4 text-gray-600">{product.category}</td>
                <td className="py-3 pr-4 text-gray-600">
                  {formatPriceRange(product.variants)}
                </td>
                <td className="py-3 pr-4 text-gray-600">
                  {totalStock(product.variants)}
                </td>
                <td className="py-3 pr-4">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      product.active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {product.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(product)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <FiEdit2 />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleStatus(product._id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <FiToggleLeft />
                      {product.active ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(product._id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default ProductListTable;
