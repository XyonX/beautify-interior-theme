"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image: "/slide_1.jpg",
    alt: "Transform Your Space with Beautiful Home Decor",
    link: "/categories/seasonal-decor",
    title: "Transform Your Space",
    subtitle: "Beautiful Home Decor Collection",
  },
  {
    id: 2,
    image: "/slide_2.jpg",
    alt: "Premium Lighting Collection",
    link: "/categories/lighting",
    title: "Premium Lighting",
    subtitle: "Illuminate Your Home",
  },
  {
    id: 3,
    image: "/slide_3.jpg",
    alt: "Unique Artisan Pieces",
    // link: "/sale?collection=artisan",
    link: "/categories/wall-decor",
    title: "Artisan Collection",
    subtitle: "Handcrafted with Love",
  },
  {
    id: 4,
    image:
      "https://cdn.beautifyinterior.com/site-data/home-deocor-slide-chill-place.png",
    alt: "Relaxed rustic lounge area with earthy tones and greenery",
    link: "/categories/walldecor",
    title: "Elevate Everyday Living",
    subtitle: "Natural & Cozy Home Decor Styles",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative h-[300px] sm:h-[400px] overflow-hidden">
          {slides.map((slide, index) => (
            <Link
              key={slide.id}
              href={slide.link}
              className={`block absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="relative w-full h-full group">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h2 className="text-2xl font-bold mb-1 drop-shadow-md">
                    {slide.title}
                  </h2>
                  <p className="text-sm drop-shadow-md">{slide.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}

          {/* Navigation buttons */}
          <button
            onClick={(e) => {
              e.preventDefault();
              prevSlide();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-1.5 rounded-full shadow-lg transition-colors z-10"
          >
            <ChevronLeft className="h-4 w-4 text-stone-700" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-1.5 rounded-full shadow-lg transition-colors z-10"
          >
            <ChevronRight className="h-4 w-4 text-stone-700" />
          </button>

          {/* Slide indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentSlide(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? "bg-stone-800" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// "use client";

// import Image from "next/image";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useState, useEffect } from "react";

// const slides = [
//   {
//     id: 1,
//     image: "/slide_1.jpg",
//     alt: "Transform Your Space with Beautiful Home Decor",
//   },
//   {
//     id: 2,
//     image: "/slide_2.jpg",
//     alt: "Premium Lighting Collection",
//   },
//   {
//     id: 3,
//     image: "/slide_3.jpg",
//     alt: "Unique Artisan Pieces",
//   },
// ];

// export function HeroSection() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   return (
//     <section className="py-4 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="relative h-[300px] sm:h-[400px] overflow-hidden">
//           {slides.map((slide, index) => (
//             <div
//               key={slide.id}
//               className={`absolute inset-0 transition-opacity duration-1000 ${
//                 index === currentSlide ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               <div className="relative w-full h-full">
//                 <Image
//                   src={slide.image || "/placeholder.svg"}
//                   alt={slide.alt}
//                   fill
//                   className="object-cover"
//                   priority={index === 0}
//                 />
//               </div>
//             </div>
//           ))}

//           {/* Navigation buttons */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-1.5 rounded-full shadow-lg transition-colors"
//           >
//             <ChevronLeft className="h-4 w-4 text-stone-700" />
//           </button>
//           <button
//             onClick={nextSlide}
//             className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-1.5 rounded-full shadow-lg transition-colors"
//           >
//             <ChevronRight className="h-4 w-4 text-stone-700" />
//           </button>

//           {/* Slide indicators */}
//           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5">
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`w-2 h-2 rounded-full transition-colors ${
//                   index === currentSlide ? "bg-stone-800" : "bg-white/50"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
