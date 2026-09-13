import { FiCheck } from "react-icons/fi";

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
    <section className="bg-[#211B17] px-5 py-20 text-[#F4EDE2] sm:px-8 lg:py-28 xl:px-16">
      <div className="mx-auto max-w-[1600px]">
        {/* Heading */}
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#A85F43]">
                01
              </span>
              <span className="h-px w-10 bg-[#C56B4E]" />

              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
                Product standards
              </span>
            </div>

            <h2 className="font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.07em]">
              Nothing
              <br />
              <span className="text-[#C56B4E]">unnecessary.</span>
            </h2>
          </div>

          <p className="max-w-xl font-manrope text-sm leading-7 text-[#B9ACA2] lg:pb-2 lg:text-base">
            Every 7ALP product begins with carefully selected ingredients and
            ends with standards designed to keep the natural goodness intact.
          </p>
        </div>

        {/* Highlights */}
        <div className="mt-16 border-t border-white/15">
          {highlights.map(({ label, subtitle }, index) => (
            <div
              key={index}
              className="group grid gap-5 border-b border-white/15 py-7 transition-colors hover:bg-white/[0.03] md:grid-cols-[70px_1fr_1fr] md:items-center"
            >
              <span className="font-ibm-mono text-[9px] text-[#756A62]">
                0{index + 1}
              </span>

              <div className="flex items-center gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#C56B4E]/50 text-[#C56B4E]">
                  <FiCheck size={14} />
                </span>

                <h3 className="font-manrope text-lg font-medium text-[#F4EDE2] md:text-xl">
                  {label}
                </h3>
              </div>

              <p className="font-manrope text-sm leading-6 text-[#91847A] md:max-w-sm">
                {subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductHighlights;
