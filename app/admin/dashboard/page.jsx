"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Star,
  Calendar,
  ArrowRight,
  Eye,
} from "lucide-react";

// Safe import with error handling
let mockOrders = [];
let mockCustomers = [];
let mockProducts = [];
let mockInventoryAlerts = [];
let mockReviews = [];

try {
  const mockData = require("@/lib/mock-data");
  mockOrders = mockData.mockOrders || [];
  mockCustomers = mockData.mockCustomers || [];
  mockProducts = mockData.mockProducts || [];
  mockInventoryAlerts = mockData.mockInventoryAlerts || [];
  mockReviews = mockData.mockReviews || [];
} catch (error) {
  console.warn("Failed to load mock data:", error);
}

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState("30d");

  // Safely access mock data with fallbacks
  const orders = Array.isArray(mockOrders) ? mockOrders : [];
  const customers = Array.isArray(mockCustomers) ? mockCustomers : [];
  const products = Array.isArray(mockProducts) ? mockProducts : [];
  const inventoryAlerts = Array.isArray(mockInventoryAlerts)
    ? mockInventoryAlerts
    : [];
  const reviews = Array.isArray(mockReviews) ? mockReviews : [];

  // Calculate dashboard metrics with safe operations
  const totalRevenue = orders.reduce((sum, order) => {
    if (!order || typeof order.total !== "number") return sum;
    return sum + order.total;
  }, 0);

  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const pendingReviews = reviews.filter((review) => {
    return review && review.status === "pending";
  }).length;

  const lowStockItems = products.filter((product) => {
    if (!product) return false;
    return (
      product.trackQuantity === true &&
      typeof product.quantity === "number" &&
      typeof product.lowStockThreshold === "number" &&
      product.quantity <= product.lowStockThreshold
    );
  }).length;

  // Top products data with safe operations
  const topProducts = products
    .filter((product) => product && product.id && product.name)
    .map((product) => ({
      id: product.id,
      name: product.name,
      sales: Math.floor(Math.random() * 50) + 10,
      revenue: (product.price || 0) * (Math.floor(Math.random() * 50) + 10),
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const formatCurrency = (amount) => {
    if (typeof amount !== "number" || isNaN(amount)) {
      return "₹0";
    }
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  // Recent orders with safe operations
  const recentOrders = orders
    .filter((order) => order && order.id)
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Dashboard</h1>
          <p className="text-sm text-stone-600">
            Welcome back to your store overview
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone-500">
                  Total Revenue
                </p>
                <p className="text-2xl font-semibold text-stone-900">
                  {formatCurrency(totalRevenue)}
                </p>
              </div>
              <div className="h-12 w-12 bg-stone-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-stone-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <Badge className="bg-green-100 text-green-800 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                12.5%
              </Badge>
              <span className="ml-2 text-stone-500">vs. previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone-500">
                  Total Orders
                </p>
                <p className="text-2xl font-semibold text-stone-900">
                  {totalOrders}
                </p>
              </div>
              <div className="h-12 w-12 bg-stone-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-stone-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <Badge className="bg-green-100 text-green-800 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                8.2%
              </Badge>
              <span className="ml-2 text-stone-500">vs. previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone-500">
                  Total Customers
                </p>
                <p className="text-2xl font-semibold text-stone-900">
                  {totalCustomers}
                </p>
              </div>
              <div className="h-12 w-12 bg-stone-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-stone-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <Badge className="bg-green-100 text-green-800 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                5.3%
              </Badge>
              <span className="ml-2 text-stone-500">vs. previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone-500">
                  Avg. Order Value
                </p>
                <p className="text-2xl font-semibold text-stone-900">
                  {formatCurrency(averageOrderValue)}
                </p>
              </div>
              <div className="h-12 w-12 bg-stone-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-stone-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <Badge className="bg-red-100 text-red-800 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                2.1%
              </Badge>
              <span className="ml-2 text-stone-500">vs. previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {(inventoryAlerts.length > 0 ||
        pendingReviews > 0 ||
        lowStockItems > 0) && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center text-yellow-800">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Alerts Requiring Attention
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {lowStockItems > 0 && (
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex items-center">
                    <Package className="h-4 w-4 mr-2 text-yellow-600" />
                    <p className="text-xs text-stone-700">
                      {lowStockItems} products with low stock
                    </p>
                  </div>
                  <Link href="/admin/inventory">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      View
                    </Button>
                  </Link>
                </div>
              )}
              {pendingReviews > 0 && (
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-yellow-600" />
                    <p className="text-xs text-stone-700">
                      {pendingReviews} reviews awaiting moderation
                    </p>
                  </div>
                  <Link href="/admin/reviews">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      View
                    </Button>
                  </Link>
                </div>
              )}
              {inventoryAlerts.map((alert) => {
                if (!alert || !alert.id) return null;
                return (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between p-2 bg-white rounded border"
                  >
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                      <p className="text-xs text-stone-700">
                        {alert.message || "Alert message unavailable"}
                      </p>
                    </div>
                    <Link href="/admin/inventory">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        View
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Revenue Overview - Simplified */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Revenue Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center bg-stone-50 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-stone-900 mb-2">
                {formatCurrency(totalRevenue)}
              </div>
              <div className="text-sm text-stone-600">
                Total Revenue This Period
              </div>
              <div className="mt-4 flex items-center justify-center">
                <Badge className="bg-green-100 text-green-800 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  12.5% increase
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                Top Products
              </CardTitle>
              <Link href="/admin/products">
                <Button variant="ghost" size="sm" className="text-xs">
                  View All
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {topProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-stone-200">
                    <tr>
                      <th className="text-left p-4 font-medium text-sm text-stone-700">
                        Product
                      </th>
                      <th className="text-left p-4 font-medium text-sm text-stone-700">
                        Sales
                      </th>
                      <th className="text-left p-4 font-medium text-sm text-stone-700">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-stone-100 hover:bg-stone-50"
                      >
                        <td className="p-4">
                          <p className="text-sm font-medium text-stone-900">
                            {product.name}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-stone-700">
                            {product.sales} units
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="text-sm font-medium text-stone-900">
                            {formatCurrency(product.revenue)}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-stone-500">
                <Package className="h-12 w-12 mx-auto mb-4 text-stone-300" />
                <p>No products available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Category Distribution - Simplified */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Sales by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-sm text-stone-700">Furniture</span>
                </div>
                <span className="text-sm font-medium text-stone-900">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
                  <span className="text-sm text-stone-700">Lighting</span>
                </div>
                <span className="text-sm font-medium text-stone-900">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-stone-700">Home Decor</span>
                </div>
                <span className="text-sm font-medium text-stone-900">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm text-stone-700">Textiles</span>
                </div>
                <span className="text-sm font-medium text-stone-900">10%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Recent Orders</CardTitle>
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm" className="text-xs">
                View All
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {recentOrders.length > 0 ? (
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
                      Total
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => {
                    const shippingAddress = order.shippingAddress || {};
                    return (
                      <tr
                        key={order.id}
                        className="border-b border-stone-100 hover:bg-stone-50"
                      >
                        <td className="p-4">
                          <p className="text-sm font-medium text-stone-900">
                            {order.orderNumber || "N/A"}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-stone-700">
                            {shippingAddress.firstName || ""}{" "}
                            {shippingAddress.lastName || ""}
                          </p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center text-sm text-stone-700">
                            <Calendar className="h-3 w-3 mr-1" />
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleDateString()
                              : "N/A"}
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={`text-xs ${
                              order.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "processing"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "shipped"
                                ? "bg-purple-100 text-purple-800"
                                : order.status === "delivered"
                                ? "bg-stone-100 text-stone-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {order.status || "unknown"}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <p className="text-sm font-medium text-stone-900">
                            {formatCurrency(order.total || 0)}
                          </p>
                        </td>
                        <td className="p-4">
                          <Link href={`/admin/orders/${order.id}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-stone-500">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-stone-300" />
              <p>No recent orders</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
