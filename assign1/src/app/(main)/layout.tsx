import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/**
 * Shared Layout for Route Group (main)
 * 
 * WHY USE A ROUTE GROUP (main)?
 * - In Next.js App Router, parentheses in folder names like `(main)` create a "Route Group".
 * - Route groups do NOT affect the URL path (e.g. `/students` is accessed directly at `/students`,
 *   not `/main/students`).
 * - This allows multiple related pages to share this common layout (Navbar + Footer + consistent container)
 *   without polluting URL structures.
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
