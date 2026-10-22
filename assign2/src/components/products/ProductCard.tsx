// ============================================================
// ProductCard — displays a single product in the grid.
// Server Component: no interactivity, just displays data.
// Reads density and badge preferences from props (passed down
// from a server layout that reads localStorage indirectly via
// the PreferencesProvider).
// ============================================================

import Link from "next/link";
import { ProductImage } from "@/components/products/ProductImage";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  dense?: boolean;         // compact vs comfortable density
  showBadge?: boolean;     // show route anatomy badge
}

export function ProductCard({ product, dense = false, showBadge = false }: ProductCardProps) {
  const padding = dense ? "p-3" : "p-4";

  return (
    <article className={`bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-blue-200 transition-all group`}>
      {/* Image / placeholder */}
      <div className="relative">
        <ProductImage
          src={product.image}
          alt={product.name}
          sku={product.sku}
          className="w-full h-44 rounded-t-xl rounded-b-none"
        />
        {/* SKU badge overlay */}
        <span className="absolute top-2 left-2 text-xs font-mono bg-white/90 border border-gray-200 text-gray-500 px-1.5 py-0.5 rounded">
          {product.sku}
        </span>
        {/* Route anatomy badge (when showBadge is true) */}
        {showBadge && (
          <span className="absolute top-2 right-2 text-xs font-mono bg-blue-50 border border-blue-200 text-blue-600 px-1.5 py-0.5 rounded">
            [id]
          </span>
        )}
      </div>

      {/* Card body */}
      <div className={padding}>
        <p className="text-xs text-gray-400 mb-0.5">
          {product.categoryLabel}{" "}
          <span className="text-gray-300 font-mono ml-1">#{String(product.id).padStart(3, "0")}</span>
        </p>
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mb-3">Brand: {product.brand}</p>

        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-0.5 transition-colors"
          >
            View product
            {/* Arrow right icon */}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
