import Link from "next/link";
import React from "react";
import { Department } from "@/types";

/**
 * DepartmentCard Component
 * 
 * Server Component rendering department details, enrollment stats,
 * and navigation to the department's dedicated dynamic route (/departments/[slug]).
 */
interface DepartmentCardProps {
  department: Department;
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  // Select icon based on department
  const renderIcon = () => {
    switch (department.iconType) {
      case "code":
        return (
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0">
            {/* Terminal / Code Icon */}
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        );
      case "design":
        return (
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center shrink-0">
            {/* Design / Swatch Icon */}
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
          </div>
        );
      case "business":
        return (
          <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center shrink-0">
            {/* Chart / Trending Icon */}
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all duration-150 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-start space-x-4">
        {renderIcon()}
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            {department.name}
          </h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            {department.description}
          </p>

          {/* Metadata counters */}
          <div className="flex items-center space-x-4 mt-3 text-xs text-slate-500">
            <span className="flex items-center space-x-1.5">
              {/* Hierarchy / Specializations Icon */}
              <svg
                className="w-4 h-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <span>{department.specializationsCount} Specializations</span>
            </span>

            <span className="text-slate-300 select-none">•</span>

            <span className="flex items-center space-x-1.5">
              {/* Enrolled Students Icon */}
              <svg
                className="w-4 h-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>{department.enrolledStudents} Enrolled Students</span>
            </span>
          </div>
        </div>
      </div>

      {/* Action Link: View students */}
      <div className="shrink-0 flex items-center md:self-center">
        <Link
          href={`/departments/${department.slug}`}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group"
        >
          <span>View students</span>
          <span className="ml-1 transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
