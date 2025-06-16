"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Trash2, Star } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { WishlistAuthPrompt } from "@/components/wishlist-auth-prompt";
import { AddToCartButton } from "@/components/add-to-cart-button";
import Link from "next/link";

// Mock wishlist data
const mockWishlistItems = [
  {
    id: 1,
    name: "Vintage Ceramic Table Lamp",
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    category: "Lighting",
  },
  {
    id: 2,
    name: "Handwoven Macrame Wall Hanging",
    price: 45.0,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    category: "Decor",
  },
  {
    id: 3,
    name: "Artisan Wooden Coffee Table",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 56,
    inStock: false,
    category: "Furniture",
  },
];

export default function WishlistPage() {
  const { user } = useAuthStore();
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);

  const removeFromWishlist = (itemId) => {
    setWishlistItems((items) => items.filter((item) => item.id !== itemId));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-stone-900 mb-2">
              My Wishlist
            </h1>
            <p className="text-stone-600">
              {user
                ? "Items you've saved for later"
                : "Sign in to create and manage your wishlist"}
            </p>
          </div>

          {!user ? (
            <div className="max-w-md mx-auto">
              <WishlistAuthPrompt />
            </div>
          ) : wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-stone-400" />
              </div>
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-stone-600 mb-8 max-w-md mx-auto">
                Start adding items you love to your wishlist. You can save items
                while browsing and come back to them later.
              </p>
              <Link href="/products">
                <Button className="bg-accent2-600 hover:bg-accent2-700 text-white">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-stone-600">
                  {wishlistItems.length}{" "}
                  {wishlistItems.length === 1 ? "item" : "items"} in your
                  wishlist
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <Card
                    key={item.id}
                    className="group hover:shadow-lg transition-all duration-300 border-stone-200"
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-64 object-cover rounded-t-lg"
                        />
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-105"
                        >
                          <Trash2 className="w-4 h-4 text-accent1-600" />
                        </button>
                        {item.originalPrice && (
                          <Badge className="absolute top-3 left-3 bg-accent1-600 text-white">
                            Sale
                          </Badge>
                        )}
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center">
                            <Badge
                              variant="secondary"
                              className="bg-white text-stone-900"
                            >
                              Out of Stock
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="p-4 space-y-3">
                        <div>
                          <Badge variant="outline" className="text-xs mb-2">
                            {item.category}
                          </Badge>
                          <h3 className="font-semibold text-stone-900 line-clamp-2">
                            {item.name}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-stone-600 ml-1">
                              {item.rating} ({item.reviews})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-stone-900">
                            ${item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-stone-500 line-through">
                              ${item.originalPrice}
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <AddToCartButton
                            product={{
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              image: item.image,
                            }}
                            disabled={!item.inStock}
                            className="flex-1"
                            size="sm"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="px-3 border-stone-300 hover:bg-stone-50"
                            asChild
                          >
                            <Link href={`/products/${item.id}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
