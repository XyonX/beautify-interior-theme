"use client";
import { useEffect } from "react";
import { useMetaPixel } from "@/hooks/use-meta-pixel";

export function ProductViewTracker({ product }) {
  const { trackViewContent } = useMetaPixel();

  useEffect(() => {
    if (product) {
      // Track product view after a short delay to ensure user is actually viewing
      const timer = setTimeout(() => {
        trackViewContent({
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category || "General",
        });
      }, 2000); // 2 second delay

      return () => clearTimeout(timer);
    }
  }, [product, trackViewContent]);

  return null; // This component doesn't render anything
} 