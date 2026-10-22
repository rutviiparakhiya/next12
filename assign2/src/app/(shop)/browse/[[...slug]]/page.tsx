// ============================================================
// Browse page — /browse/[[...slug]]
// This is an OPTIONAL catch-all route. It handles:
//   /browse             -> slug is undefined  -> taxonomy index
//   /browse/electronics -> slug = ["electronics"] -> category view
//   /browse/electronics/audio/headphones -> slug = [3 segments] -> leaf view
//
// WHY optional catch-all [[...slug]]:
//   The double brackets make the slug parameter optional, so /browse
//   itself is valid without any segments. With [...slug] (required
//   catch-all), /browse would return a 404 because no root page exists.
// ============================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllCategories, resolveCategoryPath, getCategoryBreadcrumbs, getAllCategoryPaths } from "@/lib/categories";
import { getProductsByBranch } from "@/lib/products";
import { CategoryCard } from "@/components/browse/CategoryCard";
import { QuickPathLinks } from "@/components/browse/QuickPathLinks";
import { TaxonomySidebar } from "@/components/browse/TaxonomySidebar";
import { RouteAnatomyBox } from "@/components/browse/RouteAnatomyBox";
import { CodeSnippet } from "@/components/browse/CodeSnippet";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductCard } from "@/components/products/ProductCard";
import type { CategoryNode } from "@/types";

// Pre-generate all valid paths (including root /browse).
export async function generateStaticParams() {
  return getAllCategoryPaths();
}

// Dynamic metadata based on current slug
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) {
    return { title: "Explore Product Taxonomy", description: "Browse the complete PlainShop category tree." };
  }
  const node = resolveCategoryPath(slug);
  if (!node) return { title: "Category Not Found" };
  return { title: node.name, description: node.description };
}

interface BrowsePageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function BrowsePage({ params }: BrowsePageProps) {
  const { slug } = await params;

  // ---- ROOT: /browse (slug undefined) ----
  if (!slug) {
    return <TaxonomyIndexView />;
  }

  // ---- SLUG PRESENT: validate the path ----
  const node = resolveCategoryPath(slug);

  // If the slug doesn't match any category node, show 404.
  if (!node) {
    notFound();
  }

  const breadcrumbNodes = getCategoryBreadcrumbs(slug);
  const products = getProductsByBranch(slug);

  // Count sub-leafs at any depth
  function countLeafs(n: CategoryNode): number {
    if (n.children.length === 0) return 1;
    return n.children.reduce((acc, c) => acc + countLeafs(c), 0);
  }
  const subLeafCount = node.children.length > 0 ? node.children.reduce((acc, c) => acc + countLeafs(c), 0) : 0;

  return <CategoryView slug={slug} node={node} breadcrumbNodes={breadcrumbNodes} products={products} subLeafCount={subLeafCount} />;
}

// ---- Taxonomy Index View (/browse) ----
function TaxonomyIndexView() {
  const categories = getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top strip */}
      <div className="flex items-center justify-between mb-6 text-xs text-gray-400 flex-wrap gap-2">
        <nav className="flex items-center gap-1.5">
          <Link href="/products" className="hover:text-gray-600">App Router</Link>
          <span>/</span>
          <Link href="/browse" className="hover:text-gray-600">browse</Link>
          <span>/</span>
          <span className="text-gray-600 font-mono">[[...slug]]</span>
        </nav>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full inline-block" />
          <span>Optional Catch-All Route: <code className="font-mono text-blue-600">/browse/[[...slug]]</code> — Root Mode (params.slug is undefined)</span>
        </div>
      </div>

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Product Taxonomy</h1>
        <p className="text-gray-500 max-w-2xl">
          Complete hierarchical catalog index. When no nested path is supplied to the optional catch-all route, this comprehensive category overview renders automatically.
        </p>
      </div>

      {/* Quick path simulation */}
      <div className="mb-8">
        <QuickPathLinks />
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {categories.map((cat) => (
          <CategoryCard key={cat.slug} category={cat} />
        ))}
      </div>

      {/* Route anatomy educational box */}
      <RouteAnatomyBox />
    </div>
  );
}

// ---- Category/Subcategory/Leaf View (/browse/[...slug]) ----
interface CategoryViewProps {
  slug: string[];
  node: CategoryNode;
  breadcrumbNodes: CategoryNode[];
  products: ReturnType<typeof getProductsByBranch>;
  subLeafCount: number;
}

