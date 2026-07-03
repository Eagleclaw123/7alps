import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="border-b border-gray-100 p-5">
      <div className="flex flex-col gap-5 sm:flex-row">
        {/* Product Image */}
        <div className="flex justify-center sm:block">
          <img
            src={item.image}
            alt={item.name}
            className="h-28 w-28 rounded-xl border object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-1 flex-col">
          {/* Top */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-[#202020]">
                {item.name}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Weight:{" "}
                <span className="font-medium text-[#047B22]">
                  {item.weight}
                </span>
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Category: {item.category}
              </p>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="flex items-center gap-2 self-start rounded-lg px-3 py-2 text-red-500 transition hover:bg-red-50"
            >
              <FiTrash2 size={18} />

              <span className="text-sm font-medium">Remove</span>
            </button>
          </div>

          {/* Bottom */}
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Quantity */}
            <div className="flex w-fit items-center rounded-full border border-gray-200 bg-[#F8FAF8]">
              <button
                onClick={() => updateQuantity(item.id, "decrease")}
                className="rounded-l-full p-3 transition hover:bg-gray-100"
              >
                <FiMinus size={18} />
              </button>

              <span className="min-w-[45px] text-center font-semibold">
                {item.quantity}
              </span>

              <button
                onClick={() => updateQuantity(item.id, "increase")}
                className="rounded-r-full p-3 transition hover:bg-gray-100"
              >
                <FiPlus size={18} />
              </button>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="text-sm text-gray-500">
                ₹{item.price} × {item.quantity}
              </p>

              <h4 className="text-2xl font-bold text-[#047B22]">
                ₹{item.price * item.quantity}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
