"use client";
// WHY "use client": Uses usePathname to highlight the active nav link.
// Everything else in the layout can remain a Server Component.

import Link from "next/link";
import { usePathname } from "next/navigation";

// Simple inline SVG logo
function LogoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline-block mr-1">
      <rect width="7" height="7" rx="1" fill="#2563eb" />
      <rect x="9" width="7" height="7" rx="1" fill="#93c5fd" />
      <rect y="9" width="7" height="7" rx="1" fill="#93c5fd" />
      <rect x="9" y="9" width="7" height="7" rx="1" fill="#2563eb" />
    </svg>
  );
}

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/browse" },
  { label: "About", href: "/about" },
];

export function SiteHeader() {
  const pathname = usePathname();

  // Determine which nav item is "active".
  // "Categories" should be active on /browse/* and /categories/* paths.
  function isActive(href: string): boolean {
    if (href === "/browse") {
      return pathname.startsWith("/browse") || pathname.startsWith("/categories");
    }
    if (href === "/products") {
      return pathname.startsWith("/products");
    }
    return pathname === href;
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Brand */}
          <Link href="/products" className="flex items-center text-sm font-bold text-gray-900">
            <LogoIcon />
            PlainShop
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors relative pb-0.5 ${
                  isActive(href)
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right badge */}
          <span className="text-xs font-mono text-gray-400 bg-gray-100 border border-gray-200 px-2 py-1 rounded">
            Practice Store
          </span>
        </div>
      </div>
    </header>
  );
}
