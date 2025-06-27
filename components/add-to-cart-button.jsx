"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { useToastStore } from "@/lib/toast-store";
import { ShoppingCart, Check } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { useRouter } from "next/navigation";

export function AddToCartButton({
  product,
  quantity = 1,
  className = "",
  size = "default",
  disabled = false,
  maxQuantity = 10,
}) {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { items } = useCartStore();
  const { addToast } = useToastStore();
  const { user } = useAuthStore();
  const router = useRouter();

  const handleAddToCart = (e) => {
    console.log("Procut revceived: ", product);
    e.preventDefault();
    e.stopPropagation();

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
      return;
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
        return;
      }

      // Check available stock using product.quantity
      if (newTotalQuantity > product.quantity) {
        addToast({
          type: "error",
          title: "Insufficient Stock",
          message: `Only ${product.quantity} units of ${product.name} are available.`,
          duration: 5000,
        });
        return;
      }

      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        variant: product.variant,
        quantity,
        maxQuantity,
      });

      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);

      addToast({
        type: "success",
        title: "Added to Cart",
        message: `${product.name} has been added to your cart.`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      addToast({
        type: "error",
        title: "Error",
        message: "Failed to add item to cart. Please try again.",
        duration: 4000,
      });
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={disabled || isAdded}
      size={size}
      className={`transition-all duration-200 ${
        isAdded
          ? "bg-accent3-600 hover:bg-accent3-700"
          : "bg-stone-800 hover:bg-stone-700"
      } text-white ${className}`}
    >
      {isAdded ? (
        <>
          <Check className="h-4 w-4 mr-1" />
          Added!
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
