"use client";

import { useState, useEffect } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

// Utility function to convert snake_case to camelCase
function snakeToCamel(obj) {
  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel);
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      acc[camelKey] = snakeToCamel(obj[key]);
      return acc;
    }, {});
  }
  return obj;
}

// Utility function to convert camelCase to snake_case
function camelToSnake(obj) {
  if (Array.isArray(obj)) {
    return obj.map(camelToSnake);
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      acc[snakeKey] = camelToSnake(obj[key]);
      return acc;
    }, {});
  }
  return obj;
}

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    description: "",
    price: "",
    compareAtPrice: "",
    quantity: "",
    categoryId: "",
    tags: "",
    vendor: "",
  });

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
        if (!backendUrl) {
          throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
        }
        const response = await fetch(`${backendUrl}/api/products`);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data.map(snakeToCamel));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
        if (!backendUrl) {
          throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
        }
        const response = await fetch(`${backendUrl}/api/categories`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data.map(snakeToCamel));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Initialize form data when a product is selected for editing
  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name || "",
        shortDescription: selectedProduct.shortDescription || "",
        description: selectedProduct.description || "",
        price: selectedProduct.price || "",
        compareAtPrice: selectedProduct.compareAtPrice || "",
        quantity: selectedProduct.quantity || "",
        categoryId: selectedProduct.categoryId || "",
        tags: selectedProduct.tags ? selectedProduct.tags.join(", ") : "",
        vendor: selectedProduct.vendor || "",
      });
    }
  }, [selectedProduct]);

  // Filter products based on search, status, and category
  const filteredProducts = products.filter((product) => {
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

  // Delete product by calling backend
  const handleDeleteProduct = async (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
        const response = await fetch(
          `${backendUrl}/api/products/${productId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete product");
        setProducts(products.filter((p) => p.id !== productId));
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  // Toggle product status by calling backend
  const handleToggleStatus = async (productId) => {
    const product = products.find((p) => p.id === productId);
    const newStatus = product.status === "active" ? "draft" : "active";
    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
      const response = await fetch(`${backendUrl}/api/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to update product status");
      setProducts(
        products.map((p) =>
          p.id === productId ? { ...p, status: newStatus } : p
        )
      );
    } catch (error) {
      console.error("Error updating product status:", error);
      alert("Failed to update product status");
    }
  };

  // Open edit modal with selected product
  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.categoryId) {
      alert("Name, price, and category are required.");
      return;
    }
    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
      const payload = {
        name: formData.name,
        short_description: formData.shortDescription,
        description: formData.description,
        price: parseFloat(formData.price),
        compare_at_price: formData.compareAtPrice
          ? parseFloat(formData.compareAtPrice)
          : null,
        quantity: formData.quantity ? parseInt(formData.quantity) : null,
        category_id: formData.categoryId,
        tags: formData.tags
          ? formData.tags.split(",").map((tag) => tag.trim())
          : [],
        vendor: formData.vendor || null,
      };
      const response = await fetch(
        `${backendUrl}/api/products/${selectedProduct.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(camelToSnake(payload)),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update product");
      }
      const updatedProduct = await response.json();
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id ? snakeToCamel(updatedProduct) : p
        )
      );
      setIsEditModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      alert(error.message || "Failed to update product");
    }
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
                <p className="text-2xl font-bold">{products.length}</p>
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
                  {products.filter((p) => p?.status === "active").length}
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
                    products.filter(
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
                    products.filter(
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
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category?.name || "Uncategorized"}
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

      {/* Edit Product Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea
                  id="shortDescription"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleFormChange}
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="compareAtPrice">Compare At Price (₹)</Label>
                  <Input
                    id="compareAtPrice"
                    name="compareAtPrice"
                    type="number"
                    step="0.01"
                    value={formData.compareAtPrice}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <Label htmlFor="categoryId">Category *</Label>
                <Select
                  name="categoryId"
                  value={formData.categoryId}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, categoryId: value }))
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category?.name || "Uncategorized"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleFormChange}
                  placeholder="e.g., electronics, sale"
                />
              </div>
              <div>
                <Label htmlFor="vendor">Vendor</Label>
                <Input
                  id="vendor"
                  name="vendor"
                  value={formData.vendor}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
                    const category = categories.find(
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
                              {product.thumbnail ? (
                                <Image
                                  src={
                                    `${process.env.NEXT_PUBLIC_CDN_URL}${product.thumbnail}` ||
                                    "/placeholder.png"
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
                              <DropdownMenuItem
                                onClick={() => handleOpenEditModal(product)}
                              >
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
