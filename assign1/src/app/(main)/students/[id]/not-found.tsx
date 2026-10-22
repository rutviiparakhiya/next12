import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

/**
 * Student Not Found Page (src/app/(main)/students/[id]/not-found.tsx)
 * 
 * WHY A ROUTE-SPECIFIC NOT-FOUND?
 * - Next.js allows defining nested `not-found.tsx` files inside specific route folders.
 * - This provides contextual help when a particular student record cannot be located,
 *   while maintaining the (main) layout structure (Navbar + Footer).
 */
export default function StudentNotFound() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Students", href: "/students" },
          { label: "Not Found" },
        ]}
      />

      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-100 text-slate-600 border border-slate-200 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          <span>404 • STUDENT RECORD NOT FOUND</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
          Student record not found
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-8">
          The requested student ID does not match any enrolled record in our
          active campus directory. The student may have graduated or transferred.
        </p>

        <div className="flex items-center justify-center space-x-3">
          <Link
            href="/students"
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors"
          >
            Return to Students Directory
          </Link>
          <Link
            href="/departments"
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-colors"
          >
            Browse All Departments
          </Link>
        </div>
      </div>
    </div>
  );
}
