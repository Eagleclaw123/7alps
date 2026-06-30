import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthContext";
import { productService } from "../../../shared/services/product.service";
import { authService } from "../../../shared/services/auth.service";
import ProductFormModal from "../components/ProductFormModal";

const CATEGORY_COLORS = {
  Soap: "bg-blue-100 text-blue-700",
  Shampoo: "bg-purple-100 text-purple-700",
  "Hair Care": "bg-pink-100 text-pink-700",
  "Skin Care": "bg-green-100 text-green-700",
  "Body Care": "bg-orange-100 text-orange-700",
  Other: "bg-gray-100 text-gray-700",
};

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const fetchProducts = useCallback(async () => {
    try {
      const res = await productService.getAll();
      setProducts(res.data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleLogout = async () => {
    try { await authService.logout(); } catch {}
    logout();
    navigate("/admin");
  };

  const handleAddProduct = () => {
    setEditProduct(null);
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const handleSave = async (formData) => {
    if (editProduct) {
      await productService.update(editProduct._id, formData);
      showToast("Product updated successfully");
    } else {
      await productService.create(formData);
      showToast("Product added successfully");
    }
    await fetchProducts();
  };

  const handleToggleStatus = async (id) => {
    try {
      await productService.toggleStatus(id);
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, active: !p.active } : p))
      );
      showToast("Status updated");
    } catch (err) {
      showToast(err.message);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await productService.delete(deleteId);
      setProducts((prev) => prev.filter((p) => p._id !== deleteId));
      showToast("Product deleted");
    } catch (err) {
      showToast(err.message);
    } finally {
      setDeleteId(null);
    }
  };

  const activeCount = products.filter((p) => p.active).length;
  const totalOrders = products.reduce((sum, p) => sum + (p.orderCount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-56 bg-gray-900 text-white flex flex-col">
        <div className="px-6 py-5 border-b border-gray-700">
          <h1 className="text-lg font-bold">7Alps</h1>
          <p className="text-xs text-gray-400 mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800 text-sm font-medium text-white">
            <span>📦</span> Products
          </div>
        </nav>
        <div className="px-4 py-4 border-t border-gray-700">
          <p className="text-xs text-gray-400 truncate mb-2">{admin?.Email}</p>
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm text-gray-400 hover:text-white transition-colors"
          >
            Sign out →
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-56">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Products</h2>
            <p className="text-sm text-gray-500">Manage your product catalog</p>
          </div>
          <button
            onClick={handleAddProduct}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            + Add Product
          </button>
        </div>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total Products", value: products.length },
              { label: "Active", value: activeCount },
              { label: "Total Orders", value: totalOrders },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">{error}</div>
          )}

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-gray-400 text-sm">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-400 text-sm">No products yet.</p>
                <button onClick={handleAddProduct}
                  className="mt-3 text-sm text-gray-900 font-medium underline underline-offset-2">
                  Add your first product
                </button>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Product</th>
                    <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Category</th>
                    <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Price</th>
                    <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Orders</th>
                    <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Status</th>
                    <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {product.coverImage ? (
                            <img
                              src={`/images/products/${product.coverImage}`}
                              alt={product.name}
                              className="h-10 w-10 rounded-lg object-cover border border-gray-100"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-lg">📦</div>
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            {product.weight && <p className="text-xs text-gray-400">{product.weight}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[product.category] || "bg-gray-100 text-gray-700"}`}>
                          {product.category}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-900">₹{product.price}</p>
                        {product.mrp && product.mrp > product.price && (
                          <p className="text-xs text-gray-400 line-through">₹{product.mrp}</p>
                        )}
                      </td>
                      <td className="px-5 py-4 text-gray-700 font-medium">{product.orderCount}</td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => handleToggleStatus(product._id)}
                          className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${product.active ? "bg-gray-900" : "bg-gray-300"}`}
                        >
                          <span className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 ${product.active ? "translate-x-4" : "translate-x-0"}`} />
                        </button>
                        <span className="ml-2 text-xs text-gray-500">{product.active ? "Active" : "Inactive"}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <button onClick={() => handleEdit(product)}
                            className="text-gray-500 hover:text-gray-900 text-xs font-medium transition-colors">
                            Edit
                          </button>
                          <button onClick={() => setDeleteId(product._id)}
                            className="text-red-400 hover:text-red-600 text-xs font-medium transition-colors">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
      {showModal && (
        <ProductFormModal
          product={editProduct}
          onClose={() => { setShowModal(false); setEditProduct(null); }}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-base font-semibold text-gray-900">Delete Product</h3>
            <p className="text-sm text-gray-500 mt-1">This action cannot be undone.</p>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleDelete}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg">
          {toastMsg}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
