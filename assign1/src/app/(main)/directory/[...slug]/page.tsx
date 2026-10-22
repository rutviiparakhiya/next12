import { redirect, notFound } from "next/navigation";
import { getStudentById, getDepartmentBySlug, getSpecialization } from "@/lib/helpers";

/**
 * Next.js 16 Catch-All Route Props
 * 
 * In Next.js App Router, `[...slug]` captures all remaining URL segments into a string array.
 * For example:
 * - /directory/students/STU-1042        => slug = ["students", "STU-1042"]
 * - /directory/departments/computer-science => slug = ["departments", "computer-science"]
 * - /directory/invalid/path             => slug = ["invalid", "path"]
 */
interface DirectoryCatchAllProps {
  params: Promise<{
    slug: string[];
  }>;
}

/**
 * Catch-All Route (/directory/[...slug])
 * 
 * WHY USE A CATCH-ALL ROUTE ([...slug])?
 * - In modern web frameworks, legacy URL migrations, external partner links, or unified
 *   search deep-links often arrive with variable numbers of path segments.
 * - Catch-all routes allow a single route handler to inspect an arbitrary array of path segments
 *   and route, redirect, or rewrite them dynamically.
 * - If the requested path segments resolve to a known entity, we seamlessly redirect.
 * - If the path segments do not map to valid entities, we explicitly call `notFound()` to render our 404 page.
 */
export default async function DirectoryCatchAllPage({
  params,
}: DirectoryCatchAllProps) {
  const { slug } = await params;

  // Case 1: /directory/students
  if (slug.length === 1 && slug[0].toLowerCase() === "students") {
    redirect("/students");
  }

  // Case 2: /directory/students/[id] -> e.g. /directory/students/STU-1042
  if (slug.length === 2 && slug[0].toLowerCase() === "students") {
    const studentId = slug[1];
    const student = await getStudentById(studentId);
    if (student) {
      redirect(`/students/${student.id}`);
    } else {
      notFound();
    }
  }

  // Case 3: /directory/departments
  if (slug.length === 1 && slug[0].toLowerCase() === "departments") {
    redirect("/departments");
  }

  // Case 4: /directory/departments/[slug] -> e.g. /directory/departments/computer-science
  if (slug.length === 2 && slug[0].toLowerCase() === "departments") {
    const deptSlug = slug[1];
    const department = await getDepartmentBySlug(deptSlug);
    if (department) {
      redirect(`/departments/${department.slug}`);
    } else {
      notFound();
    }
  }

  // Case 5: /directory/departments/[slug]/[specialization]
  if (slug.length === 3 && slug[0].toLowerCase() === "departments") {
    const deptSlug = slug[1];
    const specSlug = slug[2];
    const result = await getSpecialization(deptSlug, specSlug);
    if (result) {
      redirect(`/departments/${result.department.slug}/${result.specialization.slug}`);
    } else {
      notFound();
    }
  }

  // Case 6: /directory/about
  if (slug.length === 1 && slug[0].toLowerCase() === "about") {
    redirect("/about");
  }

  // Any unrecognized, invalid, or malformed directory path triggers a 404
  notFound();
}
