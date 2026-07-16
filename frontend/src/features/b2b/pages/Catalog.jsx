import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiPackage } from "react-icons/fi";
import CardGrid from "../../../shared/dashboard/components/CardGrid";
import { getPublicProducts } from "../../../shared/services/product.service";
import { getProductImageUrl } from "../../products/utils/normalizeProduct";
import {
  addDraftItem,
  selectDraftCount,
} from "../../../store/slices/b2bQuoteSlice";

const MIN_BULK_QUANTITY = 10;

const ProductCard = ({ product, onAdd }) => {
  const variants = product.variants || [];
  const [variantLabel, setVariantLabel] = useState(
    variants.find((v) => v.isDefault)?.label || variants[0]?.label || "",
  );
  const variant = variants.find((v) => v.label === variantLabel) || variants[0];
  const [quantity, setQuantity] = useState(MIN_BULK_QUANTITY);
  const [proposedPrice, setProposedPrice] = useState(variant?.price ?? "");

  const handleVariantChange = (label) => {
    setVariantLabel(label);
    const next = variants.find((v) => v.label === label);
    setProposedPrice(next?.price ?? "");
  };

  const inStock = variants.some((v) => v.stock > 0);
  const priceInvalid =
    proposedPrice === "" || Number(proposedPrice) <= 0 || Number(proposedPrice) > (variant?.price ?? 0);
  const quantityInvalid = Number(quantity) < MIN_BULK_QUANTITY;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:border-gray-200 hover:shadow-sm">
      <div className="relative h-40 w-full overflow-hidden bg-gray-100">
        <img
          src={getProductImageUrl(product.images?.[0])}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        {!inStock && (
          <span className="absolute left-3 top-3 rounded-full bg-gray-900/80 px-2.5 py-1 text-xs font-medium text-white">
            Out of stock
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400">{product.category}</p>
        <h3 className="mt-0.5 font-medium text-[#202020]">{product.name}</h3>

        <div className="mt-3 space-y-2 border-t border-gray-50 pt-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500">Variant</label>
            <select
              value={variantLabel}
              onChange={(e) => handleVariantChange(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm text-[#202020] outline-none focus:border-[#047B22]"
            >
              {variants.map((v) => (
                <option key={v.label} value={v.label}>
                  {v.label} — listed ₹{v.price}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Quantity</label>
              <input
                type="number"
                min={MIN_BULK_QUANTITY}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm text-[#202020] outline-none focus:border-[#047B22]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">
                Your price/unit
              </label>
              <input
                type="number"
                min={1}
                max={variant?.price}
                value={proposedPrice}
                onChange={(e) => setProposedPrice(e.target.value)}
                className={`w-full rounded-lg border px-2.5 py-1.5 text-sm text-[#202020] outline-none ${
                  priceInvalid ? "border-red-300" : "border-gray-200 focus:border-[#047B22]"
                }`}
              />
            </div>
          </div>
          {priceInvalid && (
            <p className="text-xs text-red-500">
              Must be between ₹1 and the listed price (₹{variant?.price}).
            </p>
          )}
          {quantityInvalid && (
            <p className="text-xs text-red-500">
              Minimum bulk quantity is {MIN_BULK_QUANTITY} units.
            </p>
          )}
        </div>

        <button
          disabled={!inStock || priceInvalid || quantityInvalid}
          onClick={() =>
            onAdd({
              productId: product._id,
              variantLabel,
              name: product.name,
              listedPrice: variant?.price,
              proposedPrice: Number(proposedPrice),
              quantity: Number(quantity),
            })
          }
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#047B22] py-2 text-sm font-medium text-white transition hover:bg-[#03641c] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
        >
          <FiPlus size={16} />
          Add to quote
        </button>
      </div>
    </div>
  );
};

const Catalog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const draftCount = useSelector(selectDraftCount);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  useEffect(() => {
    let cancelled = false;
    getPublicProducts()
      .then(({ data }) => {
        if (!cancelled) setProducts(data?.data?.products || []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#202020] sm:text-2xl">
            Catalog
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Pick a variant, quantity, and your proposed bulk price, then add it to
            your quote.
          </p>
        </div>
        <button
          onClick={() => navigate("/b2b/request-quote")}
          className="flex items-center justify-center gap-2 rounded-lg border border-[#047B22] px-4 py-2 text-sm font-medium text-[#047B22] transition hover:bg-[#EAF3DE]"
        >
          <FiPackage size={16} />
          Review quote {draftCount > 0 ? `(${draftCount})` : ""}
        </button>
      </div>

      {loading ? (
        <p className="py-10 text-center text-gray-500">Loading products...</p>
      ) : (
        <CardGrid
          data={products}
          renderCard={(product) => (
            <ProductCard
              product={product}
              onAdd={(item) => dispatch(addDraftItem(item))}
            />
          )}
          itemKey={(p) => p._id}
          searchKeys={["name"]}
          searchPlaceholder="Search products"
          filters={[
            { field: "category", label: "Category", options: categories },
          ]}
          pageSize={6}
          emptyMessage="No products match this search."
        />
      )}
    </div>
  );
};

export default Catalog;
