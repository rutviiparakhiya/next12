import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStudentById, getAllStudentIds } from "@/lib/helpers";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

/**
 * Next.js 16 Dynamic Route Page Props
 * 
 * WHY IS `params` A PROMISE?
 * In Next.js 15 and 16, route parameters and searchParams are asynchronous Promises.
 * This architectural change enables Next.js to stream and render page shells faster
 * by only awaiting route parameters when they are actually read by your code.
 */
interface StudentPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Dynamic Page Title & Metadata
 */
export async function generateMetadata({
  params,
}: StudentPageProps): Promise<Metadata> {
  const { id } = await params;
  const student = await getStudentById(id);

  if (!student) {
    return {
      title: "Student Not Found",
    };
  }

  return {
    title: `${student.name} (${student.id})`,
    description: `Academic profile, enrolled subjects, and departmental standing for ${student.name}.`,
  };
}

/**
 * Static Site Generation (SSG) with generateStaticParams
 * 
 * WHY USE GENERATESTATICPARAMS?
 * - Pre-renders all 8 student pages into static HTML files at build time.
 * - Delivers lightning-fast TTFB (Time to First Byte) via static caching.
 */
export function generateStaticParams() {
  return getAllStudentIds().map((id) => ({
    id,
  }));
}

/**
 * WHY SET dynamicParams = false?
 * - With `dynamicParams = false`, Next.js only permits paths returned by `generateStaticParams`.
 * - If a user enters an unknown ID (like `/students/STU-9999`), Next.js immediately serves
 *   the 404 Not Found page without attempting an expensive server-side render.
 */
export const dynamicParams = false;

export default async function StudentProfilePage({ params }: StudentPageProps) {
  const { id } = await params;
  const student = await getStudentById(id);

  // If the student ID does not match any record, trigger Next.js notFound()
  if (!student) {
    notFound();
  }

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: "Students", href: "/students" },
          { label: student.name },
        ]}
      />

      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/students"
          className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors group"
        >
          <span className="mr-1.5 transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          <span>Back to students</span>
        </Link>
      </div>

      {/* Main Student Profile Card (Matches Screenshot 1) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        {/* Profile Header: Avatar, Name, and Badges */}
        <div className="flex items-start space-x-4 mb-6">
          <Avatar
            initials={student.initials}
            colorClass={student.avatarColor}
            size="lg"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
              {student.name}
            </h1>
            <div className="flex items-center space-x-2">
              <Badge variant="id">{student.id}</Badge>
              <Badge variant="status">{student.status}</Badge>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-slate-200 my-6" />

        {/* 4-Column Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-6">
          <div>
            <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
              Department
            </p>
            <Link
              href={`/departments/${student.departmentSlug}`}
              className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
            >
              {student.department}
            </Link>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
              Study Year
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {student.year}
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
              Email
            </p>
            <a
              href={`mailto:${student.email}`}
              className="text-sm font-semibold text-blue-600 hover:underline break-all"
            >
              {student.email}
            </a>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
              Enrolled
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {student.enrolledSince}
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-slate-200 my-6" />

        {/* About Section */}
        <div className="my-6">
          <h2 className="text-base font-bold text-slate-900 mb-2">About</h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            {student.about}
          </p>
        </div>

        {/* Divider */}
        <hr className="border-slate-200 my-6" />

        {/* Academic Details Section */}
        <div className="my-6">
          <h2 className="text-base font-bold text-slate-900 mb-4">
            Academic Details
          </h2>

          <div className="space-y-3 mb-6 text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Department</span>
              <span className="font-semibold text-slate-900">
                {student.department}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Current Academic Standing</span>
              <span className="font-semibold text-slate-900">
                {student.academicStanding}
              </span>
            </div>
          </div>

          {/* Enrolled Subjects Box / Table */}
          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-2">
              Enrolled Subjects
            </p>
            <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-200 overflow-hidden">
              {student.subjects.map((subject) => (
                <div
                  key={subject.code}
                  className="px-4 py-3 flex items-center justify-between text-sm hover:bg-slate-50/50 transition-colors"
                >
                  <span className="font-medium text-slate-800">
                    {subject.name}
                  </span>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
                    {subject.credits}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Metadata Footer (Matches Screenshot 1) */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 mt-4 px-1 gap-2">
        <p>System Record ID: {student.systemRecordId}</p>
        <p>Last validated: {student.lastValidated}</p>
      </div>
    </div>
  );
}
