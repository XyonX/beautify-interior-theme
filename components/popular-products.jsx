import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Heart, Eye, ShoppingCart, ArrowRight } from "lucide-react";

const PopularProducts = ({ popularProducts }) => {
  const ProductCard = ({ product: prod, showBadge = true }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={
            `${process.env.NEXT_PUBLIC_CDN_URL}${prod.thumbnail}` ||
            `${process.env.NEXT_PUBLIC_CDN_URL}/site-data/placeholder.svg`
          }
          alt={prod.name}
          width={200}
          height={200}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        {showBadge && (
          <div className="absolute top-1 sm:top-2 left-1 sm:left-2 flex flex-col gap-1">
            {prod.isBestseller && (
              <Badge className="bg-amazon-orange text-white text-xs px-1 sm:px-2 py-1">
                Best Seller
              </Badge>
            )}
            {prod.discount > 0 && (
              <Badge className="bg-red-600 text-white text-xs px-1 sm:px-2 py-1">
                -{prod.discount}%
              </Badge>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-1 sm:top-2 right-1 sm:right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-white/90"
          >
            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-white/90"
          >
            <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-2 sm:p-4">
        <Link href={`/products/${prod.id}`}>
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-amazon-orange transition-colors cursor-pointer text-xs sm:text-sm">
            {prod.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
          {prod.shortDescription}
        </p>

        <div className="flex items-center gap-1 mb-2 sm:mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < Math.floor(prod.rating)
                  ? "text-amazon-orange fill-amazon-orange"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-600 ml-1">({prod.reviews})</span>
        </div>

        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div>
            <span className="text-sm sm:text-base font-bold text-gray-900">
              ₹{prod.price.toLocaleString("en-IN")}
            </span>
            {prod.originalPrice && prod.originalPrice > 0 && (
              <span className="text-xs text-gray-500 line-through ml-1 sm:ml-2">
                ₹{prod.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>

        <Button className="w-full bg-amazon-orange hover:bg-amazon-orange-dark text-white text-xs sm:text-sm h-7 sm:h-9">
          <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6">
      {popularProducts.map((prod) => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </div>
  );
};

export default PopularProducts;
