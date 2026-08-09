/**
 * NOTE: this file wasn't part of the code you shared — reconstructed from
 * the screenshot's column layout (Product / In Stock / Price / Quantity /
 * Total). Grid columns match CartItem's so everything lines up.
 *
 * Hidden below `sm` — CartItem shows inline labels ("Price:", "Total:", etc.)
 * in its mobile card layout instead, so a separate header row isn't needed
 * once it's no longer a table.
 */
const CartTableHeader = ({
  columns = ["Product", "In Stock", "Price", "Quantity", "Total"],
}) => {
  return (
    <div className="hidden px-6 pb-3 pt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#86806F] sm:grid sm:grid-cols-[2.2fr_1fr_0.8fr_1fr_0.8fr] sm:items-center sm:gap-4">
      {columns.map((column) => (
        <span key={column}>{column}</span>
      ))}
    </div>
  );
};

export default CartTableHeader;
