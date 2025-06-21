import {
  HelpCircle,
  Truck,
  ShoppingCart,
  RotateCcw,
  AlertCircle,
  Mail,
} from "lucide-react";

export default function FaqPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-lg font-medium text-stone-800 mb-1">
          Frequently Asked Questions
        </h1>
        <p className="text-xs text-stone-600">
          Have questions? We’ve got you covered.
        </p>
      </div>

      {/* General Questions */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold flex items-center gap-2 mb-4">
          <HelpCircle className="h-4 w-4" />
          General
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-medium text-stone-800 mb-1">
              Do you have a physical store?
            </h3>
            <p className="text-xs text-stone-600">
              No, we operate exclusively online.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-medium text-stone-800 mb-1">
              Are the products handmade?
            </h3>
            <p className="text-xs text-stone-600">
              Some items are handcrafted, while others are sourced from selected
              artisan partners.
            </p>
          </div>
        </div>
      </section>

      {/* Orders */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold flex items-center gap-2 mb-4">
          <ShoppingCart className="h-4 w-4" />
          Orders
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-medium text-stone-800 mb-1">
              Can I cancel my order?
            </h3>
            <p className="text-xs text-stone-600">
              Yes, within 12 hours of placing the order. After that, we may not
              be able to cancel as processing starts quickly.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-medium text-stone-800 mb-1">
              How do I track my order?
            </h3>
            <p className="text-xs text-stone-600">
              Once your order is shipped, you’ll receive a tracking link via
              email.
            </p>
          </div>
        </div>
      </section>

      {/* Shipping */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold flex items-center gap-2 mb-4">
          <Truck className="h-4 w-4" />
          Shipping
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-medium text-stone-800 mb-1">
              How long does delivery take?
            </h3>
            <p className="text-xs text-stone-600">
              For orders within India, delivery takes 8–14 business days.
              International orders may take 15–30 days depending on the
              location.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-medium text-stone-800 mb-1">
              Do you ship internationally?
            </h3>
            <p className="text-xs text-stone-600">
              Yes, we ship to most countries. Charges and timelines vary by
              destination.
            </p>
          </div>
        </div>
      </section>

      {/* Refunds & Returns */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold flex items-center gap-2 mb-4">
          <RotateCcw className="h-4 w-4" />
          Refunds & Returns
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-medium text-stone-800 mb-1">
              Do you accept returns?
            </h3>
            <p className="text-xs text-stone-600">
              No, we currently don’t support general returns. Refunds are
              offered only for damaged or incorrect items, reported within 48
              hours.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-medium text-stone-800 mb-1">
              How do I request a refund?
            </h3>
            <p className="text-xs text-stone-600">
              Email us at{" "}
              <span className="font-medium text-stone-800">
                hello@beautifyinterior.com
              </span>{" "}
              with order details and images of the issue.
            </p>
          </div>
        </div>
      </section>

      {/* Support */}
      <section>
        <h2 className="text-sm font-semibold flex items-center gap-2 mb-4">
          <AlertCircle className="h-4 w-4" />
          Still need help?
        </h2>
        <p className="text-xs text-stone-600 mb-1">
          Reach out to our support team and we’ll get back to you within 24
          hours.
        </p>
        <p className="text-xs text-stone-800 flex items-center gap-1">
          <Mail className="w-3.5 h-3.5" />
          beautifyinterior@gmail.com
        </p>
      </section>
    </main>
  );
}
