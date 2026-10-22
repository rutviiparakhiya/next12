import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

/**
 * Global 404 Not Found Page (src/app/not-found.tsx)
 * 
 * WHY IS THIS COMPONENT HERE?
 * - In Next.js App Router, src/app/not-found.tsx catches unhandled 404s across the application
 *   or whenever `notFound()` is explicitly invoked from a route handler or page.
 * - Matches Screenshot 5 pixel-for-pixel, providing helpful navigation back to valid resources.
 */
export default function GlobalNotFound() {
  const suggestedRoutes = [
    {
      title: "Computer Science Department",
      path: "/departments/computer-science",
      icon: "building",
    },
    {
      title: "Web Development Specialization",
      path: "/departments/computer-science/web-development",
      icon: "code",
    },
    {
      title: "All Students Directory",
      path: "/students",
      icon: "users",
    },
    {
      title: "Academic Faculties",
      path: "/departments",
      icon: "academic",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb matching Screenshot 5 */}
        <Breadcrumbs
          items={[
            { label: "Directory", href: "/students" },
            { label: "Not Found" },
          ]}
        />

        {/* 404 Center Box */}
        <div className="max-w-2xl mx-auto text-center py-12 sm:py-16">
          {/* Badge: 404 • ROUTE NOT FOUND */}
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-100 text-slate-600 border border-slate-200 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>404 • ROUTE NOT FOUND</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            Student or department not found
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mx-auto mb-8">
            The requested directory entry or path could not be located. It may
            have moved or the identifier might be invalid.
          </p>

          {/* Primary & Secondary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Link
              href="/students"
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors"
            >
              Return to Students Directory
            </Link>
            <Link
              href="/departments"
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-colors"
            >
              Browse All Departments
            </Link>
          </div>

          {/* Suggested Starting Points Box (Matches Screenshot 5) */}
          <div className="bg-white border border-slate-200 rounded-xl text-left shadow-xs overflow-hidden">
            <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 tracking-wider uppercase">
                Suggested Starting Points
              </span>
              <span className="text-slate-400">Internal Routes</span>
            </div>

            <div className="divide-y divide-slate-100">
              {suggestedRoutes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/80 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-400 group-hover:text-blue-600 transition-colors">
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
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                      {route.title}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all">
                    {route.path} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
