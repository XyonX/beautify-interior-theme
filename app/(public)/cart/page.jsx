"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, X, ShoppingBag, Truck, Shield } from "lucide-react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Moroccan Pendant Light",
      price: 89.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      variant: "Gold",
      inStock: true,
    },
    {
      id: 2,
      name: "Handwoven Macrame Wall Hanging",
      price: 45.99,
      quantity: 2,
      image: "/placeholder.svg?height=100&width=100",
      variant: "Natural",
      inStock: true,
    },
    {
      id: 3,
      name: "Ceramic Vase Set",
      price: 34.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      variant: "White",
      inStock: false,
    },
  ]);

  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 99 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <main className="container mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <ol className="flex items-center space-x-2 text-xs text-stone-600">
          <li>
            <Link href="/" className="hover:text-stone-900">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-stone-900 font-medium">Shopping Cart</li>
        </ol>
      </nav>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 text-stone-300 mx-auto mb-4" />
          <h2 className="text-lg font-medium text-stone-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-xs text-stone-600 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link href="/products">
            <Button
              size="sm"
              className="bg-stone-800 hover:bg-stone-700 text-xs rounded-sm"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="rounded-sm border-stone-100">
              <CardHeader className="p-4">
                <CardTitle className="text-sm">
                  Shopping Cart ({cartItems.length} items)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 border border-stone-100 rounded-sm"
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-sm object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="text-xs font-medium text-stone-800 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-stone-600 mb-1">
                        Variant: {item.variant}
                      </p>
                      {!item.inStock && (
                        <p className="text-xs text-red-600 font-medium">
                          Out of Stock
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-stone-200 rounded-sm">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="h-6 w-6 p-0"
                            disabled={!item.inStock}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-xs font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="h-6 w-6 p-0"
                            disabled={!item.inStock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs h-6 p-0 px-1"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-medium text-stone-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs text-stone-500">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 rounded-sm border-stone-100">
              <CardHeader className="p-4">
                <CardTitle className="text-sm">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4">
                <div className="flex justify-between">
                  <span className="text-xs text-stone-600">Subtotal</span>
                  <span className="text-xs font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-xs text-stone-600">Shipping</span>
                  <span className="text-xs font-medium">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-xs text-stone-600">Tax</span>
                  <span className="text-xs font-medium">${tax.toFixed(2)}</span>
                </div>

                <Separator className="my-1" />

                <div className="flex justify-between text-sm font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* Promo Code */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-medium text-stone-800">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 h-8 text-xs rounded-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs rounded-sm"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full bg-stone-800 hover:bg-stone-700 mt-4 h-8 text-xs rounded-sm"
                >
                  Proceed to Checkout
                </Button>

                <div className="space-y-2 pt-3 border-t border-stone-100">
                  <div className="flex items-center gap-1.5 text-xs text-stone-600">
                    <Truck className="h-3 w-3 text-stone-800" />
                    <span>Free shipping on orders over $99</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-600">
                    <Shield className="h-3 w-3 text-stone-800" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
