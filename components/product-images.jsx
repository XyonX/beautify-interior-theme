// components/product-images.jsx
"use client";
import { useState } from "react";
import Image from "next/image";

export function ProductImages({ images }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-3">
      <div className="aspect-square overflow-hidden rounded-sm bg-white border border-stone-100">
        <Image
          src={`${process.env.NEXT_PUBLIC_CDN_URL}${
            images[selectedImage]?.url || `${process.env.NEXT_PUBLIC_CDN_URL}/site-data/placeholder.svg`
          }`}
          alt={images[selectedImage]?.alt_text || "Product image"}
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square overflow-hidden rounded-sm border transition-colors ${
              selectedImage === index
                ? "border-accent2-600"
                : "border-stone-100"
            }`}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_CDN_URL}${image.url}`}
              alt={image.alt_text || "Product image"}
              width={150}
              height={150}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
