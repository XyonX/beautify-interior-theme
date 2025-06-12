import { ProductsPageSkeleton } from "@/components/skeletons/products-page-skeleton";

export default function Loading() {
  return (
    <main className="flex-grow">
      <ProductsPageSkeleton />
    </main>
  );
}
