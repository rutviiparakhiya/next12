import type { Metadata } from "next";
import { getAllStudents } from "@/lib/helpers";
import { StudentGrid } from "@/components/students/StudentGrid";

/**
 * Metadata for SEO and Browser Tab Title
 */
export const metadata: Metadata = {
  title: "Students Directory",
  description:
    "Browse student records, departmental affiliations, and academic standing across the campus.",
};

/**
 * Students Directory Page (/students)
 * 
 * WHY IS THIS A SERVER COMPONENT?
 * - In Next.js App Router, pages are Server Components by default.
 * - This page performs async data fetching on the server using `getAllStudents()`.
 * - The fetched data is then passed as initial props to `<StudentGrid />`, which handles
 *   the interactive client-side filtering without sending extra network requests!
 */
export default async function StudentsPage() {
  const students = await getAllStudents();

  return (
    <div>
      {/* Page Header (Matches Screenshot 2) */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1">
          Students
        </h1>
        <p className="text-sm text-slate-500">
          Browse students and view their profiles.
        </p>
      </div>

      {/* Interactive Filter & Student Cards Grid */}
      <StudentGrid initialStudents={students} />
    </div>
  );
}
