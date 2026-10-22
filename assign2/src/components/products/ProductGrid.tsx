// ============================================================
// ProductGrid — wraps product cards in a responsive grid.
// Server Component.
// ============================================================

import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  dense?: boolean;
  showBadges?: boolean;
}

export function ProductGrid({ products, dense = false, showBadges = false }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        {/* Empty state icon */}
        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4" />
        </svg>
        <p className="text-gray-500 font-medium">No products found</p>
        <p className="text-sm text-gray-400 mt-1">Try a different search or reset the filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} dense={dense} showBadge={showBadges} />
      ))}
    </div>
  );
}
