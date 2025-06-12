"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
} from "lucide-react";
import { AddToCartButton } from "@/components/add-to-cart-button";

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("gold");

  const product = {
    id: 1,
    name: "Moroccan Pendant Light",
    price: 7499,
    originalPrice: 9999,
    rating: 4.8,
    reviews: 124,
    category: "Lighting",
    sku: "MPL-001-GLD",
    inStock: true,
    stockCount: 15,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    variants: [
      { id: "gold", name: "Gold", price: 7499 },
      { id: "silver", name: "Silver", price: 7899 },
      { id: "bronze", name: "Bronze", price: 7299 },
    ],
    description:
      "Transform your space with this stunning Moroccan-inspired pendant light. Handcrafted with intricate metalwork and featuring beautiful geometric patterns, this piece adds warmth and elegance to any room.",
    features: [
      "Handcrafted metal construction",
      "Intricate geometric patterns",
      "Adjustable hanging height",
      "Compatible with LED bulbs",
      "Easy installation with included hardware",
    ],
    specifications: {
      Dimensions: '12" W x 16" H',
      Material: "Metal with antique finish",
      "Bulb Type": "E26 (not included)",
      "Max Wattage": "60W",
      "Cord Length": "6 feet",
      Weight: "3.2 lbs",
    },
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Boho Table Lamp",
      price: 5699,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
    },
    {
      id: 3,
      name: "Ceramic Pendant Light",
      price: 4599,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Woven Ceiling Light",
      price: 6599,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
    },
    {
      id: 5,
      name: "Modern Floor Lamp",
      price: 10799,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
    },
  ];

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
          <li>
            <Link href="/products" className="hover:text-stone-900">
              Products
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/categories/lighting" className="hover:text-stone-900">
              Lighting
            </Link>
          </li>
          <li>/</li>
          <li className="text-stone-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        {/* Product Images */}
        <div className="space-y-3">
          <div className="aspect-square overflow-hidden rounded-sm bg-white border border-stone-100">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-sm border transition-colors ${
                  selectedImage === index
                    ? "border-accent2-600"
                    : "border-stone-100"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <div>
            <Badge className="bg-accent1-100 text-accent1-800 mb-2 text-xs rounded-sm">
              Sale
            </Badge>
            <h1 className="text-xl font-medium text-stone-800 mb-1">
              {product.name}
            </h1>
            <p className="text-xs text-stone-600 mb-3">SKU: {product.sku}</p>

            <div className="flex items-center mb-3">
              <div className="flex items-center">
                <Star className="h-3 w-3 fill-accent2-500 text-accent2-500" />
                <span className="text-xs text-stone-600 ml-1">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-medium text-stone-800">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-sm text-stone-500 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
              <Badge className="bg-accent1-600 text-white text-xs rounded-sm">
                Save ₹
                {(product.originalPrice - product.price).toLocaleString(
                  "en-IN"
                )}
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            {/* Variant Selection */}
            <div>
              <label className="block text-xs font-medium text-stone-800 mb-1">
                Finish
              </label>
              <Select
                value={selectedVariant}
                onValueChange={setSelectedVariant}
              >
                <SelectTrigger className="w-full h-8 text-xs rounded-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {product.variants.map((variant) => (
                    <SelectItem
                      key={variant.id}
                      value={variant.id}
                      className="text-xs"
                    >
                      {variant.name} - ₹{variant.price.toLocaleString("en-IN")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
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
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                {product.stockCount} items in stock
              </p>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-2">
              <AddToCartButton
                product={{
                  id: product.id,
                  name: product.name,
                  price:
                    product.variants.find((v) => v.id === selectedVariant)
                      ?.price || product.price,
                  image: product.images[0],
                  variant: product.variants.find(
                    (v) => v.id === selectedVariant
                  )?.name,
                }}
                quantity={quantity}
                className="flex-1 bg-accent2-600 hover:bg-accent2-700 h-8 text-xs rounded-sm"
                size="sm"
                disabled={!product.inStock}
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
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-2 py-4 border-t border-stone-100">
            <div className="flex items-center gap-1">
              <Truck className="h-3 w-3 text-accent3-600" />
              <span className="text-xs text-stone-600">Free Shipping</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-accent3-600" />
              <span className="text-xs text-stone-600">2 Year Warranty</span>
            </div>
            <div className="flex items-center gap-1">
              <RotateCcw className="h-3 w-3 text-accent3-600" />
              <span className="text-xs text-stone-600">30 Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <div className="mb-10">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-8 rounded-sm">
            <TabsTrigger
              value="description"
              className="text-xs rounded-sm data-[state=active]:bg-accent2-600 data-[state=active]:text-white"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="text-xs rounded-sm data-[state=active]:bg-accent2-600 data-[state=active]:text-white"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="text-xs rounded-sm data-[state=active]:bg-accent2-600 data-[state=active]:text-white"
            >
              Reviews ({product.reviews})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-4">
            <Card className="rounded-sm">
              <CardContent className="p-4">
                <p className="text-xs text-stone-700 mb-3">
                  {product.description}
                </p>
                <h4 className="text-xs font-medium text-stone-800 mb-2">
                  Key Features:
                </h4>
                <ul className="space-y-1.5">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-accent2-600 rounded-full mt-1.5 flex-shrink-0" />
                      <span className="text-xs text-stone-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-4">
            <Card className="rounded-sm">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-1.5 border-b border-stone-100"
                      >
                        <span className="text-xs font-medium text-stone-800">
                          {key}:
                        </span>
                        <span className="text-xs text-stone-600">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <Card className="rounded-sm">
              <CardContent className="p-4">
                <div className="text-center py-6">
                  <p className="text-xs text-stone-600">
                    Reviews section would be implemented here
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    Average rating: {product.rating}/5 from {product.reviews}{" "}
                    reviews
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-lg font-medium text-stone-800 mb-4">
          Related Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {relatedProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-md transition-shadow rounded-sm border-stone-100"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-3">
                <h3 className="text-xs font-medium text-stone-800 mb-1 truncate">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-800">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-accent2-500 text-accent2-500" />
                    <span className="text-xs text-stone-600 ml-1">
                      {product.rating}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
