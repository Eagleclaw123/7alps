import { useEffect, useState } from "react";
import { FiStar, FiX } from "react-icons/fi";

const ReviewModal = ({ onClose }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 transition hover:bg-gray-100"
        >
          <FiX size={22} />
        </button>

        {/* Heading */}
        <h2 className="mb-2 text-center text-2xl font-semibold text-[#0F6B3E]">
          Write a Review
        </h2>

        <p className="mb-8 text-center text-sm text-gray-500">
          Share your experience with this product.
        </p>

        {/* Rating */}
        <div className="mb-8 text-center">
          <p className="mb-4 font-medium text-gray-700">Overall Rating</p>

          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRating(item)}
                className="transition hover:scale-110"
              >
                <FiStar
                  size={30}
                  color="#FBBF24"
                  fill={item <= rating ? "#FBBF24" : "none"}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Review Title */}
        <div className="mb-5">
          <label className="mb-2 block font-medium text-gray-700">
            Review Title
          </label>

          <input
            type="text"
            placeholder="Give your review a title"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0F6B3E]"
          />
        </div>

        {/* Review Content */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Review Content
          </label>

          <textarea
            rows={4}
            placeholder="Start writing here..."
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0F6B3E]"
          />
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button className="rounded-lg bg-[#0F6B3E] px-8 py-3 font-medium text-white transition hover:bg-[#0C5B35]">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
