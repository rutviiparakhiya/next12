// ============================================================
// TaxonomySidebar — shown on browse pages when a slug is present.
// Explains catch-all routing and shows the current path decomposition.
// Server Component.
// ============================================================

import Link from "next/link";
import type { CategoryNode } from "@/types";

interface TaxonomySidebarProps {
  slug: string[];                  // e.g. ["electronics", "audio", "headphones"]
  breadcrumbs: CategoryNode[];     // resolved nodes for each segment
  matchingItemCount: number;
  subLeafCount: number;
}

export function TaxonomySidebar({
  slug,
  breadcrumbs,
  matchingItemCount,
  subLeafCount,
}: TaxonomySidebarProps) {
  const depth = slug.length;

  return (
    <aside className="w-56 flex-shrink-0 space-y-4">
      {/* Catch-All Routing explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          {/* Info icon */}
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-bold text-blue-700">Catch-All Routing</span>
        </div>
        <p className="text-xs text-blue-600 leading-relaxed">
          In Next.js App Router, the optional{" "}
          <code className="font-mono bg-blue-100 px-1 rounded">[[...slug]]</code>{" "}
          pattern captures one or more path segments in a single page file.
        </p>
      </div>

      {/* Segment decomposition */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">
          Segment Decomposition
        </p>
        <div className="space-y-1.5">
          {slug.map((seg, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-400">slug[{i}]</span>
              <span
                className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                  i === slug.length - 1
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "bg-gray-50 text-gray-600 border border-gray-200"
                }`}
              >
                &ldquo;{seg}&rdquo;
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Branch hierarchy */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">
          Branch Hierarchy
        </p>
        <div className="space-y-1">
          {breadcrumbs.map((node, i) => {
            const isActive = i === breadcrumbs.length - 1;
            const href = "/browse/" + slug.slice(0, i + 1).join("/");
            return (
              <div key={node.slug} className="flex items-center gap-2">
                <span className="text-xs text-gray-400">L{i + 1}</span>
                {isActive ? (
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                    {node.name}
                    <span className="text-blue-400">Active</span>
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="text-xs text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {node.name}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Taxonomy metrics */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">
          Taxonomy Metrics
        </p>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">Node Depth</span>
            <span className="font-mono text-gray-700">{depth}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Matching Items</span>
            <span className="font-mono text-gray-700">{matchingItemCount} items</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Sub-Leafs</span>
            <span className="font-mono text-gray-700">{subLeafCount} tags</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Filter State</span>
            <span className="font-mono text-blue-500">Unfiltered</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
