"use client";

import Link from "next/link";

export function FocusCategory() {
  const categories = [
    {
      title: "Modern showpiece",
      image: "https://cdn.beautifyinterior.com/site-data/banner_tiger.png",
      href: "/categories/teddy-bear",
    },
    {
      title: "Craft Bag",
      image: "https://cdn.beautifyinterior.com/site-data/banner_bag.png",
      href: "/categories/craft-bag",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category, index) => (
          <Link
            href={category.href}
            key={index}
            className="block relative border border-stone-100 shadow-sm rounded-sm overflow-hidden xl:border-0 xl:shadow-none group"
          >
            {/* Background image for smaller screens */}
            <div
              className="xl:hidden h-48 transition-transform duration-1000 group-hover:scale-110"
              style={{
                backgroundImage: `url(${category.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            {/* Image for larger screens */}
            <img
              src={category.image}
              alt={`${category.title} category image`}
              className="hidden xl:block w-full h-auto object-contain max-h-[400px] transition-transform duration-1000 group-hover:scale-110"
            />

            {/* Text overlay */}
            <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-center p-4 xl:w-1/3">
              <h2 className="text-lg font-medium text-white uppercase">
                {category.title}
              </h2>
              <span className="text-xs text-white hover:text-stone-200 transition-colors">
                Discover Now
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
