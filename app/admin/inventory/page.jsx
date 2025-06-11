"use client";

import { useState } from "react";
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
  Edit,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import {
  mockProducts,
  mockInventoryAlerts,
  mockCategories,
} from "@/lib/mock-data";

export default function AdminInventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [products] = useState(mockProducts);
  const [alerts] = useState(mockInventoryAlerts);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesStock = true;
    if (stockFilter === "low_stock") {
      matchesStock =
        product.trackQuantity &&
        product.quantity <= product.lowStockThreshold &&
        product.quantity > 0;
    } else if (stockFilter === "out_of_stock") {
      matchesStock = product.trackQuantity && product.quantity === 0;
    } else if (stockFilter === "in_stock") {
      matchesStock =
        !product.trackQuantity || product.quantity > product.lowStockThreshold;
    }

    return matchesSearch && matchesStock;
  });

  const getStockStatus = (product) => {
    if (!product.trackQuantity)
      return {
        label: "Not Tracked",
        color: "bg-stone-100 text-stone-800",
        icon: Minus,
      };
    if (product.quantity === 0)
      return {
        label: "Out of Stock",
        color: "bg-red-100 text-red-800",
        icon: AlertTriangle,
      };
    if (product.quantity <= product.lowStockThreshold)
      return {
        label: "Low Stock",
        color: "bg-yellow-100 text-yellow-800",
        icon: TrendingDown,
      };
    return {
      label: "In Stock",
      color: "bg-green-100 text-green-800",
      icon: TrendingUp,
    };
  };

  const getStockLevel = (product) => {
    if (!product.trackQuantity) return 0;
    const percentage =
      (product.quantity / (product.lowStockThreshold * 3)) * 100;
    return Math.min(percentage, 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Inventory</h1>
          <p className="text-sm text-stone-600">
            Monitor and manage product stock levels
          </p>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center text-yellow-800">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Inventory Alerts ({alerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-2 bg-white rounded border"
                >
                  <p className="text-xs text-stone-700">{alert.message}</p>
                  <Badge
                    className={`text-xs ${
                      alert.severity === "high"
                        ? "bg-red-100 text-red-800"
                        : alert.severity === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="in_stock">In Stock</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Inventory ({filteredProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-stone-200">
                  <tr>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Product
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      SKU
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Current Stock
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Low Stock Threshold
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Stock Level
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Status
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product);
                    const stockLevel = getStockLevel(product);
                    const StatusIcon = stockStatus.icon;

                    return (
                      <tr
                        key={product.id}
                        className="border-b border-stone-100 hover:bg-stone-50"
                      >
                        <td className="p-4">
                          <div>
                            <p className="text-sm font-medium text-stone-900">
                              {product.name}
                            </p>
                            <p className="text-xs text-stone-500">
                              {mockCategories.find(
                                (c) => c.id === product.categoryId
                              )?.name || "Uncategorized"}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm font-mono text-stone-700">
                            {product.sku}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-stone-900">
                              {product.trackQuantity ? product.quantity : "N/A"}
                            </span>
                            {product.trackQuantity &&
                              product.quantity <= product.lowStockThreshold &&
                              product.quantity > 0 && (
                                <AlertTriangle className="h-3 w-3 text-yellow-500" />
                              )}
                            {product.trackQuantity &&
                              product.quantity === 0 && (
                                <AlertTriangle className="h-3 w-3 text-red-500" />
                              )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-stone-700">
                            {product.trackQuantity
                              ? product.lowStockThreshold
                              : "N/A"}
                          </span>
                        </td>
                        <td className="p-4">
                          {product.trackQuantity ? (
                            <div className="w-full bg-stone-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  stockLevel > 50
                                    ? "bg-green-500"
                                    : stockLevel > 25
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${stockLevel}%` }}
                              />
                            </div>
                          ) : (
                            <span className="text-sm text-stone-500">
                              Not tracked
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <Badge
                            className={`text-xs ${stockStatus.color} flex items-center w-fit`}
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {stockStatus.label}
                          </Badge>
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
                                <Edit className="h-4 w-4 mr-2" />
                                Update Stock
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Package className="h-4 w-4 mr-2" />
                                View Product
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-stone-900 mb-2">
                No products found
              </h3>
              <p className="text-sm text-stone-500">
                {searchQuery || stockFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Products will appear here when you add them to your catalog"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
