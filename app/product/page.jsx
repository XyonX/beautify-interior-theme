"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Heart, Filter, Grid, List } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Moroccan Pendant Light",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=300",
    category: "Lighting",
    color: "Gold",
    material: "Metal",
    isNew: false,
    isSale: true,
  },
  {
    id: 2,
    name: "Handwoven Macrame Wall Hanging",
    price: 45.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wall Art",
    color: "Natural",
    material: "Cotton",
    isNew: true,
    isSale: false,
  },
  {
    id: 3,
    name: "Ceramic Vase Set",
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    category: "Decor",
    color: "White",
    material: "Ceramic",
    isNew: false,
    isSale: true,
  },
  {
    id: 4,
    name: "Boho Table Lamp",
    price: 67.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 78,
    image: "/placeholder.svg?height=300&width=300",
    category: "Lighting",
    color: "Brown",
    material: "Rattan",
    isNew: true,
    isSale: false,
  },
  {
    id: 5,
    name: "Handmade Wooden Bowl",
    price: 28.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=300",
    category: "Crafts",
    color: "Natural",
    material: "Wood",
    isNew: false,
    isSale: true,
  },
  {
    id: 6,
    name: "Velvet Throw Pillow",
    price: 24.99,
    originalPrice: null,
    rating: 4.5,
    reviews: 92,
    image: "/placeholder.svg?height=300&width=300",
    category: "Textiles",
    color: "Blue",
    material: "Velvet",
    isNew: false,
    isSale: false,
  },
  {
    id: 7,
    name: "Geometric Wall Shelf",
    price: 59.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300",
    category: "Decor",
    color: "Black",
    material: "Metal",
    isNew: true,
    isSale: false,
  },
  {
    id: 8,
    name: "Minimalist Desk Lamp",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.6,
    reviews: 112,
    image: "/placeholder.svg?height=300&width=300",
    category: "Lighting",
    color: "White",
    material: "Metal",
    isNew: false,
    isSale: true,
  },
  {
    id: 9,
    name: "Woven Storage Basket",
    price: 32.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 78,
    image: "/placeholder.svg?height=300&width=300",
    category: "Storage",
    color: "Natural",
    material: "Seagrass",
    isNew: false,
    isSale: false,
  },
  {
    id: 10,
    name: "Abstract Wall Art",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.9,
    reviews: 45,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wall Art",
    color: "Multi",
    material: "Canvas",
    isNew: false,
    isSale: true,
  },
];

export default function ProductsPage() {
  const [viewMode, setViewMode] = (useState < "grid") | ("list" > "grid");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleColorChange = (color, checked) => {
    if (checked) {
      setSelectedColors([...selectedColors, color]);
    } else {
      setSelectedColors(selectedColors.filter((c) => c !== color));
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
          <li className="text-stone-900 font-medium">All Products</li>
        </ol>
      </nav>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-sm p-4 shadow-sm border border-stone-100 sticky top-24">
            <div className="flex items-center mb-4">
              <Filter className="h-4 w-4 mr-2 text-stone-600" />
              <h2 className="text-sm font-medium text-stone-800">Filters</h2>
            </div>

            {/* Price Range */}
            <div className="mb-5">
              <h3 className="text-xs font-medium text-stone-800 mb-2">
                Price Range
              </h3>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={200}
                step={5}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-stone-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-5">
              <h3 className="text-xs font-medium text-stone-800 mb-2">
                Categories
              </h3>
              <div className="space-y-1.5">
                {[
                  "Lighting",
                  "Decor",
                  "Wall Art",
                  "Crafts",
                  "Textiles",
                  "Storage",
                ].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category, checked)
                      }
                      className="h-3 w-3 rounded-sm"
                    />
                    <Label
                      htmlFor={category}
                      className="text-xs text-stone-700"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="mb-5">
              <h3 className="text-xs font-medium text-stone-800 mb-2">
                Colors
              </h3>
              <div className="space-y-1.5">
                {[
                  "Natural",
                  "White",
                  "Gold",
                  "Brown",
                  "Blue",
                  "Black",
                  "Multi",
                ].map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox
                      id={color}
                      checked={selectedColors.includes(color)}
                      onCheckedChange={(checked) =>
                        handleColorChange(color, checked)
                      }
                      className="h-3 w-3 rounded-sm"
                    />
                    <Label htmlFor={color} className="text-xs text-stone-700">
                      {color}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full bg-stone-800 hover:bg-stone-700 text-xs rounded-sm h-8">
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <div>
              <h1 className="text-lg font-medium text-stone-800 mb-1">
                All Products
              </h1>
              <p className="text-xs text-stone-600">
                Showing {products.length} results
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 h-8 text-xs rounded-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border border-stone-200 rounded-sm">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none h-8 w-8 p-0 bg-stone-800"
                >
                  <Grid className="h-3 w-3" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none h-8 w-8 p-0"
                >
                  <List className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products */}
          <div
            className={`grid gap-4 ${
              viewMode === "grid"
                ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                : "grid-cols-1"
            }`}
          >
            {products.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-md transition-all duration-300 border-stone-100 bg-white rounded-sm h-full"
              >
                <div className={`${viewMode === "list" ? "flex" : ""}`}>
                  <div
                    className={`relative ${
                      viewMode === "list"
                        ? "w-40 flex-shrink-0"
                        : "aspect-square"
                    } overflow-hidden`}
                  >
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                        viewMode === "list" ? "w-full h-full" : "w-full h-full"
                      }`}
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.isNew && (
                        <Badge className="bg-stone-800 text-white text-xs px-1.5 py-0.5 rounded-sm">
                          New
                        </Badge>
                      )}
                      {product.isSale && (
                        <Badge className="bg-stone-700 text-white text-xs px-1.5 py-0.5 rounded-sm">
                          Sale
                        </Badge>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 rounded-sm"
                    >
                      <Heart className="h-3 w-3" />
                    </Button>
                  </div>

                  <CardContent
                    className={`p-3 ${viewMode === "list" ? "flex-1" : ""}`}
                  >
                    <p className="text-xs text-stone-500 mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-xs font-medium text-stone-800 mb-1 truncate group-hover:text-stone-900 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-stone-800 text-stone-800" />
                        <span className="text-xs text-stone-600 ml-1">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-stone-800">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-stone-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      {viewMode === "list" && (
                        <Link href={`/products/${product.id}`}>
                          <Button
                            size="sm"
                            className="bg-stone-800 hover:bg-stone-700 h-7 text-xs rounded-sm"
                          >
                            View
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="h-7 w-7 p-0 text-xs rounded-sm"
              >
                &lt;
              </Button>
              <Button
                size="sm"
                className="bg-stone-800 text-white h-7 w-7 p-0 text-xs rounded-sm"
              >
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0 text-xs rounded-sm"
              >
                2
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0 text-xs rounded-sm"
              >
                3
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0 text-xs rounded-sm"
              >
                &gt;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
