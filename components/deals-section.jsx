import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const deals = [
  {
    id: 1,
    title: "Summer Sale",
    description: "Up to 40% off on selected items",
    image:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/sale/summer",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Check out our latest collection",
    image:
      "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/new-arrivals",
  },
  {
    id: 3,
    title: "Limited Edition",
    description: "Handcrafted pieces by local artisans",
    image:
      "https://images.unsplash.com/photo-1616137303871-05ce745f9cdb?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/limited-edition",
  },
];

export function DealsSection() {
  return (
    <section className="py-12 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            Special Offers
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Exclusive deals you don't want to miss
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <Link key={deal.id} href={deal.link}>
              <Card className="group hover:shadow-lg transition-all duration-300 border-stone-100 overflow-hidden rounded-lg h-full bg-white">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Subtle overlay for visual appeal */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-stone-800 group-hover:text-stone-900 transition-colors duration-200 mb-2">
                    {deal.title}
                  </h3>
                  <p className="text-stone-600 mb-4">{deal.description}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-stone-200 text-stone-700 hover:bg-stone-50 rounded-lg w-full bg-transparent"
                  >
                    Shop Now
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
