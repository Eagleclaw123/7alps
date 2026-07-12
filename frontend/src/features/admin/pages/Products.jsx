import { useEffect, useRef, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import {
  createProduct,
  deleteProduct,
  getProducts,
  toggleProductStatus,
  updateProduct,
} from "../../../shared/services/product.service";
import DataTable from "../../../shared/dashboard/components/DataTable";
import Badge from "../../../shared/dashboard/components/Badge";
import ProductForm from "../components/ProductForm";

const CATEGORY_OPTIONS = ["Hair Care", "Skin Care", "Health & Wellness"];

const PAGE_SIZE = 10;

const STATUS_STYLES = {
  Active: "bg-[#EAF3DE] text-[#3B6D11]",
  Inactive: "bg-gray-100 text-gray-500",
};

const emptyVariant = () => ({
  label: "",
  price: "",
  mrp: "",
  stock: "",
  isDefault: true,
});

const initialFormData = {
  name: "",
  category: CATEGORY_OPTIONS[0],
  subCategory: "",
  shortDescription: "",
  description: "",
  storageInstructions: "",
  active: true,
};

const initialLists = {
  tags: [],
  taglines: [],
  keyHighlights: [],
  ingredients: [],
  usageSuggestions: [],
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [variants, setVariants] = useState([emptyVariant()]);
  const [lists, setLists] = useState(initialLists);

  const [images, setImages] = useState([]); // [{ id, file, preview }]
  const [existingImages, setExistingImages] = useState([]);

  const [editingProductId, setEditingProductId] = useState(null);
  const [error, setError] = useState("");
  const formTopRef = useRef(null);

  // images are already full Cloudflare R2 URLs from the API.
  const getImageUrl = (url) => url || "";

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response?.data?.data?.products || []);
    } catch (err) {
      setError("Unable to load products right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    return () => {
      images.forEach(({ preview }) => {
        if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addFiles = (fileList) => {
    const files = Array.from(fileList || []).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (!files.length) return;

    const next = files.map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...next]);
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target?.preview.startsWith("blob:")) {
        URL.revokeObjectURL(target.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const addListItem = (listName, value) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setLists((prev) => ({
      ...prev,
      [listName]: prev[listName].includes(trimmed)
        ? prev[listName]
        : [...prev[listName], trimmed],
    }));
  };

  const removeListItem = (listName, value) => {
    setLists((prev) => ({
      ...prev,
      [listName]: prev[listName].filter((item) => item !== value),
    }));
  };

  const asList = (value) =>
    Array.isArray(value)
      ? value
      : typeof value === "string" && value
        ? value
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];

  const resetForm = () => {
    setFormData(initialFormData);
    images.forEach(({ preview }) => {
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    });
    setImages([]);
    setVariants([emptyVariant()]);
    setLists(initialLists);
    setExistingImages([]);
    setEditingProductId(null);
    setError("");
  };

  const handleEditClick = (product) => {
    setEditingProductId(product._id);
    setFormData({
      name: product.name || "",
      category: product.category || CATEGORY_OPTIONS[0],
      subCategory: product.subCategory || "",
      shortDescription: product.shortDescription || "",
      description: product.description || "",
      storageInstructions: product.storageInstructions || "",
      active: product.active ?? true,
    });
    setVariants(
      Array.isArray(product.variants) && product.variants.length
        ? product.variants.map((v) => ({
            label: v.label || "",
            price: v.price ?? "",
            mrp: v.mrp ?? "",
            stock: v.stock ?? "",
            isDefault: Boolean(v.isDefault),
          }))
        : [emptyVariant()],
    );
    setLists({
      tags: asList(product.tags),
      taglines: asList(product.taglines),
      keyHighlights: asList(product.keyHighlights),
      ingredients: asList(product.ingredients),
      usageSuggestions: asList(product.usageSuggestions),
    });
    images.forEach(({ preview }) => {
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    });
    setImages([]);
    setExistingImages(Array.isArray(product.images) ? product.images : []);
    setError("");
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError("");

      const payload = {
        ...formData,
        variants: JSON.stringify(
          variants.map((v) => ({
            label: v.label,
            price: Number(v.price),
            mrp: v.mrp !== "" ? Number(v.mrp) : undefined,
            stock: v.stock !== "" ? Number(v.stock) : 0,
            isDefault: v.isDefault,
          })),
        ),
      };

      const formDataToSend = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return;
        formDataToSend.append(key, value);
      });

      Object.entries(lists).forEach(([key, values]) => {
        if (values.length) formDataToSend.append(key, JSON.stringify(values));
      });

      images.forEach((img) => formDataToSend.append("images", img.file));

      if (editingProductId) {
        const response = await updateProduct(editingProductId, formDataToSend);
        const updatedProduct = response?.data?.data?.product;
        if (updatedProduct) {
          setProducts((prev) =>
            prev.map((p) => (p._id === editingProductId ? updatedProduct : p)),
          );
        }
      } else {
        const response = await createProduct(formDataToSend);
        const createdProduct = response?.data?.data?.product;
        if (createdProduct) {
          setProducts((prev) => [createdProduct, ...prev]);
        }
      }

      resetForm();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (editingProductId
            ? "Unable to update product."
            : "Unable to create product."),
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (productId) => {
    try {
      const response = await toggleProductStatus(productId);
      const updatedProduct = response?.data?.data?.product;
      if (updatedProduct) {
        setProducts((prev) =>
          prev.map((p) => (p._id === productId ? updatedProduct : p)),
        );
      }
    } catch (err) {
      setError("Unable to update product status.");
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      if (editingProductId === productId) resetForm();
    } catch (err) {
      setError("Unable to delete product.");
    }
  };

  const columns = [
    {
      key: "product",
      header: "Product",
      render: (p) => (
        <div className="flex items-center gap-3">
          <img
            src={getImageUrl(p.images?.[0])}
            alt={p.name}
            className="h-10 w-10 flex-shrink-0 rounded-lg bg-gray-100 object-cover"
          />
          <span className="font-medium text-[#202020]">{p.name}</span>
        </div>
      ),
    },
    { key: "category", header: "Category" },
    {
      key: "price",
      header: "Price",
      render: (p) => {
        const variant = p.variants?.find((v) => v.isDefault) || p.variants?.[0];
        return variant ? `₹${variant.price}` : "—";
      },
    },
    {
      key: "stock",
      header: "Stock",
      render: (p) => {
        const total = (p.variants || []).reduce(
          (sum, v) => sum + (Number(v.stock) || 0),
          0,
        );
        return `${total} units`;
      },
    },
    {
      key: "status",
      header: "Status",
      render: (p) => (
        <button onClick={() => handleToggleStatus(p._id)}>
          <Badge
            value={p.active ? "Active" : "Inactive"}
            styles={STATUS_STYLES}
          />
        </button>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-20 text-right",
      render: (p) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => handleEditClick(p)}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            aria-label="Edit product"
          >
            <FiEdit2 size={16} />
          </button>
          <button
            onClick={() => handleDelete(p._id)}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
            aria-label="Delete product"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <section className="space-y-6">
      <ProductForm
        ref={formTopRef}
        editingProductId={editingProductId}
        formData={formData}
        categoryOptions={CATEGORY_OPTIONS}
        images={images}
        existingImages={existingImages}
        onFormChange={handleChange}
        onFilesAdded={addFiles}
        onRemoveImage={removeImage}
        variants={variants}
        onVariantsChange={setVariants}
        lists={lists}
        onAddListItem={addListItem}
        onRemoveListItem={removeListItem}
        onCancelEdit={handleCancelEdit}
        onSubmit={handleSubmit}
        submitting={submitting}
        error={error}
        getImageUrl={getImageUrl}
      />

      <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
        {loading ? (
          <p className="py-10 text-center text-gray-500">Loading products...</p>
        ) : (
          <DataTable
            data={products}
            columns={columns}
            rowKey={(p) => p._id}
            searchKeys={["name", "category", "subCategory"]}
            searchPlaceholder="Search products"
            filters={[
              {
                field: "category",
                label: "Category",
                options: ["All", ...CATEGORY_OPTIONS],
              },
            ]}
            pageSize={PAGE_SIZE}
            emptyMessage="No products match this filter."
          />
        )}
      </div>
    </section>
  );
};

export default Products;
