import { processData } from "../data/processData";

const HowItWorks = () => {
  return (
    <section className="px-6 py-16 xl:px-0">
      <div className="mx-auto max-w-7xl space-y-24">
        {processData.map((item, sectionIndex) => (
          <div
            key={item.id}
            className={`grid gap-12 lg:grid-cols-2 ${
              sectionIndex % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            {/* Content */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-[#008521]">
                  {item.step}
                </span>

                <h2 className="mt-2 text-[28px] font-semibold md:text-[44px]">
                  {item.title}
                </h2>

                <h3 className="mt-4 text-2xl font-medium text-[#2C2C2C]">
                  {item.heading}
                </h3>

                <p className="mt-5 leading-8 text-gray-600">
                  {item.description}
                </p>
              </div>

              <ul className="mt-8 flex flex-col gap-5">
                {item.points.map((point, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5E9] font-semibold text-[#008521]">
                      {index + 1}
                    </div>

                    <p className="text-lg text-gray-700">{point}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image */}
            <div className="overflow-hidden rounded-3xl">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-[300px] w-full rounded-3xl object-cover md:h-[450px] xl:h-[550px]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
