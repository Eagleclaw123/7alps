import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Simple left/right image carousel. Renders a single image with no controls
// when there's 0-1 images; shows nav arrows only when there's more than one.
const ImageCarousel = ({ images = [], alt = "", imageClassName = "" }) => {
  const [index, setIndex] = useState(0);

  const list = Array.isArray(images) ? images.filter(Boolean) : [];
  const hasMultiple = list.length > 1;
  const current = list[index];

  const goPrev = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };

  const goNext = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev === list.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-full w-full">
      <img src={current} alt={alt} className={imageClassName} />

      {hasMultiple ? (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-white"
          >
            <FiChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-white"
          >
            <FiChevronRight size={18} />
          </button>

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {list.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${
                  i === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ImageCarousel;
