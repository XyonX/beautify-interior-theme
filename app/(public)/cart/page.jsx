"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, X, ShoppingBag, Truck, Shield } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useToastStore } from "@/lib/toast-store";

export default function CartPage() {
  const {
    items: cartItems,
    updateQuantity,
    removeItem,
    getTotalPrice,
  } = useCartStore();
  const { addToast } = useToastStore();

  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 8299 ? 0 : 829; // Free shipping over ₹8299, otherwise ₹829
  const tax = subtotal * 0.18; // 18% GST for India
  const total = subtotal + shipping + tax;

  const handleQuantityUpdate = (id, newQuantity, maxQuantity = 10) => {
    try {
      if (newQuantity < 1) {
        addToast({
          type: "warning",
          message: "Quantity cannot be less than 1.",
          duration: 3000,
        });
        return;
      }

      if (newQuantity > maxQuantity) {
        addToast({
          type: "warning",
          title: "Quantity Limit",
          message: `Maximum quantity for this item is ${maxQuantity}.`,
          duration: 4000,
        });
        return;
      }

      updateQuantity(id, newQuantity);
      addToast({
        type: "info",
        message: "Cart updated successfully.",
        duration: 2000,
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
      addToast({
        type: "error",
        message: "Failed to update quantity. Please try again.",
        duration: 3000,
      });
    }
  };

  const handleRemoveItem = (id, itemName) => {
    try {
      removeItem(id);
      addToast({
        type: "success",
        title: "Item Removed",
        message: `${itemName} has been removed from your cart.`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Error removing item:", error);
      addToast({
        type: "error",
        message: "Failed to remove item. Please try again.",
        duration: 3000,
      });
    }
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      addToast({
        type: "warning",
        message: "Please enter a promo code.",
        duration: 3000,
      });
      return;
    }

    setIsApplyingPromo(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const validCodes = ["SAVE10", "WELCOME20", "FIRST15"];

      if (validCodes.includes(promoCode.toUpperCase())) {
        addToast({
          type: "success",
          title: "Promo Code Applied",
          message: `${promoCode.toUpperCase()} has been applied to your order.`,
          duration: 4000,
        });
      } else {
        addToast({
          type: "error",
          title: "Invalid Promo Code",
          message: "The promo code you entered is not valid or has expired.",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Error applying promo code:", error);
      addToast({
        type: "error",
        title: "Error",
        message: "Failed to apply promo code. Please try again.",
        duration: 4000,
      });
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleProceedToCheckout = () => {
    try {
      if (cartItems.length === 0) {
        addToast({
          type: "warning",
          title: "Empty Cart",
          message:
            "Please add some items to your cart before proceeding to checkout.",
          duration: 4000,
        });
        return;
      }

      // Check for minimum order amount
      if (subtotal < 829) {
        addToast({
          type: "warning",
          title: "Minimum Order Amount",
          message: "Minimum order amount is ₹829.00. Please add more items.",
          duration: 4000,
        });
        return;
      }

      // Validate stock for all items (simulated)
      const outOfStockItems = cartItems.filter(() => Math.random() < 0.05); // 5% chance of out of stock

      if (outOfStockItems.length > 0) {
        addToast({
          type: "error",
          title: "Items Out of Stock",
          message: `Some items in your cart are no longer available. Please remove them and try again.`,
          duration: 5000,
        });
        return;
      }

      addToast({
        type: "info",
        message: "Redirecting to checkout...",
        duration: 2000,
      });
    } catch (error) {
      console.error("Error proceeding to checkout:", error);
      addToast({
        type: "error",
        message: "Failed to proceed to checkout. Please try again.",
        duration: 4000,
      });
    }
  };

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
              className="bg-accent2-600 hover:bg-accent2-700 text-white text-xs rounded-sm"
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
                    key={`${item.id}-${item.variant || "default"}`}
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
                      {item.variant && (
                        <p className="text-xs text-stone-600 mb-1">
                          Variant: {item.variant}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-stone-200 rounded-sm">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleQuantityUpdate(
                                item.id,
                                item.quantity - 1,
                                item.maxQuantity
                              )
                            }
                            className="h-6 w-6 p-0"
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
                              handleQuantityUpdate(
                                item.id,
                                item.quantity + 1,
                                item.maxQuantity
                              )
                            }
                            className="h-6 w-6 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-accent1-600 hover:text-accent1-700 hover:bg-accent1-50 text-xs h-6 p-0 px-1"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-medium text-stone-900">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                      <p className="text-xs text-stone-500">
                        ₹{item.price.toLocaleString("en-IN")} each
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
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-xs text-stone-600">Shipping</span>
                  <span className="text-xs font-medium">
                    {shipping === 0
                      ? "Free"
                      : `₹${shipping.toLocaleString("en-IN")}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-xs text-stone-600">Tax</span>
                  <span className="text-xs font-medium">
                    ₹{tax.toLocaleString("en-IN")}
                  </span>
                </div>

                <Separator className="my-1" />

                <div className="flex justify-between text-sm font-medium">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
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
                      disabled={isApplyingPromo}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs rounded-sm"
                      onClick={handleApplyPromo}
                      disabled={isApplyingPromo}
                    >
                      {isApplyingPromo ? "..." : "Apply"}
                    </Button>
                  </div>
                </div>

                <Link href="/checkout" onClick={handleProceedToCheckout}>
                  <Button
                    size="sm"
                    className="w-full bg-accent2-600 hover:bg-accent2-700 mt-4 h-8 text-xs rounded-sm"
                  >
                    Proceed to Checkout
                  </Button>
                </Link>

                <div className="space-y-2 pt-3 border-t border-stone-100">
                  <div className="flex items-center gap-1.5 text-xs text-stone-600">
                    <Truck className="h-3 w-3 text-accent3-600" />
                    <span>Free shipping on orders over ₹8,299</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-600">
                    <Shield className="h-3 w-3 text-accent3-600" />
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
