"use client";
// WHY "use client": Search/sort/filter controls need to read and update
// URL query parameters using useRouter and useSearchParams.
// These hooks only work in client components.

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { getFeaturedProducts } from "@/lib/products";

// Build category filter chip counts from featured products
function buildCategoryCounts(): Array<{ slug: string; label: string; count: number }> {
  const all = getFeaturedProducts();
  const map = new Map<string, { label: string; count: number }>();

  // These match the categorySlug values in our data
  const categoryNames: Record<string, string> = {
    electronics: "Electronics",
    "home-office": "Home & Office",
    apparel: "Apparel",
    accessories: "Accessories",
  };

  for (const p of all) {
    const existing = map.get(p.categorySlug);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(p.categorySlug, {
        label: categoryNames[p.categorySlug] ?? p.categorySlug,
        count: 1,
      });
    }
  }

  return Array.from(map.entries()).map(([slug, { label, count }]) => ({
    slug,
    label,
    count,
  }));
}

const categoryCounts = buildCategoryCounts();
const totalCount = getFeaturedProducts().length;

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name-asc", label: "Name A–Z" },
];

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "all";
  const sort = searchParams.get("sort") ?? "featured";

  // Helper: update a single search param without clearing others
  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "" || value === "featured" || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      const qs = params.toString();
      router.push(`${pathname}${qs ? "?" + qs : ""}`);
    },
    [router, pathname, searchParams]
  );

  function handleReset() {
    router.push(pathname);
  }

  const hasFilters = q || (category && category !== "all") || (sort && sort !== "featured");

  return (
    <div className="space-y-4">
      {/* Search + Sort row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search box */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            id="product-search"
            type="text"
            value={q}
            placeholder="Search products, brands, or categories..."
            onChange={(e) => updateParam("q", e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {/* "OK" label on the right */}
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-300">
            ⌘K
          </span>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="product-sort" className="text-sm text-gray-500 whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="product-sort"
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          {/* Reset button */}
          {hasFilters && (
            <button
              id="product-reset"
              onClick={handleReset}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1"
            >
              {/* X icon */}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-gray-400 font-medium">Filter:</span>

        {/* "All" chip */}
        <button
          id="filter-all"
          onClick={() => updateParam("category", "all")}
          className={`text-xs px-3 py-1 rounded-full border transition-colors ${
            category === "all" || !category
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
          }`}
        >
          All Products ({totalCount})
        </button>

        {categoryCounts.map(({ slug, label, count }) => (
          <button
            key={slug}
            id={`filter-${slug}`}
            onClick={() => updateParam("category", slug)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              category === slug
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>
    </div>
  );
}
