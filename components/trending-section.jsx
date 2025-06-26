import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Eye, Heart, ShoppingCart } from "lucide-react";

async function fetchProducts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function TrendingSection() {
  let products = await fetchProducts();

  products = products
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 4)
    .map((product, index) => ({
      ...product,
      trending: `#${index + 1}`,
      image: `${process.env.NEXT_PUBLIC_CDN_URL}${product.thumbnail}`,
      category: product.category?.name || "Uncategorized",
      description: product.shortDescription || product.description,
      price: parseFloat(product.price),
      originalPrice: product.compareAtPrice
        ? parseFloat(product.compareAtPrice)
        : null,
      discount:
        product.compareAtPrice &&
        parseFloat(product.compareAtPrice) > parseFloat(product.price)
          ? Math.round(
              ((parseFloat(product.compareAtPrice) -
                parseFloat(product.price)) /
                parseFloat(product.compareAtPrice)) *
                100
            )
          : 0,
    }));

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-6 sm:mb-10">
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-amazon-orange" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Trending Now
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
            Most popular items this week - join thousands of satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="group hover:shadow-xl transition-all duration-300 border-gray-200 bg-white h-full relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 left-0 z-10">
                <div
                  className={`px-1.5 xs:px-2 sm:px-3 py-0.5 sm:py-1 text-white text-[10px] xs:text-xs font-bold leading-tight ${
                    index === 0
                      ? "bg-red-600"
                      : index === 1
                      ? "bg-orange-600"
                      : index === 2
                      ? "bg-yellow-600"
                      : "bg-green-600"
                  }`}
                >
                  <span className="hidden xs:inline">
                    {product.trending} TRENDING
                  </span>
                  <span className="xs:hidden">{product.trending}</span>
                </div>
              </div>

              <div className="relative aspect-square overflow-hidden flex-shrink-0">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {product.discount > 0 && (
                  <Badge className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-red-600 text-white text-[10px] xs:text-xs px-1 xs:px-1.5 sm:px-2 py-0.5 sm:py-1 leading-tight">
                    -{product.discount}%
                  </Badge>
                )}

                {product.quantity <= 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge className="bg-red-600 text-white text-xs">
                      Out of Stock
                    </Badge>
                  </div>
                )}

                <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 flex gap-0.5 sm:gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 p-0 bg-white/90 hover:bg-white shadow-sm"
                  >
                    <Heart className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 p-0 bg-white/90 hover:bg-white shadow-sm"
                  >
                    <Eye className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-2 xs:p-3 sm:p-4 flex flex-col flex-grow">
                <p className="text-[10px] xs:text-xs text-gray-500 mb-1">
                  {product.category}
                </p>

                <Link
                  href={`/products/${product.slug}`}
                  className="flex-shrink-0"
                >
                  <h3 className="text-xs xs:text-sm sm:text-base font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-amazon-orange transition-colors cursor-pointer min-h-[2rem] xs:min-h-[2.25rem] sm:min-h-[2.75rem] leading-tight">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-[10px] xs:text-xs text-gray-600 mb-1 sm:mb-2 line-clamp-2 min-h-[1.5rem] xs:min-h-[2rem] leading-tight">
                  {product.description}
                </p>

                <div className="flex-grow"></div>

                <div className="mt-auto">
                  <div className="mb-2 sm:mb-3">
                    <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                      <span className="text-sm xs:text-base sm:text-lg font-bold text-gray-900 leading-tight">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs xs:text-sm text-gray-500 line-through leading-tight">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    <div className="h-3 xs:h-4 sm:h-5 flex items-start">
                      {product.originalPrice &&
                        product.originalPrice > product.price && (
                          <p className="text-[10px] xs:text-xs text-green-600 font-medium leading-tight">
                            <span className="hidden xs:inline">Save </span>₹
                            {(
                              product.originalPrice - product.price
                            ).toLocaleString("en-IN")}
                          </p>
                        )}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-amazon-orange hover:bg-amazon-orange-dark text-white text-[10px] xs:text-xs sm:text-sm h-6 xs:h-7 sm:h-8 font-medium"
                    disabled={product.quantity <= 0}
                  >
                    <ShoppingCart className="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-3.5 sm:w-3.5 mr-1 flex-shrink-0" />
                    {product.quantity > 0 ? (
                      <>
                        <span className="hidden sm:inline">Add to Cart</span>
                        <span className="sm:hidden">Add</span>
                      </>
                    ) : (
                      "Out of Stock"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-10">
          <Link href="/products">
            <Button
              size="lg"
              variant="outline"
              className="border-amazon-orange text-amazon-orange hover:bg-amazon-orange hover:text-white px-4 sm:px-6 md:px-8 text-sm sm:text-base"
            >
              <span className="hidden sm:inline">
                View All Trending Products
              </span>
              <span className="sm:hidden">View All</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
