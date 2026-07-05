import { ChevronLeft, ChevronRight } from "lucide-react";

const OrderPagination = ({
  perPage = 15,
  totalResults = 276,
  currentPage = 1,
  totalPages = 10,
  onPageChange,
  onPerPageChange,
}) => {
  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, totalResults);

  // Show first page, last page, current page, and neighbors; collapse the rest with "..."
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4 text-sm text-gray-600">
      {/* Per page selector */}
      <div className="flex items-center gap-2">
        <span>Show products on a page</span>
        <select
          value={perPage}
          onChange={(e) => onPerPageChange?.(Number(e.target.value))}
          className="rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-800 focus:outline-none"
        >
          {[10, 15, 25, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* Page controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange?.(page)}
              className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition ${
                page === currentPage
                  ? "bg-[#0F6B3E] text-white"
                  : "text-gray-600 hover:bg-[#0F6B3E] hover:text-white"
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default OrderPagination;
