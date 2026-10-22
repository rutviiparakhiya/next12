// ============================================================
// Product-specific 404 page.
// This is triggered when notFound() is called in /products/[id]/page.tsx.
// WHY here: Having a not-found.tsx inside [id]/ means Next.js renders
// this specific 404 for missing products (with the shop layout already
// applied) rather than the global not-found.
// ============================================================

import { NotFoundView } from "@/components/ui/NotFoundView";

export default function ProductNotFound() {
  return (
    <NotFoundView handler="notFound() triggered in app/(shop)/products/[id]/page.tsx" />
  );
}
