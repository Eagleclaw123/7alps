import { categories } from "../data/categoriesData";

const CategorySection = () => {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 xl:flex-row">
        <div className="flex h-full flex-col justify-center px-2 text-center xl:text-left">
          <h2 className="text-[36px] text-[#2C2C2C]">Shop by category</h2>
          <p>Everything you need best for your health & wellness</p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
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
