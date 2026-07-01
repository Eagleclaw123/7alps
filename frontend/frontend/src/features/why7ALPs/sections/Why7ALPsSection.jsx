import { benefitsLeft, benefitsRight } from "../data/benefitsData";

const Why7ALPsSection = () => {
  return (
    <section className="py-14 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Heading */}

        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#2C2C2C]">
            Why 7 ALP's
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-7">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consequuntur error nostrum dolorum ullam inventore aut nesciunt
            molestiae consequatur.
          </p>
        </div>

        {/* Content */}

        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-12 lg:gap-10">
          {/* Left */}

          <div className="space-y-10 md:space-y-14 lg:space-y-20 order-2 lg:order-1">
            {benefitsLeft.map((item) => (
              <div
                key={item.id}
                className="text-right md:text-center lg:text-right space-y-2"
              >
                <span className="inline-block text-4xl sm:text-5xl font-bold text-gray-100 select-none">
                  {item.id}
                </span>

                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="text-gray-500 leading-7 text-sm sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Center */}

          <div className="flex justify-center order-2 md:order-1 lg:order-2">
            <img
              src="https://res.cloudinary.com/dasvdkncm/image/upload/v1782614642/front-view-natural-cannabis-oil-bottle-assortment-removebg-preview_ezygcs.png"
              alt="Product"
              className="w-52 sm:w-64 md:w-72 lg:w-80 xl:w-96 object-contain"
            />
          </div>

          {/* Right */}

          <div className="space-y-10 md:space-y-14 lg:space-y-20 order-3">
            {benefitsRight.map((item) => (
              <div
                key={item.id}
                className="text-left md:text-center lg:text-left space-y-2"
              >
                <span className="inline-block text-4xl sm:text-5xl font-bold text-gray-100 select-none">
                  {item.id}
                </span>

                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="text-gray-500 leading-7 text-sm sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Why7ALPsSection;
