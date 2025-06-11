"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Download,
  Trash2,
  Edit,
  Package,
  Users,
  ShoppingCart,
  CheckCircle,
  AlertCircle,
  FileText,
  Play,
} from "lucide-react";
import { mockProducts, mockCustomers, mockOrders } from "@/lib/mock-data";

export default function BulkOperationsPage() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [operationResults, setOperationResults] = useState([]);

  const handleBulkOperation = async (operation, type) => {
    setIsProcessing(true);
    setProgress(0);

    // Simulate bulk operation with progress
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    // Simulate results
    const results = [
      {
        id: "1",
        status: "success",
        message: "Operation completed successfully",
      },
      {
        id: "2",
        status: "success",
        message: "Operation completed successfully",
      },
      { id: "3", status: "error", message: "Failed to process item" },
    ];

    setOperationResults(results);
    setIsProcessing(false);
  };

  const handleSelectAll = (type, items) => {
    const ids = items.map((item) => item.id);
    if (type === "products") {
      setSelectedProducts(selectedProducts.length === items.length ? [] : ids);
    } else if (type === "customers") {
      setSelectedCustomers(
        selectedCustomers.length === items.length ? [] : ids
      );
    } else if (type === "orders") {
      setSelectedOrders(selectedOrders.length === items.length ? [] : ids);
    }
  };

  const handleItemSelect = (type, id) => {
    if (type === "products") {
      setSelectedProducts((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else if (type === "customers") {
      setSelectedCustomers((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else if (type === "orders") {
      setSelectedOrders((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">
            Bulk Operations
          </h1>
          <p className="text-sm text-stone-600">
            Perform bulk actions on products, customers, and orders
          </p>
        </div>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products" className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Products</span>
          </TabsTrigger>
          <TabsTrigger
            value="customers"
            className="flex items-center space-x-2"
          >
            <Users className="h-4 w-4" />
            <span>Customers</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center space-x-2">
            <ShoppingCart className="h-4 w-4" />
            <span>Orders</span>
          </TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-3">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Select Products</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSelectAll("products", mockProducts)}
                    >
                      {selectedProducts.length === mockProducts.length
                        ? "Deselect All"
                        : "Select All"}
                    </Button>
                    <Badge variant="secondary">
                      {selectedProducts.length} selected
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {mockProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-3 p-3 border rounded-lg"
                    >
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() =>
                          handleItemSelect("products", product.id)
                        }
                      />
                      <div className="w-12 h-12 bg-stone-100 rounded overflow-hidden">
                        <img
                          src={product.images[0]?.url || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-stone-500">
                          SKU: {product.sku}
                        </p>
                      </div>
                      <Badge
                        className={
                          product.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {product.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bulk Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Update Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    className="w-full"
                    disabled={selectedProducts.length === 0}
                    onClick={() =>
                      handleBulkOperation("update_status", "products")
                    }
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Update Status
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Price Adjustment</Label>
                  <div className="flex space-x-2">
                    <Input placeholder="%" type="number" />
                    <Select>
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="increase">+</SelectItem>
                        <SelectItem value="decrease">-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    className="w-full"
                    disabled={selectedProducts.length === 0}
                    onClick={() =>
                      handleBulkOperation("adjust_price", "products")
                    }
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Adjust Prices
                  </Button>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={selectedProducts.length === 0}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Selected
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    disabled={selectedProducts.length === 0}
                    onClick={() => handleBulkOperation("delete", "products")}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Selected
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-3">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Select Customers</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleSelectAll("customers", mockCustomers)
                      }
                    >
                      {selectedCustomers.length === mockCustomers.length
                        ? "Deselect All"
                        : "Select All"}
                    </Button>
                    <Badge variant="secondary">
                      {selectedCustomers.length} selected
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {mockCustomers.map((customer) => (
                    <div
                      key={customer.id}
                      className="flex items-center space-x-3 p-3 border rounded-lg"
                    >
                      <Checkbox
                        checked={selectedCustomers.includes(customer.id)}
                        onCheckedChange={() =>
                          handleItemSelect("customers", customer.id)
                        }
                      />
                      <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-stone-700">
                          {customer.firstName[0]}
                          {customer.lastName[0]}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {customer.firstName} {customer.lastName}
                        </p>
                        <p className="text-xs text-stone-500">
                          {customer.email}
                        </p>
                      </div>
                      <Badge
                        className={
                          customer.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {customer.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bulk Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Update Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    className="w-full"
                    disabled={selectedCustomers.length === 0}
                    onClick={() =>
                      handleBulkOperation("update_status", "customers")
                    }
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Update Status
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Add Tags</Label>
                  <Input placeholder="Enter tags (comma separated)" />
                  <Button
                    className="w-full"
                    disabled={selectedCustomers.length === 0}
                    onClick={() => handleBulkOperation("add_tags", "customers")}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Add Tags
                  </Button>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={selectedCustomers.length === 0}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Selected
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full"
                        disabled={selectedCustomers.length === 0}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Send Bulk Email</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Subject</Label>
                          <Input placeholder="Email subject" />
                        </div>
                        <div>
                          <Label>Message</Label>
                          <textarea
                            className="w-full p-3 border rounded-md"
                            rows={6}
                            placeholder="Email message..."
                          />
                        </div>
                        <Button className="w-full">
                          <Play className="h-4 w-4 mr-2" />
                          Send Email
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-3">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Select Orders</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSelectAll("orders", mockOrders)}
                    >
                      {selectedOrders.length === mockOrders.length
                        ? "Deselect All"
                        : "Select All"}
                    </Button>
                    <Badge variant="secondary">
                      {selectedOrders.length} selected
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center space-x-3 p-3 border rounded-lg"
                    >
                      <Checkbox
                        checked={selectedOrders.includes(order.id)}
                        onCheckedChange={() =>
                          handleItemSelect("orders", order.id)
                        }
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {order.orderNumber}
                        </p>
                        <p className="text-xs text-stone-500">
                          {new Date(order.createdAt).toLocaleDateString()} • $
                          {order.total}
                        </p>
                      </div>
                      <Badge
                        className={
                          order.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bulk Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Update Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    className="w-full"
                    disabled={selectedOrders.length === 0}
                    onClick={() =>
                      handleBulkOperation("update_status", "orders")
                    }
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Update Status
                  </Button>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={selectedOrders.length === 0}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Selected
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={selectedOrders.length === 0}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Print Invoices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Progress Dialog */}
      {isProcessing && (
        <Dialog open={isProcessing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Processing Bulk Operation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-stone-600">
                Processing {progress}% complete...
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Results */}
      {operationResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Operation Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {operationResults.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-2 border rounded"
                >
                  {result.status === "success" ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">{result.message}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
