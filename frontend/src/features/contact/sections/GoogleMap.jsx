import { motion } from "framer-motion";

const GoogleMap = () => {
  return (
    <section className="">
      <motion.div
        className="mt-12 max-w-7xl mx-auto mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <iframe
          title="7ALP Location"
          src="https://www.google.com/maps?q=Hyderabad&output=embed"
          className="w-full h-[400px] rounded-xl"
          loading="lazy"
          allowFullScreen
        />
      </motion.div>
    </section>
  );
};

export default GoogleMap;
