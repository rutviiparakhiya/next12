"use client";

import React from "react";

/**
 * StudentFilters Component
 * 
 * WHY IS THIS A CLIENT COMPONENT ("use client")?
 * - It manages local interactive state for user input (search query and department selection).
 * - Client components are necessary whenever we need onChange event handlers,
 *   controlled inputs, and immediate UI reactivity without server round-trips.
 */
interface StudentFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
  departments: string[];
}

export function StudentFilters({
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  departments,
}: StudentFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
      {/* Search Input Box */}
      <div className="relative flex-1 max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          {/* Search Icon */}
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search students"
          className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 text-xs"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Department Dropdown Filter */}
      <div className="flex items-center space-x-2 shrink-0">
        <label
          htmlFor="department-filter"
          className="text-sm font-medium text-slate-600 whitespace-nowrap"
        >
          Department:
        </label>
        <div className="relative">
          <select
            id="department-filter"
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="appearance-none bg-white border border-slate-300 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-xs cursor-pointer"
          >
            <option value="All departments">All departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {/* Custom Chevron Down Icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
