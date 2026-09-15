import { FiCheck } from "react-icons/fi";

const DEFAULT_HIGHLIGHTS = [
  { label: "100% Natural" },
  { label: "Chemical Free" },
  { label: "Premium Quality" },
  { label: "Rich in Nutrients" },
];

const ProductHighlights = ({ product }) => {
  const highlights =
    product?.keyHighlights?.length > 0
      ? product.keyHighlights.map((label) => ({ label }))
      : DEFAULT_HIGHLIGHTS;

  return (
    <section className="bg-[#211B17] px-5 py-24 text-[#F4EDE2] sm:px-8 lg:py-32 xl:px-16">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="mb-7 flex items-center gap-3">
              <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#C56B4E]">
                01
              </span>

              <span className="h-px w-12 bg-[#C56B4E]" />

              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#A89589]">
                Product standards
              </span>
            </div>

            <h2 className="max-w-4xl font-manrope text-[clamp(3.5rem,7vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.075em]">
              Nothing
              <br />
              <span className="text-[#C56B4E]">unnecessary.</span>
            </h2>
          </div>

          <div className="lg:pb-3">
            <span className="mb-4 block font-ibm-mono text-[9px] uppercase tracking-[0.28em] text-[#756A62]">
              Our promise
            </span>

            <p className="max-w-lg font-manrope text-sm leading-7 text-[#B9ACA2] md:text-base md:leading-8">
              Every 7ALP product begins with carefully selected ingredients and
              ends with standards designed to keep the natural goodness intact.
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-24 grid border-t border-white/15 md:grid-cols-2">
          {highlights.map(({ label }, index) => (
            <div
              key={index}
              className={`group relative flex min-h-[220px] items-center border-b border-white/15 p-7 transition-colors duration-500 hover:bg-[#2A231F] md:min-h-[250px] md:p-10 ${
                index % 2 === 0 ? "md:border-r" : ""
              }`}
            >
              <div className="w-full">
                {/* Number */}
                <span className="font-ibm-mono text-[9px] tracking-[0.2em] text-[#756A62]">
                  0{index + 1}
                </span>

                {/* Highlight */}
                <div className="mt-10 flex items-center gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C56B4E]/50 text-[#C56B4E] transition-all duration-500 group-hover:bg-[#C56B4E] group-hover:text-[#211B17]">
                    <FiCheck size={17} />
                  </span>

                  <h3 className="font-manrope text-xl md:text-[22px] font-medium tracking-[-0.04em] text-[#F4EDE2] ">
                    {label}
                  </h3>
                </div>
              </div>

              {/* Bottom accent */}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C56B4E] transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div className="flex flex-col gap-5 pt-10 md:flex-row md:items-center md:justify-between">
          <span className="font-ibm-mono text-[9px] uppercase tracking-[0.28em] text-[#756A62]">
            Selected with purpose
          </span>

          <span className="font-manrope text-sm text-[#91847A]">
            Pure ingredients. Thoughtful standards.
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProductHighlights;
