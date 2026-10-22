import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Campus Directory",
  description:
    "Learn about the mission, technological architecture, and informatics principles behind the Campus Directory.",
};

/**
 * About Page (/about)
 * 
 * WHY IS THIS A STATIC PAGE?
 * - Content here is purely informational and does not change per user or request.
 * - Next.js automatically marks routes with no dynamic data fetching or headers as
 *   prerendered Static (SSG) HTML, maximizing caching and performance.
 */
export default function AboutPage() {
  const architecturalFeatures = [
    {
      title: "App Router & Server Components",
      description:
        "Built on Next.js 16 App Router using React Server Components by default for zero client JavaScript bundle overhead on static profile views.",
      badge: "Architecture",
    },
    {
      title: "Full TypeScript Strictness",
      description:
        "Every entity (students, subjects, departments, and specializations) is strictly typed without a single 'any' type, preventing runtime errors.",
      badge: "Type Safety",
    },
    {
      title: "Tailwind CSS v4 Styling",
      description:
        "Styled using modern Tailwind CSS design tokens, custom color palettes, and responsive layouts tailored for mobile, tablet, and desktop viewports.",
      badge: "Design",
    },
    {
      title: "Static Site Generation (SSG)",
      description:
        "Utilizes `generateStaticParams()` across all dynamic routes (/students/[id], /departments/[slug], and /departments/[slug]/[specialization]) for sub-millisecond page loads.",
      badge: "Performance",
    },
  ];

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Directory", href: "/students" },
          { label: "About" },
        ]}
      />

      {/* Main About Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200 mb-4">
            <span>CAMPUS INFORMATICS CORE</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
            About Campus Directory
          </h1>

          <p className="text-base text-slate-600 leading-relaxed mb-6">
            The Campus Directory is an academic portal designed to provide instant,
            accessible, and transparent visibility into academic faculties,
            curriculum specializations, and enrolled students across university departments.
          </p>

          <p className="text-sm text-slate-600 leading-relaxed mb-8">
            Engineered by the Academic Informatics Core, this platform acts as a unified
            student directory index, helping prospective researchers, cross-faculty advisors,
            and peers discover active student research concentrations, enrolled subjects,
            and faculty laboratory hubs.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/students"
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors"
            >
              Browse All Students →
            </Link>
            <Link
              href="/departments"
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-colors"
            >
              Explore Departments
            </Link>
          </div>
        </div>
      </div>

      {/* Engineering Highlights Grid */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Architectural Highlights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {architecturalFeatures.map((feature) => (
            <div
              key={feature.title}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-900">
                  {feature.title}
                </h3>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  {feature.badge}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
