"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/lib/cart-store";
import { useAuthStore } from "@/lib/auth-store";
import { useToastStore } from "@/lib/toast-store";
import {
  MapPin,
  Truck,
  CreditCard,
  Shield,
  ArrowLeft,
  CheckCircle,
  Clock,
  Package,
  Phone,
  Mail,
  Home,
  Banknote,
  Plus,
  Edit,
  Building,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

// interface ShippingInfo {
//   firstName: string
//   lastName: string
//   email: string
//   phone: string
//   address: string
//   city: string
//   state: string
//   zipCode: string
//   landmark?: string
// }

export default function CheckoutPage() {
  const { user } = useAuthStore();
  const { items, getTotalPrice, getTotalItems } = useCartStore();
  const { addToast } = useToastStore();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [addressOption, setAddressOption] = useState("saved");
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    landmark: "",
  });

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Initialize address selection
  useEffect(() => {
    if (user?.addresses && user.addresses.length > 0) {
      // Set default address if available
      const defaultAddress =
        user.addresses.find((addr) => addr.isDefault) || user.addresses[0];
      setSelectedAddressId(defaultAddress.id);
      setAddressOption("saved");
    } else {
      setAddressOption("new");
    }
  }, [user]);

  // Update shipping info when address selection changes
  useEffect(() => {
    if (addressOption === "saved" && selectedAddressId && user?.addresses) {
      const selectedAddress = user.addresses.find(
        (addr) => addr.id === selectedAddressId
      );
      if (selectedAddress) {
        setShippingInfo({
          firstName: selectedAddress.firstName,
          lastName: selectedAddress.lastName,
          email: user.email,
          phone: selectedAddress.phone || "",
          address: selectedAddress.address,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.zipCode,
          landmark: selectedAddress.address2 || "",
        });
      }
    } else if (addressOption === "new") {
      // Reset form for new address
      setShippingInfo({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        landmark: "",
      });
    }
  }, [addressOption, selectedAddressId, user]);

  // Redirect if not authenticated or cart is empty
  useEffect(() => {
    if (!user) {
      addToast({
        type: "error",
        title: "Authentication Required",
        message: "Please sign in to continue with checkout.",
        duration: 4000,
      });
      router.push("/auth/login");
      return;
    }

    if (items.length === 0) {
      addToast({
        type: "error",
        title: "Empty Cart",
        message: "Your cart is empty. Add some items to continue.",
        duration: 4000,
      });
      router.push("/products");
      return;
    }
  }, [user, items, router, addToast]);

  // Calculate pricing
  const subtotal = getTotalPrice();
  const shippingCost =
    shippingMethod === "standard"
      ? subtotal > 500
        ? 0
        : 100
      : shippingMethod === "express"
      ? 199
      : 299;
  // const tax = Math.round(subtotal * 0.18); // 18% GST
  const tax = 0; // 18% GST
  const total = subtotal + shippingCost + tax;

  const validateShippingInfo = () => {
    if (addressOption === "saved" && !selectedAddressId) {
      addToast({
        type: "error",
        title: "Address Required",
        message: "Please select a saved address or choose to enter a new one.",
        duration: 4000,
      });
      return false;
    }

    if (addressOption === "new") {
      const requiredFields = [
        "firstName",
        "lastName",
        "phone",
        "address",
        "city",
        "state",
        "zipCode",
      ];
      const emptyFields = requiredFields.filter(
        (field) => !shippingInfo[field]?.trim()
      );

      if (emptyFields.length > 0) {
        addToast({
          type: "error",
          title: "Missing Information",
          message: "Please fill in all required shipping details.",
          duration: 4000,
        });
        return false;
      }

      // Validate phone number (basic validation)
      if (!/^\d{10}$/.test(shippingInfo.phone.replace(/\D/g, ""))) {
        addToast({
          type: "error",
          title: "Invalid Phone Number",
          message: "Please enter a valid 10-digit phone number.",
          duration: 4000,
        });
        return false;
      }

      // Validate ZIP code
      if (!/^\d{6}$/.test(shippingInfo.zipCode)) {
        addToast({
          type: "error",
          title: "Invalid ZIP Code",
          message: "Please enter a valid 6-digit ZIP code.",
          duration: 4000,
        });
        return false;
      }
    }

    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !validateShippingInfo()) {
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      const orderData = {
        user_id: user.id,
        shippingInfo: {
          firstName: shippingInfo.firstName,
          lastName: shippingInfo.lastName,
          email: shippingInfo.email,
          phone: shippingInfo.phone,
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          zipCode: shippingInfo.zipCode,
        },
        shippingMethod,
        paymentMethod,
        specialInstructions,
      };

      console.log("Order data sending from frontend: ", orderData);

      if (paymentMethod === "cod") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(orderData),
          }
        );
        if (!res.ok) throw new Error("Failed to create order");
        const data = await res.json();
        router.push(`/order-confirmation?order=${data.orderId}`);
      } else if (paymentMethod === "razorpay") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/create-pending`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(orderData),
          }
        );
        if (!res.ok) throw new Error("Failed to create pending order");
        const { orderId, razorpay_order_id, orderNumber, total } =
          await res.json();

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: total * 100, // Use amount from backend (in paise)
          currency: "INR",
          name: "Beautify Interior",
          description: "Order Payment",
          order_id: razorpay_order_id,
          handler: async function (response) {
            const verifyRes = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/verify-payment`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                  order_id: orderId,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }
            );
            if (verifyRes.ok) {
              const verifyData = await verifyRes.json();
              console.log("RAZOR PAY FRONETNEND RESPONSE ", verifyData);
              router.push(`/order-confirmation?order=${verifyData.order_id}`);
            } else {
              addToast({
                type: "error",
                title: "Payment Verification Failed",
                message: "There was an error verifying your payment.",
              });
            }
          },
          prefill: {
            name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
            email: shippingInfo.email,
            contact: shippingInfo.phone,
          },
          theme: {
            color: "#F59E0B",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error(error);
      addToast({
        type: "error",
        title: "Order Failed",
        message: "There was an error processing your order. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user || items.length === 0) {
    return null; // Will redirect via useEffect
  }
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/cart"
            className="flex items-center gap-2 text-sm text-stone-600 hover:text-amazon-orange mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>

          <h1 className="text-2xl font-semibold text-stone-900 mb-2">
            Checkout
          </h1>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mb-6">
            {[
              { step: 1, title: "Shipping", icon: MapPin },
              { step: 2, title: "Delivery", icon: Truck },
              { step: 3, title: "Payment", icon: CreditCard },
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step
                      ? "bg-amazon-orange text-white"
                      : "bg-stone-200 text-stone-600"
                  }`}
                >
                  {currentStep > step ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    currentStep >= step ? "text-stone-900" : "text-stone-600"
                  }`}
                >
                  {title}
                </span>
                {step < 3 && <div className="w-8 h-px bg-stone-300 ml-2" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card className="border-stone-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="h-5 w-5 text-amazon-orange" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Address Option Selection */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium text-stone-900">
                      Choose Address Option
                    </Label>
                    <RadioGroup
                      value={addressOption}
                      onValueChange={(value) => setAddressOption(value)}
                    >
                      <div className="space-y-3">
                        {/* Saved Addresses Option */}
                        {user?.addresses && user.addresses.length > 0 && (
                          <div className="flex items-center space-x-3 p-4 border border-stone-200 rounded-lg hover:border-amazon-orange transition-colors">
                            <RadioGroupItem value="saved" id="saved" />
                            <div className="flex-1">
                              <Label
                                htmlFor="saved"
                                className="font-medium text-stone-900 cursor-pointer flex items-center gap-2"
                              >
                                <Home className="h-4 w-4" />
                                Choose from Saved Addresses
                              </Label>
                              <p className="text-sm text-stone-600 mt-1">
                                Select from your {user.addresses.length} saved
                                address
                                {user.addresses.length > 1 ? "es" : ""}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* New Address Option */}
                        <div className="flex items-center space-x-3 p-4 border border-stone-200 rounded-lg hover:border-amazon-orange transition-colors">
                          <RadioGroupItem value="new" id="new" />
                          <div className="flex-1">
                            <Label
                              htmlFor="new"
                              className="font-medium text-stone-900 cursor-pointer flex items-center gap-2"
                            >
                              <Plus className="h-4 w-4" />
                              Enter New Address
                            </Label>
                            <p className="text-sm text-stone-600 mt-1">
                              Add a new shipping address manually
                            </p>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Saved Addresses Selection */}
                  {addressOption === "saved" &&
                    user?.addresses &&
                    user.addresses.length > 0 && (
                      <div className="space-y-4">
                        <Label className="text-base font-medium text-stone-900">
                          Select Saved Address
                        </Label>
                        <RadioGroup
                          value={selectedAddressId}
                          onValueChange={setSelectedAddressId}
                        >
                          <div className="space-y-3">
                            {user.addresses.map((address) => (
                              <div
                                key={address.id}
                                className="flex items-start space-x-3 p-4 border border-stone-200 rounded-lg hover:border-amazon-orange transition-colors"
                              >
                                <RadioGroupItem
                                  value={address.id}
                                  id={address.id}
                                  className="mt-1"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Label
                                      htmlFor={address.id}
                                      className="font-medium text-stone-900 cursor-pointer"
                                    >
                                      {address.firstName} {address.lastName}
                                    </Label>
                                    <div className="flex items-center gap-1">
                                      {address.type === "home" && (
                                        <Home className="h-3 w-3 text-stone-500" />
                                      )}
                                      {address.type === "work" && (
                                        <Building className="h-3 w-3 text-stone-500" />
                                      )}
                                      {address.type === "other" && (
                                        <User className="h-3 w-3 text-stone-500" />
                                      )}
                                      <span className="text-xs text-stone-500 capitalize">
                                        {address.type}
                                      </span>
                                    </div>
                                    {address.isDefault && (
                                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                                        Default
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-sm text-stone-600 space-y-1">
                                    <p>{address.address}</p>
                                    {address.address2 && (
                                      <p>{address.address2}</p>
                                    )}
                                    <p>
                                      {address.city}, {address.state}{" "}
                                      {address.zipCode}
                                    </p>
                                    <p>{address.country}</p>
                                    {address.phone && (
                                      <p className="flex items-center gap-1">
                                        <Phone className="h-3 w-3" />
                                        {address.phone}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-stone-500 hover:text-amazon-orange"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                  {/* New Address Form */}
                  {addressOption === "new" && (
                    <div className="space-y-4">
                      <Label className="text-base font-medium text-stone-900">
                        Enter New Address
                      </Label>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="firstName"
                            className="text-sm font-medium"
                          >
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
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="lastName"
                            className="text-sm font-medium"
                          >
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
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email Address *
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
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
                              className="pl-10 mt-1"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label
                            htmlFor="phone"
                            className="text-sm font-medium"
                          >
                            Phone Number *
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
                            <Input
                              id="phone"
                              type="tel"
                              value={shippingInfo.phone}
                              onChange={(e) =>
                                setShippingInfo({
                                  ...shippingInfo,
                                  phone: e.target.value,
                                })
                              }
                              className="pl-10 mt-1"
                              placeholder="10-digit mobile number"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="address"
                          className="text-sm font-medium"
                        >
                          Street Address *
                        </Label>
                        <div className="relative">
                          <Home className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                          <Textarea
                            id="address"
                            value={shippingInfo.address}
                            onChange={(e) =>
                              setShippingInfo({
                                ...shippingInfo,
                                address: e.target.value,
                              })
                            }
                            className="pl-10 mt-1 min-h-[80px]"
                            placeholder="House/Flat No., Building Name, Street Name"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="landmark"
                          className="text-sm font-medium"
                        >
                          Landmark (Optional)
                        </Label>
                        <Input
                          id="landmark"
                          value={shippingInfo.landmark}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              landmark: e.target.value,
                            })
                          }
                          className="mt-1"
                          placeholder="Near Metro Station, Mall, etc."
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city" className="text-sm font-medium">
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
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="state"
                            className="text-sm font-medium"
                          >
                            State *
                          </Label>
                          <Input
                            id="state"
                            value={shippingInfo.state}
                            onChange={(e) =>
                              setShippingInfo({
                                ...shippingInfo,
                                state: e.target.value,
                              })
                            }
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="zipCode"
                            className="text-sm font-medium"
                          >
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
                            className="mt-1"
                            placeholder="6-digit PIN code"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 2: Delivery Options */}
            {currentStep === 2 && (
              <Card className="border-stone-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Truck className="h-5 w-5 text-amazon-orange" />
                    Delivery Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={shippingMethod}
                    onValueChange={setShippingMethod}
                  >
                    <div className="space-y-3">
                      {[
                        {
                          id: "standard",
                          title: "Standard Delivery",
                          description: "5-7 business days",
                          price: subtotal > 5000 ? 0 : 299,
                          icon: Package,
                          badge: subtotal > 5000 ? "FREE" : null,
                        },
                        {
                          id: "express",
                          title: "Express Delivery",
                          description: "2-3 business days",
                          price: 599,
                          icon: Clock,
                          badge: "FAST",
                        },
                        {
                          id: "priority",
                          title: "Priority Delivery",
                          description: "Next business day",
                          price: 999,
                          icon: Truck,
                          badge: "URGENT",
                        },
                      ].map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-3 p-4 border border-stone-200 rounded-lg hover:border-amazon-orange transition-colors"
                        >
                          <RadioGroupItem value={option.id} id={option.id} />
                          <div className="flex-1 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center">
                                <option.icon className="h-5 w-5 text-stone-600" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <Label
                                    htmlFor={option.id}
                                    className="font-medium text-stone-900 cursor-pointer"
                                  >
                                    {option.title}
                                  </Label>
                                  {option.badge && (
                                    <span
                                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        option.badge === "FREE"
                                          ? "bg-green-100 text-green-700"
                                          : option.badge === "FAST"
                                          ? "bg-blue-100 text-blue-700"
                                          : "bg-red-100 text-red-700"
                                      }`}
                                    >
                                      {option.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-stone-600">
                                  {option.description}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-stone-900">
                                {option.price === 0
                                  ? "FREE"
                                  : `₹${option.price}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>

                  <div className="mt-6">
                    <Label
                      htmlFor="instructions"
                      className="text-sm font-medium"
                    >
                      Special Delivery Instructions (Optional)
                    </Label>
                    <Textarea
                      id="instructions"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      className="mt-1"
                      placeholder="Any specific instructions for delivery..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment Method */}
            {currentStep === 3 && (
              <Card className="border-stone-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CreditCard className="h-5 w-5 text-amazon-orange" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="space-y-3">
                      {[
                        {
                          id: "razorpay",
                          title: "Online Payment",
                          description:
                            "Credit/Debit Card, UPI, Net Banking, Wallets",
                          icon: CreditCard,
                          badge: "SECURE",
                          features: [
                            "Instant confirmation",
                            "Multiple payment options",
                            "Secure encryption",
                          ],
                        },
                        {
                          id: "cod",
                          title: "Cash on Delivery",
                          description: "Pay when your order is delivered",
                          icon: Banknote,
                          badge: "CONVENIENT",
                          features: [
                            "No advance payment",
                            "Inspect before payment",
                            "Cash or card at doorstep",
                          ],
                        },
                      ].map((option) => (
                        <div
                          key={option.id}
                          className="border border-stone-200 rounded-lg overflow-hidden hover:border-amazon-orange transition-colors"
                        >
                          <div className="flex items-center space-x-3 p-4">
                            <RadioGroupItem value={option.id} id={option.id} />
                            <div className="flex-1 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center">
                                  <option.icon className="h-5 w-5 text-stone-600" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <Label
                                      htmlFor={option.id}
                                      className="font-medium text-stone-900 cursor-pointer"
                                    >
                                      {option.title}
                                    </Label>
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                                      {option.badge}
                                    </span>
                                  </div>
                                  <p className="text-sm text-stone-600">
                                    {option.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {paymentMethod === option.id && (
                            <div className="px-4 pb-4 border-t border-stone-100 bg-stone-50">
                              <div className="pt-3">
                                <ul className="space-y-1">
                                  {option.features.map((feature, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center gap-2 text-sm text-stone-600"
                                    >
                                      <CheckCircle className="h-3 w-3 text-green-600" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </RadioGroup>

                  {/* Security Notice */}
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">
                          Secure Payment
                        </h4>
                        <p className="text-sm text-blue-700">
                          Your payment information is encrypted and secure. We
                          use industry-standard security measures to protect
                          your data.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                disabled={currentStep === 1}
                className="border-stone-300 hover:bg-stone-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep < 3 ? (
                <Button
                  onClick={handleNextStep}
                  className="bg-amazon-orange hover:bg-amazon-orange-dark text-white"
                >
                  Continue
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              ) : (
                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="bg-amazon-orange hover:bg-amazon-orange-dark text-white min-w-[140px]"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Place Order
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-stone-200 sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.variant || ""}`}
                      className="flex items-center gap-3"
                    >
                      <div className="w-12 h-12 bg-stone-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-stone-600">
                          Qty: {item.quantity}
                        </p>
                        {item.variant && (
                          <p className="text-xs text-stone-500">
                            {item.variant}
                          </p>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-stone-900">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">
                      Subtotal ({getTotalItems()} items)
                    </span>
                    <span className="font-medium">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">Shipping</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${shippingCost.toLocaleString("en-IN")}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">GST (18%)</span>
                    <span className="font-medium">
                      ₹{tax.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {shippingCost === 0 && subtotal > 5000 && (
                    <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                      🎉 You saved ₹299 on shipping!
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-amazon-orange">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Delivery Info */}
                {currentStep >= 2 && (
                  <div className="pt-3 border-t border-stone-100">
                    <div className="flex items-center gap-2 text-sm text-stone-600 mb-2">
                      <Truck className="h-4 w-4" />
                      <span>
                        {shippingMethod === "standard"
                          ? "Standard Delivery (5-7 days)"
                          : shippingMethod === "express"
                          ? "Express Delivery (2-3 days)"
                          : "Priority Delivery (Next day)"}
                      </span>
                    </div>

                    {currentStep >= 3 && (
                      <div className="flex items-center gap-2 text-sm text-stone-600">
                        <CreditCard className="h-4 w-4" />
                        <span>
                          {paymentMethod === "razorpay"
                            ? "Online Payment"
                            : "Cash on Delivery"}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
