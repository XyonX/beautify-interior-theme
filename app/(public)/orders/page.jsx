"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  PackageCheck,
  PackageX,
  Truck,
  CreditCard,
  Calendar,
  ArrowLeft,
  Loader2,
  Search,
} from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch orders (in a real app, this would be an API call)
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError("");

      // Simulate API call delay
      // await new Promise((resolve) => setTimeout(resolve, 800));

      // In a real app:
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/user/${user.id}`,
        { credentials: "include" }
      );
      const data = await response.json();
      setOrders(data);
      console.log("data", data);

      // setOrders(mockOrders);
    } catch (err) {
      setError("Failed to load orders. Please try again later.");
      console.error("Order fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/auth/login?redirect=/account/orders");
      return;
    }

    fetchOrders();
  }, [user, router]);

  // Filter orders based on search term and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  // Get status badge variant
  const getStatusVariant = (status) => {
    switch (status) {
      case "delivered":
        return "success";
      case "shipped":
        return "info";
      case "processing":
        return "warning";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <PackageCheck className="h-5 w-5" />;
      case "shipped":
        return <Truck className="h-5 w-5" />;
      case "processing":
        return <Loader2 className="h-5 w-5 animate-spin" />;
      case "cancelled":
        return <PackageX className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-stone-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/account")}
          className="flex items-center gap-2 text-stone-600 hover:text-stone-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Account
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Order History</h1>
          <p className="text-stone-600 mt-1">
            View your past orders and track current shipments
          </p>
        </div>

        <div className="w-full md:w-auto flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-stone-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
          >
            <option value="all">All Statuses</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-stone-600" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-16 w-16 mx-auto text-stone-300 mb-4" />
          <h3 className="text-lg font-medium text-stone-700">
            No orders found
          </h3>
          <p className="text-stone-500 mt-1">
            {searchTerm || statusFilter !== "all"
              ? "No orders match your search criteria"
              : "You haven't placed any orders yet"}
          </p>
          <Button className="mt-4" onClick={() => router.push("/")}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-stone-50 p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      Order #{order.id}
                      <Badge
                        variant={getStatusVariant(order.status)}
                        className="text-xs"
                      >
                        <span className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4" />
                      <span>Placed on {formatDate(order.date)}</span>
                    </CardDescription>
                  </div>

                  <div className="flex flex-col items-end">
                    <p className="text-lg font-semibold">
                      {formatCurrency(order.total)}
                    </p>
                    <p className="text-sm text-stone-600 flex items-center gap-1">
                      <CreditCard className="h-4 w-4" />
                      {order.paymentMethod}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="border-b border-stone-100">
                  <div className="p-4 md:p-6">
                    <h3 className="font-medium text-stone-700 mb-3">Items</h3>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-start gap-4">
                          <div className="bg-stone-100 border border-stone-200 rounded-md w-16 h-16 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-stone-600 text-sm">
                              {formatCurrency(item.price)} × {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {formatCurrency(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6">
                  <div>
                    <h3 className="font-medium text-stone-700 mb-3">
                      Shipping Address
                    </h3>
                    <div className="text-stone-600">
                      <p>{order.shipping_address.name}</p>
                      <p>{order.shipping_address.address}</p>
                      <p>
                        {order.shipping_address.city},{" "}
                        {order.shipping_address.state}{" "}
                        {order.shipping_address.zip}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-stone-700 mb-3">
                      Shipping Information
                    </h3>
                    {order.trackingNumber ? (
                      <div className="text-stone-600">
                        <p className="flex items-center gap-2">
                          <Truck className="h-4 w-4" />
                          <span>Tracking Number: {order.trackingNumber}</span>
                        </p>
                        <Button variant="link" className="pl-0 mt-2">
                          Track Package
                        </Button>
                      </div>
                    ) : (
                      <p className="text-stone-600">
                        Tracking information will be available once shipped
                      </p>
                    )}

                    <div className="mt-4 flex gap-2">
                      <Button variant="outline">Reorder</Button>
                      <Button variant="outline">View Details</Button>
                      <Button variant="outline">Contact Support</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Order status legend */}
      <div className="mt-8 p-4 bg-stone-50 rounded-md">
        <h3 className="font-medium text-stone-700 mb-3">Order Status Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="warning">
              <Loader2 className="h-3 w-3 animate-spin" />
            </Badge>
            <span className="text-sm">Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="info">
              <Truck className="h-3 w-3" />
            </Badge>
            <span className="text-sm">Shipped</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success">
              <PackageCheck className="h-3 w-3" />
            </Badge>
            <span className="text-sm">Delivered</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="destructive">
              <PackageX className="h-3 w-3" />
            </Badge>
            <span className="text-sm">Cancelled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
