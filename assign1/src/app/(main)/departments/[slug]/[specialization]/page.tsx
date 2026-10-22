import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSpecialization,
  getAllSpecializationParams,
  getStudentsBySpecialization,
} from "@/lib/helpers";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SpecializationStudentCard } from "@/components/departments/SpecializationStudentCard";

interface SpecializationPageProps {
  params: Promise<{
    slug: string;
    specialization: string;
  }>;
}

/**
 * Dynamic Metadata for Specialization Page
 */
export async function generateMetadata({
  params,
}: SpecializationPageProps): Promise<Metadata> {
  const { slug, specialization: specSlug } = await params;
  const result = await getSpecialization(slug, specSlug);

  if (!result) {
    return {
      title: "Specialization Not Found",
    };
  }

  return {
    title: `${result.specialization.name} (${result.specialization.trackCode}) - ${result.department.name}`,
    description: result.specialization.description,
  };
}

/**
 * Pre-generate all nested dynamic routes at build time (SSG)
 * 
 * WHY NESTED GENERATESTATICPARAMS?
 * - In Next.js App Router, nested dynamic folders `[slug]/[specialization]` require
 *   an array of objects containing both parameter keys.
 */
export function generateStaticParams() {
  return getAllSpecializationParams();
}

/**
 * Disallow unconfigured dynamic paths to return an immediate 404
 */
export const dynamicParams = false;

export default async function SpecializationDetailPage({
  params,
}: SpecializationPageProps) {
  const { slug, specialization: specSlug } = await params;
  const result = await getSpecialization(slug, specSlug);

  // If department or specialization doesn't exist, trigger 404
  if (!result) {
    notFound();
  }

  const { department, specialization } = result;

  // Fetch students enrolled specifically in this specialization track
  const enrolledStudents = await getStudentsBySpecialization(
    department.slug,
    specialization.slug
  );

  return (
    <div>
      {/* Breadcrumb Navigation (Matches Screenshot 4) */}
      <Breadcrumbs
        items={[
          { label: "Departments", href: "/departments" },
          { label: department.name, href: `/departments/${department.slug}` },
          { label: specialization.name },
        ]}
      />

      {/* Top Action Row (Matches Screenshot 4) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
        <Link
          href={`/departments/${department.slug}`}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group"
        >
          <span className="mr-1.5 transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          <span>Return to {department.name} Department</span>
        </Link>

        <Link
          href="/students"
          className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors group"
        >
          <span>View all students</span>
          <span className="ml-1 transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>

      {/* Main Specialization Header Card (Matches Screenshot 4) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {specialization.name}
              </h1>
              <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                Specialization under {department.name}
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              {specialization.description}
            </p>
          </div>

          {/* Department Track Box */}
          <div className="lg:text-right shrink-0">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
              Department Track
            </p>
            <span className="inline-block px-3 py-1 bg-slate-50 border border-slate-200 rounded font-mono text-sm font-semibold text-slate-800 shadow-2xs">
              {specialization.trackCode}
            </span>
          </div>
        </div>

        {/* 4-Column Metadata Grid (Matches Screenshot 4) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-100 text-xs mt-6">
          <div>
            <p className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold mb-1">
              Academic Lead
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {specialization.academicLead}
            </p>
          </div>

          <div>
            <p className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold mb-1">
              Primary Core Lab
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {specialization.lab}
            </p>
          </div>

          <div>
            <p className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold mb-1">
              Total Enrollment
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {enrolledStudents.length > 0
                ? `${enrolledStudents.length} Active Enrollees`
                : `${specialization.enrolledCount || 0} Active Enrollees`}
            </p>
          </div>

          <div>
            <p className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold mb-1">
              Curriculum Cycle
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {specialization.curriculumCycle}
            </p>
          </div>
        </div>
      </div>

      {/* Students in this Specialization Section (Matches Screenshot 4) */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-bold text-slate-900">
              Students in this Specialization
            </h2>
            <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 flex items-center justify-center">
              {enrolledStudents.length}
            </span>
          </div>

          {/* Filtered by Track Badge */}
          <div className="text-xs text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded self-start sm:self-auto font-medium">
            Filtered by Track:{" "}
            <span className="font-semibold text-slate-800">
              {specialization.name}
            </span>
          </div>
        </div>

        {/* 2-Column Students Grid */}
        {enrolledStudents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolledStudents.map((student) => (
              <SpecializationStudentCard
                key={student.id}
                student={student}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 text-sm">
            No students currently recorded in this specialization track.
          </div>
        )}
      </div>

      {/* Specialization Footer Metadata Bar (Matches Screenshot 4) */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-6 border-t border-slate-200 gap-2">
        <p>Campus Directory © Academic Informatics Core</p>
        <div className="flex items-center space-x-1.5 font-mono text-[11px]">
          <span>
            Path: /departments/{department.slug}/{specialization.slug}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
        </div>
      </div>
    </div>
  );
}
