"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProductsFilters({
  categories,
  currentSort,
  currentCategory,
  currentSearch,
  currentPage,
}) {
  const router = useRouter();

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
    { value: "rating", label: "Highest Rated" },
  ];

  const buildUrl = (params) => {
    const searchParams = new URLSearchParams();

    if (params.sort && params.sort !== "featured")
      searchParams.set("sort", params.sort);
    if (params.category) searchParams.set("category", params.category);
    if (params.search) searchParams.set("search", params.search);
    if (params.page && params.page !== 1)
      searchParams.set("page", params.page.toString());

    const queryString = searchParams.toString();
    return `/products${queryString ? `?${queryString}` : ""}`;
  };

  const handleCategoryChange = (categoryId) => {
    const url = buildUrl({
      sort: currentSort,
      category: categoryId === "all" ? "" : categoryId,
      search: currentSearch,
      page: 1,
    });
    router.push(url);
  };

  const handleSortChange = (sortValue) => {
    const url = buildUrl({
      sort: sortValue,
      category: currentCategory,
      search: currentSearch,
      page: 1,
    });
    router.push(url);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
        <form action="/products" method="GET">
          <Input
            name="search"
            placeholder="Search products..."
            defaultValue={currentSearch}
            className="pl-10 rounded-sm border-stone-200"
          />
          {currentSort !== "featured" && (
            <input type="hidden" name="sort" value={currentSort} />
          )}
          {currentCategory && (
            <input type="hidden" name="category" value={currentCategory} />
          )}
        </form>
      </div>

      {/* Desktop Filters - Hidden on Mobile */}
      <div className="hidden lg:flex flex-wrap items-center gap-4">
        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-stone-600" />
          <span className="text-sm font-medium text-stone-800">Category:</span>
          <div className="flex flex-wrap gap-2">
            <Link
              href={buildUrl({
                sort: currentSort,
                search: currentSearch,
                page: 1,
              })}
              className={`text-xs px-3 py-1 rounded-sm border transition-colors ${
                !currentCategory
                  ? "bg-stone-800 text-white border-stone-800"
                  : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
              }`}
            >
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={buildUrl({
                  sort: currentSort,
                  category: category.id,
                  search: currentSearch,
                  page: 1,
                })}
                className={`text-xs px-3 py-1 rounded-sm border transition-colors ${
                  currentCategory === category.id
                    ? "bg-stone-800 text-white border-stone-800"
                    : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Sort Filter */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm font-medium text-stone-800">Sort:</span>
          <div className="flex gap-2">
            {sortOptions.map((option) => (
              <Link
                key={option.value}
                href={buildUrl({
                  sort: option.value,
                  category: currentCategory,
                  search: currentSearch,
                  page: 1,
                })}
                className={`text-xs px-3 py-1 rounded-sm border transition-colors ${
                  currentSort === option.value
                    ? "bg-stone-800 text-white border-stone-800"
                    : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                }`}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Filters - Dropdowns */}
      <div className="flex lg:hidden flex-col sm:flex-row gap-3">
        {/* Category Dropdown */}
        <div className="flex-1">
          <Select
            value={currentCategory || "all"}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-full rounded-sm border-stone-200">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-stone-600" />
                <SelectValue placeholder="All Categories" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Dropdown */}
        <div className="flex-1">
          <Select value={currentSort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full rounded-sm border-stone-200">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
