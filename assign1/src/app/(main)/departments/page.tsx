import type { Metadata } from "next";
import { getAllDepartments } from "@/lib/helpers";
import { DepartmentCard } from "@/components/departments/DepartmentCard";

/**
 * Metadata for Departments Page
 */
export const metadata: Metadata = {
  title: "Academic Departments",
  description:
    "Explore academic faculties, programs, curriculum specializations, and enrolled student bodies.",
};

/**
 * Departments Listing Page (/departments)
 * 
 * WHY IS THIS A SERVER COMPONENT?
 * - Static route that fetches department collections on the server.
 * - Does not require client React state; rendered statically for optimum SEO and performance.
 */
export default async function DepartmentsPage() {
  const departments = await getAllDepartments();

  return (
    <div>
      {/* Header Row (Matches Screenshot 3) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1">
            Departments
          </h1>
          <p className="text-sm text-slate-500">
            Explore academic faculties, programs, and enrolled students.
          </p>
        </div>

        {/* Right Status Badge */}
        <div className="flex items-center space-x-2 text-sm text-slate-600 font-medium self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span>3 Active Academic Faculties</span>
        </div>
      </div>

      {/* Departments Stack */}
      <div className="space-y-4">
        {departments.map((department) => (
          <DepartmentCard key={department.slug} department={department} />
        ))}
      </div>

      {/* Footer Info Row (Matches Screenshot 3) */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 mt-10 pt-6 border-t border-slate-200 gap-2">
        <p>Curriculum Year 2024–2025</p>
        <p>Updated daily via Campus Records API</p>
      </div>
    </div>
  );
}
