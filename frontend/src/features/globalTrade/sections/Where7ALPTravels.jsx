import { motion } from "framer-motion";

const Where7ALPTravels = () => {
  return (
    <section className="bg-[#00300F] py-16">
      <div className="mx-auto max-w-7xl px-6 xl:px-0">
        {/* Heading */}
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-white md:text-[38px]">
            Where 7ALP Travels
          </h2>

          <p className="mt-3 text-[15px] leading-7 text-white/70">
            Select any hub to see the market, what we ship there, and how it
            moves. Routes radiate from our Hyderabad base.
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          className="mt-12 overflow-hidden rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="h-[260px] sm:h-[320px] md:h-[420px] lg:h-[500px] overflow-hidden">
            <img
              src="https://res.cloudinary.com/dasvdkncm/image/upload/v1782921361/Rectangle_3463831_osj2ce.png"
              alt="Global trade logistics"
              className="block h-full w-full scale-[1.18] object-cover object-center"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Where7ALPTravels;
