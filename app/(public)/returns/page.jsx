import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw, AlertCircle, CheckCircle, XCircle } from "lucide-react";

export default function ReturnsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-lg font-medium text-stone-800 mb-1">
          Returns & Refund Policy
        </h1>
        <p className="text-xs text-stone-600">
          Know how we handle damaged items and refund eligibility.
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
                No General Returns
              </h3>
              <p className="text-xs text-stone-600 mb-2">
                We currently do not support general returns or change-of-mind
                cancellations.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Damaged or Incorrect Items
              </h3>
              <p className="text-xs text-stone-600 mb-2">
                If your item arrives damaged or incorrect, notify us within 48
                hours of delivery with clear photos. Approved cases are eligible
                for refund or replacement.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Time Window
              </h3>
              <p className="text-xs text-stone-600">
                Claims must be made within 48 hours of receiving the product.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm border-stone-100">
          <CardHeader className="p-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Refund Process
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Valid Cases Only
              </h3>
              <p className="text-xs text-stone-600 mb-2">
                Refunds are granted only for valid, approved cases (damaged or
                wrong product). No refunds for delays within estimated
                timelines.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                No Exchanges
              </h3>
              <p className="text-xs text-stone-600 mb-2">
                We do not currently support product exchanges. Please review
                product details carefully before ordering.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Processing Time
              </h3>
              <p className="text-xs text-stone-600">
                Refunds are processed within 5–7 business days after approval.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-sm border-stone-100 mb-6">
        <CardHeader className="p-4">
          <CardTitle className="text-sm">How to Report an Issue</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-stone-800 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs">
                1
              </div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Contact Us
              </h3>
              <p className="text-xs text-stone-600">
                Email us within 48 hours of delivery with order details and
                photos.
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-stone-800 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs">
                2
              </div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Provide Evidence
              </h3>
              <p className="text-xs text-stone-600">
                Attach clear images of the product showing the issue.
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-stone-800 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs">
                3
              </div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Review & Approval
              </h3>
              <p className="text-xs text-stone-600">
                Our team will verify your request and confirm eligibility.
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-stone-800 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs">
                4
              </div>
              <h3 className="text-xs font-medium text-stone-800 mb-1">
                Refund Issued
              </h3>
              <p className="text-xs text-stone-600">
                Approved refunds will be processed within 5–7 business days.
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
              Eligible for Refund
            </h3>
            <ul className="text-xs text-green-700 space-y-1">
              <li>• Damaged items (reported within 48 hours)</li>
              <li>• Incorrect product received</li>
              <li>• Proof provided via photos</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-sm border-red-100 bg-red-50">
          <CardContent className="p-4 text-center">
            <XCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <h3 className="text-xs font-medium text-red-800 mb-1">
              Not Eligible for Refund
            </h3>
            <ul className="text-xs text-red-700 space-y-1">
              <li>• Buyer’s remorse / changed mind</li>
              <li>• Delays within shipping window</li>
              <li>• Claims made after 48 hours</li>
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
              Reach our support team with your order ID and issue.
            </p>
            <p className="text-xs text-stone-600">beautifyinterior@gmail.com</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
