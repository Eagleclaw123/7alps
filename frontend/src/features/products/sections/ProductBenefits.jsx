import { FiCheckCircle } from "react-icons/fi";

const ProductBenefits = ({ product }) => {
  const benefits = [
    "100% Natural Ingredients",
    "Chemical Free",
    "Premium Quality",
    "Rich in Nutrients",
  ];

  return (
    <section className="bg-[#F8FAF8] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-4xl font-semibold">Key Benefits</h2>

        <div className="grid gap-5 md:grid-cols-2">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-4 rounded-xl bg-white p-6"
            >
              <FiCheckCircle className="text-[#0F6B3E]" />
              {benefit}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductBenefits;
