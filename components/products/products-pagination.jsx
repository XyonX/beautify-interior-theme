import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProductsPagination({
  currentPage,
  totalPages,
  sortBy,
  categoryFilter,
  searchQuery,
}) {
  const buildUrl = (page) => {
    const searchParams = new URLSearchParams();

    if (sortBy && sortBy !== "featured") searchParams.set("sort", sortBy);
    if (categoryFilter) searchParams.set("category", categoryFilter);
    if (searchQuery) searchParams.set("search", searchQuery);
    if (page !== 1) searchParams.set("page", page.toString());

    const queryString = searchParams.toString();
    return `/products${queryString ? `?${queryString}` : ""}`;
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    // Handle single page case
    if (totalPages === 1) {
      return [1];
    }

    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 mt-8">
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link href={buildUrl(currentPage - 1)}>
          <Button
            variant="outline"
            size="sm"
            className="rounded-sm w-full sm:w-auto"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
        </Link>
      )}

      {/* Page Numbers */}
      <div className="flex items-center space-x-1 overflow-x-auto max-w-full">
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="px-2 text-stone-400 flex-shrink-0"
              >
                ...
              </span>
            );
          }

          return (
            <Link key={page} href={buildUrl(page)}>
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className={`rounded-sm flex-shrink-0 min-w-[2rem] ${
                  currentPage === page
                    ? "bg-stone-800 text-white"
                    : "text-stone-600 hover:text-stone-800"
                }`}
              >
                {page}
              </Button>
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link href={buildUrl(currentPage + 1)}>
          <Button
            variant="outline"
            size="sm"
            className="rounded-sm w-full sm:w-auto"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      )}
    </div>
  );
}
