// ============================================================
// (shop) layout — wraps all "shop" pages with Navbar + Footer.
// WHY route group: We want most pages to share a common header/footer
// layout WITHOUT adding "(shop)" to the URL path.
// Route groups use parentheses in the folder name: (shop).
// ============================================================

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
