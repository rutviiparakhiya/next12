// Root page — redirects to /products.
// WHY redirect here: "/" has no content of its own.
// We want the "home" to be the product listing, so we redirect.
// This is the cleanest pattern — no HTML is rendered at "/".

import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/products");
}
