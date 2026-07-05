// images are already full Cloudflare R2 URLs coming back from the API.
export const getProductImageUrl = (url) => url || undefined;

const getDefaultVariant = (variants) => {
  if (!Array.isArray(variants) || !variants.length) return undefined;
  return variants.find((v) => v.isDefault) || variants[0];
};

// Adapts a backend Product document to the flat shape (`ProductName`,
// `ProductImage`, ...) the existing product UI components already expect.
export const normalizeProduct = (product) => {
  if (!product) return product;

  const defaultVariant = getDefaultVariant(product.variants);
  const images = Array.isArray(product.images) ? product.images : [];

  return {
    ...product,
    id: product._id,
    ProductName: product.name,
    ProductDescription: product.shortDescription || product.description || "",
    ProductCategory: product.category,
    ProductRating: product.ratingsAverage || "New",
    ProductPrice: defaultVariant?.price ?? 0,
    ProductImages: images,
    ProductImage: getProductImageUrl(images[0]),
  };
};

export const normalizeProducts = (products) =>
  Array.isArray(products) ? products.map(normalizeProduct) : [];
