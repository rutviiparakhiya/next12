// ============================================================
// Global 404 page — shown for any unmatched route.
// WHY it includes its own header/footer:
//   The global not-found.tsx renders inside the ROOT layout only
//   (not inside the (shop) layout), so we must include the
//   SiteHeader and SiteFooter here directly.
// ============================================================

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { NotFoundView } from "@/components/ui/NotFoundView";

export default function GlobalNotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <NotFoundView handler="no matching route — no page.tsx found for this URL" />
      </main>
      <SiteFooter />
    </>
  );
}
