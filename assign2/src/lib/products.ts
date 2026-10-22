// ============================================================
// Helper functions for working with product data.
// Components should call these instead of importing data directly
// so there is one place to add real API calls later.
// ============================================================

import { products } from "@/data/products";
import type { Product } from "@/types";

// --- Tiny artificial delay (demo only!) ---
// This makes loading.tsx visible in development.
// Remove in production.
async function simulateDelay(ms = 400): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

/** Get all products (featured and non-featured). */
export async function getAllProducts(): Promise<Product[]> {
  await simulateDelay(); // demo: shows loading skeleton
  return products;
}

/** Get only featured products (those shown on the /products listing). */
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

/** Get a single product by its URL slug, e.g. "wireless-headphones". */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Get products that belong to a specific leaf category. */
export function getProductsByLeaf(
  categorySlug: string,
  subcategorySlug: string,
  leafSlug: string
): Product[] {
  return products.filter(
    (p) =>
      p.categorySlug === categorySlug &&
      p.subcategorySlug === subcategorySlug &&
      p.leafSlug === leafSlug
  );
}

/** Get products that belong to a category branch (any depth). */
export function getProductsByBranch(slugs: string[]): Product[] {
  if (slugs.length === 0) return products;
  if (slugs.length === 1) {
    return products.filter((p) => p.categorySlug === slugs[0]);
  }
  if (slugs.length === 2) {
    return products.filter(
      (p) => p.categorySlug === slugs[0] && p.subcategorySlug === slugs[1]
    );
  }
  return products.filter(
    (p) =>
      p.categorySlug === slugs[0] &&
      p.subcategorySlug === slugs[1] &&
      p.leafSlug === slugs[2]
  );
}

/** Filter and sort featured products based on search query, category and sort order. */
export function filterProducts(
  query: string,
  category: string,
  sort: string
): Product[] {
  let result = getFeaturedProducts();

  // Filter by search query (name, brand, category label)
  if (query.trim()) {
    const q = query.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
    );
  }

  // Filter by category group
  if (category && category !== "all") {
    result = result.filter((p) => p.categorySlug === category);
  }

  // Sort results
  switch (sort) {
    case "price-asc":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      // "featured" - keep original order
      break;
  }

  return result;
}

/** All slugs for generateStaticParams in /products/[id]. */
export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
