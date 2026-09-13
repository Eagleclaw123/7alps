const CartTableHeader = ({
  columns = ["Product", "In Stock", "Price", "Quantity", "Total"],
  showTotal = true,
}) => {
  const gridClass = showTotal
    ? "sm:grid-cols-[2.2fr_1fr_0.8fr_1fr_0.8fr]"
    : "sm:grid-cols-[2.2fr_1fr_0.8fr_1fr]";

  return (
    <div
      className={`hidden border-b border-[#D8CCC0] bg-[#EAE0D4] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#756A62] sm:grid ${gridClass} sm:items-center`}
    >
      {columns.map((column, index) => (
        <span
          key={column}
          className={index > 0 ? "border-l border-[#D8CCC0] pl-5" : ""}
        >
          {column}
        </span>
      ))}
    </div>
  );
};

export default CartTableHeader;
