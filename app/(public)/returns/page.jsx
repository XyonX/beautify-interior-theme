
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw, AlertCircle, CheckCircle, XCircle } from "lucide-react";

export default function ReturnsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-lg font-medium text-stone-800 mb-1">
          Returns & Exchanges
        </h1>
        <p className="text-xs text-stone-600">
          Our hassle-free return and exchange policy
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="rounded-sm border-stone-100">
          <CardHeader className="p-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Return Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                30-Day Return Window
              </h3>
              <p className="text-xs text-stone-600 mb-2">
                You have 30 days from the delivery date to return items for a
                full refund.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Original Condition
              </h3>
              <p className="text-xs text-stone-600 mb-2">
                Items must be in original condition with all tags and packaging
                intact.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Return Shipping
              </h3>
              <p className="text-xs text-stone-600">
                We provide prepaid return labels for your convenience.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm border-stone-100">
          <CardHeader className="p-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Exchange Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Size & Color Exchanges
              </h3>
              <p className="text-xs text-stone-600 mb-2">
                Free exchanges for different sizes or colors within 30 days.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Defective Items
              </h3>
              <p className="text-xs text-stone-600 mb-2">
                Immediate replacement or full refund for any defective items.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Processing Time
              </h3>
              <p className="text-xs text-stone-600">
                Exchanges are processed within 3-5 business days of receipt.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-sm border-stone-100 mb-6">
        <CardHeader className="p-4">
          <CardTitle className="text-sm">Return Process</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-stone-800 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs">
                1
              </div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Initiate Return
              </h3>
              <p className="text-xs text-stone-600">
                Contact us or use your account to start a return
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-stone-800 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs">
                2
              </div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Pack Items
              </h3>
              <p className="text-xs text-stone-600">
                Pack items in original packaging with return label
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-stone-800 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs">
                3
              </div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Ship Back
              </h3>
              <p className="text-xs text-stone-600">
                Drop off at any carrier location or schedule pickup
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-stone-800 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs">
                4
              </div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Get Refund
              </h3>
              <p className="text-xs text-stone-600">
                Receive refund within 5-7 business days
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="rounded-sm border-green-100 bg-green-50">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <h3 className="text-xs font-medium text-green-800 mb-1">
              Returnable Items
            </h3>
            <ul className="text-xs text-green-700 space-y-1">
              <li>• Unused items with tags</li>
              <li>• Items in original packaging</li>
              <li>• Non-personalized items</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-sm border-red-100 bg-red-50">
          <CardContent className="p-4 text-center">
            <XCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <h3 className="text-xs font-medium text-red-800 mb-1">
              Non-Returnable Items
            </h3>
            <ul className="text-xs text-red-700 space-y-1">
              <li>• Custom/personalized items</li>
              <li>• Items damaged by misuse</li>
              <li>• Items without original packaging</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-sm border-stone-100">
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-6 w-6 text-stone-600 mx-auto mb-2" />
            <h3 className="text-xs font-medium text-stone-800 mb-1">
              Need Help?
            </h3>
            <p className="text-xs text-stone-600 mb-2">
              Contact our customer service team
            </p>
            <p className="text-xs text-stone-600">hello@beautifyinterior.com</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
