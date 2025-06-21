import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Clock, MapPin, Package, RefreshCcw } from "lucide-react";

export default function ShippingPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-lg font-medium text-stone-800 mb-1">
          Shipping & Return Policy
        </h1>
        <p className="text-xs text-stone-600">
          All the details about our delivery timelines, packaging, and refund
          process.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="rounded-sm border-stone-100">
          <CardHeader className="p-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Shipping Timeframes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="border-b border-stone-100 pb-3">
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Domestic (India)
              </h3>
              <p className="text-xs text-stone-600 mb-1">
                Estimated delivery in 8–14 business days.
              </p>
              <p className="text-xs text-stone-600">
                Free shipping on prepaid orders. COD charges may apply.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                International
              </h3>
              <p className="text-xs text-stone-600 mb-1">
                Estimated delivery in 15–30 business days.
              </p>
              <p className="text-xs text-stone-600">
                Rates calculated at checkout. Customs fees may apply.
              </p>
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
                Order Confirmation
              </h3>
              <p className="text-xs text-stone-600">
                Orders are typically processed within 1–3 business days.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Custom or Handmade Items
              </h3>
              <p className="text-xs text-stone-600">
                May require 3–5 extra days before dispatch.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Tracking
              </h3>
              <p className="text-xs text-stone-600">
                Tracking details will be emailed once your order is shipped.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="rounded-sm border-stone-100">
          <CardHeader className="p-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              International Shipping
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <p className="text-xs text-stone-600 mb-3">
              We deliver worldwide. Delivery times and fees vary by location.
            </p>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Delivery Time
              </h3>
              <p className="text-xs text-stone-600">
                Estimated 15–30 business days.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Customs & Duties
              </h3>
              <p className="text-xs text-stone-600">
                Import duties are the responsibility of the customer.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm border-stone-100">
          <CardHeader className="p-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <Package className="h-4 w-4" />
              Packaging & Handling
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Eco-Friendly Materials
              </h3>
              <p className="text-xs text-stone-600">
                We prioritize recyclable and biodegradable materials.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Safe & Secure
              </h3>
              <p className="text-xs text-stone-600">
                Each product is packaged with care to ensure safe delivery.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Gift Options
              </h3>
              <p className="text-xs text-stone-600">
                Gift wrapping available for ₹499 or $5.99 per item.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid">
        <Card className="rounded-sm border-stone-100">
          <CardHeader className="p-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              Returns & Exchanges
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Damaged or Defective Items
              </h3>
              <p className="text-xs text-stone-600">
                If your item arrives damaged or defective, please email us
                within 48 hours of delivery with clear photos for review.
                Approved cases will receive a full refund or replacement.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Refund Eligibility
              </h3>
              <p className="text-xs text-stone-600">
                Refunds are only offered for damaged or incorrect items. No
                refunds for buyer’s remorse or late deliveries within the
                estimated timeframes.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Return Policy
              </h3>
              <p className="text-xs text-stone-600">
                We currently do not accept general returns or exchanges. Please
                double-check product details before ordering.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
