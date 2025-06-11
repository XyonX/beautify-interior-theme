import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Clock, MapPin, Package } from "lucide-react";

export default function ShippingPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-lg font-medium text-stone-800 mb-1">
          Shipping Information
        </h1>
        <p className="text-xs text-stone-600">
          Everything you need to know about our shipping policies
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="rounded-sm border-stone-100">
          <CardHeader className="p-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Shipping Options
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="border-b border-stone-100 pb-3">
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Standard Shipping
              </h3>
              <p className="text-xs text-stone-600 mb-1">5-7 business days</p>
              <p className="text-xs text-stone-600">
                $9.99 (Free on orders over $99)
              </p>
            </div>
            <div className="border-b border-stone-100 pb-3">
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Express Shipping
              </h3>
              <p className="text-xs text-stone-600 mb-1">2-3 business days</p>
              <p className="text-xs text-stone-600">$19.99</p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Overnight Shipping
              </h3>
              <p className="text-xs text-stone-600 mb-1">1 business day</p>
              <p className="text-xs text-stone-600">$39.99</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm border-stone-100">
          <CardHeader className="p-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Processing Time
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Order Processing
              </h3>
              <p className="text-xs text-stone-600 mb-2">
                Orders are typically processed within 1-2 business days after
                payment confirmation.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Custom Items
              </h3>
              <p className="text-xs text-stone-600 mb-2">
                Handmade and custom items may require 3-5 additional business
                days for processing.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Tracking Information
              </h3>
              <p className="text-xs text-stone-600">
                You'll receive a tracking number via email once your order
                ships.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="rounded-sm border-stone-100">
          <CardHeader className="p-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              International Shipping
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <p className="text-xs text-stone-600 mb-3">
              We ship to most countries worldwide. International shipping rates
              and delivery times vary by destination.
            </p>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Delivery Time
              </h3>
              <p className="text-xs text-stone-600 mb-2">
                7-21 business days depending on location
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Customs & Duties
              </h3>
              <p className="text-xs text-stone-600">
                International customers are responsible for any customs duties
                or taxes imposed by their country.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm border-stone-100">
          <CardHeader className="p-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <Package className="h-4 w-4" />
              Packaging
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Eco-Friendly Packaging
              </h3>
              <p className="text-xs text-stone-600 mb-2">
                We use recyclable and biodegradable packaging materials whenever
                possible.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Secure Packaging
              </h3>
              <p className="text-xs text-stone-600 mb-2">
                All items are carefully packaged to ensure they arrive in
                perfect condition.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Gift Wrapping
              </h3>
              <p className="text-xs text-stone-600">
                Gift wrapping is available for an additional $5.99 per item.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
