import { motion } from "framer-motion";

import processData from "../data/processData.json";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
const OurProcess = () => {
  return (
    <section className="py-16 px-6 mt-5 xl:px-0 bg-[url('https://res.cloudinary.com/dasvdkncm/image/upload/v1781967638/Rectangle_3463735_ldme7s.png')] bg-cover bg-center bg-no-repeat">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          className="py-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[44px] text-white">Our Process</h2>
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {processData.map((item) => (
            <motion.li
              key={item.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.0,
                transition: { duration: 0.3 },
              }}
              className="h-[300px] backdrop-blur-md bg-[#D9D9D921] border border-white/20 rounded-2xl p-6 text-white flex flex-col justify-end"
            >
              <h3 className="text-[26px] font-semibold mb-3">{item.title}</h3>

              <p className="text-[16px] leading-7 text-white/80">
                {item.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default OurProcess;
