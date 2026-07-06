const ProductIngredients = ({ product }) => {
  const ingredients =
    Array.isArray(product?.ingredients) && product.ingredients.length
      ? product.ingredients.join(", ")
      : "100% Natural Herbal Ingredients with no artificial colors, preservatives, or harmful chemicals.";

  return (
    <section className="py-16 px-6 xl:px-0">
      <div className="mx-auto max-w-7xl">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#3B6D11]">
          What's inside
        </p>
        <h2 className="mb-5 text-xl font-semibold text-[#1F2937]">
          Ingredients
        </h2>
        <p className="leading-8 text-gray-600">{ingredients}</p>

        {Array.isArray(product?.usageSuggestions) &&
        product.usageSuggestions.length ? (
          <>
            <h2 className="my-5 text-xl font-semibold text-[#1F2937]">
              Usage Suggestions
            </h2>
            <ul className="list-disc space-y-2 pl-5 leading-7 text-gray-600">
              {product.usageSuggestions.map((suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              ))}
            </ul>
          </>
        ) : null}

        {product?.storageInstructions ? (
          <>
            <h2 className="my-5 text-xl font-semibold text-[#1F2937]">
              Storage Instructions
            </h2>
            <p className="leading-8 text-gray-600">
              {product.storageInstructions}
            </p>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default ProductIngredients;
