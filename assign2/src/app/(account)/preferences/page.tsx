// ============================================================
// Preferences page — /preferences
// WHY static shell + client islands:
//   The page structure (title, sections) is static and renders on the
//   server. Only the form controls (PreferencesForm) need to be client
//   components because they read/write localStorage and manage state.
// ============================================================

import type { Metadata } from "next";
import { PreferencesForm } from "@/components/preferences/PreferencesForm";

export const metadata: Metadata = {
  title: "Account & Preferences",
  description: "Manage your PlainShop catalog display preferences and simulation settings.",
};

export default function PreferencesPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Route group info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-8 flex items-start gap-3">
        <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="flex-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-semibold text-blue-700">Next.js Route Group: </span>
              <code className="text-xs font-mono text-blue-600">
                app/(account)/preferences/page.tsx
              </code>
              <span className="text-xs text-blue-600 ml-2">
                — Isolated Layout Shell without URL prefix
              </span>
            </div>
            <span className="text-xs font-mono bg-blue-100 border border-blue-200 text-blue-700 px-2 py-0.5 rounded">
              (account)
            </span>
          </div>
        </div>
      </div>

      {/* Page title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Account &amp; Preferences</h1>
        <p className="text-sm text-gray-500">
          Manage local workspace preferences, catalog display options, and simulation environment settings.
        </p>
      </div>

      {/* Preferences form — client component */}
      <PreferencesForm />
    </div>
  );
}
