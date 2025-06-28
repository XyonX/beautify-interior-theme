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
  Sparkles,
  Flame,
  TrendingUp,
  Tag,
} from "lucide-react";
import { AddToCartButton } from "@/components/add-to-cart-button";

const iconMap = {
  Sparkles,
  Flame,
  TrendingUp,
  Tag,
};

// Function to get the primary badge for a product
function getPrimaryBadge(product) {
  if (product.isFeatured) {
    return { text: "Featured", className: "bg-amazon-orange text-white" };
  }
  if (product.isNew) {
    return { text: "New", className: "bg-green-600 text-white" };
  }
  if (product.onSale) {
    return { text: "Sale", className: "bg-red-600 text-white" };
  }
  if (product.isTrending) {
    const index = (product.trendingRank || 1) - 1;
    const colors = [
      "bg-red-600",
      "bg-orange-600",
      "bg-yellow-600",
      "bg-green-600",
    ];
    return {
      text: `#${product.trendingRank}`,
      className: `${colors[index] || "bg-green-600"} text-white`,
    };
  }
  return null;
}

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
    <section className="py-12 bg-stone-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <CurrentIcon className="h-5 w-5 text-amazon-orange" />
            <h2 className="text-xl font-medium text-stone-800">
              Explore Our Collection
            </h2>
          </div>
          <p className="text-stone-600 max-w-2xl mx-auto mb-6">
            Discover handpicked items across different categories - all in one
            place
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
          {Object.entries(productCategories).map(([key, category]) => {
            const Icon = iconMap[category.icon];
            const isActive = activeCategory === key;

            return (
              <Button
                key={key}
                onClick={() => handleCategoryChange(key)}
                variant={isActive ? "default" : "outline"}
                className={`
                  flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg
                  ${
                    isActive
                      ? "bg-amazon-orange hover:bg-amazon-orange-dark text-white shadow-md"
                      : "border-stone-200 text-stone-700 hover:bg-stone-50 bg-white"
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

        {/* Products Grid */}
        <div
          className={`transition-opacity duration-150 ${
            isTransitioning ? "opacity-50" : "opacity-100"
          }`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4 md:gap-6">
            {currentCategory.data.map((product) => {
              const primaryBadge = getPrimaryBadge(product);
              const originalPrice = product.compareAtPrice
                ? Number.parseFloat(product.compareAtPrice)
                : null;
              const currentPrice = Number.parseFloat(product.price);
              const savings =
                originalPrice && originalPrice > currentPrice
                  ? originalPrice - currentPrice
                  : 0;

              return (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-stone-100 overflow-hidden rounded-lg h-full bg-white">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.thumbnail || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Single Primary Badge */}
                    {/* {primaryBadge && (
                      <div className="absolute top-2 left-2">
                        <Badge
                          className={`${primaryBadge.className} text-xs px-1.5 py-0.5 font-medium rounded`}
                        >
                          <span className="hidden sm:inline">
                            {primaryBadge.text}
                          </span>
                          <span className="sm:hidden">
                            {primaryBadge.text.includes("#")
                              ? primaryBadge.text
                              : primaryBadge.text.charAt(0)}
                          </span>
                        </Badge>
                      </div>
                    )} */}

                    {/* Discount Badge - Only for significant discounts */}
                    {/* {originalPrice &&
                      currentPrice &&
                      ((originalPrice - currentPrice) / originalPrice) * 100 >
                        15 && (
                      <Badge className="absolute top-2 right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 font-medium rounded">
                        -
                        {Math.round(
                          ((originalPrice - currentPrice) / originalPrice) *
                            100
                        )}
                        %
                      </Badge>
                    )} */}

                    {/* Quick Actions */}
                    <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-7 w-7 p-0 bg-white/90 hover:bg-white rounded-lg"
                      >
                        <Heart className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-7 w-7 p-0 bg-white/90 hover:bg-white rounded-lg"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    {/* Stock Status */}
                    {product.quantity <= 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge className="bg-red-600 text-white text-xs">
                          Out of Stock
                        </Badge>
                      </div>
                    )}

                    {/* Subtle overlay for visual appeal */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <CardContent className="p-4">
                    {/* Category */}
                    <p className="text-xs text-stone-500 mb-1">
                      {product.category?.name || "Product"}
                    </p>

                    {/* Product Name - Only this links to product details */}
                    <Link href={`/products/${product.id}`}>
                      <h3 className="text-sm font-medium text-stone-800 mb-2 line-clamp-2 hover:text-amazon-orange transition-colors cursor-pointer">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Pricing */}
                    <div className="mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-stone-900">
                          ₹{currentPrice.toLocaleString("en-IN")}
                        </span>
                        {originalPrice && originalPrice > currentPrice && (
                          <span className="text-xs text-stone-500 line-through">
                            ₹{originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      {/* Savings */}
                      {originalPrice && originalPrice > currentPrice && (
                        <p className="text-xs text-green-600 font-medium">
                          Save ₹{savings.toLocaleString("en-IN")}
                        </p>
                      )}
                    </div>

                    {/* Stock Info */}
                    {product.quantity > 0 && product.quantity <= 10 && (
                      <p className="text-xs text-red-600 mb-2">
                        Only {product.quantity} left
                      </p>
                    )}

                    {/* Add to Cart Button - Now properly functional */}
                    <AddToCartButton
                      product={{
                        id: product.id,
                        name: product.name,
                        price: currentPrice,
                        image: product.thumbnail || "/placeholder.svg",
                        quantity: product.quantity,
                      }}
                      className="w-full bg-amazon-orange hover:bg-amazon-orange-dark text-white text-xs h-8 rounded-lg"
                      size="sm"
                      disabled={product.quantity <= 0}
                      maxQuantity={product.quantity}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href={`/${
              activeCategory === "products" ? "products" : activeCategory
            }`}
          >
            <Button
              size="lg"
              variant="outline"
              className="border-stone-200 text-stone-700 hover:bg-stone-50 px-6 py-3 rounded-lg bg-transparent"
            >
              View All {currentCategory.title}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
