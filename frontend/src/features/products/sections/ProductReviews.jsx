import { useState } from "react";
import { FiMessageCircle, FiStar } from "react-icons/fi";
import ReviewModal from "../components/ReviewModal";

const ProductReviews = ({ product }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);

  const rating = product?.rating ?? 5;
  const reviewCount = product?.reviews?.length ?? 0;

  return (
    <>
      <section className="bg-[#F8FAF8] py-16 px-6 xl:px-0">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-baseline justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6B8F3E]">
                From buyers
              </p>

              <h2 className="mb-10 font-serif text-3xl text-[#22301A]">
                Customer Reviews
              </h2>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="rounded-lg border border-[#0F6B3E] px-5 py-2 text-sm font-medium text-[#0F6B3E] transition hover:bg-[#0F6B3E] hover:text-white"
            >
              Write a Review
            </button>
          </div>

          <div className="mb-3 flex items-center gap-4 rounded-xl bg-white p-5">
            <div className="text-center">
              <p className="text-3xl font-semibold">{rating.toFixed(1)}</p>

              <div className="mt-1 flex gap-1 text-[#EF9F27]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar
                    key={i}
                    size={14}
                    fill={i < Math.round(rating) ? "#EF9F27" : "none"}
                  />
                ))}
              </div>

              <p className="mt-2 text-xs text-gray-500">
                {reviewCount} Reviews
              </p>
            </div>

            <div className="border-l pl-5 text-sm text-gray-500">
              {reviewCount
                ? "See what customers are saying about this product."
                : "No reviews yet. Be the first one to review this product."}
            </div>
          </div>

          {reviewCount === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 py-12">
              <FiMessageCircle className="text-gray-400" size={24} />

              <p className="text-gray-500">
                Reviews will appear here after customers submit them.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {product.reviews.map((review, index) => (
                <div key={index} className="rounded-xl bg-white p-5">
                  <h4 className="font-semibold">{review.name}</h4>

                  <p className="mt-2 text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {showReviewModal && (
        <ReviewModal onClose={() => setShowReviewModal(false)} />
      )}
    </>
  );
};

export default ProductReviews;
