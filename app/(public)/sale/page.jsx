"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
import {
  Star,
  Heart,
  Filter,
  Grid,
  List,
  Clock,
  Flame,
  Tag,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

const saleProducts = [
  {
    id: 1,
    name: "Moroccan Pendant Light",
    price: 7499,
    originalPrice: 9999,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=300",
    category: "Lighting",
    color: "Gold",
    material: "Metal",
    isNew: false,
    isSale: true,
    discount: 25,
    saleType: "flash",
  },
  {
    id: 3,
    name: "Ceramic Vase Set",
    price: 2899,
    originalPrice: 4199,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    category: "Decor",
    color: "White",
    material: "Ceramic",
    isNew: false,
    isSale: true,
    discount: 30,
    saleType: "clearance",
  },
  {
    id: 5,
    name: "Handmade Wooden Bowl",
    price: 2399,
    originalPrice: 3299,
    rating: 4.8,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=300",
    category: "Crafts",
    color: "Natural",
    material: "Wood",
    isNew: false,
    isSale: true,
    discount: 28,
    saleType: "seasonal",
  },
  {
    id: 8,
    name: "Minimalist Desk Lamp",
    price: 4199,
    originalPrice: 5899,
    rating: 4.6,
    reviews: 112,
    image: "/placeholder.svg?height=300&width=300",
    category: "Lighting",
    color: "White",
    material: "Metal",
    isNew: false,
    isSale: true,
    discount: 29,
    saleType: "flash",
  },
  {
    id: 10,
    name: "Abstract Wall Art",
    price: 6699,
    originalPrice: 8299,
    rating: 4.9,
    reviews: 45,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wall Art",
    color: "Multi",
    material: "Canvas",
    isNew: false,
    isSale: true,
    discount: 20,
    saleType: "clearance",
  },
  {
    id: 11,
    name: "Boho Floor Cushion",
    price: 3299,
    originalPrice: 4999,
    rating: 4.5,
    reviews: 87,
    image: "/placeholder.svg?height=300&width=300",
    category: "Textiles",
    color: "Beige",
    material: "Cotton",
    isNew: false,
    isSale: true,
    discount: 33,
    saleType: "seasonal",
  },
  {
    id: 12,
    name: "Vintage Mirror Frame",
    price: 7499,
    originalPrice: 10799,
    rating: 4.7,
    reviews: 92,
    image: "/placeholder.svg?height=300&width=300",
    category: "Decor",
    color: "Gold",
    material: "Metal",
    isNew: false,
    isSale: true,
    discount: 31,
    saleType: "flash",
  },
  {
    id: 13,
    name: "Woven Wall Basket",
    price: 2099,
    originalPrice: 2899,
    rating: 4.6,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    category: "Storage",
    color: "Natural",
    material: "Seagrass",
    isNew: false,
    isSale: true,
    discount: 29,
    saleType: "clearance",
  },
];

export default function SalePage() {
  const searchParams = useSearchParams();
  const saleType = searchParams.get("type");

  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("discount");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSaleTypes, setSelectedSaleTypes] = useState(
    saleType ? [saleType] : []
  );

  const filteredProducts = useMemo(() => {
    return saleProducts.filter((product) => {
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const matchesSaleType =
        selectedSaleTypes.length === 0 ||
        selectedSaleTypes.includes(product.saleType);
      return matchesPrice && matchesCategory && matchesSaleType;
    });
  }, [priceRange, selectedCategories, selectedSaleTypes]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case "discount":
        return sorted.sort((a, b) => b.discount - a.discount);
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleSaleTypeChange = (type, checked) => {
    if (checked) {
      setSelectedSaleTypes([...selectedSaleTypes, type]);
    } else {
      setSelectedSaleTypes(selectedSaleTypes.filter((t) => t !== type));
    }
  };

  const getSaleTypeIcon = (type) => {
    switch (type) {
      case "flash":
        return <Flame className="h-3 w-3" />;
      case "clearance":
        return <Tag className="h-3 w-3" />;
      case "seasonal":
        return <Clock className="h-3 w-3" />;
      default:
        return <Tag className="h-3 w-3" />;
    }
  };

  const getSaleTypeColor = (type) => {
    switch (type) {
      case "flash":
        return "bg-accent1-600";
      case "clearance":
        return "bg-accent2-600";
      case "seasonal":
        return "bg-accent3-600";
      default:
        return "bg-stone-600";
    }
  };

  return (
    <>
      {/* Sale Hero Banner */}
      <div className="bg-gradient-to-r from-stone-800 to-stone-700 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            🔥 Special Sale Event
          </h1>
          <p className="text-stone-200 mb-4">
            Up to 50% off on selected items • Limited time only
          </p>
          <div className="flex justify-center items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Flame className="h-4 w-4 text-accent1-400" />
              <span>Flash Deals</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="h-4 w-4 text-accent2-400" />
              <span>Clearance</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-accent3-400" />
              <span>Seasonal</span>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="flex items-center space-x-2 text-xs text-stone-600">
            <li>
              <Link href="/" className="hover:text-stone-900">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-stone-900 font-medium">Sale</li>
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

              {/* Sale Type */}
              <div className="mb-5">
                <h3 className="text-xs font-medium text-stone-800 mb-2">
                  Sale Type
                </h3>
                <div className="space-y-1.5">
                  {[
                    { id: "flash", name: "Flash Sale", color: "accent1" },
                    { id: "clearance", name: "Clearance", color: "accent2" },
                    { id: "seasonal", name: "Seasonal", color: "accent3" },
                  ].map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={type.id}
                        checked={selectedSaleTypes.includes(type.id)}
                        onCheckedChange={(checked) =>
                          handleSaleTypeChange(type.id, checked)
                        }
                        className={`h-3 w-3 rounded-sm data-[state=checked]:bg-${type.color}-600 data-[state=checked]:border-${type.color}-600`}
                      />
                      <Label
                        htmlFor={type.id}
                        className="text-xs text-stone-700 flex items-center gap-1"
                      >
                        {getSaleTypeIcon(type.id)}
                        {type.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-5">
                <h3 className="text-xs font-medium text-stone-800 mb-2">
                  Price Range
                </h3>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={20000}
                  step={500}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-stone-600">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
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
                <h2 className="text-lg font-medium text-stone-800 mb-1">
                  Sale Items
                </h2>
                <p className="text-xs text-stone-600">
                  Showing {sortedProducts.length} sale items
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 h-8 text-xs rounded-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">Highest Discount</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
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
              {sortedProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="group hover:shadow-md transition-all duration-300 border-stone-100 bg-white rounded-sm h-full">
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
                            viewMode === "list"
                              ? "w-full h-full"
                              : "w-full h-full"
                          }`}
                        />
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          <Badge
                            className={`${getSaleTypeColor(
                              product.saleType
                            )} text-white text-xs px-1.5 py-0.5 rounded-sm flex items-center gap-1`}
                          >
                            {getSaleTypeIcon(product.saleType)}
                            {product.discount}% OFF
                          </Badge>
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
                              {formatPrice(product.price)}
                            </span>
                            <span className="text-xs text-stone-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs px-1 py-0 text-accent3-700 border-accent3-200"
                          >
                            Save{" "}
                            {formatPrice(product.originalPrice - product.price)}
                          </Badge>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <Tag className="h-12 w-12 text-stone-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-stone-800 mb-2">
                  No sale items found
                </h3>
                <p className="text-stone-600 mb-4">
                  Try adjusting your filters to see more products
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedSaleTypes([]);
                    setPriceRange([0, 20000]);
                  }}
                  variant="outline"
                  className="border-stone-800 text-stone-800 hover:bg-stone-50"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
