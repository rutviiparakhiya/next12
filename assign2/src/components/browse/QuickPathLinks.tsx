// ============================================================
// QuickPathLinks — shows buttons to demo optional catch-all routing.
// Server Component.
// ============================================================

import Link from "next/link";

const quickPaths = [
  "/browse/electronics",
  "/browse/electronics/audio",
  "/browse/home-office/kitchenware",
  "/browse/apparel/bags",
];

export function QuickPathLinks() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {/* Link icon */}
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="text-sm font-semibold text-gray-700">Quick Path Simulation</span>
        </div>
        <span className="text-xs text-gray-400">Simulate Next.js router transitions</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {quickPaths.map((path) => (
          <Link
            key={path}
            href={path}
            className="text-xs font-mono bg-gray-50 border border-gray-200 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            {path}
          </Link>
        ))}
      </div>
    </div>
  );
}
