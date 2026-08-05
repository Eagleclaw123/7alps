import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiMessageCircle,
  FiStar,
  FiArrowDown,
  FiArrowUp,
} from "react-icons/fi";
import ReviewModal from "../components/ReviewModal";
import {
  getProductReviews,
  createReview,
} from "../../../shared/services/review.service";
import { selectCustomer } from "../../../store/slices/authSlice";

const VISIBLE_COUNT = 3;

const formatDate = (dateString) => {
  if (!dateString) return null;
  try {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return null;
  }
};

const StarRow = ({ rating, size = 12 }) => (
  <div className="flex gap-0.5 text-[#EF9F27]">
    {Array.from({ length: 5 }).map((_, i) => (
      <FiStar
        key={i}
        size={size}
        fill={i < Math.round(rating) ? "#EF9F27" : "none"}
      />
    ))}
  </div>
);

// Encodes real distribution data — how many reviews landed at each star level —
// rather than decorating with a generic average-only summary.
const RatingBreakdown = ({ reviews }) => {
  const total = reviews.length || 1;
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));

  return (
    <div className="space-y-2">
      {counts.map(({ star, count }) => (
        <div
          key={star}
          className="flex items-center gap-3 text-xs text-gray-500"
        >
          <span className="w-3 text-right font-medium text-[#22301A]">
            {star}
          </span>
          <FiStar
            size={10}
            className="shrink-0 text-[#EF9F27]"
            fill="#EF9F27"
          />
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-[#0F6B3E]"
              style={{ width: `${(count / total) * 100}%` }}
            />
          </div>
          <span className="w-4 text-gray-400">{count}</span>
        </div>
      ))}
    </div>
  );
};

const ReviewRow = ({ review, isFirst }) => {
  const name = review.customer?.name || "Customer";
  const date = formatDate(review.createdAt);

  return (
    <div className={`py-6 ${isFirst ? "" : "border-t border-gray-200"}`}>
      <div className="flex items-start gap-4">
        <span className="mt-1 font-serif text-4xl leading-none text-[#0F6B3E]/20 select-none">
          &ldquo;
        </span>

        <div className="flex-1">
          <p className="text-[15px] leading-relaxed text-[#22301A]">
            {review.comment}
          </p>

          <div className="mt-4 flex items-center gap-3 text-sm">
            <span className="font-semibold text-[#22301A]">{name}</span>
            <span className="text-gray-300">&middot;</span>
            <StarRow rating={review.rating} size={11} />
            {date && (
              <>
                <span className="text-gray-300">&middot;</span>
                <span className="text-xs text-gray-400">{date}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductReviews = ({ product }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const customer = useSelector(selectCustomer);
  const navigate = useNavigate();

  const loadReviews = () => {
    setLoading(true);
    getProductReviews(product.id)
      .then(({ data }) => {
        setReviews(data?.data?.reviews || []);
        setAvgRating(data?.data?.avgRating || 0);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (product?.id) loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  useEffect(() => {
    setExpanded(false);
  }, [reviews.length]);

  const handleWriteReview = () => {
    if (!customer) {
      navigate("/customer/login", {
        state: { from: { pathname: `/products/${product.id}` } },
      });
      return;
    }
    setShowReviewModal(true);
  };

  const handleSubmitReview = async ({ rating, comment }) => {
    await createReview({ productId: product.id, rating, comment });
    setShowReviewModal(false);
    loadReviews();
  };

  const reviewCount = reviews.length;
  const hasMore = reviewCount > VISIBLE_COUNT;
  const visibleReviews = useMemo(
    () => (expanded ? reviews : reviews.slice(0, VISIBLE_COUNT)),
    [expanded, reviews],
  );

  return (
    <>
      <section className="bg-[#F8FAF8] py-16 px-6 xl:px-0">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-baseline justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6B8F3E]">
                From buyers
              </p>
              <h2 className="font-medium text-3xl text-[#22301A]">
                Customer Reviews
              </h2>
            </div>

            <button
              onClick={handleWriteReview}
              className="rounded-lg border border-[#0F6B3E] px-5 py-2 text-sm font-medium text-[#0F6B3E] transition hover:bg-[#0F6B3E] hover:text-white"
            >
              Write a Review
            </button>
          </div>

          {loading ? (
            <p className="py-10 text-center text-gray-500">
              Loading reviews...
            </p>
          ) : reviewCount === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 py-12">
              <FiMessageCircle className="text-gray-400" size={24} />
              <p className="text-gray-500">
                Reviews will appear here after customers submit them.
              </p>
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-[220px_1fr]">
              {/* Summary panel */}
              <div>
                <p className="font-serif text-5xl text-[#22301A]">
                  {avgRating.toFixed(1)}
                </p>
                <div className="mt-2">
                  <StarRow rating={avgRating} size={14} />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Based on {reviewCount} review{reviewCount === 1 ? "" : "s"}
                </p>

                <div className="mt-6">
                  <RatingBreakdown reviews={reviews} />
                </div>
              </div>

              {/* Review rows */}
              <div>
                {visibleReviews.map((review, i) => (
                  <ReviewRow
                    key={review._id}
                    review={review}
                    isFirst={i === 0}
                  />
                ))}

                {hasMore && (
                  <div className="mt-2 border-t border-gray-200 pt-6">
                    <button
                      onClick={() => setExpanded((prev) => !prev)}
                      className="flex items-center gap-1.5 text-sm font-medium text-[#0F6B3E] underline decoration-[#0F6B3E]/30 underline-offset-4 transition hover:decoration-[#0F6B3E]"
                    >
                      {expanded ? (
                        <>
                          Show less <FiArrowUp size={14} />
                        </>
                      ) : (
                        <>
                          Show all {reviewCount} reviews{" "}
                          <FiArrowDown size={14} />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {showReviewModal && (
        <ReviewModal
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleSubmitReview}
        />
      )}
    </>
  );
};

export default ProductReviews;
