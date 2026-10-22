// ============================================================
// About page — /about
// WHY static: No dynamic data. Renders the same HTML every time.
// Next.js pre-renders this at build time (SSG by default for
// pages without dynamic data access).
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About PlainShop",
  description: "Learn about PlainShop — a beginner-friendly Next.js App Router practice store.",
};

const routingConcepts = [
  {
    concept: "App Router",
    description: "All pages live inside src/app/ and use file-based routing. Folders become URL segments.",
    example: "app/(shop)/products/page.tsx → /products",
  },
  {
    concept: "Route Groups ()",
    description: "Folders wrapped in parentheses group pages into layouts without affecting the URL.",
    example: "(shop) layout = Navbar+Footer, (account) = isolated shell",
  },
  {
    concept: "Dynamic Routes [id]",
    description: "Square brackets create dynamic segments. The value is available via params.",
    example: "/products/[id] → /products/wireless-headphones",
  },
  {
    concept: "Required Catch-All [...slug]",
    description: "Captures one or more segments. /categories (no slug) returns 404 — slug is required.",
    example: "/categories/[...slug] → /categories/electronics/audio",
  },
  {
    concept: "Optional Catch-All [[...slug]]",
    description: "Double brackets make the segments optional. The root URL works without any segments.",
    example: "/browse/[[...slug]] → /browse AND /browse/electronics/audio",
  },
  {
    concept: "generateStaticParams",
    description: "Export this function to pre-generate pages for every known slug at build time (SSG).",
    example: "Used in /products/[id] to build a page for every product",
  },
  {
    concept: "Server Components",
    description: "Default in App Router. Run on the server, fetch data, render HTML. Zero JS to the client.",
    example: "ProductCard, SiteFooter, Breadcrumbs, SpecsTable",
  },
  {
    concept: '"use client" Components',
    description: "Add this directive when you need interactivity: state, events, browser APIs.",
    example: "ProductFilters, ProductGallery, ProductOptions, PreferencesForm",
  },
  {
    concept: "loading.tsx",
    description: "Automatically shown by Next.js as a skeleton while the page is loading.",
    example: "Products and browse pages each have a loading.tsx skeleton",
  },
  {
    concept: "not-found.tsx + notFound()",
    description: "Call notFound() to render the nearest not-found.tsx (e.g. for invalid product slugs).",
    example: "Invalid /products/unknown → product not-found.tsx",
  },
  {
    concept: "error.tsx",
    description: "Client component that catches runtime errors and shows a Try Again button.",
    example: "(shop)/error.tsx catches errors in any shop page",
  },
  {
    concept: "next/link and next/font",
    description: "Link for client-side navigation. next/font loads Inter and JetBrains Mono from Google.",
    example: "All navigation links use <Link href=...>",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono px-3 py-1.5 rounded-full mb-4">
          <span>Educational Reference Store</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">About PlainShop</h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          PlainShop is a beginner-friendly practice store built with{" "}
          <strong className="text-gray-700">Next.js App Router</strong> and{" "}
          <strong className="text-gray-700">TypeScript</strong>. Its purpose is to demonstrate every major
          Next.js routing concept in one coherent, navigable project — using only
          local dummy data, no external APIs, and Tailwind CSS for styling.
        </p>
      </div>

      {/* How to run */}
      <div className="bg-gray-900 text-gray-100 rounded-xl p-6 mb-10 font-mono text-sm">
        <p className="text-gray-400 text-xs mb-3"># How to run locally</p>
        <p><span className="text-green-400">$</span> npm install</p>
        <p><span className="text-green-400">$</span> npm run dev</p>
        <p className="text-gray-400 mt-2"># Then open http://localhost:3000</p>
      </div>

      {/* Routing concepts table */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Routing Concepts Demonstrated</h2>
      <div className="space-y-3 mb-12">
        {routingConcepts.map((rc) => (
          <div key={rc.concept} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">{rc.concept}</h3>
                <p className="text-sm text-gray-500 mb-2">{rc.description}</p>
                <code className="text-xs font-mono bg-gray-50 border border-gray-200 text-blue-600 px-2 py-1 rounded block">
                  {rc.example}
                </code>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-4">
        <Link href="/products" className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Browse Products
        </Link>
        <Link href="/browse" className="px-4 py-2 border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
          Explore Taxonomy
        </Link>
        <Link href="/preferences" className="px-4 py-2 border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
          Preferences
        </Link>
      </div>
    </div>
  );
}
