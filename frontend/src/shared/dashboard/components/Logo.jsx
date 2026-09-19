import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const Logo = ({ collapsed = false }) => {
  return (
    <Link to="/" className="flex items-center gap-3 overflow-hidden">
      <img
        src="https://res.cloudinary.com/dasvdkncm/image/upload/v1789824060/7_ALPs_logo_q69vip.jpg"
        alt="7ALP's"
        className="h-11 w-11 shrink-0 object-contain rounded-xl"
      />

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            {/* <h2 className="text-lg font-bold text-[#1B1B1B]">7ALP's</h2> */}

            <p className="text-xs text-gray-500">Dashboard</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
};

export default Logo;
