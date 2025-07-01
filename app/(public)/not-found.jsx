"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, Search, Package, Heart, ShoppingCart } from "lucide-react";

export default function NotFound() {
  const popularCategories = [
    { name: "Living Room", href: "/categories/living-room", icon: Package },
    { name: "Bedroom", href: "/categories/bedroom", icon: Heart },
    { name: "Kitchen", href: "/categories/kitchen", icon: ShoppingCart },
    { name: "Decor", href: "/categories/decor", icon: Package },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Modern Sofa Set",
      price: "₹45,999",
      image: "/placeholder.svg?height=200&width=200",
      href: "/products/1",
    },
    {
      id: 2,
      name: "Dining Table",
      price: "₹28,999",
      image: "/placeholder.svg?height=200&width=200",
      href: "/products/2",
    },
    {
      id: 3,
      name: "Bed Frame",
      price: "₹32,999",
      image: "/placeholder.svg?height=200&width=200",
      href: "/products/3",
    },
    {
      id: 4,
      name: "Wall Art",
      price: "₹2,999",
      image: "/placeholder.svg?height=200&width=200",
      href: "/products/4",
    },
  ];

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="py-12 bg-stone-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="relative w-64 h-48 mx-auto mb-6">
                <Image
                  src={`${process.env.NEXT_PUBLIC_CDN_URL}/site-data/placeholder.svg?height=192&width=256`}
                  alt="Page not found illustration"
                  fill
                  className="object-contain opacity-60"
                />
              </div>
              <div className="text-6xl font-bold text-stone-300 mb-2">404</div>
            </div>

            {/* Main Message */}
            <h1 className="text-2xl font-bold text-stone-900 mb-3">
              Oops! Page Not Found
            </h1>
            <p className="text-sm text-stone-600 mb-8 leading-relaxed">
              The page you're looking for doesn't exist or has been moved. Don't
              worry, let's help you find what you need for your beautiful home.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-6 py-2 text-sm font-medium hover:bg-stone-800 transition-colors"
              >
                <Home className="w-3 h-3" />
                Back to Home
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 border border-stone-300 text-stone-700 px-6 py-2 text-sm font-medium hover:bg-stone-50 transition-colors"
              >
                <Search className="w-3 h-3" />
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-lg font-bold text-stone-900 mb-2">
              Popular Categories
            </h2>
            <p className="text-xs text-stone-600">
              Explore our most loved furniture collections
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {popularCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group p-6 border border-stone-200 text-center hover:border-stone-300 transition-colors"
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-stone-100 flex items-center justify-center group-hover:bg-stone-200 transition-colors">
                    <IconComponent className="w-5 h-5 text-stone-600" />
                  </div>
                  <h3 className="text-sm font-medium text-stone-900 group-hover:text-stone-700">
                    {category.name}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-lg font-bold text-stone-900 mb-2">
              You Might Like These
            </h2>
            <p className="text-xs text-stone-600">
              Handpicked products for your home
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                className="group bg-white border border-stone-200 hover:border-stone-300 transition-colors"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-xs font-medium text-stone-900 mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm font-bold text-stone-900">
                    {product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-lg font-bold text-stone-900 mb-3">
              Still Need Help?
            </h2>
            <p className="text-sm text-stone-600 mb-6">
              Our design experts are here to help you find the perfect pieces
              for your home
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-stone-300 text-stone-700 px-6 py-2 text-sm font-medium hover:bg-stone-50 transition-colors"
              >
                Contact Support
              </Link>
              <a
                href="https://wa.me/1234567890?text=Hi! I need help finding products on your website."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-accent3 text-white px-6 py-2 text-sm font-medium hover:bg-accent3/90 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
