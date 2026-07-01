import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const StatCard = ({ title, value, icon: Icon, growth, color = "#0F6B3E" }) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      transition={{
        duration: 0.25,
      }}
      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `${color}15`,
          }}
        >
          <Icon
            size={26}
            style={{
              color,
            }}
          />
        </div>

        {growth && (
          <div className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-600">
            <FiArrowUpRight size={15} />
            {growth}
          </div>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>

        <h2 className="mt-2 text-4xl font-bold text-[#202020]">{value}</h2>
      </div>
    </motion.div>
  );
};

export default StatCard;
