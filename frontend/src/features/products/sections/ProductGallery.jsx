import { useState } from "react";

const ProductGallery = ({ product }) => {
  const images = product.ProductImages || [];
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) return null;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[82px_minmax(0,1fr)]">
        {/* Thumbnail Rail */}
        <div className="order-2 flex gap-3 overflow-x-auto pb-1 lg:order-1 lg:flex-col lg:overflow-visible">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => setActiveIndex(i)}
              className={`group relative h-[72px] w-[72px] shrink-0 overflow-hidden bg-[#EAE0D4] transition-all duration-300 lg:h-[78px] lg:w-[78px] ${
                activeIndex === i
                  ? "ring-1 ring-[#211B17]"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${product.ProductName} thumbnail ${i + 1}`}
                className="h-full w-full object-contain p-1 transition-transform duration-500 group-hover:scale-105"
              />

              {activeIndex === i && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#C56B4E]" />
              )}
            </button>
          ))}
        </div>

        {/* Main Gallery Column */}
        <div className="order-1 w-full lg:order-2">
          {/* Main Image */}
          <div className="relative h-[520px] w-full overflow-hidden bg-[#EAE0D4] lg:h-[640px] rounded-4xl">
            {/* Full-Bleed Product Image */}
            <img
              src={images[activeIndex]}
              alt={product.ProductName}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out rounded-4xl"
            />

            {/* Subtle Image Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#211B17]/20 via-transparent to-transparent" />

            {/* Top Information */}
            <div className="absolute left-5 right-5 top-5 z-10 flex items-center justify-between md:left-7 md:right-7 md:top-7">
              <span className="font-ibm-mono text-[8px] uppercase tracking-[0.28em] text-white/80">
                7ALP's / Collection
              </span>

              <span className="font-ibm-mono text-[8px] tracking-[0.18em] text-white/80">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </span>
            </div>

            {/* Bottom Information */}
            <div className="absolute bottom-5 left-5 z-10 md:bottom-7 md:left-7">
              <span className="mb-1 block font-ibm-mono text-[7px] uppercase tracking-[0.3em] text-white/65">
                Botanical Care
              </span>

              <span className="font-manrope text-xs tracking-[-0.02em] text-white/90">
                Pure / Botanical / Natural
              </span>
            </div>
          </div>

          {/* Image Indicators - BELOW IMAGE */}
          <div className="flex items-center justify-center gap-2 pt-5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`View image ${i + 1}`}
                className={`h-[3px] transition-all duration-300 ${
                  activeIndex === i
                    ? "w-10 bg-[#C56B4E]"
                    : "w-3 bg-[#211B17]/20 hover:bg-[#211B17]/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
