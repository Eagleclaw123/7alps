import { motion } from "framer-motion";
import { whyChooseUs } from "../data/whyChooseData";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const WhyChoose = () => {
  return (
    <section className="py-15 px-6 xl:px-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col xl:grid xl:grid-cols-2 gap-4">
          <div className="order-1 flex flex-col justify-between">
            <motion.h2
              className="text-[28px] md:text-[44px] mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Authenticity You Can Trust, Quality You Can Feel
            </motion.h2>

            <motion.ul
              className="hidden xl:grid grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {whyChooseUs.map(({ heading, subHeading, icon: Icon }, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center bg-[#EFEFEF]">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-[24px] font-semibold">{heading}</h3>
                  <p className="text-[16px]">{subHeading}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div
            className="order-2 min-h-[400px] md:min-h-[600px] rounded-2xl bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dasvdkncm/image/upload/v1781971248/Rectangle_3463742_npqczv.png')",
            }}
          />

          <motion.ul
            className="order-3 xl:hidden grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {whyChooseUs.map(({ heading, subHeading, icon: Icon }, index) => (
              <motion.li key={index} variants={itemVariants}>
                <div className="mb-2 flex h-10 w-10 items-center justify-center bg-[#EFEFEF]">
                  <Icon size={24} />
                </div>

                <h3 className="text-[24px] font-semibold">{heading}</h3>
                <p className="text-[16px]">{subHeading}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
