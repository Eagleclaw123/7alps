import { useEffect, useState } from "react";
import { FiStar, FiX, FiArrowUpRight } from "react-icons/fi";

const ReviewModal = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    // Prevent the page behind the modal from scrolling.
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const handleSubmit = async () => {
    setError("");

    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    if (comment.trim().length < 5) {
      setError("Please write at least a few words about your experience.");
      return;
    }

    try {
      setSubmitting(true);

      await onSubmit({
        rating,
        comment: comment.trim(),
      });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-[#211B17]/65 px-4 py-4 backdrop-blur-md sm:px-6 sm:py-6"
      onClick={onClose}
    >
      <div
        className="relative my-auto max-h-[calc(100vh-32px)] w-full max-w-[680px] overflow-y-auto bg-[#F4EDE2] text-[#211B17] shadow-2xl sm:max-h-[calc(100vh-48px)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="h-1 w-full bg-[#C56B4E]" />

        <div className="p-6 sm:p-8 lg:p-10">
          {/* Header */}
          <div className="flex items-start justify-between gap-6 border-b border-[#D8CCC0] pb-6 sm:pb-7">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[#C56B4E]" />

                <span className="font-ibm-mono text-[8px] uppercase tracking-[0.3em] text-[#C56B4E]">
                  Your experience
                </span>
              </div>

              <h2 className="font-manrope text-3xl font-medium tracking-[-0.055em] text-[#211B17] sm:text-4xl">
                Write a Review
              </h2>

              <p className="mt-3 max-w-md font-manrope text-sm leading-6 text-[#756A62]">
                Tell us about your experience with this product.
              </p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close review modal"
              className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#D8CCC0] text-[#514740] transition-all duration-300 hover:border-[#211B17] hover:bg-[#211B17] hover:text-[#F4EDE2]"
            >
              <FiX size={17} strokeWidth={1.5} />
            </button>
          </div>

          {/* Rating */}
          <div className="border-b border-[#D8CCC0] py-6 sm:py-7">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="font-ibm-mono text-[9px] uppercase tracking-[0.25em] text-[#91847A]">
                  Overall rating
                </p>

                <p className="mt-2 font-manrope text-sm text-[#514740]">
                  How would you rate your experience?
                </p>
              </div>

              {rating > 0 && (
                <span className="font-ibm-mono text-[9px] uppercase tracking-[0.15em] text-[#C56B4E]">
                  {rating} / 5
                </span>
              )}
            </div>

            <div className="mt-5 flex gap-2 sm:gap-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-label={`Rate ${item} star${item > 1 ? "s" : ""}`}
                  aria-pressed={item <= rating}
                  onClick={() => setRating(item)}
                  className="group flex h-12 w-12 items-center justify-center border border-[#D8CCC0] transition-all duration-300 hover:-translate-y-1 hover:border-[#C56B4E] sm:h-14 sm:w-14"
                >
                  <FiStar
                    size={21}
                    strokeWidth={1.5}
                    className="text-[#C56B4E] transition-transform duration-300 group-hover:scale-110"
                    fill={item <= rating ? "#C56B4E" : "none"}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review Content */}
          <div className="pt-6 sm:pt-7">
            <label
              htmlFor="review-comment"
              className="font-ibm-mono text-[9px] uppercase tracking-[0.25em] text-[#91847A]"
            >
              Your review
            </label>

            <textarea
              id="review-comment"
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Start writing here..."
              className="mt-4 w-full resize-none border border-[#D8CCC0] bg-[#EAE0D4]/40 px-5 py-4 font-manrope text-sm leading-6 text-[#211B17] outline-none transition-all duration-300 placeholder:text-[#A79A90] focus:border-[#C56B4E] focus:bg-[#EAE0D4]/70"
            />

            <div className="mt-2 flex justify-end">
              <span className="font-ibm-mono text-[8px] text-[#A79A90]">
                {comment.length} characters
              </span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 border-l-2 border-red-500 bg-red-50 px-4 py-3">
              <p className="font-manrope text-xs leading-5 text-red-700">
                {error}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#D8CCC0] pt-6 sm:mt-7 sm:flex-row sm:justify-end sm:pt-7">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-6 py-3.5 font-manrope text-sm font-medium text-[#756A62] transition-colors duration-300 hover:text-[#211B17] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="group inline-flex items-center justify-center gap-4 bg-[#211B17] px-7 py-3.5 font-manrope text-sm font-medium text-[#F4EDE2] transition-all duration-300 hover:bg-[#C56B4E] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Review"}

              {!submitting && (
                <span className="flex h-7 w-7 items-center justify-center bg-[#F4EDE2] text-[#211B17] transition-transform duration-300 group-hover:translate-x-1">
                  <FiArrowUpRight size={14} />
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="flex items-center justify-between border-t border-[#D8CCC0] bg-[#EAE0D4]/50 px-6 py-3 sm:px-8 lg:px-10">
          <span className="font-ibm-mono text-[7px] uppercase tracking-[0.2em] text-[#91847A]">
            7ALP / Customer voice
          </span>

          <span className="font-ibm-mono text-[7px] uppercase tracking-[0.2em] text-[#91847A]">
            Pure / Botanical / Natural
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
