"use client";

import { useState, useEffect } from "react";
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
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useCartStore } from "@/lib/cart-store";
import { useToastStore } from "@/lib/toast-store";
import { CreditCard, Truck, Shield, ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items: cartItems, getTotalPrice } = useCartStore();
  const { addToast } = useToastStore();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isValidating, setIsValidating] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [saveInfo, setSaveInfo] = useState(false);

  const subtotal = getTotalPrice();
  const shippingCost =
    shippingMethod === "standard"
      ? subtotal > 8299
        ? 0
        : 829
      : shippingMethod === "express"
      ? 1659
      : 3319;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shippingCost + tax;

  // Check if cart is empty on component mount
  useEffect(() => {
    if (cartItems.length === 0) {
      addToast({
        type: "warning",
        title: "Empty Cart",
        message:
          "Your cart is empty. Please add items before proceeding to checkout.",
        duration: 5000,
      });
      router.push("/products");
    }
  }, [cartItems.length, router, addToast]);

  const validateShippingInfo = () => {
    const requiredFields = [
      { field: "firstName", label: "First Name" },
      { field: "lastName", label: "Last Name" },
      { field: "email", label: "Email" },
      { field: "address", label: "Address" },
      { field: "city", label: "City" },
      { field: "state", label: "State" },
      { field: "zipCode", label: "ZIP Code" },
    ];

    const emptyFields = requiredFields.filter(
      ({ field }) => !shippingInfo[field].trim()
    );

    if (emptyFields.length > 0) {
      addToast({
        type: "error",
        title: "Missing Information",
        message: `Please fill in: ${emptyFields
          .map((f) => f.label)
          .join(", ")}`,
        duration: 5000,
      });
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingInfo.email)) {
      addToast({
        type: "error",
        title: "Invalid Email",
        message: "Please enter a valid email address.",
        duration: 4000,
      });
      return false;
    }

    // Validate ZIP code format (US)
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(shippingInfo.zipCode)) {
      addToast({
        type: "error",
        title: "Invalid ZIP Code",
        message: "Please enter a valid ZIP code (e.g., 12345 or 12345-6789).",
        duration: 4000,
      });
      return false;
    }

    return true;
  };

  const validateShippingAvailability = async () => {
    // Simulate shipping validation API call
    const unavailableStates = ["AK", "HI"]; // Alaska and Hawaii

    if (unavailableStates.includes(shippingInfo.state)) {
      addToast({
        type: "error",
        title: "Shipping Not Available",
        message: `We currently don't ship to ${shippingInfo.state}. Please contact customer service for assistance.`,
        duration: 6000,
      });
      return false;
    }

    return true;
  };

  const handleContinueToPayment = async () => {
    if (!validateShippingInfo()) {
      return;
    }

    setIsValidating(true);

    try {
      // Simulate API validation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const isShippingAvailable = await validateShippingAvailability();
      if (!isShippingAvailable) {
        setIsValidating(false);
        return;
      }

      // Check inventory again before proceeding
      const outOfStockItems = cartItems.filter(() => Math.random() < 0.03); // 3% chance

      if (outOfStockItems.length > 0) {
        addToast({
          type: "error",
          title: "Items Out of Stock",
          message:
            "Some items in your cart are no longer available. Please review your cart.",
          duration: 5000,
        });
        setIsValidating(false);
        return;
      }

      setCurrentStep(2);
      addToast({
        type: "success",
        message: "Shipping information validated successfully.",
        duration: 3000,
      });
    } catch (error) {
      addToast({
        type: "error",
        title: "Validation Error",
        message: "Failed to validate shipping information. Please try again.",
        duration: 4000,
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleProceedToPayment = () => {
    // Final validation before payment
    if (total < 83) {
      addToast({
        type: "error",
        title: "Invalid Order Total",
        message: "Order total must be at least ₹83.00.",
        duration: 4000,
      });
      return;
    }

    // Check for payment method selection
    if (!paymentMethod) {
      addToast({
        type: "warning",
        title: "Payment Method Required",
        message: "Please select a payment method to continue.",
        duration: 4000,
      });
      return;
    }

    // Store checkout data and redirect to payment
    const checkoutData = {
      shippingInfo,
      shippingMethod,
      paymentMethod,
      total,
      items: cartItems,
    };

    try {
      localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
      addToast({
        type: "info",
        message: "Redirecting to secure payment...",
        duration: 2000,
      });
      router.push("/payment");
    } catch (error) {
      addToast({
        type: "error",
        title: "Storage Error",
        message: "Failed to save checkout data. Please try again.",
        duration: 4000,
      });
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-lg font-medium text-stone-800 mb-2">
            Your cart is empty
          </h1>
          <p className="text-xs text-stone-600 mb-6">
            Add some items to your cart before checking out.
          </p>
          <Link href="/products">
            <Button className="bg-accent2-600 hover:bg-accent2-700 text-white text-xs rounded-sm">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-4">
      <div className="mb-4">
        <Link
          href="/cart"
          className="flex items-center gap-2 text-xs text-stone-600 hover:text-stone-900"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Cart
        </Link>
      </div>

      {/* Progress Steps */}
      <div className="mb-6">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                currentStep >= 1
                  ? "bg-accent2-600 text-white"
                  : "bg-stone-200 text-stone-600"
              }`}
            >
              1
            </div>
            <span className="ml-2 text-xs font-medium text-stone-800">
              Shipping
            </span>
          </div>
          <div
            className={`w-16 h-0.5 transition-colors ${
              currentStep >= 2 ? "bg-accent2-600" : "bg-stone-200"
            }`}
          />
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                currentStep >= 2
                  ? "bg-accent2-600 text-white"
                  : "bg-stone-200 text-stone-600"
              }`}
            >
              2
            </div>
            <span className="ml-2 text-xs font-medium text-stone-800">
              Payment
            </span>
          </div>
          <div
            className={`w-16 h-0.5 transition-colors ${
              currentStep >= 3 ? "bg-accent2-600" : "bg-stone-200"
            }`}
          />
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                currentStep >= 3
                  ? "bg-accent2-600 text-white"
                  : "bg-stone-200 text-stone-600"
              }`}
            >
              3
            </div>
            <span className="ml-2 text-xs font-medium text-stone-800">
              Confirmation
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Checkout Form */}
        <div className="space-y-4">
          {currentStep === 1 && (
            <>
              <Card className="rounded-sm border-stone-100">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="firstName" className="text-xs">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            firstName: e.target.value,
                          })
                        }
                        className="h-8 text-xs rounded-sm"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-xs">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            lastName: e.target.value,
                          })
                        }
                        className="h-8 text-xs rounded-sm"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-xs">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          email: e.target.value,
                        })
                      }
                      className="h-8 text-xs rounded-sm"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-xs">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          phone: e.target.value,
                        })
                      }
                      className="h-8 text-xs rounded-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-xs">
                      Address *
                    </Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          address: e.target.value,
                        })
                      }
                      className="h-8 text-xs rounded-sm"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor="city" className="text-xs">
                        City *
                      </Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            city: e.target.value,
                          })
                        }
                        className="h-8 text-xs rounded-sm"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-xs">
                        State *
                      </Label>
                      <Select
                        value={shippingInfo.state}
                        onValueChange={(value) =>
                          setShippingInfo({ ...shippingInfo, state: value })
                        }
                      >
                        <SelectTrigger className="h-8 text-xs rounded-sm">
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                          <SelectItem value="AK">Alaska</SelectItem>
                          <SelectItem value="HI">Hawaii</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="text-xs">
                        ZIP Code *
                      </Label>
                      <Input
                        id="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            zipCode: e.target.value,
                          })
                        }
                        className="h-8 text-xs rounded-sm"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm border-stone-100">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Shipping Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-4">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-sm hover:bg-stone-50 transition-colors">
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={shippingMethod === "standard"}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="text-accent2-600"
                      />
                      <div className="flex-1 flex justify-between">
                        <div>
                          <span className="text-xs font-medium">
                            Standard Shipping
                          </span>
                          <p className="text-xs text-stone-600">
                            5-7 business days
                          </p>
                        </div>
                        <span className="text-xs font-medium">
                          {subtotal > 8299 ? "Free" : "₹829"}
                        </span>
                      </div>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-sm hover:bg-stone-50 transition-colors">
                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={shippingMethod === "express"}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="text-accent2-600"
                      />
                      <div className="flex-1 flex justify-between">
                        <div>
                          <span className="text-xs font-medium">
                            Express Shipping
                          </span>
                          <p className="text-xs text-stone-600">
                            2-3 business days
                          </p>
                        </div>
                        <span className="text-xs font-medium">₹1,659</span>
                      </div>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-sm hover:bg-stone-50 transition-colors">
                      <input
                        type="radio"
                        name="shipping"
                        value="overnight"
                        checked={shippingMethod === "overnight"}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="text-accent2-600"
                      />
                      <div className="flex-1 flex justify-between">
                        <div>
                          <span className="text-xs font-medium">
                            Overnight Shipping
                          </span>
                          <p className="text-xs text-stone-600">
                            1 business day
                          </p>
                        </div>
                        <span className="text-xs font-medium">₹3,319</span>
                      </div>
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleContinueToPayment}
                disabled={isValidating}
                className="w-full bg-accent2-600 hover:bg-accent2-700 h-10 text-sm rounded-sm"
              >
                {isValidating ? "Validating..." : "Continue to Payment"}
              </Button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <Card className="rounded-sm border-stone-100">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-4">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-sm hover:bg-stone-50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-accent2-600"
                      />
                      <CreditCard className="h-4 w-4 text-accent2-600" />
                      <span className="text-xs font-medium">
                        Credit/Debit Card
                      </span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-sm hover:bg-stone-50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-accent2-600"
                      />
                      <div className="h-4 w-4 text-accent2-600">P</div>
                      <span className="text-xs font-medium">PayPal</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-sm hover:bg-stone-50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="apple"
                        checked={paymentMethod === "apple"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-accent2-600"
                      />
                      <div className="h-4 w-4 text-accent2-600">A</div>
                      <span className="text-xs font-medium">Apple Pay</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-sm hover:bg-stone-50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="google"
                        checked={paymentMethod === "google"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-accent2-600"
                      />
                      <div className="h-4 w-4 text-accent2-600">G</div>
                      <span className="text-xs font-medium">Google Pay</span>
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm border-stone-100">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Additional Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saveInfo"
                      checked={saveInfo}
                      onCheckedChange={setSaveInfo}
                      className="h-3 w-3 rounded-sm data-[state=checked]:bg-accent2-600 data-[state=checked]:border-accent2-600"
                    />
                    <Label
                      htmlFor="saveInfo"
                      className="text-xs text-stone-700"
                    >
                      Save my information for faster checkout next time
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newsletter"
                      className="h-3 w-3 rounded-sm data-[state=checked]:bg-accent2-600 data-[state=checked]:border-accent2-600"
                    />
                    <Label
                      htmlFor="newsletter"
                      className="text-xs text-stone-700"
                    >
                      Subscribe to our newsletter for exclusive offers
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button
                  onClick={() => setCurrentStep(1)}
                  variant="outline"
                  className="flex-1 h-10 text-sm rounded-sm"
                >
                  Back to Shipping
                </Button>
                <Button
                  onClick={handleProceedToPayment}
                  className="flex-1 bg-accent2-600 hover:bg-accent2-700 h-10 text-sm rounded-sm"
                >
                  Proceed to Payment
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 rounded-sm border-stone-100">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.variant || "default"}`}
                    className="flex items-center gap-2"
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded-sm object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-stone-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-stone-600">
                        Qty: {item.quantity}
                      </p>
                      {item.variant && (
                        <p className="text-xs text-stone-500">{item.variant}</p>
                      )}
                    </div>
                    <p className="text-xs font-medium">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs text-stone-600">Subtotal</span>
                  <span className="text-xs font-medium">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-stone-600">Shipping</span>
                  <span className="text-xs font-medium">
                    {shippingCost === 0
                      ? "Free"
                      : `₹${shippingCost.toLocaleString("en-IN")}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-stone-600">Tax</span>
                  <span className="text-xs font-medium">
                    ₹{tax.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-sm font-medium">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>

              <div className="space-y-2 pt-3 border-t border-stone-100">
                <div className="flex items-center gap-1.5 text-xs text-stone-600">
                  <Truck className="h-3 w-3 text-accent3-600" />
                  <span>Free shipping on orders over ₹8,299</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-stone-600">
                  <Shield className="h-3 w-3 text-accent3-600" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-stone-600">
                  <Lock className="h-3 w-3 text-accent3-600" />
                  <span>Your payment information is protected</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

// import { ProtectedPage } from "./protected-page"

// export default function CheckoutPage() {
//   // ... existing state and logic ...

//   return (
//     <ProtectedPage title="Checkout" description="Complete your purchase">
//       {/* Move all the existing checkout content here, removing the Header, main wrapper, and Footer */}
//       <div className="max-w-6xl mx-auto">{/* existing checkout content */}</div>
//     </ProtectedPage>
//   )
// }
