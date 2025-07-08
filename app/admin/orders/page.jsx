"use client";

import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreHorizontal,
  Eye,
  Printer,
  Truck,
  ShoppingCart,
  Calendar,
} from "lucide-react";
import { mockOrders, mockCustomers } from "@/lib/mock-data";



function mapOrderFromBackend(order) {
  return {
    id: order.id,
    orderNumber: order.order_number,
    customerId: order.user_id,
    status: order.status,
    paymentStatus: order.payment_status,
    shippingMethod: order.shipping_method_id,
    shippingCost: Number(order.shipping_amount) || 0,
    subtotal: Number(order.subtotal) || 0,
    tax: Number(order.tax_amount) || 0,
    total: Number(order.total) || 0,
    shippingAddress: {
      firstName: order.shipping_first_name || "",
      lastName: order.shipping_last_name || "",
      address1: order.shipping_address || "",
      address2: order.shipping_address2 || "",
      city: order.shipping_city || "",
      state: order.shipping_state || "",
      postalCode: order.shipping_zip_code || "",
      country: order.shipping_country || "",
      email: order.email || "",
      phone: order.shipping_phone || "",
    },
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    // ...add more fields as needed
  };
}

export default function AdminOrdersPage() {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  //const [orders] = useState(mockOrders);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders?limit=20&page=1`, {
          credentials: "include",
        });
        const data = await response.json();
        const mappedOrders = data.orders.map(mapOrderFromBackend); // Correct usage
        setOrders(mappedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
  
    fetchOrders();
  }, []);
  

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      (order.orderNumber || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.shippingAddress.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.shippingAddress.firstName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.shippingAddress.lastName || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesPayment =
      paymentFilter === "all" || order.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-stone-100 text-stone-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-stone-100 text-stone-800";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-stone-100 text-stone-800";
    }
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  // Enhance orders with customer data
  const enhancedOrders = filteredOrders.map((order) => {
    const customer = mockCustomers.find((c) => c.id === order.customerId);
    return {
      ...order,
      email: customer?.email || "customer@example.com",
      user: {
        firstName: customer?.firstName || order.shippingAddress.firstName,
        lastName: customer?.lastName || order.shippingAddress.lastName,
      },
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Orders</h1>
          <p className="text-sm text-stone-600">
            Manage customer orders and fulfillment
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Order Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Orders ({enhancedOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {enhancedOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-stone-200">
                  <tr>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Order
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Customer
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Date
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Status
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Payment
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Total
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {enhancedOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-stone-100 hover:bg-stone-50"
                    >
                      <td className="p-4">
                        <div>
                          <p className="text-sm font-medium text-stone-900">
                            {order.orderNumber}
                          </p>
                          {order.items && order.items.length > 0 ? (
                            <p className="text-xs text-stone-500">
                              {order.items.length} items
                            </p>
                          ) : (
                            <p className="text-xs text-stone-500">
                              No items
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm font-medium text-stone-900">
                            {order.user.firstName} {order.user.lastName}
                          </p>
                          <p className="text-xs text-stone-500">
                            {order.email}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center text-sm text-stone-700">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          className={`text-xs ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge
                          className={`text-xs ${getPaymentStatusColor(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-medium text-stone-900">
                          {formatCurrency(order.total)}
                        </span>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Printer className="h-4 w-4 mr-2" />
                              Print Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Truck className="h-4 w-4 mr-2" />
                              Update Shipping
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-stone-900 mb-2">
                No orders found
              </h3>
              <p className="text-sm text-stone-500">
                {searchQuery ||
                statusFilter !== "all" ||
                paymentFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Orders will appear here when customers make purchases"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
