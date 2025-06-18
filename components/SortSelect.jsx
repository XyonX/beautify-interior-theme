"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SortSelect({ sortBy }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <Select value={sortBy} onValueChange={handleSortChange}>
      <SelectTrigger className="w-40 h-8 text-xs rounded-sm">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="featured">Featured</SelectItem>
        <SelectItem value="price-low">Price: Low to High</SelectItem>
        <SelectItem value="price-high">Price: High to Low</SelectItem>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="rating">Highest Rated</SelectItem>
      </SelectContent>
    </Select>
  );
}
