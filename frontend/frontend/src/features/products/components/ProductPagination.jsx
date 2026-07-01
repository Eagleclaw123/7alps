import {
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import Button from "../../../shared/components/ui/Button";

const ProductPagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    return [1, 2, "...", totalPages];
  };

  return (
    <div className="mt-10">
      {/* Mobile Pagination */}
      <div className="flex justify-center items-center gap-2 md:hidden">
        <Button
          variant="secondary"
          size="md"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MdKeyboardArrowLeft />
          Back
        </Button>

        <Button
          variant={currentPage === 1 ? "primary" : "secondary"}
          size="md"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="w-10 h-10"
        >
          1
        </Button>

        <span className="w-10 h-10 flex items-center justify-center text-gray-500 font-medium">
          ...
        </span>

        <Button
          variant={currentPage === totalPages ? "primary" : "secondary"}
          size="md"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="w-10 h-10"
        >
          {totalPages}
        </Button>

        <Button
          variant="secondary"
          size="md"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <MdKeyboardArrowRight />
        </Button>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden md:flex justify-end items-center gap-2 flex-wrap">
        <Button
          variant="secondary"
          size="md"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MdKeyboardDoubleArrowLeft />
          First
        </Button>

        <Button
          variant="secondary"
          size="md"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MdKeyboardArrowLeft />
          Back
        </Button>

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="w-10 h-10 flex items-center justify-center text-gray-500 font-medium"
            >
              ...
            </span>
          ) : (
            <Button
              key={`page-${page}`}
              variant={currentPage === page ? "primary" : "secondary"}
              size="md"
              onClick={() => onPageChange(page)}
              className="w-10 h-10"
            >
              {page}
            </Button>
          ),
        )}

        <Button
          variant="secondary"
          size="md"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <MdKeyboardArrowRight />
        </Button>

        <Button
          variant="secondary"
          size="md"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Last
          <MdKeyboardDoubleArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default ProductPagination;
