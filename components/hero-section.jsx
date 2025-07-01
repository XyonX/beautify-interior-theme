"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image: "https://cdn.beautifyinterior.com/site-data/products/prod-5-1x1.png",
    alt: "Transform Your Space with Beautiful Home Decor",
    link: "/categories/seasonal-decor",
    title: "Transform Your Space",
    subtitle: "Beautiful Home Decor Collection",
    description:
      "Discover our curated collection of stunning home decor pieces that bring warmth and character to every corner of your home.",
    badge: "New Collection",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Premium Lighting Collection",
    link: "/categories/lighting",
    title: "Premium Lighting",
    subtitle: "Illuminate Your Home",
    description:
      "Create the perfect ambiance with our premium lighting solutions. From modern fixtures to vintage classics.",
    badge: "Best Sellers",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Elegant Vintage Double-Sided Station Wall Clock",
    link: "https://beautifyinterior.com/products/0f3c054a-64e1-47fe-b12c-5350e5d478d7",
    title: "Add a Touch of Vintage",
    subtitle: "Classic Double-Sided Station Clock",
    description:
      "Timeless elegance meets functional design. This 1747 London-inspired clock adds sophistication to any space.",
    badge: "Featured",
  },
  {
    id: 4,
    image:
      "https://cdn.beautifyinterior.com/site-data/home-deocor-slide-chill-place.png",
    alt: "Relaxed rustic lounge area with earthy tones and greenery",
    link: "/categories/wall-decor",
    title: "Elevate Everyday Living",
    subtitle: "Natural & Cozy Home Decor Styles",
    description:
      "Create your perfect sanctuary with our natural and cozy decor collection. Embrace comfort and style.",
    badge: "Trending",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Hero Container with Two-Section Layout */}
        <div className="relative h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] xl:h-[450px] overflow-hidden rounded-lg bg-white">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Two-Section Layout */}
              <div className="flex h-full">
                {/* Text Section - Hidden on mobile, visible on larger screens */}
                <div className="w-1/2 md:w-1/2 lg:w-2/5 xl:w-1/2 flex bg-white p-4 md:p-6 lg:p-8 xl:p-10 flex-col justify-center items-center text-center relative">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 right-4 w-20 h-20 border-2 border-amazon-orange rounded-full"></div>
                    <div className="absolute bottom-8 left-8 w-12 h-12 bg-amazon-orange/10 rounded-lg rotate-45"></div>
                  </div>

                  <div className="relative z-10 max-w-md">
                    {/* Badge */}
                    <div className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 bg-amazon-orange/10 text-amazon-orange text-[10px] md:text-xs font-medium rounded-full mb-2 md:mb-4">
                      {slide.badge}
                    </div>

                    {/* Title */}
                    <h2 className="text-sm md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-1 md:mb-3 leading-tight">
                      {slide.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-xs md:text-lg lg:text-xl text-amazon-orange font-medium mb-2 md:mb-4">
                      {slide.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-[10px] md:text-sm lg:text-base leading-relaxed">
                      {slide.description}
                    </p>
                  </div>
                </div>

                {/* Image Section - No hover effects, no links */}
                <div className="w-1/2 md:w-1/2 lg:w-3/5 xl:w-1/2 relative overflow-hidden bg-white">
                  {/* 1:1 Bounded Square Area - Always maintains square aspect ratio */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Square container that takes full height and maintains 1:1 ratio */}
                    <div className="h-full aspect-square relative overflow-hidden">
                      {/* Image fills the square container, cropped from center if rectangular */}
                      <Image
                        src={slide.image || `${process.env.NEXT_PUBLIC_CDN_URL}/site-data/placeholder.svg`}
                        alt={slide.alt}
                        fill
                        className="object-cover object-center"
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.preventDefault();
              prevSlide();
            }}
            className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-2.5 rounded-full shadow-lg transition-all duration-200 z-20 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-gray-700" />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-2.5 rounded-full shadow-lg transition-all duration-200 z-20 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-gray-700" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentSlide(index);
                }}
                className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? "bg-amazon-orange shadow-lg"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Seamless Blend Effect */}
      <div className="h-6 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
