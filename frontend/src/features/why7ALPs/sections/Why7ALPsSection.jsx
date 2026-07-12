import { benefitsLeft, benefitsRight } from "../data/benefitsData";

const Why7ALPsSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#FAF6EF] py-16 md:py-24 lg:py-28">
      {/* Signature organic divider, top */}
      <svg
        className="absolute left-0 top-0 h-6 w-full text-[#EFE6D8]"
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 12 Q 150 24 300 12 T 600 12 T 900 12 T 1200 12"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-14 text-center md:mb-20 lg:mb-24">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#B9714A]">
            The 7ALP&apos;s difference
          </p>
          <h2 className="font-serif text-3xl text-[#3F4A2E] sm:text-4xl lg:text-[46px]">
            Why 7 ALP&apos;s
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#6B7259] sm:text-base">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consequuntur error nostrum dolorum ullam inventore aut nesciunt
            molestiae consequatur.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-3 lg:gap-8">
          {/* Left */}
          <div className="order-2 space-y-12 md:space-y-16 lg:order-1 lg:space-y-24">
            {benefitsLeft.map((item) => (
              <div
                key={item.id}
                className="space-y-2 text-right md:text-center lg:text-right"
              >
                <span className="inline-block font-serif text-4xl text-[#E4DAC6] sm:text-5xl select-none">
                  {item.id}
                </span>
                <h3 className="text-lg font-semibold text-[#3F4A2E] sm:text-xl">
                  {item.title}
                </h3>
                <p className="text-sm leading-7 text-[#6B7259] sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Center */}
          <div className="order-2 flex justify-center md:order-1 lg:order-2">
            <div className="relative flex items-center justify-center">
              {/* Soft radial glow behind product */}
              <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,_#EFE6D8_0%,_transparent_70%)] blur-2xl" />
              <img
                src="https://res.cloudinary.com/dasvdkncm/image/upload/v1782614642/front-view-natural-cannabis-oil-bottle-assortment-removebg-preview_ezygcs.png"
                alt="Product"
                className="w-52 object-contain drop-shadow-xl sm:w-64 md:w-72 lg:w-80 xl:w-96"
              />
            </div>
          </div>

          {/* Right */}
          <div className="order-3 space-y-12 md:space-y-16 lg:space-y-24">
            {benefitsRight.map((item) => (
              <div
                key={item.id}
                className="space-y-2 text-left md:text-center lg:text-left"
              >
                <span className="inline-block font-serif text-4xl text-[#E4DAC6] sm:text-5xl select-none">
                  {item.id}
                </span>
                <h3 className="text-lg font-semibold text-[#3F4A2E] sm:text-xl">
                  {item.title}
                </h3>
                <p className="text-sm leading-7 text-[#6B7259] sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Signature organic divider, bottom */}
      <svg
        className="absolute bottom-0 left-0 h-6 w-full text-[#EFE6D8]"
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 12 Q 150 0 300 12 T 600 12 T 900 12 T 1200 12"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </section>
  );
};

export default Why7ALPsSection;
