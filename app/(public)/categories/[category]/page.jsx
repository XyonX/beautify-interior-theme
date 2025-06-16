"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Heart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductGridSkeleton } from "@/components/skeletons/product-grid-skeleton";

export default function CategoryPage({ params }) {
  // console.log("Param for categry ", params);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const limit = 20; // Number of products per page

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch all categories
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);

        // Find the current category based on the slug from params
        const currentCategory = categoriesData.find(
          (cat) => cat.slug === params.category
        );

        if (!currentCategory) {
          setCategory(null);
          setProducts([]);
          setTotalProducts(0);
          setIsLoading(false);
          return;
        }
        setCategory(currentCategory);
        console.log("current category: ", currentCategory);
        // Fetch products for the current category
        const { sortBy: sortField, sortOrder } = getSortParams(sortBy);
        const productsData = await fetchProducts({
          categoryId: currentCategory.id,
          page: currentPage,
          limit,
          sortBy: sortField,
          sortOrder,
        });
        setProducts(productsData.products || productsData);
        setTotalProducts(productsData.total || productsData.length);
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [params.category, currentPage, sortBy]);

  // Map frontend sort options to backend sort fields and orders
  const getSortParams = (option) => {
    switch (option) {
      case "featured":
        return { sortBy: "sales_count", sortOrder: "DESC" };
      case "price-low":
        return { sortBy: "price", sortOrder: "ASC" };
      case "price-high":
        return { sortBy: "price", sortOrder: "DESC" };
      case "newest":
        return { sortBy: "created_at", sortOrder: "DESC" };
      case "rating":
        return { sortBy: "average_rating", sortOrder: "DESC" };
      default:
        return { sortBy: "created_at", sortOrder: "DESC" };
    }
  };

  // Fetch categories from the backend
  async function fetchCategories() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
        { cache: "no-store" }
      );
      if (!response.ok) throw new Error("Failed to fetch categories");
      return await response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }

  // Fetch products from the backend with options
  async function fetchProducts(options) {
    const queryParams = new URLSearchParams(options).toString();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?${queryParams}`,
        { cache: "no-store" }
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return { products: [], total: 0 };
    }
  }

  if (isLoading) {
    return (
      <main className="flex-grow container mx-auto px-4 py-4">
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-xs">
            <Skeleton className="w-12 h-3" />
            <span className="text-stone-400">/</span>
            <Skeleton className="w-16 h-3" />
            <span className="text-stone-400">/</span>
            <Skeleton className="w-20 h-3" />
          </div>
        </div>
        <div className="mb-6">
          <Skeleton className="w-32 h-5 mb-1" />
          <Skeleton className="w-64 h-3 mb-4" />
          <div className="flex justify-between items-center">
            <Skeleton className="w-28 h-3" />
            <Skeleton className="w-40 h-8" />
          </div>
        </div>
        <div className="mb-8">
          <ProductGridSkeleton count={6} />
        </div>
        <div className="text-center">
          <Skeleton className="w-32 h-8 mx-auto rounded-sm" />
        </div>
      </main>
    );
  }

  if (!category) {
    return (
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-xl font-medium text-stone-800 mb-2">
            Category Not Found
          </h1>
          <Link href="/products">
            <Button className="bg-stone-800 hover:bg-stone-700 text-xs rounded-sm">
              View All Products
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const numberOfPages = Math.ceil(totalProducts / limit);
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalProducts);

  return (
    <main className="flex-grow container mx-auto px-4 py-4">
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
          <li className="text-stone-900 font-medium">{category.name}</li>
        </ol>
      </nav>
      <div className="mb-6">
        <h1 className="text-lg font-medium text-stone-800 mb-1">
          {category.name}
        </h1>
        <p className="text-xs text-stone-600 mb-4">{category.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-stone-600">
            Showing {start}-{end} of {totalProducts} products
          </p>
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
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`}>
            <Card className="group hover:shadow-md transition-all duration-300 border-stone-100 bg-white rounded-sm h-full">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={
                    `${process.env.NEXT_PUBLIC_CDN_URL}${product.thumbnail}` ||
                    "/placeholder.svg"
                  }
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && (
                    <Badge className="bg-accent3-600 text-white text-xs px-1.5 py-0.5 rounded-sm">
                      New
                    </Badge>
                  )}
                  {product.onSale && (
                    <Badge className="bg-accent1-600 text-white text-xs px-1.5 py-0.5 rounded-sm">
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
              <CardContent className="p-3">
                <h3 className="text-xs font-medium text-stone-800 mb-1 truncate group-hover:text-stone-900 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-accent2-600 text-accent2-600" />
                    <span className="text-xs text-stone-600 ml-1">
                      {product.averageRating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-stone-800">
                      {formatPrice(product.price)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-xs text-accent1-600 line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="flex justify-center space-x-2 mt-8">
        {Array.from({ length: numberOfPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => setCurrentPage(page)}
            className="text-xs px-3 py-1"
          >
            {page}
          </Button>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link href="/products">
          <Button
            variant="outline"
            className="border-stone-800 text-stone-800 hover:bg-stone-50 text-xs rounded-sm"
          >
            View All Products
          </Button>
        </Link>
      </div>
    </main>
  );
}
