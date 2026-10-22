import React from "react";

/**
 * Loading Skeleton Component (loading.tsx)
 * 
 * WHY USE LOADING.TSX?
 * - In Next.js App Router, `loading.tsx` automatically creates a React Suspense boundary
 *   around the page content.
 * - While the server is executing async data fetching (like our simulated 500ms delay in `getAllStudents()`),
 *   Next.js immediately streams this skeleton UI to the user.
 * - This provides an instant perceived load time and prevents layout jumps!
 */
export default function StudentsLoading() {
  return (
    <div className="animate-pulse">
      {/* Title & Subtitle Skeletons */}
      <div className="mb-6">
        <div className="h-8 w-40 bg-slate-200 rounded-md mb-2" />
        <div className="h-4 w-72 bg-slate-200 rounded-md" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        <div className="h-10 w-full max-w-md bg-slate-200 rounded-lg" />
        <div className="h-10 w-44 bg-slate-200 rounded-lg shrink-0" />
      </div>

      {/* 3x3 Grid Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-slate-200" />
              <div className="w-16 h-5 rounded-md bg-slate-200" />
            </div>
            <div className="h-5 w-36 bg-slate-200 rounded-md mb-3" />
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-4 w-24 bg-slate-200 rounded-md" />
              <div className="h-4 w-16 bg-slate-200 rounded-md" />
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <div className="h-4 w-20 bg-slate-200 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
