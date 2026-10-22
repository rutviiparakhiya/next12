"use client";
// WHY "use client": Uses usePathname from next/navigation to show the
// actual URL in the diagnostic trace — that hook only works in client components.

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

// ---- Shared 404 UI ----
// Used by both app/not-found.tsx and (shop)/products/[id]/not-found.tsx.
// Keeping it here avoids duplicating the markup.

interface NotFoundViewProps {
  handler?: string; // which handler triggered notFound()
}

const suggestedProducts = [
  {
    slug: "wireless-headphones",
    name: "Wireless Headphones",
    brand: "SonicCraft",
    price: "$149.00",
    sku: "AUD-01",
  },
  {
    slug: "mechanical-keyboard",
    name: "Mechanical Keyboard",
    brand: "Keychronix",
    price: "$119.00",
    sku: "PER-02",
  },
  {
    slug: "minimal-desk-lamp",
    name: "Minimal Desk Lamp",
    brand: "Lumina Studio",
    price: "$68.00",
    sku: "LGT-03",
  },
];

export function NotFoundView({ handler = "no matching route" }: NotFoundViewProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto mb-6">
        <p className="text-xs text-gray-400 font-mono">
          Catalog / Unresolved Slug —{" "}
          <span className="text-red-500 font-semibold">HTTP 404</span>
        </p>
      </div>

      {/* Main card */}
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        {/* Error label */}
        <div className="mb-4">
          <Badge variant="red">BOUNDARY_ERR_NOT_FOUND</Badge>
        </div>

        {/* Status badge */}
        <div className="mb-6">
          <Badge variant="outline">404 – Unresolved Product or Category</Badge>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Item or category not found
        </h1>
        <p className="text-gray-500 mb-8">
          The product slug or taxonomy path you requested does not exist in the
          catalog database. Please check the URL or use the navigation below.
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          <Link
            href="/products"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Return to All Products
          </Link>
          <Link
            href="/browse"
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Browse Taxonomy Index
          </Link>
        </div>

        {/* Suggested products */}
        <h2 className="text-sm font-semibold text-gray-700 mb-4">
          Suggested valid products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {suggestedProducts.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              {/* Placeholder image area */}
              <div className="w-full h-20 bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                <span className="text-xs text-gray-400 font-mono">{p.sku}</span>
              </div>
              <p className="text-xs text-gray-400 font-mono mb-1">{p.sku}</p>
              <p className="text-sm font-semibold text-gray-800">{p.name}</p>
              <p className="text-xs text-gray-500">{p.brand}</p>
              <p className="text-sm font-bold text-gray-900 mt-1">{p.price}</p>
            </Link>
          ))}
        </div>

        {/* Router diagnostic trace */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 font-mono text-xs">
          <div className="flex items-center gap-2 mb-4">
            {/* Code icon */}
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="text-gray-500 font-semibold not-italic">
              Router Diagnostic Trace
            </span>
          </div>
          <div className="space-y-2 text-gray-600">
            <div className="flex gap-2">
              <span className="text-gray-400 w-36">Target path</span>
              <span className="text-red-500">{pathname}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-400 w-36">Handler</span>
              <span className="text-gray-700">{handler}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-400 w-36">Catalog database</span>
              <span className="text-gray-700">0 items returned</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-400 w-36">Status</span>
              <span className="text-red-500 font-bold">404</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
