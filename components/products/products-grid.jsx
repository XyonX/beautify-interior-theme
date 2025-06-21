import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductsFilters } from "./products-filters";
import { ProductsPagination } from "./products-pagination";
import { Star, Heart } from "lucide-react";

// Mock formatPrice function - replace with your actual implementation
function formatPrice(price) {
  return `₹${price.toLocaleString("en-IN")}`;
}

export function ProductsGrid({
  products,
  categories,
  totalProducts,
  currentPage,
  sortBy,
  categoryFilter,
  searchQuery,
  limit,
}) {
  const numberOfPages = Math.ceil(totalProducts / limit);
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalProducts);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <ol className="flex items-center space-x-2 text-sm text-stone-600">
          <li>
            <Link href="/" className="hover:text-stone-900 transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-stone-900 font-medium">All Products</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-medium text-stone-800 mb-2">
            All Products
          </h1>
          <p className="text-stone-600">
            Discover our complete collection of handcrafted home decor and
            interior accessories
          </p>
        </div>

        {/* Filters and Sort */}
        <ProductsFilters
          categories={categories}
          currentSort={sortBy}
          currentCategory={categoryFilter}
          currentSearch={searchQuery}
          currentPage={currentPage}
        />

        {/* Results Info */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <p className="text-sm text-stone-600">
            Showing {start}-{end} of {totalProducts} products
          </p>
          {(categoryFilter || searchQuery) && (
            <Link href="/products">
              <Button variant="outline" size="sm" className="rounded-sm">
                Clear Filters
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-12 w-12 text-stone-400" />
          </div>
          <h3 className="text-lg font-medium text-stone-800 mb-2">
            No products found
          </h3>
          <p className="text-stone-600 mb-4">
            {searchQuery
              ? `No products match "${searchQuery}"`
              : categoryFilter
              ? "No products in this category"
              : "No products available"}
          </p>
          <Link href="/products">
            <Button className="bg-stone-800 hover:bg-stone-700 text-white rounded-sm">
              Browse All Products
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Card className="group hover:shadow-md transition-all duration-300 border-stone-100 bg-white rounded-sm h-full">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={
                        product.thumbnail
                          ? `${process.env.NEXT_PUBLIC_CDN_URL}${product.thumbnail}`
                          : "/placeholder.svg?height=300&width=300"
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
                        <Star className="h-3 w-3 fill-stone-800 text-stone-800" />
                        <span className="text-xs text-stone-600 ml-1">
                          {product.averageRating || "4.5"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-stone-800">
                          {formatPrice(product.price)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-xs text-stone-500 line-through">
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

          {/* Pagination */}
          <ProductsPagination
            currentPage={currentPage}
            totalPages={numberOfPages}
            sortBy={sortBy}
            categoryFilter={categoryFilter}
            searchQuery={searchQuery}
          />
        </>
      )}
    </div>
  );
}
