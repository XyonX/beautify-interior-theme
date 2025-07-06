"use client";
import { useMetaPixel } from "@/hooks/use-meta-pixel";

export function SearchTracker({ onSearch }) {
  const { trackSearch } = useMetaPixel();

  const handleSearch = (searchTerm) => {
    if (searchTerm && searchTerm.trim()) {
      trackSearch(searchTerm.trim());
    }
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return { handleSearch };
} 