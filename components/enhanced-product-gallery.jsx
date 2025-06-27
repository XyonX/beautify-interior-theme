"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn, Maximize2 } from "lucide-react";

export function EnhancedProductGallery({ images, productName }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousIndex, setPreviousIndex] = useState(null);
  const imageRef = useRef(null);

  const zoomFactor = 2;

  const handleImageSelect = (index) => {
    if (index === selectedImage || isTransitioning) return;

    setPreviousIndex(selectedImage);
    setIsTransitioning(true);
    setIsZoomed(false);

    setTimeout(() => {
      setSelectedImage(index);
      setTimeout(() => {
        setIsTransitioning(false);
        setPreviousIndex(null);
      }, 300);
    }, 0);
  };

  const handleMouseMove = (e) => {
    if (!imageRef.current || !isZoomed) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomPosition({ x: 50, y: 50 });
  };

  const nextImage = () => {
    const nextIndex = (selectedImage + 1) % images.length;
    handleImageSelect(nextIndex);
  };

  const prevImage = () => {
    const prevIndex =
      selectedImage === 0 ? images.length - 1 : selectedImage - 1;
    handleImageSelect(prevIndex);
  };

  const currentImage = images[selectedImage];

  return (
    <div className="space-y-3 sm:space-y-4 relative">
      {/* Main Image Display */}
      <div
        ref={imageRef}
        className="aspect-square overflow-hidden bg-white border border-gray-200 rounded-lg cursor-zoom-in relative group"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full h-full overflow-hidden">
          {isTransitioning && previousIndex !== null && (
            <Image
              src={
                `${process.env.NEXT_PUBLIC_CDN_URL}${images[previousIndex]?.url}` ||
                "/placeholder.svg"
              }
              alt={images[previousIndex]?.alt_text || productName}
              width={600}
              height={600}
              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 transform -translate-x-full"
            />
          )}
          <Image
            src={
              `${process.env.NEXT_PUBLIC_CDN_URL}${currentImage?.url}` ||
              "/placeholder.svg"
            }
            alt={currentImage?.alt_text || productName}
            width={600}
            height={600}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 transform ${
              isTransitioning ? "translate-x-0" : "translate-x-0"
            }`}
            style={{
              transform: isTransitioning ? "translateX(0)" : "translateX(0)",
            }}
            priority
          />
        </div>

        {/* Zoom Indicator */}
        {!isZoomed && (
          <div className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ZoomIn className="h-4 w-4" />
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-10 w-10 p-0"
              onClick={prevImage}
              disabled={isTransitioning}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-10 w-10 p-0"
              onClick={nextImage}
              disabled={isTransitioning}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* Fullscreen Button */}
        <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="absolute bottom-3 right-3 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-10 w-10 p-0"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-7xl w-full h-[90vh] p-0">
            <FullscreenGallery
              images={images}
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
              onClose={() => setIsFullscreen(false)}
              productName={productName}
            />
          </DialogContent>
        </Dialog>

        {/* Magnified View */}
        {isZoomed && (
          <div className="absolute left-[100%] top-0 w-[300px] h-[300px] ml-4 overflow-hidden bg-white border border-gray-200 rounded-lg">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_CDN_URL}${currentImage.url})`,
                backgroundSize: `${600 * zoomFactor}px ${600 * zoomFactor}px`,
                backgroundPosition: `${
                  150 - (zoomPosition.x / 100) * 600 * zoomFactor
                }px ${150 - (zoomPosition.y / 100) * 600 * zoomFactor}px`,
              }}
            />
          </div>
        )}
      </div>

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="hidden sm:block absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded text-sm">
          {selectedImage + 1} / {images.length}
        </div>
      )}

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => handleImageSelect(index)}
            disabled={isTransitioning}
            className={`aspect-square overflow-hidden border-2 rounded-lg transition-all duration-200 ${
              selectedImage === index
                ? "border-amazon-orange ring-2 ring-amazon-orange/20"
                : "border-gray-200 hover:border-gray-300"
            } ${isTransitioning ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Image
              src={
                `${process.env.NEXT_PUBLIC_CDN_URL}${image.url}` ||
                "/placeholder.svg"
              }
              alt={image.alt_text || `${productName} ${index + 1}`}
              width={150}
              height={150}
              className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Zoom Instructions */}
      <div className="text-center text-xs text-gray-500 mt-2">
        Hover over image to zoom • Click thumbnails to switch • Click fullscreen
        to expand
      </div>
    </div>
  );
}

// Fullscreen Gallery Component (unchanged)
function FullscreenGallery({
  images,
  selectedImage,
  onImageSelect,
  onClose,
  productName,
}) {
  const [currentIndex, setCurrentIndex] = useState(selectedImage);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setCurrentIndex(selectedImage);
  }, [selectedImage]);

  const changeImage = (newIndex) => {
    if (newIndex === currentIndex || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      onImageSelect(newIndex);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    changeImage(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    changeImage(prevIndex);
  };

  const handleKeyDown = (e) => {
    if (isTransitioning) return;
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") onClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, isTransitioning]);

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70 h-10 w-10 p-0"
      >
        <X className="h-5 w-5" />
      </Button>

      {/* Main Image */}
      <div className="relative w-full h-full flex items-center justify-center p-8">
        <div
          className={`transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src={
              `${process.env.NEXT_PUBLIC_CDN_URL}${images[currentIndex]?.url}` ||
              "/placeholder.svg"
            }
            alt={images[currentIndex]?.alt_text || productName}
            width={1200}
            height={1200}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={prevImage}
            disabled={isTransitioning}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 h-12 w-12 p-0 disabled:opacity-30"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextImage}
            disabled={isTransitioning}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 h-12 w-12 p-0 disabled:opacity-30"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Thumbnail Strip */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-2 rounded-lg">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => changeImage(index)}
            disabled={isTransitioning}
            className={`w-16 h-16 overflow-hidden rounded border-2 transition-all duration-200 ${
              currentIndex === index
                ? "border-white"
                : "border-transparent opacity-60 hover:opacity-100"
            } ${isTransitioning ? "opacity-30 cursor-not-allowed" : ""}`}
          >
            <Image
              src={
                `${process.env.NEXT_PUBLIC_CDN_URL}${image.url}` ||
                "/placeholder.svg"
              }
              alt={image.alt_text || `${productName} ${index + 1}`}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Image Counter */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
