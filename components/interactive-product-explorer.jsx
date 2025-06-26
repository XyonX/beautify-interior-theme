// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Heart,
//   Eye,
//   ShoppingCart,
//   Flame,
//   TrendingUp,
//   Tag,
//   Sparkles,
// } from "lucide-react";

// const productCategories = {
//   products: {
//     title: "Our Products",
//     icon: Sparkles,
//     data: [
//       {
//         id: 1,
//         name: "Moroccan Pendant Light",
//         description: "Handcrafted metal with intricate geometric patterns",
//         price: 7499,
//         originalPrice: 9999,
//         rating: 4.8,
//         reviews: 124,
//         image: "https://images.unsplash.com/photo-1617806265182-7b3f847f0b75?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         category: "Lighting",
//         isBestseller: true,
//         isVerified: true,
//         deliveryDays: 2,
//         discount: 25,
//         inStock: true,
//         stockCount: 15,
//       },
//       {
//         id: 2,
//         name: "Handwoven Macrame Wall Hanging",
//         description: "Premium cotton rope with modern boho design",
//         price: 3799,
//         originalPrice: null,
//         rating: 4.9,
//         reviews: 89,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Wall Art",
//         isVerified: true,
//         deliveryDays: 3,
//         discount: 0,
//         inStock: true,
//         stockCount: 8,
//       },
//       {
//         id: 3,
//         name: "Ceramic Vase Set",
//         description: "Set of 3 minimalist ceramic vases in neutral tones",
//         price: 2899,
//         originalPrice: 4199,
//         rating: 4.7,
//         reviews: 156,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Decor",
//         isBestseller: true,
//         isVerified: true,
//         deliveryDays: 1,
//         discount: 31,
//         inStock: true,
//         stockCount: 3,
//       },
//       {
//         id: 4,
//         name: "Boho Table Lamp",
//         description: "Natural rattan base with warm ambient lighting",
//         price: 5699,
//         originalPrice: null,
//         rating: 4.6,
//         reviews: 78,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Lighting",
//         isVerified: true,
//         deliveryDays: 2,
//         discount: 0,
//         inStock: true,
//         stockCount: 12,
//       },
//       {
//         id: 5,
//         name: "Handmade Wooden Bowl",
//         description: "Sustainable mango wood with food-safe finish",
//         price: 2399,
//         originalPrice: 3299,
//         rating: 4.8,
//         reviews: 203,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Crafts",
//         isBestseller: true,
//         isVerified: true,
//         deliveryDays: 2,
//         discount: 27,
//         inStock: true,
//         stockCount: 6,
//       },
//       {
//         id: 6,
//         name: "Velvet Throw Pillow",
//         description: "Luxurious velvet with hidden zipper closure",
//         price: 2099,
//         originalPrice: null,
//         rating: 4.5,
//         reviews: 92,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Textiles",
//         isVerified: true,
//         deliveryDays: 3,
//         discount: 0,
//         inStock: true,
//         stockCount: 20,
//       },
//       {
//         id: 7,
//         name: "Geometric Wall Shelf",
//         description: "Modern hexagonal design with powder coating",
//         price: 4999,
//         originalPrice: null,
//         rating: 4.7,
//         reviews: 67,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Decor",
//         isVerified: true,
//         deliveryDays: 2,
//         discount: 0,
//         inStock: true,
//         stockCount: 9,
//       },
//       {
//         id: 8,
//         name: "Minimalist Desk Lamp",
//         description: "Adjustable LED with touch controls and USB charging",
//         price: 4199,
//         originalPrice: 5799,
//         rating: 4.6,
//         reviews: 112,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Lighting",
//         isVerified: true,
//         deliveryDays: 1,
//         discount: 28,
//         inStock: false,
//         stockCount: 0,
//       },
//     ],
//   },
//   arrivals: {
//     title: "Hot Arrivals",
//     icon: Flame,
//     data: [
//       {
//         id: 9,
//         name: "Artisan Ceramic Planter",
//         description: "Hand-thrown ceramic with drainage system",
//         price: 2799,
//         originalPrice: null,
//         rating: 4.9,
//         reviews: 45,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Planters",
//         isNew: true,
//         isVerified: true,
//         deliveryDays: 2,
//         discount: 0,
//         inStock: true,
//         stockCount: 25,
//       },
//       {
//         id: 10,
//         name: "Scandinavian Wall Clock",
//         description: "Minimalist design with silent movement",
//         price: 3499,
//         originalPrice: null,
//         rating: 4.7,
//         reviews: 23,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Decor",
//         isNew: true,
//         isVerified: true,
//         deliveryDays: 1,
//         discount: 0,
//         inStock: true,
//         stockCount: 18,
//       },
//       {
//         id: 11,
//         name: "Woven Storage Ottoman",
//         description: "Multi-functional seating with hidden storage",
//         price: 6799,
//         originalPrice: null,
//         rating: 4.8,
//         reviews: 67,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Furniture",
//         isNew: true,
//         isVerified: true,
//         deliveryDays: 3,
//         discount: 0,
//         inStock: true,
//         stockCount: 12,
//       },
//       {
//         id: 12,
//         name: "Copper Wire String Lights",
//         description: "Warm white LED with battery pack",
//         price: 1299,
//         originalPrice: null,
//         rating: 4.6,
//         reviews: 89,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Lighting",
//         isNew: true,
//         isVerified: true,
//         deliveryDays: 1,
//         discount: 0,
//         inStock: true,
//         stockCount: 50,
//       },
//       {
//         id: 13,
//         name: "Marble Serving Tray",
//         description: "Natural white marble with brass handles",
//         price: 4299,
//         originalPrice: null,
//         rating: 4.9,
//         reviews: 34,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Kitchenware",
//         isNew: true,
//         isVerified: true,
//         deliveryDays: 2,
//         discount: 0,
//         inStock: true,
//         stockCount: 8,
//       },
//       {
//         id: 14,
//         name: "Bohemian Tapestry",
//         description: "Large mandala design wall hanging",
//         price: 2999,
//         originalPrice: null,
//         rating: 4.5,
//         reviews: 56,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Wall Art",
//         isNew: true,
//         isVerified: true,
//         deliveryDays: 2,
//         discount: 0,
//         inStock: true,
//         stockCount: 15,
//       },
//     ],
//   },
//   trending: {
//     title: "Trending",
//     icon: TrendingUp,
//     data: [
//       {
//         id: 15,
//         name: "Minimalist Ceramic Vase",
//         description: "Elegant white ceramic with matte finish",
//         price: 3299,
//         originalPrice: 4599,
//         rating: 4.8,
//         reviews: 234,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Decor",
//         isTrending: true,
//         trendingRank: 1,
//         isVerified: true,
//         deliveryDays: 1,
//         discount: 28,
//         inStock: true,
//         stockCount: 7,
//       },
//       {
//         id: 16,
//         name: "Scandinavian Floor Lamp",
//         description: "Oak wood base with linen shade",
//         price: 10799,
//         originalPrice: null,
//         rating: 4.7,
//         reviews: 156,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Lighting",
//         isTrending: true,
//         trendingRank: 2,
//         isVerified: true,
//         deliveryDays: 2,
//         discount: 0,
//         inStock: true,
//         stockCount: 4,
//       },
//       {
//         id: 17,
//         name: "Handwoven Basket Set",
//         description: "Set of 3 natural seagrass storage baskets",
//         price: 3799,
//         originalPrice: 5299,
//         rating: 4.6,
//         reviews: 189,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Storage",
//         isTrending: true,
//         trendingRank: 3,
//         isVerified: true,
//         deliveryDays: 3,
//         discount: 28,
//         inStock: true,
//         stockCount: 11,
//       },
//       {
//         id: 18,
//         name: "Abstract Wall Art",
//         description: "Modern canvas print with gold accents",
//         price: 6699,
//         originalPrice: 8999,
//         rating: 4.9,
//         reviews: 98,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Wall Art",
//         isTrending: true,
//         trendingRank: 4,
//         isVerified: true,
//         deliveryDays: 2,
//         discount: 26,
//         inStock: true,
//         stockCount: 6,
//       },
//       {
//         id: 19,
//         name: "Velvet Accent Chair",
//         description: "Emerald green with gold legs",
//         price: 18999,
//         originalPrice: 24999,
//         rating: 4.8,
//         reviews: 78,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Furniture",
//         isTrending: true,
//         trendingRank: 5,
//         isVerified: true,
//         deliveryDays: 5,
//         discount: 24,
//         inStock: true,
//         stockCount: 3,
//       },
//     ],
//   },
//   sale: {
//     title: "Sale",
//     icon: Tag,
//     data: [
//       {
//         id: 20,
//         name: "Vintage Mirror Set",
//         description: "Set of 3 round mirrors with brass frames",
//         price: 4999,
//         originalPrice: 8999,
//         rating: 4.7,
//         reviews: 145,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Decor",
//         isSale: true,
//         isVerified: true,
//         deliveryDays: 2,
//         discount: 44,
//         inStock: true,
//         stockCount: 9,
//       },
//       {
//         id: 21,
//         name: "Wooden Coffee Table",
//         description: "Reclaimed wood with industrial legs",
//         price: 12999,
//         originalPrice: 18999,
//         rating: 4.6,
//         reviews: 89,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Furniture",
//         isSale: true,
//         isVerified: true,
//         deliveryDays: 4,
//         discount: 32,
//         inStock: true,
//         stockCount: 5,
//       },
//       {
//         id: 22,
//         name: "Ceramic Dinnerware Set",
//         description: "16-piece set in sage green",
//         price: 6799,
//         originalPrice: 9999,
//         rating: 4.8,
//         reviews: 203,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Kitchenware",
//         isSale: true,
//         isVerified: true,
//         deliveryDays: 3,
//         discount: 32,
//         inStock: true,
//         stockCount: 12,
//       },
//       {
//         id: 23,
//         name: "Macrame Plant Hanger",
//         description: "Handwoven cotton rope for hanging plants",
//         price: 1799,
//         originalPrice: 2999,
//         rating: 4.5,
//         reviews: 167,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Planters",
//         isSale: true,
//         isVerified: true,
//         deliveryDays: 2,
//         discount: 40,
//         inStock: true,
//         stockCount: 25,
//       },
//       {
//         id: 24,
//         name: "Brass Table Lamp",
//         description: "Vintage-inspired with fabric shade",
//         price: 5499,
//         originalPrice: 7999,
//         rating: 4.7,
//         reviews: 112,
//         image: "/placeholder.svg?height=300&width=300",
//         category: "Lighting",
//         isSale: true,
//         isVerified: true,
//         deliveryDays: 2,
//         discount: 31,
//         inStock: true,
//         stockCount: 8,
//       },
//     ],
//   },
// };

