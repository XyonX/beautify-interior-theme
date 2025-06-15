import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart } from "lucide-react";

// Fetch data server-side
// Fetch featured products
async function fetchFeaturedProducts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
      {
        cache: "no-store", // Ensure fresh data
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
async function fetchCategories() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
      {
        cache: "no-store", // Ensure fresh data
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function FeaturedProducts() {
  // Fetch products and categories in parallel
  // const [featuredProducts, categories] = await Promise.all([
  //   fetchFeaturedProducts(),
  //   fetchCategories(),
  // ]);

  const featuredProducts = await fetchFeaturedProducts();

  console.log(featuredProducts);
  return (
    <section className="py-10 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl font-medium text-stone-800 mb-2">
            Featured Products
          </h2>
          <p className="text-stone-600 text-sm max-w-2xl mx-auto">
            Handpicked favorites our customers love
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="group hover:shadow-md transition-all duration-300 border-stone-100 bg-white rounded-sm h-full">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={
                      `${process.env.NEXT_PUBLIC_CDN_URL}${product.thumbnail}` ||
                      "/placeholder.svg"
                    }
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
                  <p className="text-xs text-stone-500 mb-1">
                    {product.category.name}
                  </p>
                  <h3 className="text-xs font-medium text-stone-800 mb-1 truncate group-hover:text-stone-900 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-stone-800 text-stone-800" />
                      <span className="text-xs text-stone-600 ml-1">
                        {product.averageRating}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium text-stone-800">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-xs text-stone-500 line-through">
                          ₹{product.compareAtPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/products">
            <Button
              size="sm"
              variant="outline"
              className="border-stone-800 text-stone-800 hover:bg-stone-50 rounded-sm text-xs"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
