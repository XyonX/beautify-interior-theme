"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Heart,
  Settings,
  Edit,
  Plus,
} from "lucide-react";

export default function AccountPage() {
  const [user] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    joinDate: "March 2023",
  });

  const [orders] = useState([
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 156.97,
      items: 3,
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-08",
      status: "Shipped",
      total: 89.99,
      items: 1,
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-02",
      status: "Processing",
      total: 234.5,
      items: 5,
    },
  ]);

  const [addresses] = useState([
    {
      id: 1,
      type: "Home",
      name: "Sarah Johnson",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      name: "Sarah Johnson",
      address: "456 Business Ave",
      city: "New York",
      state: "NY",
      zip: "10002",
      isDefault: false,
    },
  ]);

  const [paymentMethods] = useState([
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiry: "12/26",
      isDefault: true,
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "8888",
      expiry: "09/25",
      isDefault: false,
    },
  ]);

  const [wishlist] = useState([
    {
      id: 1,
      name: "Boho Table Lamp",
      price: 67.99,
      image: "/placeholder.svg?height=100&width=100",
      inStock: true,
    },
    {
      id: 2,
      name: "Woven Wall Basket",
      price: 34.99,
      image: "/placeholder.svg?height=100&width=100",
      inStock: false,
    },
  ]);

  return (
    <main className="container mx-auto px-4 py-4">
      <div className="mb-6">
        <h1 className="text-lg font-medium text-stone-800 mb-1">My Account</h1>
        <p className="text-xs text-stone-600">
          Manage your account settings and view your order history
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-8 rounded-sm">
          <TabsTrigger
            value="overview"
            className="flex items-center gap-1 text-xs rounded-sm"
          >
            <User className="h-3 w-3" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="flex items-center gap-1 text-xs rounded-sm"
          >
            <Package className="h-3 w-3" />
            <span className="hidden sm:inline">Orders</span>
          </TabsTrigger>
          <TabsTrigger
            value="addresses"
            className="flex items-center gap-1 text-xs rounded-sm"
          >
            <MapPin className="h-3 w-3" />
            <span className="hidden sm:inline">Addresses</span>
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            className="flex items-center gap-1 text-xs rounded-sm"
          >
            <CreditCard className="h-3 w-3" />
            <span className="hidden sm:inline">Payment</span>
          </TabsTrigger>
          <TabsTrigger
            value="wishlist"
            className="flex items-center gap-1 text-xs rounded-sm"
          >
            <Heart className="h-3 w-3" />
            <span className="hidden sm:inline">Wishlist</span>
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex items-center gap-1 text-xs rounded-sm"
          >
            <Settings className="h-3 w-3" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="rounded-sm border-stone-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium text-stone-800">
                      {orders.length}
                    </p>
                    <p className="text-xs text-stone-600">Total Orders</p>
                  </div>
                  <Package className="h-6 w-6 text-stone-800" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-sm border-stone-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium text-stone-800">
                      {wishlist.length}
                    </p>
                    <p className="text-xs text-stone-600">Wishlist Items</p>
                  </div>
                  <Heart className="h-6 w-6 text-stone-800" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-sm border-stone-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium text-stone-800">
                      {addresses.length}
                    </p>
                    <p className="text-xs text-stone-600">Saved Addresses</p>
                  </div>
                  <MapPin className="h-6 w-6 text-stone-800" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-sm border-stone-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium text-stone-800">
                      {paymentMethods.length}
                    </p>
                    <p className="text-xs text-stone-600">Payment Methods</p>
                  </div>
                  <CreditCard className="h-6 w-6 text-stone-800" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-sm border-stone-100">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {orders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 border border-stone-100 rounded-sm"
                  >
                    <div>
                      <p className="text-xs font-medium text-stone-800">
                        {order.id}
                      </p>
                      <p className="text-xs text-stone-600">
                        {order.date} • {order.items} items
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          order.status === "Delivered"
                            ? "default"
                            : order.status === "Shipped"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs rounded-sm bg-stone-800"
                      >
                        {order.status}
                      </Badge>
                      <p className="text-xs font-medium text-stone-800 mt-1">
                        ${order.total}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card className="rounded-sm border-stone-100">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Order History</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 border border-stone-100 rounded-sm"
                  >
                    <div>
                      <p className="text-xs font-medium text-stone-800">
                        {order.id}
                      </p>
                      <p className="text-xs text-stone-600">
                        {order.date} • {order.items} items
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "default"
                              : order.status === "Shipped"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-xs rounded-sm bg-stone-800"
                        >
                          {order.status}
                        </Badge>
                        <p className="text-xs font-medium text-stone-800 mt-1">
                          ${order.total}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs rounded-sm"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-medium text-stone-800">
              Saved Addresses
            </h2>
            <Button className="bg-stone-800 hover:bg-stone-700 h-7 text-xs rounded-sm">
              <Plus className="h-3 w-3 mr-1" />
              Add Address
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <Card key={address.id} className="rounded-sm border-stone-100">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xs font-medium text-stone-800">
                          {address.type}
                        </h3>
                        {address.isDefault && (
                          <Badge
                            variant="secondary"
                            className="text-xs rounded-sm"
                          >
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-stone-600">{address.name}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="text-xs text-stone-600">
                    <p>{address.address}</p>
                    <p>
                      {address.city}, {address.state} {address.zip}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-medium text-stone-800">
              Payment Methods
            </h2>
            <Button className="bg-stone-800 hover:bg-stone-700 h-7 text-xs rounded-sm">
              <Plus className="h-3 w-3 mr-1" />
              Add Payment Method
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="rounded-sm border-stone-100">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xs font-medium text-stone-800">
                          {method.type}
                        </h3>
                        {method.isDefault && (
                          <Badge
                            variant="secondary"
                            className="text-xs rounded-sm"
                          >
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-stone-600">
                        •••• •••• •••• {method.last4}
                      </p>
                      <p className="text-xs text-stone-500">
                        Expires {method.expiry}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-4">
          <Card className="rounded-sm border-stone-100">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">
                My Wishlist ({wishlist.length} items)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 border border-stone-100 rounded-sm"
                  >
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 rounded-sm object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xs font-medium text-stone-800">
                        {item.name}
                      </h3>
                      <p className="text-xs font-medium text-stone-800">
                        ${item.price}
                      </p>
                      {!item.inStock && (
                        <p className="text-xs text-red-600">Out of Stock</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-stone-800 hover:bg-stone-700 h-7 text-xs rounded-sm"
                        disabled={!item.inStock}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs rounded-sm"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="rounded-sm border-stone-100">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="name" className="text-xs">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue={user.name}
                    className="h-8 text-xs rounded-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user.email}
                    className="h-8 text-xs rounded-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-xs">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    defaultValue={user.phone}
                    className="h-8 text-xs rounded-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="joinDate" className="text-xs">
                    Member Since
                  </Label>
                  <Input
                    id="joinDate"
                    defaultValue={user.joinDate}
                    disabled
                    className="h-8 text-xs rounded-sm"
                  />
                </div>
              </div>
              <Button className="bg-stone-800 hover:bg-stone-700 h-8 text-xs rounded-sm">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-sm border-stone-100">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <div>
                <Label htmlFor="currentPassword" className="text-xs">
                  Current Password
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  className="h-8 text-xs rounded-sm"
                />
              </div>
              <div>
                <Label htmlFor="newPassword" className="text-xs">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  className="h-8 text-xs rounded-sm"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-xs">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="h-8 text-xs rounded-sm"
                />
              </div>
              <Button className="bg-stone-800 hover:bg-stone-700 h-8 text-xs rounded-sm">
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
