import { useState } from "react";

const ProductGallery = ({ product }) => {
  const images = product.ProductImages || [];
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="overflow-hidden rounded-2xl bg-[#F8FAF8] flex flex-col items-center justify-center h-[500px]">
        <img
          src={images[activeIndex]}
          alt={product.ProductName}
          className="h-[400px] w-[500px] object-cover rounded-xl"
        />
      </div>

      {/* Thumbnail rail */}
      <div className="flex flex-row gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onMouseEnter={() => setActiveIndex(i)}
            onClick={() => setActiveIndex(i)}
            className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-[#F8FAF8] transition-colors ${
              activeIndex === i
                ? "border-neutral-900"
                : "border-transparent hover:border-neutral-300"
            }`}
          >
            <img
              src={img}
              alt={`${product.ProductName} thumbnail ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
