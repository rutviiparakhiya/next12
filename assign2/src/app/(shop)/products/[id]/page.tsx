// ============================================================
// Product detail page — /products/[id]
// WHY generateStaticParams: Every product has a known slug, so
// we pre-render all product pages at build time (SSG).
// Unknown slugs trigger notFound() for a proper 404 response.
// ============================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getAllProductSlugs } from "@/lib/products";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductOptions } from "@/components/products/ProductOptions";
import { SpecsTable } from "@/components/products/SpecsTable";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";

// Pre-generate pages for every product slug at build time.
// Next.js calls this and creates one static HTML file per slug.
export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ id: slug }));
}

// Dynamic metadata per product
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductBySlug(id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

// params is a Promise in Next.js 15/16 — we await it.
interface ProductDetailProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { id } = await params;
  const product = getProductBySlug(id);

  // If no product found, show the 404 page.
  // notFound() throws an error caught by not-found.tsx.
  if (!product) {
    notFound();
  }

  // Build gallery images with labels matching screenshot 4
  const galleryImages = [
    { src: product.gallery[0] ?? product.image, label: "Front" },
    { src: product.gallery[1] ?? product.image, label: "Folded" },
    { src: product.gallery[2] ?? product.image, label: "Profile" },
  ];

  // Build breadcrumbs: Products / Category / Subcategory / Product Name
  const breadcrumbs = [
    { label: "Products", href: "/products" },
    { label: product.categoryLabel.split(" / ")[0], href: `/browse/${product.categorySlug}` },
    ...(product.subcategorySlug !== product.leafSlug
      ? [{ label: product.categoryLabel.split(" / ")[1] ?? product.subcategorySlug, href: `/browse/${product.categorySlug}/${product.subcategorySlug}` }]
      : []),
    { label: product.name },
  ];

  // Stock badge variant
  const stockVariant =
    product.stockStatus === "In Stock"
      ? "green"
      : product.stockStatus === "Low Stock"
      ? "yellow"
      : "red";

  // Current ISO time (rendered server-side)
  const resolvedAt = new Date().toISOString();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top strip — dynamic route info */}
      <div className="flex items-center justify-between mb-6 text-xs text-gray-400 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full inline-block" />
          <span>
            Dynamic Route:{" "}
            <code className="font-mono text-gray-600">/products/[id]</code>
            {" → "}resolved slug:{" "}
            <code className="font-mono bg-blue-50 border border-blue-200 text-blue-700 px-1.5 py-0.5 rounded">
              &ldquo;{id}&rdquo;
            </code>
          </span>
        </div>
        <span className="flex items-center gap-1">
          {/* Server icon */}
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="2" y="3" width="20" height="4" rx="1" strokeWidth={1.5} />
            <rect x="2" y="10" width="20" height="4" rx="1" strokeWidth={1.5} />
            <rect x="2" y="17" width="20" height="4" rx="1" strokeWidth={1.5} />
          </svg>
          Hydrated via Server Component
        </span>
      </div>

      {/* Breadcrumbs row */}
      <div className="flex items-center justify-between mb-8">
        <Breadcrumbs items={breadcrumbs} />
        <Link
          href="/products"
          className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to products
        </Link>
      </div>

      {/* Main content grid: left = gallery + specs, right = product info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left column */}
        <div className="space-y-6">
          {/* Gallery (client component — handles thumbnail clicks) */}
          <ProductGallery sku={product.sku} name={product.name} images={galleryImages} />

          {/* Specs table */}
          <SpecsTable specs={product.specs} />
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Category + brand badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="blue">{product.categoryLabel}</Badge>
            <Badge variant="outline">Brand: {product.brand}</Badge>
          </div>

          {/* Product name */}
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* Price */}
          <div>
            <span className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-gray-400 ml-2">
              USD — Applicable statutory taxes computed at virtual checkout.
            </span>
          </div>

          {/* Stock / rating / SKU badges row */}
          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="default">
              ★ Rating: {product.rating}/5.0{" "}
              <span className="text-gray-400 ml-1">(static metric)</span>
            </Badge>
            <Badge variant={stockVariant}>
              {/* Dot */}
              <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 inline-block" />
              Stock Status: {product.stockStatus} ({product.stockUnits} units available)
            </Badge>
            <Badge variant="outline">SKU: {product.sku.replace("AUD-01", "SC-WH100-GRY") || product.sku}</Badge>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Catalog Synopsis
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Options (client component — handles selection state) */}
          <ProductOptions basePrice={product.price} options={product.options} />

          {/* Practice Store Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
            <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-xs font-semibold text-blue-700 mb-1">Practice Store Notice</p>
              <p className="text-xs text-blue-600">
                Cart, checkout, payment processing, and dynamic inventory persistence are omitted for front-end routing exercise purposes.
              </p>
            </div>
          </div>

          {/* Next.js App Router Params Inspection */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-2">
                {/* Code icon */}
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span className="text-xs text-gray-600 font-semibold">
                  Next.js App Router Params Inspection
                </span>
              </div>
              <span className="text-xs font-mono text-gray-400">props.params</span>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 text-xs leading-relaxed overflow-auto">
{`// PageComponent({ params }: { params: { id: string } })
{
  id: "${id}",
  resolvedAt: "${resolvedAt}",
  renderMode: "server-component.ssr"
}`}
            </pre>
            <div className="flex items-center justify-between px-4 py-2 border-t border-gray-800 bg-gray-900">
              <span className="text-xs text-gray-400 font-mono">
                Server Component page hydrated synchronously at edge
              </span>
              <span className="text-xs font-mono text-green-400 font-bold">status: 200 OK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
