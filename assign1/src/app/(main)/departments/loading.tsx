import React from "react";

/**
 * Loading Skeleton Component for Departments (loading.tsx)
 */
export default function DepartmentsLoading() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="h-8 w-44 bg-slate-200 rounded-md mb-2" />
          <div className="h-4 w-80 bg-slate-200 rounded-md" />
        </div>
        <div className="h-5 w-48 bg-slate-200 rounded-md" />
      </div>

      {/* 3 Department Card Skeletons */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex items-start space-x-4 flex-1">
            <div className="w-10 h-10 rounded-lg bg-slate-200 shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-5 w-48 bg-slate-200 rounded-md" />
              <div className="h-4 w-full max-w-xl bg-slate-200 rounded-md" />
              <div className="h-4 w-64 bg-slate-200 rounded-md pt-2" />
            </div>
          </div>
          <div className="h-5 w-28 bg-slate-200 rounded-md shrink-0" />
        </div>
      ))}
    </div>
  );
}
