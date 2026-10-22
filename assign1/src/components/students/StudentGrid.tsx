"use client";

import React, { useState, useMemo } from "react";
import { Student } from "@/types";
import { StudentCard } from "./StudentCard";
import { StudentFilters } from "./StudentFilters";

/**
 * StudentGrid Component
 * 
 * WHY IS THIS COMPONENT ON THE CLIENT?
 * - Combines user search inputs and filtering logic into an instantaneous, reactive experience.
 * - By passing server-fetched `initialStudents` down as props, we achieve the best of both worlds:
 *   fast initial page render + snappy client-side filtering without page reloads!
 */
interface StudentGridProps {
  initialStudents: Student[];
}

export function StudentGrid({ initialStudents }: StudentGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All departments");

  // Extract unique departments for dropdown
  const departments = useMemo(() => {
    const set = new Set<string>();
    initialStudents.forEach((s) => set.add(s.department));
    return Array.from(set);
  }, [initialStudents]);

  // Filter students based on search query and department dropdown
  const filteredStudents = useMemo(() => {
    return initialStudents.filter((student) => {
      // Check department match
      const matchesDept =
        selectedDepartment === "All departments" ||
        student.department.toLowerCase() === selectedDepartment.toLowerCase();

      // Check search query against name, id, department, specialization, or email
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        query === "" ||
        student.name.toLowerCase().includes(query) ||
        student.id.toLowerCase().includes(query) ||
        student.department.toLowerCase().includes(query) ||
        student.specialization.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query);

      return matchesDept && matchesQuery;
    });
  }, [initialStudents, searchQuery, selectedDepartment]);

  return (
    <div>
      {/* Search and Department Filter Controls */}
      <StudentFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        departments={departments}
      />

      {/* Grid of Student Cards or Empty State */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center my-8 shadow-xs">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-1">
            No students found
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mb-4">
            No enrolled students match your search criteria. Try adjusting your
            keywords or changing the department filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedDepartment("All departments");
            }}
            className="inline-flex items-center px-3.5 py-1.5 border border-slate-300 text-xs font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Pagination & Count Footer (Matches Screenshot 2) */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 mt-8 pt-6 text-sm text-slate-500 gap-4">
        <p>
          Showing <span className="font-semibold text-slate-800">{filteredStudents.length}</span> of{" "}
          <span className="font-semibold text-slate-800">{initialStudents.length}</span> students
        </p>

        {/* Disabled Pagination Buttons */}
        <div className="flex items-center space-x-2">
          <button
            disabled
            className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-md bg-slate-50 text-slate-400 cursor-not-allowed select-none"
          >
            Previous
          </button>
          <button
            disabled
            className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-md bg-slate-50 text-slate-400 cursor-not-allowed select-none"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
