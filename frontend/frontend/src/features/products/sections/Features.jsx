import { GoArrowRight } from "react-icons/go";
import { features } from "../data/featuresData";

const Features = () => {
  return (
    <section className="px-6 pt-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 xl:flex-row">
        <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center rounded-2xl bg-[#008521]/40 p-8 text-center xl:mx-0 xl:w-[30%] xl:max-w-none xl:items-start xl:text-left">
          <h2 className="text-3xl font-semibold text-[#2C2C2C]">
            Shop by Category
          </h2>

          <p className="mt-3 text-gray-700">
            Everything you need for your health & wellness.
          </p>

          <button className="mt-6 flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black">
            Explore
            <GoArrowRight />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 rounded-2xl bg-[#C9FF8F] p-8 md:flex-row xl:w-[70%]">
          {features.map(({ id, icon: Icon, title, description }) => (
            <div key={id} className="flex flex-col items-center text-center">
              <Icon className="mb-4 text-2xl text-[#817400]" />

              <h3 className="text-[22px] font-semibold text-[#7F7700]">
                {title}
              </h3>

              <p className="mt-2 text-gray-700">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
