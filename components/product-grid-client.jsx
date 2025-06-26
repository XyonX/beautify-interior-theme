"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Eye,
  ShoppingCart,
  Flame,
  TrendingUp,
  Tag,
  Sparkles,
} from "lucide-react";

const iconMap = {
  Sparkles: Sparkles,
  Flame: Flame,
  TrendingUp: TrendingUp,
  Tag: Tag,
};

export function ProductGridClient({ productCategories }) {
  const [activeCategory, setActiveCategory] = useState("products");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleCategoryChange = (category) => {
    if (category === activeCategory) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveCategory(category);
      setIsTransitioning(false);
    }, 150);
  };

  const currentCategory = productCategories[activeCategory];
  const CurrentIcon = iconMap[currentCategory.icon];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <CurrentIcon className="h-6 w-6 text-amazon-orange" />
            <h2 className="text-xl font-medium text-gray-900">
              Explore Our Collection
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Discover handpicked items across different categories - all in one
            place
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {Object.entries(productCategories).map(([key, category]) => {
              const Icon = iconMap[category.icon];
              const isActive = activeCategory === key;

              return (
                <Button
                  key={key}
                  onClick={() => handleCategoryChange(key)}
                  variant={isActive ? "default" : "outline"}
                  className={`
                    flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-amazon-orange hover:bg-amazon-orange-dark text-white shadow-md"
                        : "border-gray-300 text-gray-700 hover:border-amazon-orange hover:text-amazon-orange bg-white"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.title}</span>
                  <span className="sm:hidden">
                    {category.title.split(" ")[0]}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>

        <div
          className={`transition-opacity duration-150 ${
            isTransitioning ? "opacity-50" : "opacity-100"
          }`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {currentCategory.data.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-lg transition-all duration-200 border-gray-200 bg-white flex flex-col h-full rounded-none"
              >
                <div className="relative flex-shrink-0">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.thumbnail || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute top-1 sm:top-2 left-1 sm:left-2 flex flex-col gap-1">
                      {product.isNew && (
                        <Badge className="bg-green-600 text-white text-xs px-1.5 sm:px-2 py-0.5 font-medium">
                          New
                        </Badge>
                      )}
                      {product.isTrending && (
                        <Badge className="bg-purple-600 text-white text-xs px-1.5 sm:px-2 py-0.5 font-medium">
                          <span className="hidden sm:inline">
                            #{product.trendingRank} Trending
                          </span>
                          <span className="sm:hidden">
                            #{product.trendingRank}
                          </span>
                        </Badge>
                      )}
                      {product.onSale &&
                        parseFloat(product.compareAtPrice) >
                          parseFloat(product.price) && (
                          <Badge className="bg-red-600 text-white text-xs px-1.5 sm:px-2 py-0.5 font-medium">
                            -
                            {Math.round(
                              ((parseFloat(product.compareAtPrice) -
                                parseFloat(product.price)) /
                                parseFloat(product.compareAtPrice)) *
                                100
                            )}
                            %
                          </Badge>
                        )}
                    </div>

                    <div className="absolute top-1 sm:top-2 right-1 sm:right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-6 w-6 sm:h-7 sm:w-7 p-0 bg-white/90 hover:bg-white"
                      >
                        <Heart className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-6 w-6 sm:h-7 sm:w-7 p-0 bg-white/90 hover:bg-white"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>

                    {product.quantity <= 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge className="bg-red-600 text-white text-xs">
                          Out of Stock
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                <CardContent className="p-2 sm:p-3 flex flex-col flex-grow">
                  <p className="text-xs text-gray-500 mb-1">
                    {product.category.name}
                  </p>

                  <Link
                    href={`/products/${product.slug}`}
                    className="flex-shrink-0"
                  >
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-amazon-orange transition-colors cursor-pointer min-h-[2.5rem] sm:min-h-[2.75rem]">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-gray-600 mb-2 line-clamp-2 min-h-[2rem]">
                    {product.shortDescription || product.description}
                  </p>

                  <div className="flex-grow"></div>

                  <div className="mt-auto">
                    <div className="mb-2">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-sm sm:text-base font-bold text-gray-900">
                          ₹{parseFloat(product.price).toLocaleString("en-IN")}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-xs text-gray-500 line-through">
                            ₹
                            {parseFloat(product.compareAtPrice).toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        )}
                      </div>

                      <div className="h-5 flex items-start">
                        {product.compareAtPrice &&
                          parseFloat(product.compareAtPrice) >
                            parseFloat(product.price) && (
                            <p className="text-xs text-green-600 font-medium">
                              Save ₹
                              {(
                                parseFloat(product.compareAtPrice) -
                                parseFloat(product.price)
                              ).toLocaleString("en-IN")}
                            </p>
                          )}
                      </div>
                    </div>

                    <div className="h-4 mb-2">
                      {product.quantity > 0 && product.quantity <= 10 && (
                        <p className="text-xs text-red-600">
                          Only {product.quantity} left
                        </p>
                      )}
                    </div>

                    <Button
                      className="w-full bg-amazon-orange hover:bg-amazon-orange-dark text-white text-xs h-7 sm:h-8"
                      disabled={product.quantity <= 0}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">
                        {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                      </span>
                      <span className="sm:hidden">
                        {product.quantity > 0 ? "Add" : "Out"}
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <Link
            href={`/${
              activeCategory === "products" ? "products" : activeCategory
            }`}
          >
            <Button
              size="lg"
              variant="outline"
              className="border-amazon-orange text-amazon-orange hover:bg-amazon-orange hover:text-white px-6 sm:px-8"
            >
              View All {currentCategory.title}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
