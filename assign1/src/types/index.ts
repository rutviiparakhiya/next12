/**
 * TypeScript Type Definitions for Campus Directory
 * 
 * WHY USE TYPESCRIPT TYPES?
 * - Types define the shape of our data contracts across the application.
 * - They prevent runtime errors, typo bugs, and provide rich autocomplete in the editor.
 * - No "any" types are used, ensuring strict type safety.
 */

/** Individual enrolled academic subject/course */
export interface Subject {
  code: string;       // e.g. "CS-301"
  name: string;       // e.g. "Distributed Systems & Microservices"
  credits: string;    // e.g. "4.0 Credits"
}

/** Student entity representation */
export interface Student {
  id: string;                         // e.g. "STU-1042"
  name: string;                       // e.g. "Aarav Mehta"
  initials: string;                   // e.g. "AM"
  department: string;                 // e.g. "Computer Science"
  departmentSlug: string;             // e.g. "computer-science" (used for routing links)
  specialization: string;             // e.g. "Web Development"
  specializationSlug: string;         // e.g. "web-development"
  specializationFocus?: string;       // e.g. "Full-Stack Architecture"
  year: string;                       // e.g. "3rd Year (Junior)" or "3rd Year"
  yearNumber: number;                 // e.g. 3 (used for badges like "Year 3")
  email: string;                      // e.g. "aarav.mehta@campus.edu"
  enrolledSince: string;              // e.g. "Fall 2022"
  status: "Active Student" | "On Leave" | "Alumni";
  about: string;                      // Bio / summary text
  academicStanding: string;           // e.g. "3rd Year Undergraduate"
  subjects: Subject[];                // List of enrolled courses
  systemRecordId: string;             // e.g. "0948-CS-AM"
  lastValidated: string;              // e.g. "Oct 24, 2024"
  avatarColor?: string;               // Tailwind color classes for custom avatar initials
}

/** Academic specialization track under a department */
export interface Specialization {
  slug: string;             // e.g. "web-development"
  name: string;             // e.g. "Web Development"
  description: string;      // Summary of the curriculum and track focus
  trackCode: string;        // e.g. "CS-SPEC-04"
  academicLead: string;     // e.g. "Prof. Elena Vance"
  lab: string;              // e.g. "Turing Hall 408"
  curriculumCycle: string;  // e.g. "2024–2025 Revised"
  enrolledCount?: number;   // Number of active enrollees
}

/** Academic department / faculty */
export interface Department {
  slug: string;                     // e.g. "computer-science"
  name: string;                     // e.g. "Computer Science"
  description: string;              // High-level overview of the faculty
  specializationsCount: number;     // e.g. 4
  enrolledStudents: number;         // e.g. 320
  specializations: Specialization[];// List of tracks offered
  iconType: "code" | "design" | "business"; // Used for selecting inline SVG icon
}
