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
  categories = categories.sort(() => 0.5 - Math.random()).slice(0, 8);
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            Shop by Category
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Discover our curated collections designed to transform every corner
            of your home
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 border-stone-100 overflow-hidden rounded-lg h-full bg-white">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={
                      `${process.env.NEXT_PUBLIC_CDN_URL}${category.image}` ||
                      `${process.env.NEXT_PUBLIC_CDN_URL}/site-data/placeholder.svg`
                    }
                    alt={category.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Subtle transparent overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Subtle color overlay for visual appeal */}
                  <div className="absolute inset-0 bg-stone-50/10 group-hover:bg-stone-100/20 transition-colors duration-300" />
                </div>

                <CardContent className="p-4">
                  <h3 className="text-sm font-medium text-stone-800 group-hover:text-stone-900 transition-colors duration-200 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-stone-500 group-hover:text-stone-600 transition-colors duration-200">
                    {category.count}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        {/* 
      <div className="text-center mt-12">
        <Link
          href="/categories"
          className="inline-flex items-center px-6 py-3 text-sm font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors duration-200"
        >
          View All Categories
        </Link>
      </div> */}
      </div>
    </section>
  );
}
