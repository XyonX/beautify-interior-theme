import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-lg font-medium text-stone-800 mb-1">
          About BeautifyInterior
        </h1>
        <p className="text-xs text-stone-600">
          Transforming spaces with beautiful, handcrafted home decor
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <Card className="rounded-sm border-stone-100">
            <CardContent className="p-4">
              <h2 className="text-sm font-medium text-stone-800 mb-2">
                Our Story
              </h2>
              <p className="text-xs text-stone-600 mb-3">
                Founded in 2025, BeautifyInterior began as a passion project to
                bring unique, aesthetic home decor to everyone. We believe that
                beautiful spaces inspire beautiful lives, and every home
                deserves to reflect the personality and style of those who live
                in it.
              </p>
              <p className="text-xs text-stone-600">
                Our carefully curated collection features handmade crafts,
                aesthetic lighting, and unique decor pieces sourced from
                talented artisans around the world. Each item is selected for
                its quality, beauty, and ability to transform any space into
                something special.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-sm border-stone-100">
            <CardContent className="p-4">
              <h2 className="text-sm font-medium text-stone-800 mb-2">
                Our Mission
              </h2>
              <p className="text-xs text-stone-600">
                To make beautiful, high-quality home decor accessible to
                everyone while supporting independent artisans and sustainable
                practices. We're committed to offering unique pieces that help
                you create a home that truly reflects your personal style.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="aspect-video relative overflow-hidden rounded-sm">
            <Image
              src="https://cdn.beautifyinterior.com/assets/banner/og-image.png"
              alt="Our workshop"
              fill
              className="object-cover"
            />
          </div>

          <Card className="rounded-sm border-stone-100">
            <CardContent className="p-4">
              <h2 className="text-sm font-medium text-stone-800 mb-2">
                Why Choose Us
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-stone-800 rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-stone-600">
                    Handpicked, unique pieces from talented artisans
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-stone-800 rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-stone-600">
                    Sustainable and ethically sourced materials
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-stone-800 rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-stone-600">
                    Free shipping on orders over ₹500
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-stone-800 rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-stone-600">
                    30-day return policy
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-stone-800 rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-stone-600">
                    Expert customer service
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="rounded-sm border-stone-100">
          <CardContent className="p-4 text-center">
            <div className="text-lg font-medium text-stone-800 mb-1">
              10,000+
            </div>
            <div className="text-xs text-stone-600">Happy Customers</div>
          </CardContent>
        </Card>
        <Card className="rounded-sm border-stone-100">
          <CardContent className="p-4 text-center">
            <div className="text-lg font-medium text-stone-800 mb-1">500+</div>
            <div className="text-xs text-stone-600">Unique Products</div>
          </CardContent>
        </Card>
        <Card className="rounded-sm border-stone-100">
          <CardContent className="p-4 text-center">
            <div className="text-lg font-medium text-stone-800 mb-1">50+</div>
            <div className="text-xs text-stone-600">Partner Artisans</div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
