import { redirect } from "next/navigation";

/**
 * Root Landing Page (/)
 * 
 * WHY REDIRECT?
 * - The primary entry point for users in the Campus Directory is the students directory.
 * - Using server-side `redirect()` from `next/navigation` performs an immediate 307/308
 *   HTTP redirect without flashing empty content or requiring client-side JavaScript.
 */
export default function RootPage() {
  redirect("/students");
}
