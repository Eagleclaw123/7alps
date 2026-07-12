import { useState } from "react";

const ICONS = {
  ingredients: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
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
      strokeWidth="1.6"
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
      strokeWidth="1.6"
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
    <section className="px-6 py-20 xl:px-0">
      <div className="mx-auto max-w-7xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6B8F3E]">
          What&apos;s inside
        </p>
        <h2 className="mb-10 font-serif text-3xl text-[#22301A]">
          Grown, gathered, kept honest
        </h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr]">
          {/* Tab rail */}
          <div className="flex gap-2 overflow-x-auto md:flex-col md:gap-1 md:overflow-visible md:border-l md:border-[#DCE6CE]">
            {tabs.map((tab) => {
              const isActive = active === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  className={`relative flex shrink-0 items-center gap-3 px-4 py-3 text-left text-sm transition-colors md:-ml-px md:border-l-2 md:px-5 ${
                    isActive
                      ? "border-b-2 border-[#4C7A1F] font-semibold text-[#22301A] md:border-b-0 md:border-l-[#4C7A1F]"
                      : "border-b-2 border-transparent text-gray-500 hover:text-[#22301A] md:border-l-transparent"
                  }`}
                >
                  <span
                    className={isActive ? "text-[#4C7A1F]" : "text-gray-400"}
                  >
                    {ICONS[tab.key]}
                  </span>
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content panel */}
          <div className="min-h-[180px] rounded-2xl border border-[#EAF0E2] bg-[#FBFCF9] p-8">
            {active === "ingredients" && (
              <p className="text-[15px] leading-8 text-gray-600">
                {ingredients}
              </p>
            )}

            {active === "usage" && hasUsage && (
              <ul className="space-y-4">
                {product.usageSuggestions.map((suggestion, i) => (
                  <li key={suggestion} className="flex items-start gap-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EAF0E2] text-xs font-semibold text-[#4C7A1F]">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 text-[15px] leading-7 text-gray-600">
                      {suggestion}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {active === "storage" && hasStorage && (
              <p className="text-[15px] leading-8 text-gray-600">
                {product.storageInstructions}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductIngredients;
