import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiMessageCircle,
  FiStar,
  FiArrowDown,
  FiArrowUp,
  FiArrowUpRight,
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
  <div className="flex gap-1 text-[#C56B4E]">
    {Array.from({ length: 5 }).map((_, i) => (
      <FiStar
        key={i}
        size={size}
        strokeWidth={1.5}
        fill={i < Math.round(rating) ? "#C56B4E" : "none"}
      />
    ))}
  </div>
);

const RatingBreakdown = ({ reviews }) => {
  const total = reviews.length || 1;

  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((review) => Math.round(review.rating) === star)
      .length,
  }));

  return (
    <div className="space-y-3">
      {counts.map(({ star, count }) => (
        <div
          key={star}
          className="grid grid-cols-[14px_14px_1fr_20px] items-center gap-2"
        >
          <span className="font-ibm-mono text-[9px] text-[#756A62]">
            {star}
          </span>

          <FiStar
            size={10}
            strokeWidth={1.5}
            className="text-[#C56B4E]"
            fill="#C56B4E"
          />

          <div className="h-[3px] overflow-hidden bg-[#D8CCC0]">
            <div
              className="h-full bg-[#C56B4E] transition-all duration-500"
              style={{
                width: `${(count / total) * 100}%`,
              }}
            />
          </div>

          <span className="text-right font-ibm-mono text-[9px] text-[#91847A]">
            {count}
          </span>
        </div>
      ))}
    </div>
  );
};

