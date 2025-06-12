"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Heart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductGridSkeleton } from "@/components/skeletons/product-grid-skeleton";

const categoryData = {
  lighting: {
    name: "Lighting",
    description:
      "Illuminate your space with our curated collection of aesthetic lighting",
    products: [
      {
        id: 1,
        name: "Moroccan Pendant Light",
        price: 7499,
        originalPrice: 9999,
        rating: 4.8,
        reviews: 124,
        image: "/placeholder.svg?height=300&width=300",
        isNew: false,
        isSale: true,
      },
      {
        id: 4,
        name: "Boho Table Lamp",
        price: 5699,
        originalPrice: null,
        rating: 4.6,
        reviews: 78,
        image: "/placeholder.svg?height=300&width=300",
        isNew: true,
        isSale: false,
      },
      {
        id: 8,
        name: "Minimalist Desk Lamp",
        price: 4199,
        originalPrice: 5899,
        rating: 4.6,
        reviews: 112,
        image: "/placeholder.svg?height=300&width=300",
        isNew: false,
        isSale: true,
      },
    ],
  },
  decor: {
    name: "Home Decor",
    description: "Beautiful pieces to transform your living space",
    products: [
      {
        id: 3,
        name: "Ceramic Vase Set",
        price: 2899,
        originalPrice: 4199,
        rating: 4.7,
        reviews: 156,
        image: "/placeholder.svg?height=300&width=300",
        isNew: false,
        isSale: true,
      },
      {
        id: 7,
        name: "Geometric Wall Shelf",
        price: 4999,
        originalPrice: null,
        rating: 4.7,
        reviews: 67,
        image: "/placeholder.svg?height=300&width=300",
        isNew: true,
        isSale: false,
      },
    ],
  },
};

export default function CategoryPage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("featured");
  const category = categoryData[params.category];

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <main className="flex-grow container mx-auto px-4 py-4">
        {/* Breadcrumb skeleton */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-xs">
            <Skeleton className="w-12 h-3" />
            <span className="text-stone-400">/</span>
            <Skeleton className="w-16 h-3" />
            <span className="text-stone-400">/</span>
            <Skeleton className="w-20 h-3" />
          </div>
        </div>

        {/* Category Header skeleton */}
        <div className="mb-6">
          <Skeleton className="w-32 h-5 mb-1" />
          <Skeleton className="w-64 h-3 mb-4" />

          <div className="flex justify-between items-center">
            <Skeleton className="w-28 h-3" />
            <Skeleton className="w-40 h-8" />
          </div>
        </div>

        {/* Products Grid skeleton */}
        <div className="mb-8">
          <ProductGridSkeleton count={6} />
        </div>

        {/* View All Products Link skeleton */}
        <div className="text-center">
          <Skeleton className="w-32 h-8 mx-auto rounded-sm" />
        </div>
      </main>
    );
  }

  if (!category) {
    return (
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-xl font-medium text-stone-800 mb-2">
            Category Not Found
          </h1>
          <Link href="/products">
            <Button className="bg-stone-800 hover:bg-stone-700 text-xs rounded-sm">
              View All Products
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow container mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <ol className="flex items-center space-x-2 text-xs text-stone-600">
          <li>
            <Link href="/" className="hover:text-stone-900">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/products" className="hover:text-stone-900">
              Products
            </Link>
          </li>
          <li>/</li>
          <li className="text-stone-900 font-medium">{category.name}</li>
        </ol>
      </nav>

      {/* Category Header */}
      <div className="mb-6">
        <h1 className="text-lg font-medium text-stone-800 mb-1">
          {category.name}
        </h1>
        <p className="text-xs text-stone-600 mb-4">{category.description}</p>

        <div className="flex justify-between items-center">
          <p className="text-xs text-stone-600">
            Showing {category.products.length} products
          </p>
          <Select value={sortBy} onValueChange={setSortBy}>
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
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {category.products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card className="group hover:shadow-md transition-all duration-300 border-stone-100 bg-white rounded-sm h-full">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && (
                    <Badge className="bg-accent3-600 text-white text-xs px-1.5 py-0.5 rounded-sm">
                      New
                    </Badge>
                  )}
                  {product.isSale && (
                    <Badge className="bg-accent1-600 text-white text-xs px-1.5 py-0.5 rounded-sm">
                      Sale
                    </Badge>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 rounded-sm"
                >
                  <Heart className="h-3 w-3" />
                </Button>
              </div>
              <CardContent className="p-3">
                <h3 className="text-xs font-medium text-stone-800 mb-1 truncate group-hover:text-stone-900 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-accent2-600 text-accent2-600" />
                    <span className="text-xs text-stone-600 ml-1">
                      {product.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-stone-800">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-accent1-600 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* View All Products Link */}
      <div className="text-center">
        <Link href="/products">
          <Button
            variant="outline"
            className="border-stone-800 text-stone-800 hover:bg-stone-50 text-xs rounded-sm"
          >
            View All Products
          </Button>
        </Link>
      </div>
    </main>
  );
}
