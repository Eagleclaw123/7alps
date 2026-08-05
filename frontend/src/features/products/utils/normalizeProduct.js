// images are already full Cloudflare R2 URLs coming back from the API.
export const getProductImageUrl = (url) => url || undefined;

const getDefaultVariant = (variants) => {
  if (!Array.isArray(variants) || !variants.length) return undefined;
  return variants.find((v) => v.isDefault) || variants[0];
};

// Some category names come back HTML-entity-encoded (e.g. "Health &amp; Wellness")
// while others are plain ("Health & Wellness"). Decode so both collapse to one value.
const decodeHtmlEntities = (str) => {
  if (typeof str !== "string") return str;
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
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
    ProductCategory: decodeHtmlEntities(product.category),
    // Always numeric (defaults to 0) so sorting/comparisons never hit NaN —
    // components decide when to show a "New" badge based on ProductRatingCount.
    ProductRating: Number(product.ratingsAverage) || 0,
    ProductRatingCount: Number(product.ratingsCount) || 0,
    ProductPrice: defaultVariant?.price ?? 0,
    ProductImages: images,
    ProductImage: getProductImageUrl(images[0]),
  };
};

export const normalizeProducts = (products) =>
  Array.isArray(products) ? products.map(normalizeProduct) : [];
