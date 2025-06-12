"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { useToastStore } from "@/lib/toast-store";
import { ShoppingCart, Check } from "lucide-react";

// interface AddToCartButtonProps {
//   product: {
//     id: number
//     name: string
//     price: number
//     image: string
//     variant?: string
//   }
//   quantity?: number
//   className?: string
//   size?: "sm" | "default" | "lg"
//   disabled?: boolean
//   maxQuantity?: number
// }

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

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // Check if product already exists in cart
      const existingItem = items.find(
        (item) => item.id === product.id && item.variant === product.variant
      );

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

      // Validate stock (simulated)
      const isInStock = Math.random() > 0.1; // 90% chance in stock
      if (!isInStock) {
        addToast({
          type: "error",
          title: "Out of Stock",
          message: `${product.name} is currently out of stock. Please try again later.`,
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
        isAdded ? "bg-accent3-600 hover:bg-accent3-700" : ""
      } ${className}`}
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
