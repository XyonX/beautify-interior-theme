import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Truck,
  Shield,
  RotateCcw,
  MessageCircle,
  Clock,
  CheckCircle,
  Headphones,
  Zap,
  Verified,
  Package,
  Phone,
  Mail,
  Wrench,
  ArrowRight,
} from "lucide-react";
import {
  deliveryPolicy,
  shippingReturns,
  supportGuarantee,
} from "@/lib/policy-data";
import { sanitizeHtml } from "@/lib/utils";
import { EnhancedProductGallery } from "@/components/enhanced-product-gallery";
import EnhancedProductAction from "@/components/enhanced-product-action";
import RelatedProducts from "@/components/related-products";
import PopularProducts from "@/components/popular-products";
import { ProductViewTracker } from "@/components/product-view-tracker";

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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch product");
    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

async function fetchPopularProducts(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch product");
    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductDetailPage({ params }) {
  const { id } = params;
  const product = await fetchProduct(id);

  let relatedProducts = await fetchRelatedProducts(id);
  relatedProducts = relatedProducts.slice(0, 4);

  let popularProducts = await fetchPopularProducts(id);
  popularProducts = popularProducts.slice(1, 5);

  if (!product) return <div>Product not found</div>;

  return (
    <>
      <ProductViewTracker product={product} />
    <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Breadcrumb */}
      <nav className="mb-4 sm:mb-6">
        <ol className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-xm text-gray-600">
          <li>
            <Link href="/" className="hover:text-amazon-orange">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/products" className="hover:text-amazon-orange">
              Products
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href={`/categories/${product.category?.slug}`}
              className="hover:text-amazon-orange"
            >
              {product.category?.name}
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium truncate">{product.name}</li>
        </ol>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        {/* <ProductImages images={product.detailedImages || []} /> */}
        <EnhancedProductGallery
          images={product.detailedImages || []}
          productName={product.name}
        />
        <EnhancedProductAction product={product} />
      </div>

      {/* Updated Tab Section */}
      <div className="mb-8 lg:mb-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-10 sm:h-12 bg-gray-100">
            <TabsTrigger
              value="description"
              className="text-xs sm:text-sm data-[state=active]:bg-amazon-orange data-[state=active]:text-white font-medium"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="delivery"
              className="text-xs sm:text-sm data-[state=active]:bg-amazon-orange data-[state=active]:text-white font-medium"
            >
              Delivery Policy
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="text-xs sm:text-sm data-[state=active]:bg-amazon-orange data-[state=active]:text-white font-medium"
            >
              Shipping & Return
            </TabsTrigger>
            <TabsTrigger
              value="support"
              className="text-xs sm:text-sm data-[state=active]:bg-amazon-orange data-[state=active]:text-white font-medium"
            >
              Support & Guarantee
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-4 sm:mt-6">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                      Product Description
                    </h4>
                    <div 
                      className="prose-custom"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.description) }}
                    />
                    {product.short_description && (
                      <p className="text-gray-600 text-sm sm:text-base">
                        {product.short_description}
                      </p>
                    )}
                  </div>

                  {/* Product Specifications */}
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6 pt-4 border-t">
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-900">
                        Product Details
                      </h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">SKU:</span>
                          <span className="text-gray-900">{product.sku}</span>
                        </div>
                        {product.weight && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Weight:</span>
                            <span className="text-gray-900">
                              {product.weight} lbs
                            </span>
                          </div>
                        )}
                        {product.dimensions && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Dimensions:</span>
                            <span className="text-gray-900">
                              {product.dimensions.length}" ×{" "}
                              {product.dimensions.width}" ×{" "}
                              {product.dimensions.height}"
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="text-gray-900">
                            {product.category?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-900">
                        Additional Info
                      </h5>
                      <div className="space-y-2 text-sm">
                        {product.vendor && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Brand:</span>
                            <span className="text-gray-900">
                              {product.vendor}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Availability:</span>
                          <span
                            className={`${
                              product.quantity > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Views:</span>
                          <span className="text-gray-900">
                            {product.view_count.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sold:</span>
                          <span className="text-gray-900">
                            {product.sales_count}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="pt-4 border-t">
                      <h5 className="font-medium text-gray-900 mb-2">Tags:</h5>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivery" className="mt-4 sm:mt-6">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Truck className="h-5 w-5 text-amazon-orange" />
                      {deliveryPolicy.title}
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      {deliveryPolicy.policies.map((policy, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            {policy.icon === "Truck" && (
                              <Truck className="h-5 w-5 text-green-600" />
                            )}
                            {policy.icon === "Zap" && (
                              <Zap className="h-5 w-5 text-blue-600" />
                            )}
                            {policy.icon === "Wrench" && (
                              <Wrench className="h-5 w-5 text-orange-600" />
                            )}
                            <h5 className="font-medium text-gray-900">
                              {policy.title}
                            </h5>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {policy.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            {policy.timeframe}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-medium text-blue-900 mb-3">
                      Delivery Coverage
                    </h5>
                    <ul className="space-y-2">
                      {deliveryPolicy.coverage.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-blue-800"
                        >
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="mt-4 sm:mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Package className="h-5 w-5 text-amazon-orange" />
                    {shippingReturns.shipping.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {shippingReturns.shipping.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <RotateCcw className="h-5 w-5 text-amazon-orange" />
                    {shippingReturns.returns.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {shippingReturns.returns.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="support" className="mt-4 sm:mt-6">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Headphones className="h-5 w-5 text-amazon-orange" />
                      {supportGuarantee.title}
                    </h4>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-blue-600" />
                        {supportGuarantee.support.title}
                      </h5>
                      <ul className="space-y-2">
                        {supportGuarantee.support.features.map(
                          (feature, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              {feature}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        {supportGuarantee.guarantee.title}
                      </h5>
                      <ul className="space-y-2">
                        {supportGuarantee.guarantee.features.map(
                          (feature, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <Verified className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              {feature}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-3">
                      Contact Information
                    </h5>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span>+91 98765 43210</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span>support@beautify.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-green-600" />
                        <span>WhatsApp Support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <span>24/7 Available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {/* Related products */}
      <div className="mb-8 lg:mb-12">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Related Products
          </h2>
          <Link href={`/categories/${product.category?.slug}`}>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <RelatedProducts relatedProducts={relatedProducts} />
      </div>
      {/* You Might Also Like Section */}
      <div className="mb-8 lg:mb-12">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            You Might Also Like
          </h2>
          <Link href="/products?sort=popular">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              View All Popular
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <PopularProducts popularProducts={popularProducts} />
      </div>
    </main>
    </>
  );
}
