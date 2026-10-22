import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

/**
 * Next.js 16 Optional Catch-All Route Props
 * 
 * In Next.js App Router, double square brackets `[[...slug]]` denote an OPTIONAL catch-all route:
 * - When visiting `/help`                 => slug is undefined (renders main help index)
 * - When visiting `/help/search`          => slug is ["search"] (renders specific topic)
 * - When visiting `/help/departments/faq` => slug is ["departments", "faq"]
 * 
 * COMPARISON FOR BEGINNERS:
 * - `[slug]`        => Dynamic Route: Exactly one segment required (e.g. `/students/STU-1042`).
 * - `[...slug]`     => Catch-All Route: One or more segments required (e.g. `/directory/a/b`).
 * - `[[...slug]]`   => Optional Catch-All Route: Zero or more segments! Handles both root and sub-paths.
 */
interface HelpPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export async function generateMetadata({
  params,
}: HelpPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = slug ? slug.join(" / ") : "Center";

  return {
    title: `Help ${topic}`,
    description: "Guidance on directory navigation, search tips, and routing principles.",
  };
}

export default async function HelpPage({ params }: HelpPageProps) {
  const { slug } = await params;
  const currentTopic = slug && slug.length > 0 ? slug[0].toLowerCase() : null;

  // Help topics repository
  const topics = [
    {
      slug: "search",
      title: "Searching & Filtering Students",
      badge: "Student Search",
      summary:
        "Learn how to quickly locate students by name, ID badge, email, or department.",
      details:
        "The search bar on the /students page filters records live in your browser using React client state. You can type any part of a student's name (e.g. 'Aarav'), their ID code (e.g. 'STU-1042'), or their specialization (e.g. 'Full-Stack'). You can combine the text search with the Department dropdown to narrow results immediately.",
    },
    {
      slug: "departments",
      title: "Academic Faculties & Specialization Tracks",
      badge: "Curriculum",
      summary:
        "Explore how academic faculties organize curriculum tracks, lab locations, and faculty leads.",
      details:
        "Departments are structured into specialized curriculum tracks (e.g., Computer Science hosts Web Development, Artificial Intelligence, and Cybersecurity). Clicking 'View students' on any department card opens its dedicated dynamic route (/departments/[slug]), which lists both its specializations and all currently enrolled students.",
    },
    {
      slug: "routing",
      title: "Next.js App Router Routing Concepts",
      badge: "Developer Guide",
      summary:
        "Understand the routing patterns demonstrated throughout this educational project.",
      details:
        "This project showcases 5 key Next.js App Router paradigms: 1) Static Routes (/students, /departments, /about), 2) Dynamic Routes (/students/[id], /departments/[slug]), 3) Nested Dynamic Routes (/departments/[slug]/[specialization]), 4) Catch-All Routes (/directory/[...slug]), and 5) Optional Catch-All Routes (/help/[[...slug]]).",
    },
  ];

  const activeTopic = topics.find((t) => t.slug === currentTopic);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Directory", href: "/students" },
          { label: "Help Center", href: "/help" },
          ...(activeTopic ? [{ label: activeTopic.title }] : []),
        ]}
      />

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1">
          {activeTopic ? activeTopic.title : "Campus Help & Navigation Center"}
        </h1>
        <p className="text-sm text-slate-500">
          {activeTopic
            ? `Detailed guidance on ${activeTopic.badge.toLowerCase()} functionality.`
            : "Quick guides, search tips, and architectural references."}
        </p>
      </div>

      {activeTopic ? (
        /* Detailed Topic View */
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200">
              {activeTopic.badge}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              /help/{activeTopic.slug}
            </span>
          </div>

          <p className="text-base font-semibold text-slate-800 mb-4">
            {activeTopic.summary}
          </p>

          <div className="text-sm text-slate-600 leading-relaxed space-y-4 mb-8">
            <p>{activeTopic.details}</p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/help"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              ← Back to Help Index
            </Link>
            <Link
              href="/students"
              className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Go to Students Directory →
            </Link>
          </div>
        </div>
      ) : (
        /* Help Index View (when on /help with no slug) */
        <div className="space-y-4 mb-8">
          {topics.map((topic) => (
            <div
              key={topic.slug}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center space-x-2 mb-1.5">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {topic.badge}
                  </span>
                  <h2 className="text-base font-bold text-slate-900">
                    {topic.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {topic.summary}
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href={`/help/${topic.slug}`}
                  className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 group transition-colors"
                >
                  <span>Read Guide</span>
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