function CategoryView({ slug, node, breadcrumbNodes, products, subLeafCount }: CategoryViewProps) {
  const depth = slug.length;
  const isLeaf = node.children.length === 0;

  // Build breadcrumb items
  const breadcrumbs = [
    { label: "Categories", href: "/browse" },
    ...breadcrumbNodes.map((n, i) => ({
      label: n.name,
      href: i < breadcrumbNodes.length - 1 ? `/browse/${slug.slice(0, i + 1).join("/")}` : undefined,
    })),
  ];

  // Page implementation snippet for educational box
  const pageSnippet = `interface CategoryPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const slug0 = slug[0] || "electronics";  // e.g. "electronics"
  const currentNodeName = slug[slug.length - 1] || "headphones";
  const taxonomy = resolveCategoryPath(slug.join("/") || "/" || "electronics/audio/headphones");

  return <CategoryView activeNode={slug} items={getProducts(slug)} />;
}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top strip */}
      <div className="flex items-center justify-between mb-6 text-xs text-gray-400 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 font-mono">
          <span className="text-blue-600">Catch-All Route:</span>
          <span>categories[</span>
          {slug.map((s, i) => (
            <span key={i}>
              {i > 0 && <span>, </span>}
              <span className="text-orange-500">&ldquo;{s}&rdquo;</span>
            </span>
          ))}
          <span>]</span>
          <span className="ml-3">Depth: {depth}/3 active</span>
        </div>
        <span className="font-mono text-xs">
          file: app/(shop)/browse/[[...slug]]/page.tsx
        </span>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <TaxonomySidebar
          slug={slug}
          breadcrumbs={breadcrumbNodes}
          matchingItemCount={products.length}
          subLeafCount={subLeafCount}
        />

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Breadcrumbs + parent category link */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <Breadcrumbs items={breadcrumbs} />
            {depth > 1 && (
              <div className="flex gap-2 text-xs">
                <Link
                  href={`/browse/${slug.slice(0, -1).join("/")}`}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  ← Parent Category: {breadcrumbNodes[breadcrumbNodes.length - 2]?.name}
                </Link>
                <span className="text-gray-300">|</span>
                <Link href="/browse" className="text-gray-500 hover:text-gray-700">
                  All Categories
                </Link>
              </div>
            )}
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{node.name}</h1>
            <p className="text-gray-500 text-sm">{node.description}</p>
          </div>

          {/* Leaf sub-filter chips (only at leaf level) */}
          {isLeaf && node.children.length === 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-gray-400">Filter by leaf subdivision:</span>
              {["Over-Ear", "On-Ear", "In-Ear Monitors", "Wireless ANC"].map((label) => (
                <span
                  key={label}
                  className="text-xs bg-gray-100 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full"
                >
                  {label}
                </span>
              ))}
            </div>
          )}

          {/* Item count + sort label */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              Showing <strong className="text-gray-800">{products.length} items</strong> indexed under /{slug.join("/")}
            </span>
            <span className="text-xs font-mono text-gray-400">Sort: Alphabetical A-Z ↑</span>
          </div>

          {/* Child category nodes (if not leaf) */}
          {!isLeaf && node.children.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {node.children.map((child) => (
                <Link
                  key={child.slug}
                  href={`/browse/${[...slug, child.slug].join("/")}`}
                  className="block p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-800">{child.name}</span>
                    <span className="text-xs font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                      {child.itemCount} items
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{child.description}</p>
                </Link>
              ))}
            </div>
          )}

          {/* Product cards */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((p) => (
                <div key={p.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-blue-200 transition-all">
                  {/* SKU badge */}
                  <div className="px-4 pt-4 pb-0 flex items-center justify-between">
                    <span className="text-xs font-mono bg-gray-100 border border-gray-200 text-gray-500 px-1.5 py-0.5 rounded">
                      SKU {p.sku}
                    </span>
                    {p.stockStatus === "Low Stock" && (
                      <span className="text-xs bg-yellow-50 text-yellow-600 border border-yellow-200 px-1.5 py-0.5 rounded">
                        Low Stock
                      </span>
                    )}
                  </div>
                  {/* Image area */}
                  <div className="mx-4 mt-3 h-36 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-400 font-mono">{p.sku}</span>
                  </div>
                  {/* Info */}
                  <div className="p-4">
                    <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-500 mb-2">{p.brand}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {p.specs.slice(0, 2).map((s) => (
                        <span key={s.label} className="text-xs bg-gray-50 border border-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                          {s.value}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">${p.price.toFixed(2)}</span>
                      <Link
                        href={`/products/${p.slug}`}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View product →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-500 font-medium">No products in this category yet.</p>
              <Link href="/browse" className="text-sm text-blue-600 mt-2 inline-block hover:text-blue-800">
                Browse all categories
              </Link>
            </div>
          )}

          {/* Next.js Page Implementation Snippet */}
          <CodeSnippet
            title="Next.js Page Implementation Snippet"
            subtitle="highlight: Server Component"
            code={pageSnippet}
            language="typescript"
          />
        </div>
      </div>
    </div>
  );
}
