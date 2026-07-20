import {
  LuDroplet,
  LuLeaf,
  LuShieldCheck,
  LuGlobe,
  LuSprout,
} from "react-icons/lu";

const stats = [
  { label: "Natural Ingredients", value: "100%", Icon: LuDroplet },
  { label: "Premium Herbal Products", value: "50+", Icon: LuLeaf },
  { label: "Quality Tested", value: "100%", Icon: LuShieldCheck },
  { label: "Global Distribution", value: "20+", Icon: LuGlobe },
];

const QualityBanner = () => {
  return (
    <section className="px-6 py-16 xl:px-0">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <div>
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#0F6B3E]">
              <LuSprout className="h-5 w-5" />
              Our Quality Promise
            </div>

            <h2 className="max-w-lg text-3xl font-semibold leading-tight text-[#1F2937] md:text-5xl">
              Every Product Crafted With{" "}
              <span className="text-[#0F6B3E]">Purity & Care</span>
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
              From responsibly sourced herbs to rigorous quality inspections,
              every step of our process is designed to deliver safe, authentic,
              and premium herbal products you can trust.
            </p>
          </div>

          {/* Right */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map(({ label, value, Icon }) => (
              <div
                key={label}
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF8F1] text-[#0F6B3E]">
                  <Icon size={30} strokeWidth={1.8} />
                </div>

                <h3 className="text-3xl font-bold text-[#1F2937]">{value}</h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityBanner;
