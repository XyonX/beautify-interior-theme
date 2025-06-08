import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const deals = [
  {
    id: 1,
    title: "Summer Sale",
    description: "Up to 40% off on selected items",
    image: "/placeholder.svg?height=200&width=400",
    link: "/sale/summer",
    color: "bg-stone-100",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Check out our latest collection",
    image: "/placeholder.svg?height=200&width=400",
    link: "/new-arrivals",
    color: "bg-stone-200",
  },
  {
    id: 3,
    title: "Limited Edition",
    description: "Handcrafted pieces by local artisans",
    image: "/placeholder.svg?height=200&width=400",
    link: "/limited-edition",
    color: "bg-stone-300",
  },
]

export function DealsSection() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl font-medium text-stone-800 mb-2">Special Offers</h2>
          <p className="text-stone-600 text-sm max-w-2xl mx-auto">Exclusive deals you don't want to miss</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {deals.map((deal) => (
            <Link key={deal.id} href={deal.link}>
              <Card
                className={`group hover:shadow-md transition-all duration-300 border-stone-100 overflow-hidden rounded-sm h-full ${deal.color}`}
              >
                <div className="flex flex-col h-full">
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={deal.image || "/placeholder.svg"}
                      alt={deal.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-sm font-medium text-stone-800 mb-1">{deal.title}</h3>
                      <p className="text-xs text-stone-600 mb-3">{deal.description}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-stone-800 text-stone-800 hover:bg-stone-200 rounded-sm text-xs w-full"
                    >
                      Shop Now
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
