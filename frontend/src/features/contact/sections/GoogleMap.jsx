import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

/* Dashed "perforation" strip — the seed-packet detail used across the site */
const Perforation = () => (
  <div
    className="h-px w-full"
    style={{
      backgroundImage:
        "repeating-linear-gradient(to right, #C9C2AE 0, #C9C2AE 6px, transparent 6px, transparent 13px)",
    }}
  />
);

const GoogleMap = () => {
  return (
    <section>
      <motion.div
        className="mb-12 max-w-7xl mx-auto border border-[#E3DFD2] bg-white p-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="mb-6 flex items-center gap-2">
          <Leaf size={16} className="text-[#16442C]" />
          <h4 className="font-medium text-xl text-[#201F1B]">Find Us</h4>
        </div>
        <Perforation />
        <iframe
          title="7ALP Location"
          src="https://www.google.com/maps?q=Hyderabad&output=embed"
          className="mt-6 w-full h-[400px] grayscale-[15%]"
          loading="lazy"
          allowFullScreen
        />
      </motion.div>
    </section>
  );
};

export default GoogleMap;
