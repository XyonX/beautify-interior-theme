// components/product-actions.jsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Plus, Minus, MessageCircle } from "lucide-react";
import { AddToCartButton } from "@/components/add-to-cart-button";
import Link from "next/link";

export function ProductActions({ product }) {
  const [quantity, setQuantity] = useState(1);

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

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-stone-800 mb-1">
          Quantity
        </label>
        <div className="flex items-center border border-stone-200 rounded-sm w-24">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-8 w-8 p-0"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="flex-1 text-center text-xs font-medium">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setQuantity(Math.min(product.quantity || 0, quantity + 1))
            }
            className="h-8 w-8 p-0"
            disabled={quantity >= (product.quantity || 0)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <p className="text-xs text-stone-600 mt-1">
          {product.quantity} items in stock
        </p>
      </div>
      <div className="space-y-2">
        <div className="flex gap-2 mb-2">
          <AddToCartButton
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.thumbnail?.url,
            }}
            quantity={quantity}
            className="flex-1 bg-accent2-600 hover:bg-accent2-700 h-8 text-xs rounded-sm"
            size="sm"
            disabled={product.quantity <= 0}
          />
          <Button
            size="sm"
            variant="outline"
            className="border-stone-200 h-8 w-8 p-0 rounded-sm"
          >
            <Heart className="h-3 w-3 text-accent1-600" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-stone-200 h-8 w-8 p-0 rounded-sm"
          >
            <Share2 className="h-3 w-3" />
          </Button>
        </div>
        <Link href="/checkout">
          <Button
            size="sm"
            variant="outline"
            className="w-full border-stone-800 text-stone-800 hover:bg-stone-50 h-8 text-xs rounded-sm"
            disabled={product.quantity <= 0}
          >
            Buy Now
          </Button>
        </Link>
        <Button
          size="sm"
          className="w-full bg-accent3-600 hover:bg-accent3-700 text-white h-8 text-xs"
          onClick={handleWhatsAppChat}
          disabled={product.quantity <= 0}
        >
          <MessageCircle className="h-3 w-3 mr-1" />
          Chat & Buy on WhatsApp
        </Button>
      </div>
    </div>
  );
}
