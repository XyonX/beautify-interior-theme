import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Truck, Shield, RotateCcw } from "lucide-react";
import { ProductImages } from "@/components/product-images";
import { ProductActions } from "@/components/product-actions";

// const relatedProducts = [
//   {
//     id: 2,
//     name: "Boho Table Lamp",
//     price: 5699,
//     image: "/placeholder.svg?height=200&width=200",
//     rating: 4.6,
//   },
//   {
//     id: 3,
//     name: "Ceramic Pendant Light",
//     price: 4599,
//     image: "/placeholder.svg?height=200&width=200",
//     rating: 4.7,
//   },
//   {
//     id: 4,
//     name: "Woven Ceiling Light",
//     price: 6599,
//     image: "/placeholder.svg?height=200&width=200",
//     rating: 4.5,
//   },
//   {
//     id: 5,
//     name: "Modern Floor Lamp",
//     price: 10799,
//     image: "/placeholder.svg?height=200&width=200",
//     rating: 4.8,
//   },
// ];

async function fetchProduct(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch product");
    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

async function fetchRelatedProducts(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}/similar`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch related products");
    return await res.json();
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

export default async function ProductDetailPage({ params }) {
  const { id } = params;
  const product = await fetchProduct(id);

  const relatedProducts = await fetchRelatedProducts(id);

  if (!product) return <div>Product not found</div>;

  return (
    <main className="container mx-auto px-4 py-4">
      <nav className="mb-4">
        <ol className="flex items-center space-x-2 text-xs text-stone-600">
          <li>
            <Link href="/" className="hover:text-stone-900">
              Home
            </Link>
          </li>
          <li>/</li>
          {/* <li>
            <Link href="/products" className="hover:text-stone-900">
              Products
            </Link>
          </li>
          <li>/</li> */}
          <li>
            <Link
              href={`/categories/${product.category?.slug}`}
              className="hover:text-stone-900"
            >
              {product.category?.name}
            </Link>
          </li>
          <li>/</li>
          <li className="text-stone-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        <ProductImages images={product.detailedImages || []} />

        <div className="space-y-4">
          <div>
            {product.on_sale ? (
              <Badge className="bg-accent1-100 text-accent1-800 mb-2 text-xs rounded-sm">
                Sale
              </Badge>
            ) : product.is_new ? (
              <Badge className="bg-accent1-100 text-accent1-800 mb-2 text-xs rounded-sm">
                New
              </Badge>
            ) : null}
            <h1 className="text-xl font-medium text-stone-800 mb-1">
              {product.name}
            </h1>
            <p className="text-xs text-stone-600 mb-3">SKU: {product.sku}</p>
            <div className="flex items-center mb-3">
              <Star className="h-3 w-3 fill-accent2-500 text-accent2-500" />
              <span className="text-xs text-stone-600 ml-1">
                {product.average_rating} ({product.review_count} reviews)
              </span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-medium text-stone-800">
                ₹{product.price?.toLocaleString("en-IN")}
              </span>
              {product.compare_at_price > product.price && (
                <>
                  <span className="text-sm text-stone-500 line-through">
                    ₹{product.compare_at_price?.toLocaleString("en-IN")}
                  </span>
                  <Badge className="bg-accent1-600 text-white text-xs rounded-sm">
                    Save ₹
                    {(product.compare_at_price - product.price).toLocaleString(
                      "en-IN"
                    )}
                  </Badge>
                </>
              )}
            </div>
          </div>

          <ProductActions product={product} />

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
              Reviews ({product.review_count})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <Card className="rounded-sm">
              <CardContent className="p-4">
                <p className="text-xs text-stone-700 mb-3">
                  {product.description}
                </p>
                <h4 className="text-xs font-medium text-stone-800 mb-2">
                  Product Highlights:
                </h4>
                <p className="text-xs text-stone-700">
                  {product.short_description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="specifications" className="mt-4">
            <Card className="rounded-sm">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="text-xs font-medium text-stone-800">
                      Dimensions:
                    </span>
                    <span className="text-xs text-stone-600">
                      {product.dimensions?.length} x {product.dimensions?.width}{" "}
                      x {product.dimensions?.height} {product.dimensions?.unit}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="text-xs font-medium text-stone-800">
                      Weight:
                    </span>
                    <span className="text-xs text-stone-600">
                      {product.weight} kg
                    </span>
                  </div>
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
                    Average rating: {product.average_rating}/5 from{" "}
                    {product.review_count} reviews
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

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
                  src={`${process.env.NEXT_PUBLIC_CDN_URL}${product.thumbnail}`}
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
                      {product.average_rating}
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
