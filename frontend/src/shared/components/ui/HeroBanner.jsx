import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

/**
 * Reusable hero banner used across pages (Contact, About, Shop, etc.)
 *
 * Props:
 * - eyebrow: small uppercase label above the title (e.g. "Contact")
 * - title: main heading (e.g. "Contact Us")
 * - description: supporting copy under the divider
 * - image: background image URL
 * - height: optional Tailwind height class (defaults to "h-[50vh]")
 */
const HeroBanner = ({
  eyebrow,
  title,
  description,
  image,
  height = "h-[50vh] sm:h-[30vh] xl:h-[50vh]",
}) => {
  return (
    <div
      className={`relative overflow-hidden bg-[#EFEBDD] bg-cover bg-center px-6 xl:px-0 ${height} flex flex-col justify-center items-start`}
      style={{ backgroundImage: `url('${image}')` }}
    >
      {/* <Leaf className="pointer-events-none absolute -left-6 top-6 h-24 w-24 rotate-12 text-[#3F6B2C]/10" />
      <Leaf className="pointer-events-none absolute -right-4 bottom-0 h-32 w-32 -rotate-12 text-[#3F6B2C]/10" /> */}

      <motion.div
        className="relative mx-auto w-full max-w-7xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#3F6B2C]">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-2 font-serif text-5xl text-[#1A1A18]">{title}</h2>
        <div className="mt-3 h-[2px] w-10 bg-[#3F6B2C]" />
        {description && (
          <p className="mt-3 max-w-md text-sm text-[#6B6A63]">{description}</p>
        )}
      </motion.div>
    </div>
  );
};

export default HeroBanner;
