// import { ProductsPageSkeleton } from "@/components/skeletons/products-page-skeleton";

// export default function Loading() {
//   return (
//     <main className="flex-grow">
//       <ProductsPageSkeleton />
//     </main>
//   );
// }
import { ProductsPageSkeleton } from "@/components/skeletons/products-page-skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <ProductsPageSkeleton />
      </div>
    </main>
  );
}
