import { categories } from "../../products/data/categoriesData";
import SectionHeading from "../components/SectionHeading";

const Categories = () => {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our Collection"
          title={
            <>
              Shop by{" "}
              <span className="font-manrope text-[#008521] font-normal">
                Category
              </span>
            </>
          }
          description="From hair care to everyday wellness, find single-origin herbal powders sorted the way you actually shop."
        />
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 mt-10">
          {categories.map(
            ({ id, title, image, className = "", description }) => (
              <div key={id} className={`relative `}>
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full rounded-xl object-cover"
                />
                <span className="absolute bottom-10 sm:bottom-14 md:bottom-20 left-3 sm:left-4 right-3 sm:right-4 text-sm sm:text-base md:text-lg font-medium text-white line-clamp-2">
                  {title}
                </span>
                <span className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-xs sm:text-lg lg:text-base font-medium text-white/80 line-clamp-2">
                  {description}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
