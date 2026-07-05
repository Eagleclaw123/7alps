const ProductIngredients = ({ product }) => {
  const ingredients =
    Array.isArray(product?.ingredients) && product.ingredients.length
      ? product.ingredients.join(", ")
      : "100% Natural Herbal Ingredients with no artificial colors, preservatives, or harmful chemicals.";

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-6 text-4xl font-semibold">Ingredients</h2>

        <p className="leading-8 text-gray-600">{ingredients}</p>

        {Array.isArray(product?.usageSuggestions) &&
        product.usageSuggestions.length ? (
          <>
            <h3 className="mt-10 mb-4 text-2xl font-semibold">
              Usage Suggestions
            </h3>
            <ul className="list-disc space-y-2 pl-5 leading-7 text-gray-600">
              {product.usageSuggestions.map((suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              ))}
            </ul>
          </>
        ) : null}

        {product?.storageInstructions ? (
          <>
            <h3 className="mt-10 mb-4 text-2xl font-semibold">
              Storage Instructions
            </h3>
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
