import { useState } from "react";

const ProductGallery = ({ product }) => {
  const images = product.ProductImages || [];
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) return null;

  return (
    <div className="flex flex-col gap-5">
      {/* Main image */}
      <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden bg-[#EAE0D4] md:min-h-[620px]">
        <img
          src={images[activeIndex]}
          alt={product.ProductName}
          className="h-full max-h-[590px] w-full object-contain p-8 transition-opacity duration-500 md:p-12"
        />

        <div className="pointer-events-none absolute bottom-6 left-6">
          <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#756A62]">
            Pure / Botanical / Natural
          </span>
        </div>

        <div className="pointer-events-none absolute right-6 top-6">
          <span className="font-ibm-mono text-[8px] text-[#91847A]">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onMouseEnter={() => setActiveIndex(i)}
            onClick={() => setActiveIndex(i)}
            className={`relative h-20 w-20 shrink-0 overflow-hidden bg-[#EAE0D4] transition-all duration-300 ${
              activeIndex === i
                ? "ring-1 ring-[#211B17]"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              alt={`${product.ProductName} thumbnail ${i + 1}`}
              className="h-full w-full object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
