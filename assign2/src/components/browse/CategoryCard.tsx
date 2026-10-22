// ============================================================
// CategoryCard — a card shown on the taxonomy index page (/browse).
// Server Component.
// ============================================================

import Link from "next/link";
import type { CategoryNode } from "@/types";

interface CategoryCardProps {
  category: CategoryNode;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-200 transition-all">
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-gray-900">{category.name}</h3>
        <span className="text-xs font-mono bg-gray-100 border border-gray-200 text-gray-500 px-2 py-0.5 rounded">
          {category.itemCount} items
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-4 leading-relaxed">{category.description}</p>

      {/* Sub-taxonomy chips */}
      {category.children.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Subtaxonomies
          </p>
          <div className="flex flex-wrap gap-1.5">
            {category.children.map((child) => (
              <span
                key={child.slug}
                className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full"
              >
                {child.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer: slug + link */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs font-mono text-gray-400">
          slug: &lsquo;{category.slug}&rsquo;
        </span>
        <Link
          href={`/browse/${category.slug}`}
          className="text-xs text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center gap-0.5"
        >
          /browse/{category.slug}
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
