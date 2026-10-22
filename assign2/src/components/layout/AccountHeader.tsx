"use client";
// WHY "use client": Uses usePathname to show the active route in breadcrumbs.

import Link from "next/link";
import { usePathname } from "next/navigation";

// AccountHeader is the top bar in the (account) route group layout.
// It has a different structure from SiteHeader: it shows breadcrumbs,
// centre nav links, a "Back to Store" link, and a "Practice Store" badge.

export function AccountHeader() {
  const pathname = usePathname();

  // Build a simple breadcrumb from the pathname
  const segments = pathname.split("/").filter(Boolean);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Left: brand + breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <Link href="/products" className="font-bold text-gray-900">
              PlainShop
            </Link>
            <span className="text-gray-300">/</span>
            {segments.map((seg, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-gray-500 capitalize">{seg}</span>
                {i < segments.length - 1 && (
                  <span className="text-gray-300">/</span>
                )}
              </span>
            ))}
          </div>

          {/* Center: nav links */}
          <nav className="hidden md:flex items-center gap-5">
            {[
              { label: "Products", href: "/products" },
              { label: "Categories", href: "/browse" },
              { label: "About", href: "/about" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right: Back to Store + badge */}
          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="text-xs text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1"
            >
              {/* Arrow left icon */}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Store
            </Link>
            <span className="text-xs font-mono text-gray-400 bg-gray-100 border border-gray-200 px-2 py-1 rounded">
              Practice Store
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
