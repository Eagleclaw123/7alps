import { motion } from "framer-motion";
import { GoArrowRight } from "react-icons/go";
import { shelves } from "../data/shelves";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
const Categories = () => {
  return (
    <section className="px-6 xl:px-0 mt-16">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            className="max-w-xl space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#047B22]" />
              <p className="font-ibm-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-[#047B22] sm:text-sm">
                Wellness Collections
              </p>
            </div>

            <h2 className="text-[28px] md:text-[36px] xl:text-[40px] leading-tight font-semibold">
              Natural Wellness, Thoughtfully Crafted for{" "}
              <span className="font-manrope text-[#008521] font-normal">
                Every Part of You.
              </span>{" "}
            </h2>

            <p className="text-[15px] leading-7 text-gray-600 md:text-[18px] xl:text-[20px]">
              Discover thoughtfully curated herbal collections designed to
              nourish healthy hair, radiant skin, and overall wellness, helping
              you embrace a healthier lifestyle every day.
            </p>
          </motion.div>

          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#008521] px-6 py-3 text-white transition hover:bg-[#047B22] sm:w-fit lg:mb-4">
            Browse All
            <GoArrowRight className="text-lg" />
          </button>
        </div>
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {" "}
          {shelves.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{
                y: -6,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative h-[420px] w-full overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-2xl md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]"
            >
              {/* Background */}
              <img
                src={item.bgImage}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Content */}
              <div className="relative flex h-full flex-col justify-between p-6 text-white">
                <p className="text-[18px]">• {item.category}</p>

                <div>
                  <h3 className="mb-4 whitespace-pre-line text-[30px] font-semibold">
                    {item.title}
                  </h3>

                  <p className="max-w-[220px] text-[18px] text-white/85">
                    {item.description}
                  </p>
                </div>
              </div>

              <motion.img
                src={item.icon}
                alt=""
                className="absolute bottom-5 right-0 w-30"
                whileHover={{
                  rotate: -8,
                  scale: 1.08,
                }}
                transition={{
                  duration: 0.4,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
