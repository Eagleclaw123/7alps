import { useEffect, useRef, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  toggleProductStatus,
  updateProduct,
} from "../../../shared/services/product.service";
import ProductForm from "../components/ProductForm";
import ProductListTable from "../components/ProductListTable";

const CATEGORY_OPTIONS = ["Hair Care", "Skin Care", "Health & Wellness"];

const initialFormData = {
  name: "",
  category: "Other",
  subCategory: "",
  price: "",
  mrp: "",
  shortDescription: "",
  active: true,
  inStock: true,
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  // Unified image list: first image = cover, rest = gallery.
  const [images, setImages] = useState([]); // [{ id, file, preview }]
  const [existingCoverImage, setExistingCoverImage] = useState("");
  const [tags, setTags] = useState([]);

  const [editingProductId, setEditingProductId] = useState(null);
  const [error, setError] = useState("");
  const formTopRef = useRef(null);

  const apiRootUrl = (
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1"
  ).replace(/\/api\/v1\/?$/, "");

  const getImageUrl = (filename) =>
    filename ? `${apiRootUrl}/images/products/${filename}` : "";

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

  const addTag = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setTags((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
  };

  const removeTag = (tag) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    images.forEach(({ preview }) => {
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    });
    setImages([]);
    setTags([]);
    setExistingCoverImage("");
    setEditingProductId(null);
    setError("");
  };

  const handleEditClick = (product) => {
    setEditingProductId(product._id);
    setFormData({
      name: product.name || "",
      category: product.category || "Other",
      subCategory: product.subCategory || "",
      price: product.price ?? "",
      mrp: product.mrp ?? "",
      shortDescription: product.shortDescription || "",
      active: product.active ?? true,
      inStock: product.inStock ?? true,
    });
    setTags(
      Array.isArray(product.tags)
        ? product.tags
        : typeof product.tags === "string" && product.tags
          ? product.tags.split(",").map((t) => t.trim())
          : [],
    );
    images.forEach(({ preview }) => {
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    });
    setImages([]);
    setExistingCoverImage(product.coverImage || "");
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
        price: Number(formData.price),
        mrp: formData.mrp ? Number(formData.mrp) : undefined,
        tags: tags.length ? tags.join(",") : undefined,
      };

      const formDataToSend = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return;
        formDataToSend.append(key, value);
      });

      const [coverImage, ...galleryImages] = images.map((img) => img.file);
      if (coverImage) formDataToSend.append("coverImage", coverImage);
      galleryImages.forEach((image) => formDataToSend.append("images", image));

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
        if (createdProduct) setProducts((prev) => [createdProduct, ...prev]);
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

  return (
    <section className="space-y-6">
      <ProductForm
        ref={formTopRef}
        editingProductId={editingProductId}
        formData={formData}
        categoryOptions={CATEGORY_OPTIONS}
        images={images}
        existingCoverImage={existingCoverImage}
        onFormChange={handleChange}
        onFilesAdded={addFiles}
        onRemoveImage={removeImage}
        onAddTag={addTag}
        onRemoveTag={removeTag}
        onCancelEdit={handleCancelEdit}
        onSubmit={handleSubmit}
        submitting={submitting}
        error={error}
        tags={tags}
        getImageUrl={getImageUrl}
      />

      <ProductListTable
        products={products}
        loading={loading}
        onEdit={handleEditClick}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
        getImageUrl={getImageUrl}
      />
    </section>
  );
};

export default AdminProducts;
