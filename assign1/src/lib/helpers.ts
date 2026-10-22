import { STUDENTS } from "@/data/students";
import { DEPARTMENTS } from "@/data/departments";
import { Student, Department, Specialization } from "@/types";

/**
 * Data Access Helpers
 * 
 * WHY USE DATA HELPER FUNCTIONS?
 * - Single source of truth: components never directly access raw data arrays.
 * - Simulates an API/ORM layer (like Prisma or fetch()).
 * - If we later swap dummy data for a real database or remote API, 
 *   we only need to change these functions, leaving the UI components untouched!
 */

/**
 * Fetch all students.
 * 
 * NOTE FOR LEARNING / DEMO:
 * We include an artificial 500ms delay here intentionally to simulate network latency
 * and allow you to see the Next.js `loading.tsx` skeleton UI in action.
 */
export async function getAllStudents(): Promise<Student[]> {
  // Artificial 500ms delay for loading.tsx demonstration
  await new Promise((resolve) => setTimeout(resolve, 500));
  return STUDENTS;
}

/**
 * Synchronous version to retrieve students without delay (useful in client components or static param generators).
 */
export function getAllStudentsSync(): Student[] {
  return STUDENTS;
}

/**
 * Fetch a single student by their unique ID (e.g. "STU-1042").
 * Case-insensitive comparison ensures reliable matching.
 */
export async function getStudentById(id: string): Promise<Student | undefined> {
  const normalizedId = id.trim().toUpperCase();
  return STUDENTS.find((s) => s.id.toUpperCase() === normalizedId);
}

/**
 * Fetch all academic faculties/departments.
 */
export async function getAllDepartments(): Promise<Department[]> {
  return DEPARTMENTS;
}

/**
 * Synchronous version for departments.
 */
export function getAllDepartmentsSync(): Department[] {
  return DEPARTMENTS;
}

/**
 * Fetch a department by its URL slug (e.g. "computer-science").
 */
export async function getDepartmentBySlug(
  slug: string
): Promise<Department | undefined> {
  const normalizedSlug = slug.trim().toLowerCase();
  return DEPARTMENTS.find((d) => d.slug.toLowerCase() === normalizedSlug);
}

/**
 * Fetch a specific specialization under a department.
 */
export async function getSpecialization(
  departmentSlug: string,
  specializationSlug: string
): Promise<
  { department: Department; specialization: Specialization } | undefined
> {
  const department = await getDepartmentBySlug(departmentSlug);
  if (!department) return undefined;

  const spec = department.specializations.find(
    (s) => s.slug.toLowerCase() === specializationSlug.trim().toLowerCase()
  );

  if (!spec) return undefined;

  return { department, specialization: spec };
}

/**
 * Fetch students enrolled in a specific department.
 */
export async function getStudentsByDepartment(
  departmentSlug: string
): Promise<Student[]> {
  const normalizedSlug = departmentSlug.trim().toLowerCase();
  return STUDENTS.filter(
    (s) => s.departmentSlug.toLowerCase() === normalizedSlug
  );
}

/**
 * Fetch students enrolled in a specific specialization track.
 */
export async function getStudentsBySpecialization(
  departmentSlug: string,
  specializationSlug: string
): Promise<Student[]> {
  const normalizedDept = departmentSlug.trim().toLowerCase();
  const normalizedSpec = specializationSlug.trim().toLowerCase();

  return STUDENTS.filter(
    (s) =>
      s.departmentSlug.toLowerCase() === normalizedDept &&
      s.specializationSlug.toLowerCase() === normalizedSpec
  );
}

/**
 * Helper to get all student IDs for `generateStaticParams()`.
 */
export function getAllStudentIds(): string[] {
  return STUDENTS.map((s) => s.id);
}

/**
 * Helper to get all department slugs for `generateStaticParams()`.
 */
export function getAllDepartmentSlugs(): string[] {
  return DEPARTMENTS.map((d) => d.slug);
}

/**
 * Helper to get all combinations of [slug]/[specialization] for `generateStaticParams()`.
 */
export function getAllSpecializationParams(): {
  slug: string;
  specialization: string;
}[] {
  const params: { slug: string; specialization: string }[] = [];

  for (const dept of DEPARTMENTS) {
    for (const spec of dept.specializations) {
      params.push({
        slug: dept.slug,
        specialization: spec.slug,
      });
    }
  }

  return params;
}
