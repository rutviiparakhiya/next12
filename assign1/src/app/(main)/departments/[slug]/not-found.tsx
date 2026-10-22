import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

/**
 * Department Not Found Page
 */
export default function DepartmentNotFound() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Departments", href: "/departments" },
          { label: "Not Found" },
        ]}
      />

      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-100 text-slate-600 border border-slate-200 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          <span>404 • DEPARTMENT NOT FOUND</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
          Department not found
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-8">
          The requested academic department slug does not exist in our curriculum
          records. Please verify the URL or select an active faculty below.
        </p>

        <div className="flex items-center justify-center space-x-3">
          <Link
            href="/departments"
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors"
          >
            Browse All Departments
          </Link>
          <Link
            href="/students"
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-colors"
          >
            Students Directory
          </Link>
        </div>
      </div>
    </div>
  );
}
