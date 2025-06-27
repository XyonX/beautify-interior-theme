"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!orderId) {
          setError("Order ID is missing");
          setLoading(false);
          return;
        }

        const url = `₹{process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/₹{orderId}`;
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Order not found");
        }

        const data = await response.json();
        setOrderData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleDownloadReceipt = () => {
    alert("Receipt download would be implemented here");
  };

  const handleShareOrder = () => {
    if (!orderData) return;

    const url = window.location.href;
    const orderNumber = orderData.order_number;

    if (navigator.share) {
      navigator.share({
        title: "My BeautifyInterior Order",
        text: `I just ordered from BeautifyInterior! Order #₹{orderNumber}`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Order link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-lg font-medium text-stone-800 mb-2">
            Loading order...
          </h1>
        </div>
      </main>
    );
  }

  if (error || !orderData) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-lg font-medium text-stone-800 mb-2">
            {error || "Order not found"}
          </h1>
          <p className="text-xs text-stone-600 mb-6">
            We couldn't find the order you're looking for.
          </p>
          <Link href="/orders">
            <Button className="bg-stone-800 hover:bg-stone-700 text-xs rounded-sm">
              View All Orders
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 10);

  // Helper function to format amounts (convert cents to dollars)
  const formatAmount = (amount) => {
    if (typeof amount === "number") {
      return (amount / 100).toFixed(2);
    }
    // Handle string amounts if needed
    return (parseFloat(amount) / 100).toFixed(2);
  };

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
            {orderData.order_number}
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
                    key={`₹{item.id}-₹{item.variant}`}
                    className="flex items-center gap-3 p-3 border border-stone-100 rounded-sm"
                  >
                    <Image
                      src={
                        item.image
                          ? `₹{process.env.NEXT_PUBLIC_CDN_URL}₹{item.image}`
                          : "/placeholder.svg"
                      }
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
                        ₹
                        {formatAmount(item.total || item.price * item.quantity)}
                      </p>
                      <p className="text-xs text-stone-500">
                        ₹{formatAmount(item.price)} each
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
                      {orderData.shipping_address.first_name}{" "}
                      {orderData.shipping_address.last_name}
                    </p>
                    <p>{orderData.shipping_address.address}</p>
                    <p>
                      {orderData.shipping_address.city},{" "}
                      {orderData.shipping_address.state}{" "}
                      {orderData.shipping_address.zip_code}
                    </p>
                    {orderData.shipping_address.phone && (
                      <p>Phone: {orderData.shipping_address.phone}</p>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-stone-800 mb-2">
                    Shipping Method
                  </h4>
                  <div className="text-xs text-stone-600 space-y-1">
                    <p className="capitalize">Standard Shipping</p>
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
                    <p className="capitalize">
                      {orderData.payment_method === "cod"
                        ? "Cash on Delivery"
                        : orderData.payment_method}
                    </p>
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
                    ₹{formatAmount(orderData.totals.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-stone-600">Shipping</span>
                  <span className="text-xs font-medium">
                    ₹{formatAmount(orderData.totals.shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-stone-600">Tax</span>
                  <span className="text-xs font-medium">
                    ₹{formatAmount(orderData.totals.tax)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm font-medium">
                  <span>Total</span>
                  <span>₹{formatAmount(orderData.totals.total)}</span>
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
              <Link href={`/order-tracking?order=₹{orderData.id}`}>
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