// export function InteractiveProductExplorer() {
//   const [activeCategory, setActiveCategory] = useState("products");
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const handleCategoryChange = (category) => {
//     if (category === activeCategory) return;

//     setIsTransitioning(true);
//     setTimeout(() => {
//       setActiveCategory(category);
//       setIsTransitioning(false);
//     }, 150);
//   };

//   const currentCategory = productCategories[activeCategory];
//   const CurrentIcon = currentCategory.icon;

//   return (
//     <section className="py-12 bg-gray-50">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-2 mb-3">
//             <CurrentIcon className="h-6 w-6 text-amazon-orange" />
//             <h2 className="text-2xl font-semibold text-gray-900">
//               Explore Our Collection
//             </h2>
//           </div>
//           <p className="text-gray-600 max-w-2xl mx-auto mb-6">
//             Discover handpicked items across different categories - all in one
//             place
//           </p>

//           {/* Category Tabs */}
//           <div className="flex flex-wrap justify-center gap-2 md:gap-4">
//             {Object.entries(productCategories).map(([key, category]) => {
//               const Icon = category.icon;
//               const isActive = activeCategory === key;

//               return (
//                 <Button
//                   key={key}
//                   onClick={() => handleCategoryChange(key)}
//                   variant={isActive ? "default" : "outline"}
//                   className={`
//                     flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-200
//                     ${
//                       isActive
//                         ? "bg-amazon-orange hover:bg-amazon-orange-dark text-white shadow-md"
//                         : "border-gray-300 text-gray-700 hover:border-amazon-orange hover:text-amazon-orange bg-white"
//                     }
//                   `}
//                 >
//                   <Icon className="h-4 w-4" />
//                   <span className="hidden sm:inline">{category.title}</span>
//                   <span className="sm:hidden">
//                     {category.title.split(" ")[0]}
//                   </span>
//                 </Button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Products Grid */}
//         <div
//           className={`transition-opacity duration-150 ${
//             isTransitioning ? "opacity-50" : "opacity-100"
//           }`}
//         >
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
//             {currentCategory.data.map((product) => (
//               <Card
//                 key={product.id}
//                 className="group hover:shadow-lg transition-all duration-200 border-gray-200 bg-white flex flex-col h-full rounded-none"
//               >
//                 <div className="relative flex-shrink-0">
//                   <div className="relative aspect-square overflow-hidden">
//                     <Image
//                       src={product.image || "/placeholder.svg"}
//                       alt={product.name}
//                       width={300}
//                       height={300}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                     />

//                     {/* Badges */}
//                     <div className="absolute top-1 sm:top-2 left-1 sm:left-2 flex flex-col gap-1">
//                       {product.isBestseller && (
//                         <Badge className="bg-amazon-orange text-white text-xs px-1.5 sm:px-2 py-0.5 font-medium">
//                           <span className="hidden sm:inline">
//                             #1 Best Seller
//                           </span>
//                           <span className="sm:hidden">#1</span>
//                         </Badge>
//                       )}
//                       {product.isNew && (
//                         <Badge className="bg-green-600 text-white text-xs px-1.5 sm:px-2 py-0.5 font-medium">
//                           New
//                         </Badge>
//                       )}
//                       {product.isTrending && (
//                         <Badge className="bg-purple-600 text-white text-xs px-1.5 sm:px-2 py-0.5 font-medium">
//                           <span className="hidden sm:inline">
//                             #{product.trendingRank} Trending
//                           </span>
//                           <span className="sm:hidden">
//                             #{product.trendingRank}
//                           </span>
//                         </Badge>
//                       )}
//                       {product.isSale && product.discount > 0 && (
//                         <Badge className="bg-red-600 text-white text-xs px-1.5 sm:px-2 py-0.5 font-medium">
//                           -{product.discount}%
//                         </Badge>
//                       )}
//                     </div>

//                     {/* Quick Actions */}
//                     <div className="absolute top-1 sm:top-2 right-1 sm:right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <Button
//                         size="sm"
//                         variant="secondary"
//                         className="h-6 w-6 sm:h-7 sm:w-7 p-0 bg-white/90 hover:bg-white"
//                       >
//                         <Heart className="h-3 w-3" />
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="secondary"
//                         className="h-6 w-6 sm:h-7 sm:w-7 p-0 bg-white/90 hover:bg-white"
//                       >
//                         <Eye className="h-3 w-3" />
//                       </Button>
//                     </div>

//                     {/* Stock Status */}
//                     {!product.inStock && (
//                       <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                         <Badge className="bg-red-600 text-white text-xs">
//                           Out of Stock
//                         </Badge>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Card Content with Flexible Layout */}
//                 <CardContent className="p-2 sm:p-3 flex flex-col flex-grow">
//                   {/* Category */}
//                   <p className="text-xs text-gray-500 mb-1">
//                     {product.category}
//                   </p>

//                   {/* Product Name */}
//                   <Link
//                     href={`/products/${product.id}`}
//                     className="flex-shrink-0"
//                   >
//                     <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-amazon-orange transition-colors cursor-pointer min-h-[2.5rem] sm:min-h-[2.75rem]">
//                       {product.name}
//                     </h3>
//                   </Link>

//                   {/* Description */}
//                   <p className="text-xs text-gray-600 mb-2 line-clamp-2 min-h-[2rem]">
//                     {product.description}
//                   </p>

//                   {/* Rating */}
//                   {/* Spacer to push bottom content down */}
//                   <div className="flex-grow"></div>

//                   {/* Bottom Section - Fixed Position */}
//                   <div className="mt-auto">
//                     {/* Pricing */}
//                     <div className="mb-2">
//                       <div className="flex items-center gap-1 sm:gap-2">
//                         <span className="text-sm sm:text-base font-bold text-gray-900">
//                           ₹{product.price.toLocaleString("en-IN")}
//                         </span>
//                         {product.originalPrice && (
//                           <span className="text-xs text-gray-500 line-through">
//                             ₹{product.originalPrice.toLocaleString("en-IN")}
//                           </span>
//                         )}
//                       </div>

//                       {/* Fixed height container for savings - KEY FIX */}
//                       <div className="h-5 flex items-start">
//                         {product.originalPrice && (
//                           <p className="text-xs text-green-600 font-medium">
//                             Save ₹
//                             {(
//                               product.originalPrice - product.price
//                             ).toLocaleString("en-IN")}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Delivery Info */}
//                     {/* Stock Info - Fixed Height */}
//                     <div className="h-4 mb-2">
//                       {product.inStock && product.stockCount <= 10 && (
//                         <p className="text-xs text-red-600">
//                           Only {product.stockCount} left
//                         </p>
//                       )}
//                     </div>

//                     {/* Add to Cart Button - Always at bottom */}
//                     <Button
//                       className="w-full bg-amazon-orange hover:bg-amazon-orange-dark text-white text-xs h-7 sm:h-8"
//                       disabled={!product.inStock}
//                     >
//                       <ShoppingCart className="h-3 w-3 mr-1" />
//                       <span className="hidden sm:inline">
//                         {product.inStock ? "Add to Cart" : "Out of Stock"}
//                       </span>
//                       <span className="sm:hidden">
//                         {product.inStock ? "Add" : "Out"}
//                       </span>
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>

//         {/* View All Button */}
//         <div className="text-center mt-8 sm:mt-10">
//           <Link
//             href={`/${
//               activeCategory === "products" ? "products" : activeCategory
//             }`}
//           >
//             <Button
//               size="lg"
//               variant="outline"
//               className="border-amazon-orange text-amazon-orange hover:bg-amazon-orange hover:text-white px-6 sm:px-8"
//             >
//               View All {currentCategory.title}
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

import { ProductGridClient } from "./product-grid-client";

async function fetchFeaturedProducts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function InteractiveProductExplorer() {
  const products = await fetchFeaturedProducts();

  const mapImageUrls = (product) => ({
    ...product,
    thumbnail: `${process.env.NEXT_PUBLIC_CDN_URL}${product.thumbnail}`,
    detailedImages: product.detailedImages.map(
      (img) => `${process.env.NEXT_PUBLIC_CDN_URL}${img}`
    ),
  });

  const featuredProducts = products
    .filter((p) => p.isFeatured)
    .slice(0, 12)
    .map(mapImageUrls);

  const newArrivals = products
    .filter((p) => p.isNew)
    .slice(0, 12)
    .map(mapImageUrls);

  const saleProducts = products
    .filter((p) => p.onSale)
    .slice(0, 12)
    .map(mapImageUrls);

  const trendingProducts = products
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 12)
    .map((product, index) => ({
      ...mapImageUrls(product),
      isTrending: true,
      trendingRank: index + 1,
    }));

  const productCategories = {
    products: {
      title: "Our Products",
      icon: "Sparkles",
      data: featuredProducts,
    },
    arrivals: {
      title: "Hot Arrivals",
      icon: "Flame",
      data: newArrivals,
    },
    trending: {
      title: "Trending",
      icon: "TrendingUp",
      data: trendingProducts,
    },
    sale: {
      title: "Sale",
      icon: "Tag",
      data: saleProducts,
    },
  };

  return <ProductGridClient productCategories={productCategories} />;
}
