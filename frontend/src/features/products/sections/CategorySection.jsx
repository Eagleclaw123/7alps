import { categories } from "../data/categoriesData";

const CategorySection = () => {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 xl:flex-row">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {categories.map(({ id, title, image, className = "" }) => (
            <div key={id} className={`relative ${className}`}>
              <img
                src={image}
                alt={title}
                className="h-full w-full rounded-xl object-cover"
              />
              <span className="absolute bottom-4 left-4 text-lg font-medium text-white">
                {title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
