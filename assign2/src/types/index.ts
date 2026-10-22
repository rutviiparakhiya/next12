// ============================================================
// Central type definitions for PlainShop
// Keeping all types here makes it easy to understand the
// shape of data flowing through the app.
// ============================================================

// ----- Product Types -----

/** A single choice within a product option, e.g. "Matte Slate" */
export interface ProductChoice {
  id: string;
  label: string;
  priceDelta: number; // extra cost for this choice (0 = no change)
}

/** A configurable option on a product, e.g. Finish / Color */
export interface ProductOption {
  key: string;
  label: string;
  choices: ProductChoice[];
}

/** A spec row in the Physical Architecture table */
export interface ProductSpec {
  label: string;
  value: string;
}

/** Full product model */
export interface Product {
  id: number;         // numeric ID like 1, 2, 3
  slug: string;       // URL slug e.g. "wireless-headphones"
  sku: string;        // e.g. "AUD-01"
  name: string;
  brand: string;
  price: number;      // base price in USD
  categorySlug: string;       // e.g. "electronics"
  subcategorySlug: string;    // e.g. "audio"
  leafSlug: string;           // e.g. "headphones"
  categoryLabel: string;      // e.g. "Electronics / Audio"
  description: string;
  rating: number;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  stockUnits: number;
  featured: boolean;  // true = appears on /products listing
  image: string;      // path in /public (used for real image if available)
  gallery: string[];  // additional image paths
  specs: ProductSpec[];
  options: ProductOption[];
}

// ----- Category Types -----

/** A node in the taxonomy tree */
export interface CategoryNode {
  slug: string;
  name: string;
  description: string;
  itemCount: number;
  children: CategoryNode[];
}

// ----- Route Param Types -----
// Next.js 15/16: params is a Promise, so we define the resolved shape.

export interface ProductDetailParams {
  id: string;
}

export interface BrowseParams {
  slug?: string[]; // undefined when at /browse (optional catch-all)
}

export interface CategoriesParams {
  slug: string[]; // always present (required catch-all)
}
