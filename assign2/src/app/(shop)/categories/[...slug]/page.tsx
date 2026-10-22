// ============================================================
// /categories/[...slug] — Required catch-all redirect.
//
// WHY a separate /categories route:
//   This demonstrates the difference between a REQUIRED catch-all
//   [...slug] and the OPTIONAL catch-all [[...slug]] used in /browse.
//
// Required catch-all [...slug]:
//   - /categories ALONE returns 404 (no slug = invalid)
//   - /categories/electronics/audio IS valid
//
// Optional catch-all [[...slug]]:
//   - /browse ALONE is valid (slug is undefined)
//   - /browse/electronics IS valid
//
// This page simply redirects to the equivalent /browse URL,
// so users always end up at the canonical browse path.
// ============================================================

import { redirect } from "next/navigation";

interface CategoriesPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function CategoriesRedirectPage({ params }: CategoriesPageProps) {
  const { slug } = await params;

  // Redirect to the same path under /browse.
  // e.g. /categories/electronics/audio -> /browse/electronics/audio
  redirect(`/browse/${slug.join("/")}`);
}