const ReviewRow = ({ review, isFirst }) => {
  const name = review.customer?.name || "Customer";
  const date = formatDate(review.createdAt);

  return (
    <article className={`py-8 ${isFirst ? "" : "border-t border-[#D8CCC0]"}`}>
      <div className="grid gap-5 md:grid-cols-[70px_1fr]">
        {/* Review index */}
        <div className="hidden md:block">
          <span className="font-ibm-mono text-[9px] uppercase tracking-[0.2em] text-[#A79A90]">
            Review
          </span>

          <div className="mt-3 h-px w-8 bg-[#C56B4E]" />
        </div>

        <div>
          <div className="flex items-start gap-3">
            <span className="font-serif text-4xl leading-none text-[#C56B4E]/40">
              &ldquo;
            </span>

            <p className="max-w-3xl pt-1 font-manrope text-[15px] leading-7 text-[#514740] md:text-base">
              {review.comment}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-manrope text-sm font-semibold text-[#211B17]">
              {name}
            </span>

            <span className="h-1 w-1 rounded-full bg-[#C8BDB3]" />

            <StarRow rating={review.rating} size={11} />

            {date && (
              <>
                <span className="h-1 w-1 rounded-full bg-[#C8BDB3]" />

                <span className="font-ibm-mono text-[9px] uppercase tracking-[0.12em] text-[#91847A]">
                  {date}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
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
    if (product?.id) {
      loadReviews();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  useEffect(() => {
    setExpanded(false);
  }, [reviews.length]);

  const handleWriteReview = () => {
    if (!customer) {
      navigate("/customer/login", {
        state: {
          from: {
            pathname: `/products/${product.id}`,
          },
        },
      });

      return;
    }

    setShowReviewModal(true);
  };

  const handleSubmitReview = async ({ rating, comment }) => {
    await createReview({
      productId: product.id,
      rating,
      comment,
    });

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
      <section className="bg-[#F4EDE2] px-5 sm:px-8 xl:px-16">
        <div className="mx-auto max-w-[1600px]">
          {/* Section heading */}
          <div className="grid gap-8 border-b border-[#D8CCC0] pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#A85F43]">
                  03
                </span>
                <span className="h-px w-10 bg-[#C56B4E]" />

                <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
                  From our customers
                </span>
              </div>

              <h2 className="max-w-3xl font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.07em] text-[#211B17]">
                Real people.
                <br />
                <span className="font-normal text-[#C56B4E]">
                  Real experiences.
                </span>
              </h2>
            </div>

            <button
              type="button"
              onClick={handleWriteReview}
              className="group inline-flex w-fit items-center gap-4 border border-[#211B17] px-6 py-4 font-manrope text-sm font-medium text-[#211B17] transition-all duration-300 hover:bg-[#211B17] hover:text-[#F4EDE2]"
            >
              Write a Review
              <span className="flex h-7 w-7 items-center justify-center border border-current transition-transform duration-300 group-hover:translate-x-1">
                <FiArrowUpRight size={14} />
              </span>
            </button>
          </div>

          {/* Content */}
          <div className="pt-12">
            {loading ? (
              <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
                <div className="animate-pulse">
                  <div className="h-14 w-24 bg-[#EAE0D4]" />
                  <div className="mt-4 h-4 w-32 bg-[#EAE0D4]" />
                  <div className="mt-8 space-y-4">
                    <div className="h-2 bg-[#EAE0D4]" />
                    <div className="h-2 bg-[#EAE0D4]" />
                    <div className="h-2 bg-[#EAE0D4]" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="h-28 animate-pulse bg-[#EAE0D4]" />
                  <div className="h-28 animate-pulse bg-[#EAE0D4]" />
                  <div className="h-28 animate-pulse bg-[#EAE0D4]" />
                </div>
              </div>
            ) : reviewCount === 0 ? (
              <div className="border border-dashed border-[#CFC2B7] px-6 py-20 text-center">
                <FiMessageCircle
                  size={28}
                  strokeWidth={1.2}
                  className="mx-auto text-[#A79A90]"
                />

                <p className="mt-5 font-manrope text-sm text-[#756A62]">
                  Reviews will appear here after customers submit them.
                </p>

                <button
                  type="button"
                  onClick={handleWriteReview}
                  className="mt-6 inline-flex items-center gap-2 font-manrope text-sm font-medium text-[#C56B4E] underline decoration-[#C56B4E]/40 underline-offset-4"
                >
                  Be the first to review
                  <FiArrowUpRight size={14} />
                </button>
              </div>
            ) : (
              <div className="grid gap-12 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">
                {/* Rating summary */}
                <aside className="lg:border-r lg:border-[#D8CCC0] lg:pr-10">
                  <div>
                    <span className="font-ibm-mono text-[9px] uppercase tracking-[0.25em] text-[#91847A]">
                      Overall rating
                    </span>

                    <div className="mt-4 flex items-end gap-3">
                      <span className="font-manrope text-6xl font-medium leading-none tracking-[-0.07em] text-[#211B17]">
                        {avgRating.toFixed(1)}
                      </span>

                      <span className="pb-1 font-ibm-mono text-[9px] text-[#91847A]">
                        / 5
                      </span>
                    </div>

                    <div className="mt-5">
                      <StarRow rating={avgRating} size={15} />
                    </div>

                    <p className="mt-3 font-manrope text-xs leading-5 text-[#756A62]">
                      Based on{" "}
                      <span className="font-semibold text-[#211B17]">
                        {reviewCount}
                      </span>{" "}
                      customer review
                      {reviewCount === 1 ? "" : "s"}.
                    </p>
                  </div>

                  <div className="mt-10 border-t border-[#D8CCC0] pt-8">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="font-ibm-mono text-[9px] uppercase tracking-[0.2em] text-[#91847A]">
                        Rating distribution
                      </span>
                    </div>

                    <RatingBreakdown reviews={reviews} />
                  </div>
                </aside>

                {/* Reviews */}
                <div>
                  <div className="border-t border-[#D8CCC0]">
                    {visibleReviews.map((review, i) => (
                      <ReviewRow
                        key={review._id}
                        review={review}
                        isFirst={i === 0}
                      />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="border-t border-[#D8CCC0] pt-7">
                      <button
                        type="button"
                        onClick={() => setExpanded((prev) => !prev)}
                        className="group inline-flex items-center gap-3 font-manrope text-sm font-medium text-[#211B17]"
                      >
                        <span className="border-b border-[#211B17]/30 pb-1 transition-colors group-hover:border-[#C56B4E]">
                          {expanded
                            ? "Show less"
                            : `Show all ${reviewCount} reviews`}
                        </span>

                        <span className="flex h-7 w-7 items-center justify-center border border-[#D8CCC0] transition-all duration-300 group-hover:border-[#C56B4E] group-hover:text-[#C56B4E]">
                          {expanded ? (
                            <FiArrowUp size={13} />
                          ) : (
                            <FiArrowDown size={13} />
                          )}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
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
