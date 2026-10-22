"use client";

import React, { useEffect } from "react";
import Link from "next/link";

/**
 * Error Boundary Component (error.tsx)
 * 
 * WHY IS THIS A CLIENT COMPONENT ("use client")?
 * - In Next.js App Router, `error.tsx` MUST be a Client Component.
 * - It wraps the route subtree in a React Error Boundary.
 * - When an unexpected runtime exception is thrown during rendering or data fetching,
 *   Next.js displays this component rather than crashing the whole page.
 * - The `reset` function allows users to retry rendering the subtree without a full page refresh.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for internal diagnostics
    console.error("Application runtime error caught by boundary:", error);
  }, [error]);

  return (
    <div className="max-w-xl mx-auto py-16 text-center">
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-50 text-red-600 flex items-center justify-center border border-red-200">
        {/* Exclamation Icon */}
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-2">
        Something went wrong!
      </h2>

      <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
        An unexpected error occurred while rendering this view. You can try
        reloading the component or return to the directory.
      </p>

      {error.message && (
        <div className="bg-slate-100 border border-slate-200 rounded-lg p-3 text-xs font-mono text-slate-700 text-left mb-6 max-w-md mx-auto overflow-auto">
          {error.message}
        </div>
      )}

      <div className="flex items-center justify-center space-x-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors"
        >
          Try again
        </button>
        <Link
          href="/students"
          className="inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 shadow-xs transition-colors"
        >
          Return to Directory
        </Link>
      </div>
    </div>
  );
}
