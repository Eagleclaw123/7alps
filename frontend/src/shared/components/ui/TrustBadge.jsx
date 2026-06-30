import { motion } from "framer-motion";

const TrustBadge = ({ avatars }) => (
  <div className="bg-[#1D1D1D] rounded-3xl px-4 py-2 inline-flex items-center gap-3">
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center">
        {avatars.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            whileHover={{ y: -4 }}
            className={i !== 0 ? "-ml-3" : ""}
          >
            <img
              src={img}
              alt="User"
              className="w-7 h-7 rounded-full object-cover border-2 border-white bg-white"
            />
          </motion.div>
        ))}
      </div>
      <p className="text-white/80 text-xs sm:text-sm">
        Trusted by <span className="text-[#FFEA9C] italic">100k+</span> Users
      </p>
    </div>
  </div>
);

export default TrustBadge;
