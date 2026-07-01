import { motion } from "framer-motion";
import { useNavigationDirection } from "../../../app/providers/NavigationProvider";
const AnimatedPage = ({ children }) => {
  const { direction } = useNavigationDirection();

  return (
    <motion.div
      initial={{
        x: direction === "forward" ? 120 : -120,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      exit={{
        x: direction === "forward" ? -120 : 120,
        opacity: 0,
      }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
