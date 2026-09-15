import { useState } from "react";

const ICONS = {
  ingredients: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),

  usage: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="m9 11 3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),

  storage: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" />
      <path d="M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" />
      <path d="M10 12h4" />
    </svg>
  ),
};

const ProductIngredients = ({ product }) => {
  const ingredients =
    Array.isArray(product?.ingredients) && product.ingredients.length
      ? product.ingredients.join(", ")
      : "100% Natural Herbal Ingredients with no artificial colors, preservatives, or harmful chemicals.";

  const hasUsage =
    Array.isArray(product?.usageSuggestions) && product.usageSuggestions.length;

  const hasStorage = Boolean(product?.storageInstructions);

  const tabs = [
    { key: "ingredients", label: "Ingredients" },
    ...(hasUsage ? [{ key: "usage", label: "Usage Suggestions" }] : []),
    ...(hasStorage ? [{ key: "storage", label: "Storage Instructions" }] : []),
  ];

  const [active, setActive] = useState(tabs[0].key);

  return (
    <section className="bg-[#F4EDE2] px-5 py-20 sm:px-8 lg:py-28 xl:px-16">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-ibm-mono text-[10px] uppercase tracking-[0.3em] text-[#A85F43]">
                02
              </span>
              <span className="h-px w-10 bg-[#C56B4E]" />

              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
                What's inside
              </span>
            </div>

            <h2 className="font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.06em] text-[#211B17]">
              Grown.
              <br />
              Gathered.
              <br />
              <span className="text-[#C56B4E]">Kept honest.</span>
            </h2>
          </div>

          <p className="max-w-xl font-manrope text-sm leading-7 text-[#756A62] lg:pb-2 lg:text-base">
            Transparency matters. Explore what's inside your product, how to use
            it, and how to keep it at its best.
          </p>
        </div>

        {/* Content */}
        <div className="grid border-t border-[#D8CCC0] lg:grid-cols-[280px_1fr]">
          {/* Navigation */}
          <div className="border-b border-[#D8CCC0] lg:border-b-0 lg:border-r lg:border-[#D8CCC0] lg:py-8">
            <div className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-0 lg:overflow-visible">
              {tabs.map((tab, index) => {
                const isActive = active === tab.key;

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActive(tab.key)}
                    className={`group flex min-w-max items-center gap-4 px-4 py-5 text-left transition-all lg:px-6 ${
                      isActive
                        ? "text-[#211B17]"
                        : "text-[#91847A] hover:text-[#211B17]"
                    }`}
                  >
                    <span
                      className={`font-ibm-mono text-[8px] ${
                        isActive ? "text-[#C56B4E]" : "text-[#B9ACA2]"
                      }`}
                    >
                      0{index + 1}
                    </span>

                    <span
                      className={`transition-transform duration-300 ${
                        isActive ? "translate-x-1 text-[#C56B4E]" : ""
                      }`}
                    >
                      {ICONS[tab.key]}
                    </span>

                    <span className="font-manrope text-sm font-medium">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="min-h-[300px] px-2 py-10 sm:px-8 lg:px-14 lg:py-14">
            {active === "ingredients" && (
              <div className="max-w-3xl">
                <p className="mb-6 font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
                  Ingredients
                </p>

                <p className="font-manrope leading-9 text-[#211B17] text-md md:leading-10">
                  {ingredients}
                </p>
              </div>
            )}

            {active === "usage" && hasUsage && (
              <div className="max-w-3xl">
                <p className="mb-7 font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
                  How to use
                </p>

                <div className="divide-y divide-[#D8CCC0]">
                  {product.usageSuggestions.map((suggestion, i) => (
                    <div key={suggestion} className="flex gap-6 py-5">
                      <span className="font-ibm-mono text-[9px] text-[#C56B4E]">
                        0{i + 1}
                      </span>

                      <p className="font-manrope text-[15px] leading-7 text-[#514740]">
                        {suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {active === "storage" && hasStorage && (
              <div className="max-w-3xl">
                <p className="mb-6 font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#91847A]">
                  Storage
                </p>

                <p className="font-manrope text-xl leading-9 text-[#211B17] md:text-2xl md:leading-10">
                  {product.storageInstructions}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductIngredients;
