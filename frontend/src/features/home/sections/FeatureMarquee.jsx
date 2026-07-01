const marqueeItems = [
  "Farm Direct Sourcing",
  "Premium Herbal Quality",
  "Sustainably Sourced",
  "Pure. Natural. Effective.",
  "Quality Assured",
];
const FeatureMarquee = () => {
  return (
    <section className="overflow-hidden border-y border-[#D9E7CC] bg-[#EEF6E6] py-5">
      <div className="marquee flex w-max items-center">
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <div
            key={index}
            className="flex items-center px-8 space-x-4 whitespace-nowrap"
          >
            <span className="text-xl text-[#FF8F06]">•</span>

            <span className="font-mono text-[18px] font-medium tracking-wide text-[#4D7B04]">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureMarquee;
