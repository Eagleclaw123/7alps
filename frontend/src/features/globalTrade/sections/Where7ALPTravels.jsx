import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const Where7ALPTravels = () => {
  return (
    <section className="bg-[#0E3220] py-16">
      <div className="mx-auto max-w-7xl px-6 xl:px-0">
        {/* Heading */}
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            <Leaf className="h-3.5 w-3.5" />
            Where We Ship
          </div>

          <h2 className="font-medium text-3xl text-white md:text-[38px]">
            Where 7ALP Travels
          </h2>

          {/*
            NOTE: original copy said "Select any hub..." implying the map
            below is clickable/interactive. It's a static <img> with no
            handlers, so that copy overpromised — softened to describe what
            actually happens. If you want genuine hub interactivity (click a
            region, see a market panel swap in), that's a real feature to
            build, not a restyle — happy to scope it separately.
          */}
          <p className="mt-3 text-[15px] leading-7 text-white/70">
            A look at the markets we ship to and the routes that connect them —
            all radiating from our Hyderabad base.
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          className="mt-12 overflow-hidden border border-white/20"
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
