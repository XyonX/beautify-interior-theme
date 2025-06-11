"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Download,
} from "lucide-react";
import { mockOrders, mockCustomers, mockProducts } from "@/lib/mock-data";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");
  const [isLoading, setIsLoading] = useState(false);

  // Calculate analytics data
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = mockOrders.length;
  const totalCustomers = mockCustomers.length;
  const totalProducts = mockProducts.length;
  const averageOrderValue = totalRevenue / totalOrders;

  // Revenue trend data (mock)
  const revenueData = [
    { month: "Jan", revenue: 12400, orders: 45 },
    { month: "Feb", revenue: 15600, orders: 52 },
    { month: "Mar", revenue: 18200, orders: 61 },
    { month: "Apr", revenue: 16800, orders: 58 },
    { month: "May", revenue: 21500, orders: 72 },
    { month: "Jun", revenue: 24300, orders: 81 },
  ];

  // Top products data
  const topProductsData = [
    { name: "Modern Velvet Sofa", sales: 45, revenue: 58495 },
    { name: "Ceramic Table Lamp", sales: 32, revenue: 2879.68 },
    { name: "Handwoven Wall Art", sales: 28, revenue: 4479.72 },
    { name: "Minimalist Coffee Table", sales: 24, revenue: 7199.76 },
    { name: "Vintage Armchair", sales: 18, revenue: 8999.82 },
  ];

  // Category distribution
  const categoryData = [
    { name: "Furniture", value: 45, color: "#8B5CF6" },
    { name: "Lighting", value: 25, color: "#06B6D4" },
    { name: "Home Decor", value: 20, color: "#10B981" },
    { name: "Textiles", value: 10, color: "#F59E0B" },
  ];

  // Customer segments
  const customerSegments = [
    { segment: "VIP Customers", count: 12, percentage: 8, revenue: 45600 },
    { segment: "Regular Customers", count: 45, percentage: 30, revenue: 67800 },
    { segment: "New Customers", count: 93, percentage: 62, revenue: 23400 },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleExportReport = async () => {
    setIsLoading(true);
    // Simulate export
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">
            Analytics Dashboard
          </h1>
          <p className="text-sm text-stone-600">
            Track your business performance and insights
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExportReport} disabled={isLoading}>
            <Download className="h-4 w-4 mr-2" />
            {isLoading ? "Exporting..." : "Export Report"}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-600">Total Revenue</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalRevenue)}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12.5%</span>
                  <span className="text-sm text-stone-500 ml-1">
                    vs last month
                  </span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-stone-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-600">Total Orders</p>
                <p className="text-2xl font-bold">{totalOrders}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+8.2%</span>
                  <span className="text-sm text-stone-500 ml-1">
                    vs last month
                  </span>
                </div>
              </div>
              <ShoppingCart className="h-8 w-8 text-stone-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-600">Total Customers</p>
                <p className="text-2xl font-bold">{totalCustomers}</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600">-2.1%</span>
                  <span className="text-sm text-stone-500 ml-1">
                    vs last month
                  </span>
                </div>
              </div>
              <Users className="h-8 w-8 text-stone-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-600">Avg Order Value</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(averageOrderValue)}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+5.7%</span>
                  <span className="text-sm text-stone-500 ml-1">
                    vs last month
                  </span>
                </div>
              </div>
              <Package className="h-8 w-8 text-stone-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-1))",
                },
                orders: {
                  label: "Orders",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Sales",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProductsData.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between p-3 bg-stone-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-stone-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-stone-500">
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">
                      {formatCurrency(product.revenue)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerSegments.map((segment) => (
                <div key={segment.segment} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {segment.segment}
                    </span>
                    <Badge variant="outline">{segment.count} customers</Badge>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${segment.percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-stone-500">
                    <span>{segment.percentage}% of total</span>
                    <span>{formatCurrency(segment.revenue)} revenue</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 border-l-4 border-green-500 bg-green-50">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New order received</p>
                <p className="text-xs text-stone-500">
                  Order #BI-2024-003 for $1,299.99
                </p>
              </div>
              <span className="text-xs text-stone-500">2 min ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 border-l-4 border-blue-500 bg-blue-50">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Product stock updated</p>
                <p className="text-xs text-stone-500">
                  Ceramic Table Lamp restocked (+50 units)
                </p>
              </div>
              <span className="text-xs text-stone-500">1 hour ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 border-l-4 border-purple-500 bg-purple-50">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New customer registered</p>
                <p className="text-xs text-stone-500">
                  Alice Johnson joined the platform
                </p>
              </div>
              <span className="text-xs text-stone-500">3 hours ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
