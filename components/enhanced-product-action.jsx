"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
  MessageCircle,
  Award,
  Clock,
  CreditCard,
  Headphones,
  MapPin,
  Zap,
  TrendingUp,
  Users,
  Search,
} from "lucide-react";
import { AddToCartButton } from "./add-to-cart-button";
import { useToastStore } from "@/lib/toast-store";
import { useAuthStore } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";

const EnhancedProductAction = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuthStore();
  const addItem = useCartStore((state) => state.addItem);
  const { items } = useCartStore();
  const { addToast } = useToastStore();
  const router = useRouter();
  console.log("Product in action: ", product);
  // Determine if fast delivery is available
  // const fastDeliveryAvailable = product.is_featured || product.quantity > 10
  // Determine if fast delivery is available
  const fastDeliveryAvailable = true;
  // Calculate discount percentage
  const discountPercentage = product.compare_at_price
    ? Math.round(
        ((product.compare_at_price - product.price) /
          product.compare_at_price) *
          100
      )
    : 0;

  const handleWhatsAppChat = () => {
    const message = `Hi! I'm interested in the ${
      product.name
    }, priced at ₹${product.price.toLocaleString(
      "en-IN"
    )}. Can you help me with more details and purchase?`;
    const whatsappUrl = `https://wa.me/919883608843?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };
  async function addToCart() {
    const quantity = 1;
    const maxQuantity = 10;
    console.log("Product received: ", product);

    // Check if user is logged in
    if (!user) {
      addToast({
        type: "warning",
        title: "Sign In Required",
        message: "Please sign in to add items to your cart.",
        duration: 4000,
      });
      router.push(
        `/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`
      );
      return { success: false, requiresLogin: true };
    }

    try {
      // Check if product already exists in cart
      const existingItem = items.find((item) => item.id === product.id);

      const currentQuantity = existingItem ? existingItem.quantity : 0;
      const newTotalQuantity = currentQuantity + quantity;

      // Validate quantity limits
      if (newTotalQuantity > maxQuantity) {
        addToast({
          type: "warning",
          title: "Quantity Limit Reached",
          message: `You can only add up to ${maxQuantity} of this item to your cart.`,
          duration: 4000,
        });
        return { success: false, reason: "quantityLimit" };
      }

      // Check available stock
      if (newTotalQuantity > product.quantity) {
        addToast({
          type: "error",
          title: "Insufficient Stock",
          message: `Only ${product.quantity} units of ${product.name} are available.`,
          duration: 5000,
        });
        return { success: false, reason: "insufficientStock" };
      }

      // Add to cart
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        variant: product.variant,
        quantity,
        maxQuantity,
      });

      addToast({
        type: "success",
        title: "Added to Cart",
        message: `${product.name} has been added to your cart.`,
        duration: 3000,
      });

      return { success: true };
    } catch (error) {
      console.error("Error adding to cart:", error);
      addToast({
        type: "error",
        title: "Error",
        message: "Failed to add item to cart. Please try again.",
        duration: 4000,
      });
      return { success: false, reason: "error", error };
    }
  }
  const handleBuyNow = async () => {
    await addToCart();
    // Wait until the cart contains the item
    const checkCart = () =>
      useCartStore.getState().items.find((i) => i.id === product.id);
    let tries = 0;
    while (!checkCart() && tries < 10) {
      await new Promise((res) => setTimeout(res, 50));
      tries++;
    }
    router.push("/cart");
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        {/* Dynamic Badges */}
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          {product.is_featured && (
            <Badge className="bg-amazon-orange text-white px-2 py-1 text-xs">
              <Award className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
          {product.is_new && (
            <Badge className="bg-blue-600 text-white px-2 py-1 text-xs">
              New Arrival
            </Badge>
          )}
          {product.on_sale && discountPercentage > 0 && (
            <Badge className="bg-red-600 text-white px-2 py-1 text-xs">
              -{discountPercentage}% OFF
            </Badge>
          )}
          {product.sales_count > 100 && (
            <Badge className="bg-green-600 text-white px-2 py-1 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Popular
            </Badge>
          )}
        </div>

        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
          {product.name}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
          SKU: {product.sku} | Category: {product.category?.name}
          {product.vendor && ` | By ${product.vendor}`}
        </p>

        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          {/* <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 sm:h-5 sm:w-5 ${
                  i < Math.floor(product.average_rating)
                    ? "text-amazon-orange fill-amazon-orange"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div> */}
          {/* <span className="text-sm sm:text-base text-gray-700">
            {product.average_rating} ({product.review_count} reviews)
          </span>
          {product.sales_count > 50 && (
            <Badge className="bg-gray-100 text-gray-700 px-2 py-1 text-xs">
              <Users className="h-3 w-3 mr-1" />
              {product.sales_count}+ sold
            </Badge>
          )} */}
        </div>

        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.compare_at_price && (
            <>
              <span className="text-lg sm:text-xl text-gray-500 line-through">
                ₹{product.compare_at_price.toLocaleString("en-IN")}
              </span>
              <Badge className="bg-green-100 text-green-800 px-2 py-1 text-xs sm:text-sm">
                Save ₹
                {(product.compare_at_price - product.price).toLocaleString(
                  "en-IN"
                )}
              </Badge>
            </>
          )}
        </div>
      </div>

      {/* Product Information Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span className="text-xs sm:text-sm font-semibold text-gray-900 min-w-[60px]">
            TAGS:
          </span>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {product.tags && product.tags.length > 0 ? (
              product.tags.map((tag, index) => (
                <span key={index} className="text-xs sm:text-sm text-gray-700">
                  {tag}
                  {index < product.tags.length - 1 && ", "}
                </span>
              ))
            ) : (
              <span className="text-xs sm:text-sm text-gray-500">
                No tags available
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span className="text-xs sm:text-sm font-semibold text-gray-900 min-w-[60px]">
            SKU:
          </span>
          <span className="text-xs sm:text-sm text-gray-700">
            {product.sku}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
          <span className="text-xs sm:text-sm font-semibold text-gray-900 min-w-[60px]">
            CATEGORY:
          </span>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm text-gray-700">
              {product.category?.name}
            </span>
            {product.is_featured && (
              <>
                <span className="text-xs sm:text-sm text-gray-700">
                  , Featured Products
                </span>
              </>
            )}
            {product.is_new && (
              <>
                <span className="text-xs sm:text-sm text-gray-700">
                  , New Arrivals
                </span>
              </>
            )}
            {product.on_sale && (
              <>
                <span className="text-xs sm:text-sm text-gray-700">
                  , Flash deals
                </span>
              </>
            )}
            {product.vendor && (
              <>
                <span className="text-xs sm:text-sm text-gray-700">
                  , {product.vendor}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quantity Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2 sm:mb-3">
          Quantity
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg w-28 sm:w-32">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-10 sm:h-12 w-10 sm:w-12 p-0 hover:bg-gray-100"
          >
            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <span className="flex-1 text-center text-base sm:text-lg font-medium">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setQuantity(Math.min(product.quantity, quantity + 1))
            }
            className="h-10 sm:h-12 w-10 sm:w-12 p-0 hover:bg-gray-100"
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 flex items-center gap-1">
          <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
          {product.quantity <= product.low_stock_threshold
            ? `Only ${product.quantity} left in stock - Order soon!`
            : `${product.quantity} available`}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 sm:space-y-4">
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <AddToCartButton
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image:
                product.images?.[0]?.url ||
                `${process.env.NEXT_PUBLIC_CDN_URL}/site-data/placeholder.svg`,
            }}
            quantity={quantity}
            className="h-10 sm:h-12 text-sm sm:text-base font-semibold"
            size="sm"
            disabled={product.quantity === 0}
            maxQuantity={product.quantity}
          />

          <Button
            size="sm"
            className="w-full bg-amazon-orange hover:bg-amazon-orange-dark text-white h-10 sm:h-12 text-sm sm:text-base font-semibold"
            disabled={product.quantity === 0}
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <Button
            onClick={handleWhatsAppChat}
            size="sm"
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 h-10 sm:h-12 font-semibold text-xs sm:text-sm"
            disabled={product.quantity === 0}
          >
            <MessageCircle className="h-4 w-4 mr-1 sm:mr-2" />
            Chat & Buy
          </Button>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-gray-300 h-10 sm:h-12 text-xs sm:text-sm"
            >
              <Heart className="h-4 w-4 mr-1 sm:mr-2 text-red-500" />
              Wishlist
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-gray-300 h-10 sm:h-12 w-10 sm:w-12 p-0"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Features Grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 py-4 sm:py-6 border-t border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 rounded-lg">
          <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
          <div>
            <p className="text-xs sm:text-sm font-semibold text-green-900">
              Free Shipping
            </p>
            <p className="text-xs text-green-700">On orders over ₹499</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-50 rounded-lg">
          <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          <div>
            <p className="text-xs sm:text-sm font-semibold text-blue-900">
              Quality Assured
            </p>
            <p className="text-xs text-blue-700">Verified products</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-orange-50 rounded-lg">
          <RotateCcw className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
          <div>
            <p className="text-xs sm:text-sm font-semibold text-orange-900">
              Hassle-Free Returns
            </p>
            <p className="text-xs text-orange-700">
              {" "}
              For Damaged or Wrong Items
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-purple-50 rounded-lg">
          <Headphones className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
          <div>
            <p className="text-xs sm:text-sm font-semibold text-purple-900">
              24/7 Support
            </p>
            <p className="text-xs text-purple-700">Expert assistance</p>
          </div>
        </div>
      </div>

      {/* Dynamic Delivery & Payment Info */}
      <div className="space-y-3 sm:space-y-4">
        {fastDeliveryAvailable && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <span className="font-semibold text-green-800 text-sm sm:text-base">
                Express Delivery Available
              </span>
            </div>
            <p className="text-xs sm:text-sm text-green-700 mb-1 sm:mb-2">
              Get it by <strong>Tomorrow</strong> if you order within the next 4
              hours
            </p>
            <div className="flex items-center gap-3 sm:gap-4 text-xs text-green-600">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Delhi NCR
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Same day delivery
              </span>
            </div>
          </div>
        )}

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-1 sm:mb-2">
            <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            <span className="font-semibold text-gray-800 text-sm sm:text-base">
              Secure Payment Options
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-xs text-gray-600">
            <span>Credit/Debit Cards</span>
            <span>UPI</span>
            <span>Net Banking</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProductAction;
