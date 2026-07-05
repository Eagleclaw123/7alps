const CartFooter = ({ subtotal }) => (
  <div className="flex flex-col items-end gap-4 border-t border-gray-100 px-6 py-6">
    <div className="text-right">
      <p className="text-[18px] font-bold text-gray-900">
        Sub Total: &#x20B9;{subtotal.toFixed(2)}
      </p>
      <p className="text-xs text-gray-500">Excl. Tax and Delivery charge</p>
    </div>

    <div className="flex items-center gap-4 sm:gap-6">
      <button className="text-xs font-semibold uppercase tracking-wide text-gray-700 underline underline-offset-2 hover:text-black">
        Continue Shipping
      </button>
      <button className="rounded-md bg-[#0F6B3E] px-6 py-3 text-xs font-bold uppercase tracking-wide text-white">
        Go To Checkout
      </button>
    </div>
  </div>
);

export default CartFooter;
