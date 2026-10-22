import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getDepartmentBySlug,
  getAllDepartmentSlugs,
  getStudentsByDepartment,
} from "@/lib/helpers";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { StudentCard } from "@/components/students/StudentCard";

interface DepartmentPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Dynamic Metadata for Department Page
 */
export async function generateMetadata({
  params,
}: DepartmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const department = await getDepartmentBySlug(slug);

  if (!department) {
    return {
      title: "Department Not Found",
    };
  }

  return {
    title: `${department.name} Faculty`,
    description: department.description,
  };
}

/**
 * Pre-generate all 3 department routes at build time (SSG)
 */
export function generateStaticParams() {
  return getAllDepartmentSlugs().map((slug) => ({
    slug,
  }));
}

/**
 * Disallow arbitrary dynamic department slugs to ensure fast static responses
 */
export const dynamicParams = false;

export default async function DepartmentDetailPage({
  params,
}: DepartmentPageProps) {
  const { slug } = await params;
  const department = await getDepartmentBySlug(slug);

  if (!department) {
    notFound();
  }

  // Fetch students belonging to this department
  const students = await getStudentsByDepartment(department.slug);

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: "Departments", href: "/departments" },
          { label: department.name },
        ]}
      />

      {/* Top Action Links */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/departments"
          className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors group"
        >
          <span className="mr-1.5 transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          <span>Back to departments</span>
        </Link>
        <Link
          href="/students"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group"
        >
          <span>View all students</span>
          <span className="ml-1 transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>

      {/* Department Overview Banner Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {department.name}
              </h1>
              <Badge variant="department" departmentName={department.name}>
                Faculty
              </Badge>
            </div>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              {department.description}
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Faculty Records
            </span>
            <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
              {department.enrolledStudents} Enrolled
            </span>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Specializations</span>
            <span className="font-semibold text-slate-800 text-sm">
              {department.specializationsCount} Academic Tracks
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Undergraduate Body</span>
            <span className="font-semibold text-slate-800 text-sm">
              {department.enrolledStudents} Active Students
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Academic Cycle</span>
            <span className="font-semibold text-slate-800 text-sm">
              2024–2025 Revised
            </span>
          </div>
        </div>
      </div>

      {/* Specializations Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Specialization Tracks
          </h2>
          <span className="text-xs text-slate-500">
            {department.specializations.length} Available Programs
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {department.specializations.map((spec) => (
            <div
              key={spec.slug}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-slate-900">
                    {spec.name}
                  </h3>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {spec.trackCode}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {spec.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">
                      Lead
                    </span>
                    <span className="font-medium text-slate-800">
                      {spec.academicLead}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">
                      Core Lab
                    </span>
                    <span className="font-medium text-slate-800">
                      {spec.lab}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <Link
                  href={`/departments/${department.slug}/${spec.slug}`}
                  className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 group transition-colors"
                >
                  <span>Explore Specialization Track</span>
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrolled Students in this Department Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Students in {department.name}
          </h2>
          <span className="text-xs text-slate-500">
            Showing {students.length} Featured Profiles
          </span>
        </div>

        {students.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 text-sm">
            No students currently enrolled in this department directory.
          </div>
        )}
      </div>
    </div>
  );
}
