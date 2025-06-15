import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

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

export async function CategorySection() {
  let categories = await fetchCategories();
  categories = categories.sort(() => 0.5 - Math.random()).slice(0, 6);
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl font-medium text-stone-800 mb-2">
            Shop by Category
          </h2>
          <p className="text-stone-600 text-sm max-w-2xl mx-auto">
            Discover our curated collections
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href="">
              <Card className="group hover:shadow-md transition-all duration-300 border-stone-100 overflow-hidden rounded-sm h-full">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={
                      `${process.env.NEXT_PUBLIC_CDN_URL}${category.image}` ||
                      "/placeholder.svg"
                    }
                    alt={category.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                </div>
                <CardContent className="p-3">
                  <h3 className="text-xs font-medium text-stone-800 group-hover:text-stone-900 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-stone-500">{category.count}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
