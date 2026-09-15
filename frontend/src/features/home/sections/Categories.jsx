import { useState } from "react";
import { motion } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";

import { Link } from "react-router-dom";

import { categories } from "../../products/data/categoriesData";

const Categories = () => {
  const [activeId, setActiveId] = useState(categories[0]?.id);

  return (
    <section className="overflow-hidden bg-[#F4F1E8]">
      <div className="mx-auto max-w-[1600px] px-5 pt-24 sm:px-8 lg:px-12 xl:px-16">
        {/* HEADER */}
        <div className="mb-14 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <div className="mb-8 flex items-center gap-4">
              <span className="font-ibm-mono text-[10px] font-medium uppercase tracking-[0.3em] text-[#B65F3A]">
                01
              </span>

              <span className="h-px w-16 bg-[#B65F3A]" />

              <span className="font-ibm-mono text-[10px] font-medium uppercase tracking-[0.3em] text-[#756B61]">
                Collections
              </span>
            </div>

            <h2 className="max-w-5xl font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.075em] text-[#241B16]">
              Rooted in nature.
              <br />
              <span className="font-normal text-[#B65F3A]">
                Made for living.
              </span>
            </h2>
          </div>

          <div className="lg:mb-2">
            <div className="mb-5 h-px w-8 bg-[#B65F3A]" />

            <p className="max-w-sm font-manrope text-sm leading-7 text-[#665D55] md:text-base">
              Discover thoughtfully selected botanical ingredients for hair,
              skin, health and everyday wellness.
            </p>

            <p className="mt-5 font-ibm-mono text-[9px] uppercase tracking-[0.22em] text-[#95887B]">
              04 Collections
            </p>
          </div>
        </div>
        {/* DESKTOP GALLERY */}
        <div
          className="hidden h-[680px] w-full gap-[2px] lg:flex"
          onMouseLeave={() => setActiveId(categories[0]?.id)}
        >
          {categories.map((category, index) => {
            const isActive = category.id === activeId;

            return (
              <motion.div
                key={category.id}
                layout
                initial={false}
                animate={{
                  flexGrow: isActive ? 2.6 : 1,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative min-w-0 cursor-pointer overflow-hidden bg-[#D8D4C7]"
                onMouseEnter={() => setActiveId(category.id)}
                onFocus={() => setActiveId(category.id)}
                tabIndex={0}
              >
                {/* IMAGE */}
                <motion.img
                  src={category.image}
                  alt={category.title}
                  initial={false}
                  animate={{
                    scale: isActive ? 1.04 : 1.1,
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Overlay */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive ? 0.25 : 0.48,
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-[#10271D]"
                />

                {/* Vertical number */}
                <div className="absolute left-5 top-6">
                  <span className="font-ibm-mono text-[10px] tracking-[0.2em] text-white/70">
                    0{index + 1}
                  </span>
                </div>

                {/* Collapsed title */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive ? 0 : 1,
                  }}
                  transition={{ duration: 0.25 }}
                  className="absolute bottom-8 left-6"
                >
                  <p
                    className="font-manrope text-lg font-medium tracking-[-0.02em] text-white"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {category.title}
                  </p>
                </motion.div>

                {/* Active content */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 25,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: isActive ? 0.15 : 0,
                  }}
                  className="absolute bottom-0 left-0 right-0 p-8 xl:p-10"
                >
                  <div className="max-w-lg">
                    <p className="mb-4 font-ibm-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
                      Botanical Collection / 0{index + 1}
                    </p>

                    <h3 className="font-manrope text-[clamp(2.8rem,4vw,5rem)] font-medium leading-[0.88] tracking-[-0.06em] text-white">
                      {category.title}
                    </h3>

                    <div className="mt-7 flex items-end justify-between gap-8">
                      <p className="max-w-sm text-sm leading-6 text-white/70">
                        {category.description}
                      </p>

                      <Link
                        to="/products"
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-[#173328]"
                      >
                        <GoArrowUpRight size={19} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* MOBILE GALLERY */}
        <div className="flex flex-col lg:hidden">
          {categories.map((category, index) => {
            const isActive = category.id === activeId;

            return (
              <motion.div
                key={category.id}
                layout
                className="relative overflow-hidden border-t border-[#C9C8BC] last:border-b"
              >
                {/* Mobile heading */}
                <button
                  type="button"
                  onClick={() => setActiveId(isActive ? null : category.id)}
                  className="relative z-10 flex w-full items-center justify-between py-6 text-left"
                >
                  <div className="flex items-center gap-5">
                    <span className="font-ibm-mono text-[10px] tracking-[0.2em] text-[#87907C]">
                      0{index + 1}
                    </span>

                    <span className="font-manrope text-xl font-medium tracking-[-0.03em] text-[#173328]">
                      {category.title}
                    </span>
                  </div>

                  <motion.span
                    animate={{
                      rotate: isActive ? 45 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#AEB1A4] text-[#173328]"
                  >
                    <GoArrowUpRight size={17} />
                  </motion.span>
                </button>

                {/* Mobile image */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isActive ? 430 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative overflow-hidden"
                >
                  <img
                    src={category.image}
                    alt={category.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#10271D]/85 via-transparent to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="mb-3 font-ibm-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
                      Collection / 0{index + 1}
                    </p>

                    <p className="max-w-sm text-sm leading-6 text-white/75">
                      {category.description}
                    </p>

                    <Link
                      to="/products"
                      className="mt-5 flex items-center gap-3 text-sm font-medium text-white"
                    >
                      Explore collection
                      <GoArrowUpRight size={17} />
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-[#C9C8BC] pt-6 sm:flex-row sm:items-center">
          <span className="font-ibm-mono text-[9px] uppercase tracking-[0.25em] text-[#858A80]">
            Botanical ingredients / Everyday rituals
          </span>

          <span className="text-xs text-[#858A80]">04 collections</span>
        </div>
      </div>
    </section>
  );
};

export default Categories;
