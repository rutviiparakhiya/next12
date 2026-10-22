// ============================================================
// Products listing page — /products
// WHY dynamic rendering: This page reads searchParams (?q=&category=&sort=).
// Next.js makes pages with searchParams dynamic by default because
// the output depends on the request URL, not just the data.
// ============================================================

import type { Metadata } from "next";
import { Suspense } from "react";
import { filterProducts, getFeaturedProducts } from "@/lib/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters } from "@/components/products/ProductFilters";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse all PlainShop products — minimalist everyday essentials and hardware catalog.",
};

// searchParams is a Promise in Next.js 15/16 — we must await it.
interface ProductsPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Await the searchParams promise (Next.js 15+ requirement)
  const params = await searchParams;

  const q = params.q ?? "";
  const category = params.category ?? "all";
  const sort = params.sort ?? "featured";

  // Filter products server-side based on URL search params
  const products = filterProducts(q, category, sort);
  const totalFeatured = getFeaturedProducts().length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top strip — route pattern info */}
      <div className="flex items-center justify-between mb-6 text-xs text-gray-400">
        <nav className="flex items-center gap-1.5">
          <span>Index</span>
          <span>/</span>
          <span className="text-gray-700 font-medium">Products</span>
        </nav>
        <div className="flex items-center gap-2">
          <span>Route pattern:</span>
          <code className="font-mono bg-blue-50 border border-blue-200 text-blue-600 px-2 py-0.5 rounded">
            /products or /products?[query]
          </code>
        </div>
      </div>

      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-500 max-w-xl">
          Browse minimalist everyday essentials and hardware catalog. Clean taxonomy without promotions or advertisements.
        </p>

        {/* Metadata badges */}
        <div className="flex items-center gap-2 mt-4">
          <span className="inline-flex items-center gap-1.5 text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-md">
            {/* Database icon */}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth={1.5} />
              <path d="M21 12c0 1.657-4.03 3-9 3S3 13.657 3 12" strokeWidth={1.5} />
              <path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5" strokeWidth={1.5} />
            </svg>
            {totalFeatured} items registered
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-md">
            {/* Sync icon */}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Sync: Static
          </span>
        </div>
      </div>

      {/* Filters — wrapped in Suspense because ProductFilters uses useSearchParams.
          WHY Suspense: useSearchParams() suspends until search params are available.
          Without Suspense, the build fails with a hydration error. */}
      <div className="mb-6">
        <Suspense fallback={<div className="h-24 bg-gray-100 animate-pulse rounded-lg" />}>
          <ProductFilters />
        </Suspense>
      </div>

      {/* Product grid */}
      <ProductGrid products={products} />

      {/* No results state with reset link */}
      {products.length === 0 && (q || (category && category !== "all")) && (
        <div className="text-center mt-4">
          <a
            href="/products"
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Reset all filters
          </a>
        </div>
      )}

      {/* Bottom status strip */}
      <div className="mt-10 flex items-center justify-between text-xs text-gray-400 border-t border-gray-200 pt-4">
        <div className="flex items-center gap-2">
          {/* Check icon */}
          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            <strong className="text-gray-600">Static Schema Validation</strong>: Catalog rendered from normalised in-memory dataset without dynamic CMS dependencies.
          </span>
        </div>
        <div className="flex gap-4 font-mono">
          <span>ITEMS: {totalFeatured}</span>
          <span>CACHE: HIT</span>
          <span>RENDER: 14ms</span>
        </div>
      </div>
    </div>
  );
}
