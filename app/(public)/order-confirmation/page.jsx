"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Download,
  Share2,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (orderNumber) {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const order = orders.find((o) => o.orderNumber === orderNumber);
      setOrderData(order);
    }
  }, [orderNumber]);

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    alert("Receipt download would be implemented here");
  };

  const handleShareOrder = () => {
    if (navigator.share) {
      navigator.share({
        title: "My BeautifyInterior Order",
        text: `I just ordered from BeautifyInterior! Order #${orderNumber}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Order link copied to clipboard!");
    }
  };

  if (!orderData) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-lg font-medium text-stone-800 mb-2">
            Order not found
          </h1>
          <p className="text-xs text-stone-600 mb-6">
            We couldn't find the order you're looking for.
          </p>
          <Link href="/account">
            <Button className="bg-stone-800 hover:bg-stone-700 text-xs rounded-sm">
              View All Orders
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(
    estimatedDelivery.getDate() +
      (orderData.shippingMethod === "standard"
        ? 7
        : orderData.shippingMethod === "express"
        ? 3
        : 1)
  );

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-xl font-medium text-stone-800 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-sm text-stone-600 mb-4">
          Thank you for your purchase. Your order has been confirmed and will be
          processed soon.
        </p>
        <div className="bg-stone-50 p-4 rounded-sm inline-block">
          <p className="text-xs font-medium text-stone-800">Order Number</p>
          <p className="text-lg font-mono text-stone-600">
            {orderData.orderNumber}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Order Items */}
          <Card className="rounded-sm border-stone-100">
            <CardHeader className="p-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <Package className="h-4 w-4" />
                Order Items ({orderData.items.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {orderData.items.map((item) => (
                  <div
                    key={`${item.id}-${item.variant}`}
                    className="flex items-center gap-3 p-3 border border-stone-100 rounded-sm"
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-sm object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xs font-medium text-stone-800 mb-1">
                        {item.name}
                      </h3>
                      {item.variant && (
                        <p className="text-xs text-stone-600 mb-1">
                          Variant: {item.variant}
                        </p>
                      )}
                      <p className="text-xs text-stone-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-stone-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs text-stone-500">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card className="rounded-sm border-stone-100">
            <CardHeader className="p-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-medium text-stone-800 mb-2">
                    Shipping Address
                  </h4>
                  <div className="text-xs text-stone-600 space-y-1">
                    <p>
                      {orderData.shippingInfo.firstName}{" "}
                      {orderData.shippingInfo.lastName}
                    </p>
                    <p>{orderData.shippingInfo.address}</p>
                    <p>
                      {orderData.shippingInfo.city},{" "}
                      {orderData.shippingInfo.state}{" "}
                      {orderData.shippingInfo.zipCode}
                    </p>
                    {orderData.shippingInfo.phone && (
                      <p>Phone: {orderData.shippingInfo.phone}</p>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-stone-800 mb-2">
                    Shipping Method
                  </h4>
                  <div className="text-xs text-stone-600 space-y-1">
                    <p className="capitalize">
                      {orderData.shippingMethod} Shipping
                    </p>
                    <p className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Estimated delivery:{" "}
                      {estimatedDelivery.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="rounded-sm border-stone-100">
            <CardHeader className="p-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-medium text-stone-800 mb-2">
                    Payment Method
                  </h4>
                  <div className="text-xs text-stone-600 space-y-1">
                    <p className="capitalize">{orderData.paymentMethod}</p>
                    {orderData.cardInfo && (
                      <p>{orderData.cardInfo.cardNumber}</p>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-stone-800 mb-2">
                    Billing Address
                  </h4>
                  <div className="text-xs text-stone-600">
                    <p>Same as shipping address</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary & Actions */}
        <div className="lg:col-span-1 space-y-4">
          {/* Order Summary */}
          <Card className="rounded-sm border-stone-100">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-stone-600">Subtotal</span>
                  <span className="text-xs font-medium">
                    $
                    {(
                      orderData.total -
                      orderData.total * 0.08 -
                      (orderData.shippingMethod === "standard"
                        ? orderData.total > 99
                          ? 0
                          : 9.99
                        : orderData.shippingMethod === "express"
                        ? 19.99
                        : 39.99)
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-stone-600">Shipping</span>
                  <span className="text-xs font-medium">
                    {orderData.shippingMethod === "standard"
                      ? orderData.total > 99
                        ? "Free"
                        : "$9.99"
                      : orderData.shippingMethod === "express"
                      ? "$19.99"
                      : "$39.99"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-stone-600">Tax</span>
                  <span className="text-xs font-medium">
                    ${(orderData.total * 0.08).toFixed(2)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm font-medium">
                  <span>Total</span>
                  <span>${orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Status */}
          <Card className="rounded-sm border-stone-100">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Order Status</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <div>
                    <p className="text-xs font-medium text-stone-800">
                      Order Confirmed
                    </p>
                    <p className="text-xs text-stone-600">Just now</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-stone-300 rounded-full"></div>
                  <div>
                    <p className="text-xs font-medium text-stone-600">
                      Processing
                    </p>
                    <p className="text-xs text-stone-500">1-2 business days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-stone-300 rounded-full"></div>
                  <div>
                    <p className="text-xs font-medium text-stone-600">
                      Shipped
                    </p>
                    <p className="text-xs text-stone-500">2-3 business days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-stone-300 rounded-full"></div>
                  <div>
                    <p className="text-xs font-medium text-stone-600">
                      Delivered
                    </p>
                    <p className="text-xs text-stone-500">
                      {estimatedDelivery.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="rounded-sm border-stone-100">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Order Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <Link href={`/order-tracking?order=${orderData.orderNumber}`}>
                <Button className="w-full bg-stone-800 hover:bg-stone-700 text-xs rounded-sm h-8">
                  <MapPin className="h-3 w-3 mr-1" />
                  Track Order
                </Button>
              </Link>
              <Button
                onClick={handleDownloadReceipt}
                variant="outline"
                className="w-full text-xs rounded-sm h-8"
              >
                <Download className="h-3 w-3 mr-1" />
                Download Receipt
              </Button>
              <Button
                onClick={handleShareOrder}
                variant="outline"
                className="w-full text-xs rounded-sm h-8"
              >
                <Share2 className="h-3 w-3 mr-1" />
                Share Order
              </Button>
            </CardContent>
          </Card>

          {/* Continue Shopping */}
          <div className="text-center pt-4">
            <Link href="/products">
              <Button variant="outline" className="text-xs rounded-sm">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
