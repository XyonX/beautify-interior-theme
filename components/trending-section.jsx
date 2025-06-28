import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, ShoppingCart, Heart, Eye } from "lucide-react";
import { AddToCartButton } from "@/components/add-to-cart-button";

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
    .slice(0, 8)
    .map((product, index) => ({
      ...product,
      trending: `#${index + 1}`,
      image: `${process.env.NEXT_PUBLIC_CDN_URL}${product.thumbnail}`,
      category: product.category?.name || "Uncategorized",
      description: product.shortDescription || product.description,
      price: Number.parseFloat(product.price),
      originalPrice: product.compareAtPrice
        ? Number.parseFloat(product.compareAtPrice)
        : null,
      discount:
        product.compareAtPrice &&
        Number.parseFloat(product.compareAtPrice) >
          Number.parseFloat(product.price)
          ? Math.round(
              ((Number.parseFloat(product.compareAtPrice) -
                Number.parseFloat(product.price)) /
                Number.parseFloat(product.compareAtPrice)) *
                100
            )
          : 0,
    }));

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-amazon-orange" />
            <h2 className="text-xl font-medium text-stone-800">Trending Now</h2>
          </div>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Most popular items this week - join thousands of satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6">
          {products.map((product, index) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-stone-100 overflow-hidden rounded-lg h-full bg-white">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Compact Trending Badge - Only show trending rank */}
                {/* <div className="absolute top-2 left-2">
                  <Badge
                    className={`text-white text-xs px-1.5 py-0.5 font-medium rounded ${
                      index === 0
                        ? "bg-red-600"
                        : index === 1
                        ? "bg-orange-600"
                        : index === 2
                        ? "bg-yellow-600"
                        : "bg-green-600"
                    }`}
                  >
                    <span className="hidden sm:inline">
                      {product.trending}
                    </span>
                    <span className="sm:hidden">#{index + 1}</span>
                  </Badge>
                </div> */}

                {/* Discount Badge - Only if significant discount */}
                {/* {product.discount > 15 && (
                  <Badge className="absolute top-2 right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 font-medium rounded">
                    -{product.discount}%
                  </Badge>
                )} */}

                {/* Quick Actions */}
                <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

                {/* Out of Stock Overlay */}
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
                <p className="text-xs text-stone-500 mb-1">
                  {product.category}
                </p>

                {/* Product Name - Only this links to product details */}
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-sm font-medium text-stone-800 hover:text-amazon-orange transition-colors duration-200 mb-2 line-clamp-2 cursor-pointer">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-stone-900">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-stone-500 line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <p className="text-xs text-green-600 font-medium mb-3">
                      Save ₹
                      {(product.originalPrice - product.price).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  )}

                {/* Add to Cart Button - Now properly functional */}
                <AddToCartButton
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image || "/placeholder.svg",
                    quantity: product.quantity,
                  }}
                  className="w-full bg-amazon-orange hover:bg-amazon-orange-dark text-white text-xs h-8 rounded-lg"
                  size="sm"
                  disabled={product.quantity <= 0}
                  maxQuantity={product.quantity}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button
              size="lg"
              variant="outline"
              className="border-stone-200 text-stone-700 hover:bg-stone-50 px-6 py-3 rounded-lg bg-transparent"
            >
              View All Trending Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
