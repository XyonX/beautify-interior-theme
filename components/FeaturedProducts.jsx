import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart } from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    name: "Moroccan Pendant Light",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=300",
    category: "Lighting",
    isNew: false,
    isSale: true,
  },
  {
    id: 2,
    name: "Handwoven Macrame Wall Hanging",
    price: 45.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wall Art",
    isNew: true,
    isSale: false,
  },
  {
    id: 3,
    name: "Ceramic Vase Set",
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    category: "Decor",
    isNew: false,
    isSale: true,
  },
  {
    id: 4,
    name: "Boho Table Lamp",
    price: 67.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 78,
    image: "/placeholder.svg?height=300&width=300",
    category: "Lighting",
    isNew: true,
    isSale: false,
  },
  {
    id: 5,
    name: "Handmade Wooden Bowl",
    price: 28.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=300",
    category: "Crafts",
    isNew: false,
    isSale: true,
  },
  {
    id: 6,
    name: "Velvet Throw Pillow",
    price: 24.99,
    originalPrice: null,
    rating: 4.5,
    reviews: 92,
    image: "/placeholder.svg?height=300&width=300",
    category: "Textiles",
    isNew: false,
    isSale: false,
  },
  {
    id: 7,
    name: "Geometric Wall Shelf",
    price: 59.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300",
    category: "Decor",
    isNew: true,
    isSale: false,
  },
  {
    id: 8,
    name: "Minimalist Desk Lamp",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.6,
    reviews: 112,
    image: "/placeholder.svg?height=300&width=300",
    category: "Lighting",
    isNew: false,
    isSale: true,
  },
];

export function FeaturedProducts() {
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
            <Card
              key={product.id}
              className="group hover:shadow-md transition-all duration-300 border-stone-100 bg-white rounded-sm h-full"
            >
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
                    <Badge className="bg-stone-800 text-white text-xs px-1.5 py-0.5 rounded-sm">
                      New
                    </Badge>
                  )}
                  {product.isSale && (
                    <Badge className="bg-stone-700 text-white text-xs px-1.5 py-0.5 rounded-sm">
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
                  {product.category}
                </p>
                <h3 className="text-xs font-medium text-stone-800 mb-1 truncate group-hover:text-stone-900 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-stone-800 text-stone-800" />
                    <span className="text-xs text-stone-600 ml-1">
                      {product.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-stone-800">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-stone-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
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
