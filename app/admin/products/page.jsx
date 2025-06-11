"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Package,
  AlertTriangle,
  Filter,
} from "lucide-react";
import { mockProducts, mockCategories } from "@/lib/mock-data";

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [products, setProducts] = useState(mockProducts);

  const filteredProducts = (products || []).filter((product) => {
    const matchesSearch =
      (product?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product?.sku || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product?.tags || []).some((tag) =>
        (tag || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "all" || product?.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || product?.categoryId === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleDeleteProduct = (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== productId));
    }
  };

  const handleToggleStatus = (productId) => {
    setProducts(
      products.map((p) =>
        p.id === productId
          ? { ...p, status: p.status === "active" ? "draft" : "active" }
          : p
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-stone-100 text-stone-800";
      default:
        return "bg-stone-100 text-stone-800";
    }
  };

  const getStockStatus = (product) => {
    if (!product.trackQuantity) return null;
    if (product.quantity === 0)
      return { label: "Out of Stock", color: "bg-red-100 text-red-800" };
    if (product.quantity <= product.lowStockThreshold)
      return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    return { label: "In Stock", color: "bg-green-100 text-green-800" };
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Products</h1>
          <p className="text-sm text-stone-600">Manage your product catalog</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-stone-800 hover:bg-stone-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-600">Total Products</p>
                <p className="text-2xl font-bold">{(products || []).length}</p>
              </div>
              <Package className="h-8 w-8 text-stone-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-600">Active Products</p>
                <p className="text-2xl font-bold">
                  {
                    (products || []).filter((p) => p?.status === "active")
                      .length
                  }
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-600">Low Stock</p>
                <p className="text-2xl font-bold">
                  {
                    (products || []).filter(
                      (p) =>
                        p?.trackQuantity &&
                        (p?.quantity || 0) <= (p?.lowStockThreshold || 0)
                    ).length
                  }
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-600">Out of Stock</p>
                <p className="text-2xl font-bold">
                  {
                    (products || []).filter(
                      (p) => p?.trackQuantity && (p?.quantity || 0) === 0
                    ).length
                  }
                </p>
              </div>
              <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
                <Input
                  placeholder="Search products by name, SKU, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {mockCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Products ({filteredProducts.length})
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
                      Category
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Price
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-stone-700">
                      Stock
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
                    const category = mockCategories.find(
                      (c) => c.id === product.categoryId
                    );
                    return (
                      <tr
                        key={product.id}
                        className="border-b border-stone-100 hover:bg-stone-50"
                      >
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-stone-100 rounded overflow-hidden">
                              {product.images[0] ? (
                                <Image
                                  src={
                                    product.images[0].url || "/placeholder.svg"
                                  }
                                  alt={product.name}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="h-6 w-6 text-stone-400" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-stone-900">
                                {product.name}
                              </p>
                              <p className="text-xs text-stone-500 truncate max-w-xs">
                                {product.shortDescription}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {(product?.tags || [])
                                  .slice(0, 2)
                                  .map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {tag || ""}
                                    </Badge>
                                  ))}
                                {(product?.tags || []).length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{(product?.tags || []).length - 2}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm font-mono text-stone-700">
                            {product.sku}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-stone-700">
                            {category?.name || "Uncategorized"}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <span className="font-medium text-stone-900">
                              {formatCurrency(product.price)}
                            </span>
                            {product.compareAtPrice && (
                              <span className="text-stone-500 line-through ml-2">
                                {formatCurrency(product.compareAtPrice)}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          {product.trackQuantity ? (
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-stone-700">
                                {product.quantity}
                              </span>
                              {stockStatus && (
                                <Badge
                                  className={`text-xs ${stockStatus.color}`}
                                >
                                  {stockStatus.label}
                                </Badge>
                              )}
                              {product.quantity <=
                                product.lowStockThreshold && (
                                <AlertTriangle className="h-3 w-3 text-yellow-500" />
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-stone-500">
                              Not tracked
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <Badge
                            className={`text-xs ${getStatusColor(
                              product.status
                            )}`}
                          >
                            {product.status}
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
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Product
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleToggleStatus(product.id)}
                              >
                                <Package className="h-4 w-4 mr-2" />
                                {product.status === "active"
                                  ? "Set to Draft"
                                  : "Activate"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
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
              <p className="text-sm text-stone-500 mb-6">
                {searchQuery ||
                statusFilter !== "all" ||
                categoryFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Get started by adding your first product"}
              </p>
              {!searchQuery &&
                statusFilter === "all" &&
                categoryFilter === "all" && (
                  <Link href="/admin/products/new">
                    <Button className="bg-stone-800 hover:bg-stone-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </Link>
                )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
