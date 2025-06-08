import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const trendingProducts = [
  {
    id: 1,
    name: "Minimalist Ceramic Vase",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Decor",
    trending: "#1",
  },
  {
    id: 2,
    name: "Scandinavian Floor Lamp",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Lighting",
    trending: "#2",
  },
  {
    id: 3,
    name: "Handwoven Basket Set",
    price: 45.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Storage",
    trending: "#3",
  },
  {
    id: 4,
    name: "Abstract Wall Art",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wall Art",
    trending: "#4",
  },
];

export function TrendingSection() {
  return (
    <section className="py-10 bg-stone-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl font-medium text-stone-800 mb-2">
            Trending Now
          </h2>
          <p className="text-stone-600 text-sm max-w-2xl mx-auto">
            Most popular items this week
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trendingProducts.map((product) => (
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
                  <Badge className="absolute top-2 left-2 bg-stone-800 text-white text-xs px-1.5 py-0.5 rounded-sm">
                    {product.trending}
                  </Badge>
                </div>
                <CardContent className="p-3">
                  <p className="text-xs text-stone-500 mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-xs font-medium text-stone-800 mb-1 truncate group-hover:text-stone-900 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs font-medium text-stone-800">
                    ${product.price}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
