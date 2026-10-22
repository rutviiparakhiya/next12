// ============================================================
// Breadcrumbs — Server Component.
// Renders a simple path like: Products / Electronics / Audio / Headphones
// ============================================================

import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string; // if no href, renders as plain text (last segment)
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-400">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span>/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-gray-700 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-700 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
