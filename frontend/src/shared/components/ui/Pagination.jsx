import {
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import Button from "../../../shared/components/ui/Button";

/**
 * Reusable pagination component.
 *
 * @param {number} currentPage - The currently active page (1-indexed).
 * @param {number} totalPages - Total number of pages.
 * @param {(page: number) => void} onPageChange - Called with the new page number.
 * @param {number} [siblingCount=1] - How many page numbers to show on each side of the current page (desktop view).
 * @param {boolean} [showFirstLast=true] - Whether to show the "First"/"Last" buttons on desktop.
 */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
}) => {
  const goTo = (page) => {
    const safePage = Math.min(Math.max(page, 1), totalPages);
    if (safePage !== currentPage) onPageChange(safePage);
  };

  // Builds a page list like [1, "...", 4, 5, 6, "...", 20]
  const getPageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 5; // first + last + current + 2 ellipses + siblings

    if (totalPages <= totalNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < totalPages - 1;

    if (!showLeftEllipsis && showRightEllipsis) {
      const leftRange = Array.from(
        { length: 3 + siblingCount * 2 },
        (_, i) => i + 1,
      );
      return [...leftRange, "...", totalPages];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
      const rightRange = Array.from(
        { length: 3 + siblingCount * 2 },
        (_, i) => totalPages - (3 + siblingCount * 2) + i + 1,
      );
      return [1, "...", ...rightRange];
    }

    const middleRange = Array.from(
      { length: rightSibling - leftSibling + 1 },
      (_, i) => leftSibling + i,
    );
    return [1, "...", ...middleRange, "...", totalPages];
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-10">
      {/* Mobile Pagination */}
      <div className="flex justify-center items-center gap-2 md:hidden">
        <Button
          variant="secondary"
          size="md"
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MdKeyboardArrowLeft />
          Back
        </Button>

        <Button
          variant={currentPage === 1 ? "primary" : "secondary"}
          size="md"
          onClick={() => goTo(1)}
          disabled={currentPage === 1}
          className="w-10 h-10"
        >
          1
        </Button>

        {totalPages > 2 && (
          <span className="w-10 h-10 flex items-center justify-center text-gray-500 font-medium">
            ...
          </span>
        )}

        {totalPages > 1 && (
          <Button
            variant={currentPage === totalPages ? "primary" : "secondary"}
            size="md"
            onClick={() => goTo(totalPages)}
            disabled={currentPage === totalPages}
            className="w-10 h-10"
          >
            {totalPages}
          </Button>
        )}

        <Button
          variant="secondary"
          size="md"
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <MdKeyboardArrowRight />
        </Button>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden md:flex justify-end items-center gap-2 flex-wrap">
        {showFirstLast && (
          <Button
            variant="secondary"
            size="md"
            onClick={() => goTo(1)}
            disabled={currentPage === 1}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MdKeyboardDoubleArrowLeft />
            First
          </Button>
        )}

        <Button
          variant="secondary"
          size="md"
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MdKeyboardArrowLeft />
          Back
        </Button>

        {pageNumbers.map((page, index) =>
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
              onClick={() => goTo(page)}
              className="w-10 h-10"
            >
              {page}
            </Button>
          ),
        )}

        <Button
          variant="secondary"
          size="md"
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <MdKeyboardArrowRight />
        </Button>

        {showFirstLast && (
          <Button
            variant="secondary"
            size="md"
            onClick={() => goTo(totalPages)}
            disabled={currentPage === totalPages}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Last
            <MdKeyboardDoubleArrowRight />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
