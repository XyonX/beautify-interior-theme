"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function OrderTrackingPage() {
  const searchParams = useSearchParams();
  const orderParam = searchParams.get("order");
  const [orderNumber, setOrderNumber] = useState(orderParam || "");
  const [orderData, setOrderData] = useState(null);
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateTrackingData = (order) => {
    const orderDate = new Date(order.orderDate);
    const now = new Date();
    const daysSinceOrder = Math.floor(
      (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const trackingEvents = [
      {
        status: "Order Confirmed",
        description: "Your order has been confirmed and is being prepared",
        timestamp: orderDate,
        completed: true,
        icon: CheckCircle,
        location: "BeautifyInterior Warehouse",
      },
    ];

    if (daysSinceOrder >= 1) {
      trackingEvents.push({
        status: "Processing",
        description: "Your order is being processed and packaged",
        timestamp: new Date(orderDate.getTime() + 24 * 60 * 60 * 1000),
        completed: true,
        icon: Package,
        location: "BeautifyInterior Warehouse",
      });
    }

    if (daysSinceOrder >= 2) {
      trackingEvents.push({
        status: "Shipped",
        description: "Your order has been shipped and is on its way",
        timestamp: new Date(orderDate.getTime() + 48 * 60 * 60 * 1000),
        completed: true,
        icon: Truck,
        location: "In Transit",
      });
    }

    const deliveryDays =
      order.shippingMethod === "standard"
        ? 7
        : order.shippingMethod === "express"
        ? 3
        : 1;

    if (daysSinceOrder >= deliveryDays) {
      trackingEvents.push({
        status: "Delivered",
        description: "Your order has been delivered successfully",
        timestamp: new Date(
          orderDate.getTime() + deliveryDays * 24 * 60 * 60 * 1000
        ),
        completed: true,
        icon: CheckCircle,
        location: order.shippingInfo.address,
      });
    } else {
      const estimatedDelivery = new Date(
        orderDate.getTime() + deliveryDays * 24 * 60 * 60 * 1000
      );
      trackingEvents.push({
        status: "Out for Delivery",
        description: `Estimated delivery: ${estimatedDelivery.toLocaleDateString()}`,
        timestamp: estimatedDelivery,
        completed: false,
        icon: Clock,
        location: "Local Delivery Hub",
      });
    }

    return {
      trackingNumber: `TRK${order.orderNumber.slice(-8)}`,
      carrier: "BeautifyInterior Express",
      estimatedDelivery: new Date(
        orderDate.getTime() + deliveryDays * 24 * 60 * 60 * 1000
      ),
      events: trackingEvents.reverse(),
    };
  };

  const handleTrackOrder = () => {
    if (!orderNumber.trim()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const order = orders.find((o) => o.orderNumber === orderNumber);

      if (order) {
        setOrderData(order);
        setTrackingData(generateTrackingData(order));
      } else {
        setOrderData(null);
        setTrackingData(null);
      }
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (orderParam) {
      handleTrackOrder();
    }
  }, [orderParam]);

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-lg font-medium text-stone-800 mb-2">
          Track Your Order
        </h1>
        <p className="text-xs text-stone-600">
          Enter your order number to track your package
        </p>
      </div>

      {/* Order Number Input */}
      <Card className="rounded-sm border-stone-100 mb-6">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="orderNumber" className="text-xs">
                Order Number
              </Label>
              <Input
                id="orderNumber"
                placeholder="BI-1234567890"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="h-8 text-xs rounded-sm"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleTrackOrder}
                disabled={isLoading || !orderNumber.trim()}
                className="bg-stone-800 hover:bg-stone-700 h-8 text-xs rounded-sm"
              >
                {isLoading ? "Tracking..." : "Track Order"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-2 border-stone-200 border-t-stone-800 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-stone-600">Tracking your order...</p>
        </div>
      )}

      {/* Order Not Found */}
      {!isLoading && orderNumber && !orderData && (
        <Card className="rounded-sm border-red-100 bg-red-50">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-4" />
            <h2 className="text-sm font-medium text-red-800 mb-2">
              Order Not Found
            </h2>
            <p className="text-xs text-red-600 mb-4">
              We couldn't find an order with number "{orderNumber}". Please
              check your order number and try again.
            </p>
            <Link href="/account">
              <Button variant="outline" className="text-xs rounded-sm">
                View All Orders
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Tracking Results */}
      {trackingData && orderData && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Tracking Timeline */}
          <div className="lg:col-span-2">
            <Card className="rounded-sm border-stone-100">
              <CardHeader className="p-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Tracking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-4 p-3 bg-stone-50 rounded-sm">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="font-medium text-stone-800">
                        Tracking Number
                      </p>
                      <p className="text-stone-600 font-mono">
                        {trackingData.trackingNumber}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-stone-800">Carrier</p>
                      <p className="text-stone-600">{trackingData.carrier}</p>
                    </div>
                    <div>
                      <p className="font-medium text-stone-800">
                        Estimated Delivery
                      </p>
                      <p className="text-stone-600">
                        {trackingData.estimatedDelivery.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-stone-800">
                        Shipping Method
                      </p>
                      <p className="text-stone-600 capitalize">
                        {orderData.shippingMethod}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {trackingData.events.map((event, index) => {
                    const Icon = event.icon;
                    return (
                      <div key={index} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              event.completed ? "bg-green-100" : "bg-stone-100"
                            }`}
                          >
                            <Icon
                              className={`h-4 w-4 ${
                                event.completed
                                  ? "text-green-600"
                                  : "text-stone-400"
                              }`}
                            />
                          </div>
                          {index < trackingData.events.length - 1 && (
                            <div
                              className={`w-0.5 h-8 mt-2 ${
                                event.completed
                                  ? "bg-green-200"
                                  : "bg-stone-200"
                              }`}
                            />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex justify-between items-start mb-1">
                            <h3
                              className={`text-sm font-medium ${
                                event.completed
                                  ? "text-stone-800"
                                  : "text-stone-600"
                              }`}
                            >
                              {event.status}
                            </h3>
                            <span className="text-xs text-stone-500">
                              {event.completed
                                ? event.timestamp.toLocaleDateString()
                                : "Pending"}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 mb-1">
                            {event.description}
                          </p>
                          <p className="text-xs text-stone-500">
                            {event.location}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="rounded-sm border-stone-100 mb-4">
              <CardHeader className="p-4">
                <CardTitle className="text-sm">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Order Number</span>
                    <span className="font-medium font-mono">
                      {orderData.orderNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Order Date</span>
                    <span className="font-medium">
                      {new Date(orderData.orderDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Items</span>
                    <span className="font-medium">
                      {orderData.items.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Total</span>
                    <span className="font-medium">
                      ${orderData.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-sm border-stone-100">
              <CardHeader className="p-4">
                <CardTitle className="text-sm">Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="text-xs text-stone-600 space-y-1">
                  <p className="font-medium text-stone-800">
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
              </CardContent>
            </Card>

            <div className="mt-4 space-y-2">
              <Link href={`/order-confirmation?order=${orderData.orderNumber}`}>
                <Button className="w-full bg-stone-800 hover:bg-stone-700 text-xs rounded-sm h-8">
                  View Order Details
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="w-full text-xs rounded-sm h-8"
                >
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      {!orderData && !isLoading && (
        <Card className="rounded-sm border-stone-100 mt-6">
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div>
                <h3 className="font-medium text-stone-800 mb-2">
                  Where to find your order number?
                </h3>
                <ul className="space-y-1 text-stone-600">
                  <li>• Check your order confirmation email</li>
                  <li>• Look in your account order history</li>
                  <li>• Find it on your receipt</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-stone-800 mb-2">
                  Still can't find your order?
                </h3>
                <div className="space-y-2">
                  <Link href="/account">
                    <Button
                      variant="outline"
                      className="w-full text-xs rounded-sm h-7"
                    >
                      Check Account Orders
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="w-full text-xs rounded-sm h-7"
                    >
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
