// ============================================================
// (account) layout — isolated layout shell for account pages.
// WHY a separate route group:
//   The (account) group has a DIFFERENT header/footer than the
//   main (shop) pages. Using a separate route group lets us swap
//   out the entire shell without affecting the URL path.
//   /preferences is the URL (NOT /account/preferences).
// ============================================================

import { AccountHeader } from "@/components/layout/AccountHeader";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <AccountHeader />

      <main className="flex-1 bg-gray-50">
        {children}
      </main>

      {/* Minimal account footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <span>© 2025 PlainShop Educational Reference Architecture.</span>
          <nav className="flex gap-4">
            <a href="/products" className="hover:text-gray-600">All Products</a>
            <a href="/browse" className="hover:text-gray-600">Taxonomy Index</a>
            <a href="/browse/electronics/audio/headphones" className="hover:text-gray-600">Route Anatomy ([[...slug]])</a>
            <a href="/preferences" className="hover:text-gray-600 text-blue-500">Account Group ((account))</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
