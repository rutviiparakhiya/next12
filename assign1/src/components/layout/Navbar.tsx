"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

/**
 * Navbar Component
 * 
 * WHY IS THIS A CLIENT COMPONENT ("use client")?
 * - In Next.js App Router, components are Server Components by default.
 * - However, determining which navigation link is currently "active" requires
 *   reading the current browser URL path via the `usePathname()` hook.
 * - Hooks only work inside Client Components, so we add "use client" at the top.
 */
export function Navbar() {
  const pathname = usePathname();

  // Helper function to check if a navigation item is active
  const isStudentsActive =
    pathname === "/" || pathname.startsWith("/students");
  const isDepartmentsActive = pathname.startsWith("/departments");
  const isAboutActive = pathname.startsWith("/about");

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-8">
          <Link
            href="/students"
            className="flex items-center space-x-2.5 text-slate-900 hover:text-blue-600 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-700 transition-colors">
              {/* Graduation Cap / Academic Icon */}
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14v7"
                />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">
              Campus Directory
            </span>
          </Link>

          {/* Navigation Links with Active Indicator */}
          <nav className="flex items-center space-x-1 sm:space-x-6 h-16" aria-label="Main Navigation">
            <Link
              href="/students"
              className={`relative h-16 flex items-center px-2 text-sm font-medium transition-colors ${
                isStudentsActive
                  ? "text-slate-900 font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Students
              {isStudentsActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t" />
              )}
            </Link>

            <Link
              href="/departments"
              className={`relative h-16 flex items-center px-2 text-sm font-medium transition-colors ${
                isDepartmentsActive
                  ? "text-slate-900 font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Departments
              {isDepartmentsActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t" />
              )}
            </Link>

            <Link
              href="/about"
              className={`relative h-16 flex items-center px-2 text-sm font-medium transition-colors ${
                isAboutActive
                  ? "text-slate-900 font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              About
              {isAboutActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t" />
              )}
            </Link>
          </nav>
        </div>

        {/* Right Badge: "Frontend Practice" */}
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
            Frontend Practice
          </span>
        </div>
      </div>
    </header>
  );
}
