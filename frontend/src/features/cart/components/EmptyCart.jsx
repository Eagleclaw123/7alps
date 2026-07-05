import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingCart, FiArrowRight } from "react-icons/fi";

import Button from "../../../shared/components/ui/Button";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <section className="flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg rounded-3xl text-center"
      >
        {/* Icon */}
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#F4FBF6]">
          <FiShoppingCart size={52} className="text-[#047B22]" />
        </div>

        {/* Title */}
        <h2 className="mt-4 text-3xl font-semibold text-[#202020]">
          Your Cart is Empty
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-sm leading-7 text-gray-500">
          Looks like you haven't added any herbal products yet. Explore our
          collections and discover natural wellness.
        </p>

        {/* CTA */}
        <Button
          variant="primary"
          size="lg"
          className="mt-5 inline-flex items-center gap-2"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
          <FiArrowRight />
        </Button>
      </motion.div>
    </section>
  );
};

export default EmptyCart;
