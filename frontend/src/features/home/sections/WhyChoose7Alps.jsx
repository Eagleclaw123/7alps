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

const WhyChoose7Alps = () => {
  return (
    <section className="px-6 xl:px-0 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col xl:grid xl:grid-cols-2 gap-4">
          <div className="order-1 flex flex-col justify-between">
            <motion.h2
              className="text-[28px] md:text-[44px] mb-8 font-semibold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Wellness Rooted in Nature, Crafted with Care
            </motion.h2>

            <motion.ul
              className="hidden xl:grid grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {whyChooseUs.map(({ heading, subHeading, icon: Icon }) => (
                <motion.li key={heading} variants={itemVariants}>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center bg-[#EFEFEF]">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-[22px] font-medium">{heading}</h3>
                  <p className="text-[16px]">{subHeading}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className="relative order-2 min-h-[400px] overflow-hidden rounded-2xl md:min-h-[600px]">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="https://res.cloudinary.com/dasvdkncm/video/upload/v1783646118/5480218-uhd_3840_2160_25fps_lul7ir.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute left-6 top-6 flex items-center gap-2 rounded bg-white/90 px-4 py-2 backdrop-blur-sm">
              <p className="text-md font-medium text-[#047B22]">
                Why Choose 7ALP's
              </p>
            </div>
          </div>

          <motion.ul
            className="order-3 xl:hidden grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {whyChooseUs.map(({ heading, subHeading, icon: Icon }) => (
              <motion.li key={heading} variants={itemVariants}>
                <div className="mb-2 flex h-10 w-10 items-center justify-center bg-[#EFEFEF]">
                  <Icon size={24} />
                </div>

                <h3 className="text-[22px] font-medium">{heading}</h3>
                <p className="text-[16px]">{subHeading}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose7Alps;
