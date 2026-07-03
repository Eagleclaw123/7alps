import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";

const CartList = ({ cartItems, updateQuantity, removeItem }) => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Cart Items */}
      <div className="space-y-6 p-6 rounded-3xl border border-gray-100 bg-white">
        {cartItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
              duration: 0.4,
            }}
          >
            <CartItem
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CartList;
