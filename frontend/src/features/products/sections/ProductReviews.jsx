import { FiMessageCircle, FiStar } from "react-icons/fi";

const ProductReviews = ({ product }) => {
  const rating = product?.rating ?? 5;
  const reviewCount = product?.reviews?.length ?? 0;

  return (
    <section className="bg-[#F8FAF8] py-16 px-6 xl:px-0">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-baseline justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#3B6D11]">
              From buyers
            </p>
            <h2 className="text-xl font-semibold text-[#1F2937]">
              Customer reviews
            </h2>
          </div>
          <button
            type="button"
            className="text-sm font-medium text-[#0F6B3E] hover:underline"
          >
            Write a review
          </button>
        </div>

        <div className="mb-3 flex items-center gap-4 rounded-xl bg-white p-5">
          <div className="flex-shrink-0 text-center">
            <p className="text-3xl font-semibold text-[#1F2937]">
              {rating.toFixed(1)}
            </p>
            <div className="my-0.5 flex gap-0.5 text-[#EF9F27]">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar
                  key={i}
                  size={13}
                  fill={i < Math.round(rating) ? "#EF9F27" : "none"}
                />
              ))}
            </div>
            <p className="text-xs text-gray-400">
              {reviewCount > 0 ? `${reviewCount} reviews` : "New product"}
            </p>
          </div>
          <div className="flex-1 border-l border-gray-200 pl-4">
            <p className="text-sm leading-relaxed text-gray-500">
              {reviewCount > 0
                ? "See what customers are saying about this product."
                : "No reviews yet. Be the first to share your experience with this product."}
            </p>
          </div>
        </div>

        {reviewCount === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-7 text-center">
            <FiMessageCircle size={22} className="text-gray-400" />
            <p className="text-sm text-gray-500">
              Reviews will appear here once customers start sharing feedback.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {product.reviews.map((review, i) => (
              <div key={i} className="rounded-xl bg-white p-4">
                <p className="text-sm font-medium text-[#1F2937]">
                  {review.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductReviews;
