// ============================================================
// SiteFooter — Server Component (no interactivity needed).
// Shows brand name, copyright, and key navigation links.
// ============================================================

import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <p className="text-sm text-gray-400">
            <span className="font-semibold text-gray-600">PlainShop</span>{" "}
            © 2025 PlainShop Educational Reference Architecture.
          </p>

          {/* Footer links */}
          <nav className="flex flex-wrap items-center gap-4 text-xs">
            <Link href="/products" className="text-gray-400 hover:text-gray-700 transition-colors">
              All Products
            </Link>
            <Link href="/browse" className="text-gray-400 hover:text-gray-700 transition-colors">
              Taxonomy Index
            </Link>
            <Link
              href="/browse/electronics/audio/headphones"
              className="text-gray-400 hover:text-gray-700 transition-colors"
            >
              Route Anatomy ([[...slug]])
            </Link>
            <Link href="/preferences" className="text-gray-400 hover:text-gray-700 transition-colors">
              Account Group ((account))
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
