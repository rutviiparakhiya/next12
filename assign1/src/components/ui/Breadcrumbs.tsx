import Link from "next/link";
import React from "react";

/**
 * Breadcrumb Item Interface
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumbs Component
 * 
 * WHY USE BREADCRUMBS?
 * - Provides clear navigational context in deep hierarchical routes
 *   (e.g., Departments > Computer Science > Web Development).
 * - Uses next/link for client-side transitions without full page reloads.
 */
export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-sm text-slate-500 mb-4 ${className}`}
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center space-x-2">
              {index > 0 && (
                <span className="text-slate-400 select-none" aria-hidden="true">
                  /
                </span>
              )}
              {isLast || !item.href ? (
                <span className="font-medium text-slate-900 select-none">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
