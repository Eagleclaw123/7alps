import { FiCheckCircle } from "react-icons/fi";

const DEFAULT_HIGHLIGHTS = [
  { label: "100% Natural", subtitle: "No fillers or additives" },
  { label: "Chemical Free", subtitle: "Safe for daily use" },
  { label: "Premium Quality", subtitle: "Farm-sourced, hand-picked" },
  { label: "Rich in Nutrients", subtitle: "Vitamins, antioxidants and more" },
];

const ProductHighlights = ({ product }) => {
  const highlights =
    product?.keyHighlights?.length > 0
      ? product.keyHighlights.map((label, i) => ({
          label,
          subtitle: DEFAULT_HIGHLIGHTS[i % DEFAULT_HIGHLIGHTS.length].subtitle,
        }))
      : DEFAULT_HIGHLIGHTS;

  return (
    <section className="px-6 xl:px-0 bg-[#F8FAF8] py-16">
      <div className="max-w-7xl mx-auto">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6B8F3E]">
          Overview
        </p>
        <h2 className="mb-10 font-medium text-3xl text-[#22301A]">
          Key highlights
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {highlights.map(({ label, subtitle }, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-xl bg-[#EAF3DE] p-4"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-[#C0DD97]">
                <FiCheckCircle size={18} className="text-[#27500A]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#173404]">{label}</p>
                <p className="mt-0.5 text-xs text-[#3B6D11]">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductHighlights;
