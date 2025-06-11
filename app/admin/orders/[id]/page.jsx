"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Package, CreditCard, User, MapPin, Phone, Mail, Edit, Save, X, ExternalLink } from "lucide-react"
import { mockOrders, mockCustomers, mockProducts } from "@/lib/mock-data"

export default function OrderDetailsPage({ params }) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Find the order (in real app, this would be fetched from API)
  const order = mockOrders.find((o) => o.id === params.id)
  const customer = mockCustomers.find((c) => c.id === order?.customerId)

  const [formData, setFormData] = useState<UpdateOrderForm>({
    status: order?.status || "pending",
    paymentStatus: order?.paymentStatus || "pending",
    fulfillmentStatus: order?.fulfillmentStatus || "unfulfilled",
    trackingNumber: order?.trackingNumber || "",
    trackingUrl: "",
    estimatedDelivery: order?.estimatedDelivery || "",
    actualDelivery: "",
    notes: order?.notes || "",
    adminNotes: "",
    tags: order?.tags || [],
    paymentIntentId: "",
    source: "web",
  })

  if (!order) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-stone-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-stone-900 mb-2">Order not found</h3>
        <p className="text-sm text-stone-500 mb-6">The order you're looking for doesn't exist.</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    )
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Updating order:", formData)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating order:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-stone-100 text-stone-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-stone-100 text-stone-800"
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "refunded":
        return "bg-purple-100 text-purple-800"
      case "partially_refunded":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-stone-100 text-stone-800"
    }
  }

  const getFulfillmentStatusColor = (status) => {
    switch (status) {
      case "fulfilled":
        return "bg-green-100 text-green-800"
      case "partial":
        return "bg-yellow-100 text-yellow-800"
      case "unfulfilled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-stone-100 text-stone-800"
    }
  }

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-stone-900">Order {order.orderNumber}</h1>
            <p className="text-sm text-stone-600">
              Placed on {new Date(order.createdAt).toLocaleDateString()} at{" "}
              {new Date(order.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Order
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Order Items ({order.items.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => {
                  const product = mockProducts.find((p) => p.id === item.productId)
                  return (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-stone-100 rounded overflow-hidden">
                        {product?.images[0] ? (
                          <img
                            src={product.images[0].url || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-6 w-6 text-stone-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-stone-900">{product?.name || "Product not found"}</h4>
                        <p className="text-sm text-stone-500">SKU: {product?.sku}</p>
                        <p className="text-sm text-stone-600">Quantity: {item.quantity}</p>
                        {item.variantId && <p className="text-sm text-stone-500">Variant: {item.variantId}</p>}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(item.price)}</p>
                        <p className="text-sm text-stone-500">Total: {formatCurrency(item.total)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Order Placed</p>
                    <p className="text-xs text-stone-500">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                {order.status !== "pending" && (
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Order Confirmed</p>
                      <p className="text-xs text-stone-500">{new Date(order.updatedAt).toLocaleString()}</p>
                    </div>
                  </div>
                )}
                {order.trackingNumber && (
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Order Shipped</p>
                      <p className="text-xs text-stone-500">Tracking: {order.trackingNumber}</p>
                      {formData.trackingUrl && (
                        <a
                          href={formData.trackingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          Track Package <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
                {formData.actualDelivery && (
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Order Delivered</p>
                      <p className="text-xs text-stone-500">{new Date(formData.actualDelivery).toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <Label htmlFor="status">Order Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="paymentStatus">Payment Status</Label>
                    <Select
                      value={formData.paymentStatus}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentStatus: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                        <SelectItem value="partially_refunded">Partially Refunded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fulfillmentStatus">Fulfillment Status</Label>
                    <Select
                      value={formData.fulfillmentStatus}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, fulfillmentStatus: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unfulfilled">Unfulfilled</SelectItem>
                        <SelectItem value="partial">Partial</SelectItem>
                        <SelectItem value="fulfilled">Fulfilled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="trackingNumber">Tracking Number</Label>
                    <Input
                      id="trackingNumber"
                      value={formData.trackingNumber}
                      onChange={(e) => setFormData((prev) => ({ ...prev, trackingNumber: e.target.value }))}
                      placeholder="Enter tracking number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="trackingUrl">Tracking URL</Label>
                    <Input
                      id="trackingUrl"
                      value={formData.trackingUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, trackingUrl: e.target.value }))}
                      placeholder="Enter tracking URL"
                    />
                  </div>
                  <div>
                    <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
                    <Input
                      id="estimatedDelivery"
                      type="date"
                      value={formData.estimatedDelivery}
                      onChange={(e) => setFormData((prev) => ({ ...prev, estimatedDelivery: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="actualDelivery">Actual Delivery</Label>
                    <Input
                      id="actualDelivery"
                      type="date"
                      value={formData.actualDelivery}
                      onChange={(e) => setFormData((prev) => ({ ...prev, actualDelivery: e.target.value }))}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-stone-600">Order Status</span>
                    <Badge className={`${getStatusColor(order.status)}`}>{order.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-stone-600">Payment Status</span>
                    <Badge className={`${getPaymentStatusColor(order.paymentStatus)}`}>{order.paymentStatus}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-stone-600">Fulfillment Status</span>
                    <Badge className={`${getFulfillmentStatusColor(order.fulfillmentStatus)}`}>
                      {order.fulfillmentStatus}
                    </Badge>
                  </div>
                  {order.trackingNumber && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-stone-600">Tracking</span>
                      <span className="text-sm font-mono">{order.trackingNumber}</span>
                    </div>
                  )}
                  {order.estimatedDelivery && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-stone-600">Est. Delivery</span>
                      <span className="text-sm">{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-stone-700">
                    {customer?.firstName[0]}
                    {customer?.lastName[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium">
                    {customer?.firstName} {customer?.lastName}
                  </p>
                  <p className="text-sm text-stone-500">{customer?.totalOrders} orders</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-stone-400" />
                  <span className="text-sm">{customer?.email}</span>
                </div>
                {customer?.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-stone-400" />
                    <span className="text-sm">{customer.phone}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <p className="font-medium">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </p>
                {order.shippingAddress.company && <p>{order.shippingAddress.company}</p>}
                <p>{order.shippingAddress.address1}</p>
                {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                {order.shippingAddress.phone && <p>{order.shippingAddress.phone}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>{formatCurrency(order.taxAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{formatCurrency(order.shippingAmount)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-{formatCurrency(order.discountAmount)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
              <div className="text-xs text-stone-500">
                <p>Payment Method: {order.paymentMethod}</p>
                <p>Source: {formData.source}</p>
                {formData.paymentIntentId && <p>Payment ID: {formData.paymentIntentId}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Customer Notes</Label>
                {isEditing ? (
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Customer notes..."
                    rows={3}
                  />
                ) : (
                  <p className="text-sm text-stone-600 mt-1">{order.notes || "No customer notes"}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium">Admin Notes</Label>
                {isEditing ? (
                  <Textarea
                    value={formData.adminNotes}
                    onChange={(e) => setFormData((prev) => ({ ...prev, adminNotes: e.target.value }))}
                    placeholder="Internal admin notes..."
                    rows={3}
                  />
                ) : (
                  <p className="text-sm text-stone-600 mt-1">{formData.adminNotes || "No admin notes"}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
