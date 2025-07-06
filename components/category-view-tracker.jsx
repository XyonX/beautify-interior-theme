"use client";
import { useEffect } from "react";
import { useMetaPixel } from "@/hooks/use-meta-pixel";

export function CategoryViewTracker({ category }) {
  const { trackViewCategory } = useMetaPixel();

  useEffect(() => {
    if (category) {
      // Track category view after a short delay
      const timer = setTimeout(() => {
        trackViewCategory(category);
      }, 1000); // 1 second delay

      return () => clearTimeout(timer);
    }
  }, [category, trackViewCategory]);

  return null; // This component doesn't render anything
} 