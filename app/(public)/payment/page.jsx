"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/cart-store";
import { useToastStore } from "@/lib/toast-store";
import {
  CreditCard,
  Lock,
  Shield,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

// interface CheckoutData {
//   shippingInfo: any
//   shippingMethod: string
//   paymentMethod: string
//   total: number
//   items: any[]
// }

export default function PaymentPage() {
  const { clearCart } = useCartStore();
  const { addToast } = useToastStore();
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState("form");

  const [orderNumber, setOrderNumber] = useState("");

  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const [billingAddress, setBillingAddress] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    sameAsShipping: true,
  });

  const [cardErrors, setCardErrors] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("checkoutData");
    if (data) {
      const parsed = JSON.parse(data);
      setCheckoutData(parsed);
      if (parsed.shippingInfo) {
        setBillingAddress((prev) => ({
          ...prev,
          address: parsed.shippingInfo.address,
          city: parsed.shippingInfo.city,
          state: parsed.shippingInfo.state,
          zipCode: parsed.shippingInfo.zipCode,
        }));
      }
    } else {
      addToast({
        type: "error",
        title: "Session Expired",
        message: "Your checkout session has expired. Please start over.",
        duration: 5000,
      });
      router.push("/checkout");
    }
  }, [router, addToast]);

  const validateCardInfo = () => {
    const errors = {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      nameOnCard: "",
    };

    // Validate card number (basic Luhn algorithm check)
    const cardNumber = cardInfo.cardNumber.replace(/\s/g, "");
    if (!cardNumber) {
      errors.cardNumber = "Card number is required";
    } else if (cardNumber.length < 13 || cardNumber.length > 19) {
      errors.cardNumber = "Invalid card number length";
    } else if (!/^\d+$/.test(cardNumber)) {
      errors.cardNumber = "Card number must contain only digits";
    }

    // Validate expiry date
    if (!cardInfo.expiryDate) {
      errors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(cardInfo.expiryDate)) {
      errors.expiryDate = "Invalid format (MM/YY)";
    } else {
      const [month, year] = cardInfo.expiryDate.split("/");
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      if (Number.parseInt(month) < 1 || Number.parseInt(month) > 12) {
        errors.expiryDate = "Invalid month";
      } else if (
        Number.parseInt(year) < currentYear ||
        (Number.parseInt(year) === currentYear &&
          Number.parseInt(month) < currentMonth)
      ) {
        errors.expiryDate = "Card has expired";
      }
    }

    // Validate CVV
    if (!cardInfo.cvv) {
      errors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(cardInfo.cvv)) {
      errors.cvv = "Invalid CVV";
    }

    // Validate name on card
    if (!cardInfo.nameOnCard.trim()) {
      errors.nameOnCard = "Name on card is required";
    } else if (cardInfo.nameOnCard.trim().length < 2) {
      errors.nameOnCard = "Name must be at least 2 characters";
    }

    setCardErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const validateBillingAddress = () => {
    if (billingAddress.sameAsShipping) return true;

    const requiredFields = ["address", "city", "state", "zipCode"];
    const emptyFields = requiredFields.filter(
      (field) => !billingAddress[field].trim()
    );

    if (emptyFields.length > 0) {
      addToast({
        type: "error",
        title: "Billing Address Required",
        message: "Please fill in all billing address fields.",
        duration: 4000,
      });
      return false;
    }

    return true;
  };

  const handlePayment = async () => {
    if (checkoutData?.paymentMethod === "card") {
      if (!validateCardInfo() || !validateBillingAddress()) {
        addToast({
          type: "error",
          title: "Payment Information Invalid",
          message: "Please correct the errors and try again.",
          duration: 4000,
        });
        return;
      }
    }

    setIsProcessing(true);
    setPaymentStep("processing");

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Simulate random success/failure (95% success rate)
      const isSuccess = Math.random() > 0.05;

      if (isSuccess) {
        const orderNum = `BI-${Date.now()}`;
        setOrderNumber(orderNum);
        setPaymentStep("success");

        // Store order data
        const orderData = {
          orderNumber: orderNum,
          ...checkoutData,
          cardInfo:
            checkoutData.paymentMethod === "card"
              ? {
                  ...cardInfo,
                  cardNumber: `****-****-****-${cardInfo.cardNumber.slice(-4)}`,
                }
              : null,
          orderDate: new Date().toISOString(),
          status: "confirmed",
        };

        const existingOrders = JSON.parse(
          localStorage.getItem("orders") || "[]"
        );
        existingOrders.unshift(orderData);
        localStorage.setItem("orders", JSON.stringify(existingOrders));

        clearCart();
        localStorage.removeItem("checkoutData");

        addToast({
          type: "success",
          title: "Payment Successful!",
          message: `Order ${orderNum} has been confirmed.`,
          duration: 5000,
        });

        // Redirect to success page after 2 seconds
        setTimeout(() => {
          router.push(`/order-confirmation?order=${orderNum}`);
        }, 2000);
      } else {
        setPaymentStep("error");
        addToast({
          type: "error",
          title: "Payment Failed",
          message:
            "Your payment could not be processed. Please try again or use a different payment method.",
          duration: 6000,
        });
      }
    } catch (error) {
      setPaymentStep("error");
      addToast({
        type: "error",
        title: "Payment Error",
        message: "An unexpected error occurred. Please try again.",
        duration: 5000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  if (!checkoutData) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-sm text-stone-600">Loading payment details...</p>
        </div>
      </main>
    );
  }

  if (paymentStep === "processing") {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-stone-200 border-t-stone-800 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Lock className="h-8 w-8 text-stone-800" />
            </div>
          </div>
          <h1 className="text-lg font-medium text-stone-800 mb-2">
            Processing Payment
          </h1>
          <p className="text-xs text-stone-600 mb-4">
            Please wait while we securely process your payment. Do not refresh
            or close this page.
          </p>
          <div className="bg-stone-50 p-4 rounded-sm">
            <div className="flex items-center justify-center gap-2 text-xs text-stone-600">
              <Shield className="h-3 w-3" />
              <span>Your payment is secured with 256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (paymentStep === "success") {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-lg font-medium text-stone-800 mb-2">
            Payment Successful!
          </h1>
          <p className="text-xs text-stone-600 mb-4">
            Your payment has been processed successfully. Redirecting to order
            confirmation...
          </p>
          <div className="bg-green-50 p-4 rounded-sm mb-4">
            <p className="text-xs font-medium text-green-800">Order Number</p>
            <p className="text-sm font-mono text-green-600">{orderNumber}</p>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-1">
            <div
              className="bg-green-600 h-1 rounded-full animate-pulse"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>
      </main>
    );
  }

  if (paymentStep === "error") {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-lg font-medium text-stone-800 mb-2">
            Payment Failed
          </h1>
          <p className="text-xs text-stone-600 mb-6">
            We couldn't process your payment. Please check your payment details
            and try again.
          </p>
          <div className="space-y-2">
            <Button
              onClick={() => setPaymentStep("form")}
              className="w-full bg-stone-800 hover:bg-stone-700 text-xs rounded-sm"
            >
              Try Again
            </Button>
            <Link href="/checkout">
              <Button variant="outline" className="w-full text-xs rounded-sm">
                Back to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-4">
      <div className="mb-4">
        <Link
          href="/checkout"
          className="flex items-center gap-2 text-xs text-stone-600 hover:text-stone-900"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Checkout
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Payment Form */}
        <div className="space-y-4">
          <Card className="rounded-sm border-stone-100">
            <CardHeader className="p-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              {checkoutData.paymentMethod === "card" && (
                <>
                  <div>
                    <Label htmlFor="cardNumber" className="text-xs">
                      Card Number *
                    </Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardInfo.cardNumber}
                      onChange={(e) =>
                        setCardInfo({
                          ...cardInfo,
                          cardNumber: formatCardNumber(e.target.value),
                        })
                      }
                      className={`h-8 text-xs rounded-sm ${
                        cardErrors.cardNumber ? "border-red-300" : ""
                      }`}
                      maxLength={19}
                      required
                    />
                    {cardErrors.cardNumber && (
                      <p className="text-xs text-red-600 mt-1">
                        {cardErrors.cardNumber}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="expiryDate" className="text-xs">
                        Expiry Date *
                      </Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={cardInfo.expiryDate}
                        onChange={(e) =>
                          setCardInfo({
                            ...cardInfo,
                            expiryDate: formatExpiryDate(e.target.value),
                          })
                        }
                        className={`h-8 text-xs rounded-sm ${
                          cardErrors.expiryDate ? "border-red-300" : ""
                        }`}
                        maxLength={5}
                        required
                      />
                      {cardErrors.expiryDate && (
                        <p className="text-xs text-red-600 mt-1">
                          {cardErrors.expiryDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-xs">
                        CVV *
                      </Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cardInfo.cvv}
                        onChange={(e) =>
                          setCardInfo({
                            ...cardInfo,
                            cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                          })
                        }
                        className={`h-8 text-xs rounded-sm ${
                          cardErrors.cvv ? "border-red-300" : ""
                        }`}
                        maxLength={4}
                        required
                      />
                      {cardErrors.cvv && (
                        <p className="text-xs text-red-600 mt-1">
                          {cardErrors.cvv}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="nameOnCard" className="text-xs">
                      Name on Card *
                    </Label>
                    <Input
                      id="nameOnCard"
                      placeholder="John Doe"
                      value={cardInfo.nameOnCard}
                      onChange={(e) =>
                        setCardInfo({ ...cardInfo, nameOnCard: e.target.value })
                      }
                      className={`h-8 text-xs rounded-sm ${
                        cardErrors.nameOnCard ? "border-red-300" : ""
                      }`}
                      required
                    />
                    {cardErrors.nameOnCard && (
                      <p className="text-xs text-red-600 mt-1">
                        {cardErrors.nameOnCard}
                      </p>
                    )}
                  </div>
                </>
              )}

              {checkoutData.paymentMethod === "paypal" && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-stone-800 mb-2">
                    PayPal Payment
                  </p>
                  <p className="text-xs text-stone-600 mb-4">
                    You will be redirected to PayPal to complete your payment
                    securely.
                  </p>
                </div>
              )}

              {(checkoutData.paymentMethod === "apple" ||
                checkoutData.paymentMethod === "google") && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-stone-600" />
                  </div>
                  <p className="text-sm font-medium text-stone-800 mb-2">
                    {checkoutData.paymentMethod === "apple"
                      ? "Apple Pay"
                      : "Google Pay"}
                  </p>
                  <p className="text-xs text-stone-600 mb-4">
                    Use your device's secure payment method to complete the
                    transaction.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {checkoutData.paymentMethod === "card" && (
            <Card className="rounded-sm border-stone-100">
              <CardHeader className="p-4">
                <CardTitle className="text-sm">Billing Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="sameAsShipping"
                    checked={billingAddress.sameAsShipping}
                    onChange={(e) =>
                      setBillingAddress({
                        ...billingAddress,
                        sameAsShipping: e.target.checked,
                      })
                    }
                    className="h-3 w-3 rounded"
                  />
                  <Label htmlFor="sameAsShipping" className="text-xs">
                    Same as shipping address
                  </Label>
                </div>

                {!billingAddress.sameAsShipping && (
                  <>
                    <div>
                      <Label htmlFor="billingAddress" className="text-xs">
                        Address *
                      </Label>
                      <Input
                        id="billingAddress"
                        value={billingAddress.address}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            address: e.target.value,
                          })
                        }
                        className="h-8 text-xs rounded-sm"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label htmlFor="billingCity" className="text-xs">
                          City *
                        </Label>
                        <Input
                          id="billingCity"
                          value={billingAddress.city}
                          onChange={(e) =>
                            setBillingAddress({
                              ...billingAddress,
                              city: e.target.value,
                            })
                          }
                          className="h-8 text-xs rounded-sm"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingState" className="text-xs">
                          State *
                        </Label>
                        <Input
                          id="billingState"
                          value={billingAddress.state}
                          onChange={(e) =>
                            setBillingAddress({
                              ...billingAddress,
                              state: e.target.value,
                            })
                          }
                          className="h-8 text-xs rounded-sm"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingZip" className="text-xs">
                          ZIP *
                        </Label>
                        <Input
                          id="billingZip"
                          value={billingAddress.zipCode}
                          onChange={(e) =>
                            setBillingAddress({
                              ...billingAddress,
                              zipCode: e.target.value,
                            })
                          }
                          className="h-8 text-xs rounded-sm"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-stone-800 hover:bg-stone-700 h-10 text-sm rounded-sm"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4 mr-2" />
                Complete Payment - ${checkoutData.total.toFixed(2)}
              </>
            )}
          </Button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 rounded-sm border-stone-100">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {checkoutData.items.map((item) => (
                  <div
                    key={`${item.id}-${item.variant}`}
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
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs text-stone-600">Subtotal</span>
                  <span className="text-xs font-medium">
                    $
                    {(
                      checkoutData.total -
                      checkoutData.total * 0.08 -
                      (checkoutData.shippingMethod === "standard"
                        ? checkoutData.total > 99
                          ? 0
                          : 9.99
                        : checkoutData.shippingMethod === "express"
                        ? 19.99
                        : 39.99)
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-stone-600">Shipping</span>
                  <span className="text-xs font-medium">
                    {checkoutData.shippingMethod === "standard"
                      ? checkoutData.total > 99
                        ? "Free"
                        : "$9.99"
                      : checkoutData.shippingMethod === "express"
                      ? "$19.99"
                      : "$39.99"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-stone-600">Tax</span>
                  <span className="text-xs font-medium">
                    ${(checkoutData.total * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-sm font-medium">
                <span>Total</span>
                <span>${checkoutData.total.toFixed(2)}</span>
              </div>

              <div className="space-y-2 pt-3 border-t border-stone-100">
                <div className="flex items-center gap-1.5 text-xs text-stone-600">
                  <Shield className="h-3 w-3 text-green-600" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-stone-600">
                  <Lock className="h-3 w-3 text-green-600" />
                  <span>PCI DSS compliant</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-stone-600">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>Money-back guarantee</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
