# 🎓 Campus Directory - Next.js Academic Portal

A clean, modern, beginner-friendly **Student & Department Directory** built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

This project provides a comprehensive paired learning experience for mastering modern Next.js concepts including:
- **Server Components** vs **Client Components**
- **Static Site Generation (SSG)** with `generateStaticParams()` and `dynamicParams = false`
- **Dynamic Routes** (`[id]`, `[slug]`, and nested `[slug]/[specialization]`)
- **Catch-All Routes** (`[...slug]`) and **Optional Catch-All Routes** (`[[...slug]]`)
- **Route Groups** (`(main)`) for shared navigation shells
- **Streaming UI** with `loading.tsx` skeletons
- **Graceful Error Handling** with `error.tsx` and custom `not-found.tsx`

---

## 🚀 Getting Started

Follow these simple steps to run the project locally on your machine:

```bash
# 1. Navigate to the project directory
cd assign1

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the local development server
npm run dev
```

Open your browser and visit [http://localhost:3000](http://localhost:3000). The app will automatically redirect you to the `/students` directory.

### Other Useful Commands:

```bash
# Run TypeScript type-checking
npx tsc --noEmit

# Run ESLint to verify code quality
npm run lint

# Build the production application bundle
npm run build

# Start the optimized production server
npm run start
```

---

## 🗂️ Project Folder Structure

The project strictly follows the Next.js App Router conventions with an intuitive, clean separation of concerns:

```text
src/
├── app/
│   ├── (main)/                               # Route group sharing the MainLayout (Navbar + Footer)
│   │   ├── about/
│   │   │   └── page.tsx                      # Static About page
│   │   ├── departments/
│   │   │   ├── [slug]/                       # Dynamic department route (e.g. /departments/computer-science)
│   │   │   │   ├── [specialization]/
│   │   │   │   │   └── page.tsx              # Nested dynamic route (e.g. /departments/computer-science/web-development)
│   │   │   │   ├── not-found.tsx             # 404 handler for invalid department slugs
│   │   │   │   └── page.tsx                  # Department detail view (specializations + student list)
│   │   │   ├── loading.tsx                   # Loading skeleton for departments list
│   │   │   └── page.tsx                      # Departments listing page (static route)
│   │   ├── directory/
│   │   │   └── [...slug]/
│   │   │       └── page.tsx                  # Catch-all route (/directory/[...slug])
│   │   ├── help/
│   │   │   └── [[...slug]]/
│   │   │       └── page.tsx                  # Optional catch-all route (/help and /help/[[...slug]])
│   │   ├── students/
│   │   │   ├── [id]/                         # Dynamic student profile route (e.g. /students/STU-1042)
│   │   │   │   ├── not-found.tsx             # 404 handler for invalid student IDs
│   │   │   │   └── page.tsx                  # Student profile detail (matches Screenshot 1)
│   │   │   ├── loading.tsx                   # Loading skeleton for students list
│   │   │   └── page.tsx                      # Students listing page with search/filter (matches Screenshot 2)
│   │   ├── error.tsx                         # Client Component error boundary with "Try again" reset
│   │   └── layout.tsx                        # Shared layout rendering <Navbar /> and <Footer />
│   ├── favicon.ico
│   ├── globals.css                           # Global Tailwind CSS styles and custom theme tokens
│   ├── layout.tsx                            # Root application layout (HTML, body, next/font Inter)
│   ├── not-found.tsx                         # Global 404 Not Found page (matches Screenshot 5)
│   └── page.tsx                              # Root route redirecting immediately to /students
│
├── components/
│   ├── departments/
│   │   ├── DepartmentCard.tsx                # Department card with stats and navigation link
│   │   └── SpecializationStudentCard.tsx     # Student card used in the specialization view
│   ├── layout/
│   │   ├── Footer.tsx                        # Consistent academic informatics footer
│   │   └── Navbar.tsx                        # Client component with active route underline indicator
│   ├── students/
│   │   ├── StudentCard.tsx                   # Individual student card for directory grids
│   │   ├── StudentFilters.tsx                # Client component for search box and department select
│   │   └── StudentGrid.tsx                   # Client component managing filtered student state & pagination
│   └── ui/
│       ├── Avatar.tsx                        # Colored initials avatar container
│       ├── Badge.tsx                         # Department, status, and ID pill badges
│       └── Breadcrumbs.tsx                   # Accessible hierarchical breadcrumb navigation
│
├── data/
│   ├── departments.ts                        # Local dummy dataset for departments and specializations
│   └── students.ts                           # Local dummy dataset for the 8 featured students
│
├── lib/
│   └── helpers.ts                            # Clean data-access layer (getStudentById, getDepartmentBySlug, etc.)
│
└── types/
    └── index.ts                              # TypeScript interfaces (Student, Department, Specialization, Subject)
```

---

## 🗺️ Complete Routing Table

| Route URL | File Path | Route Type | Rendering Strategy | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | Static / Redirect | Server Redirect | Instantly redirects to `/students` via `redirect()`. |
| `/students` | `src/app/(main)/students/page.tsx` | Static | Server Component (SSG) + Client Filtering | Displays the 8 student cards with search input and department dropdown. |
| `/students/[id]` | `src/app/(main)/students/[id]/page.tsx` | Dynamic | Static Site Generation (`generateStaticParams`) | Full profile for a student (e.g., `/students/STU-1042`). |
| `/departments` | `src/app/(main)/departments/page.tsx` | Static | Server Component (SSG) | Lists faculties: Computer Science, Design, Business. |
| `/departments/[slug]` | `src/app/(main)/departments/[slug]/page.tsx` | Dynamic | Static Site Generation (`generateStaticParams`) | Lists a department's specializations and enrolled students. |
| `/departments/[slug]/[specialization]` | `src/app/(main)/departments/[slug]/[specialization]/page.tsx` | Nested Dynamic | Static Site Generation (`generateStaticParams`) | Specialization track detail (e.g. Web Development) and students list. |
| `/about` | `src/app/(main)/about/page.tsx` | Static | Server Component (SSG) | Information about the Campus Directory architecture and mission. |
| `/directory/[...slug]` | `src/app/(main)/directory/[...slug]/page.tsx` | Catch-All | Server Component | Inspects multiple path segments to redirect to the proper view or trigger `notFound()`. |
| `/help/[[...slug]]` | `src/app/(main)/help/[[...slug]]/page.tsx` | Optional Catch-All | Server Component | Handles both `/help` (index) and nested guides like `/help/search`. |
| *(Any invalid path)* | `src/app/not-found.tsx` | 404 | Server Component | Global 404 matching Screenshot 5 with suggested starting points. |

---

## 💡 Key Architectural Concepts Explained

### 1. Route Groups `(main)`
Folder names wrapped in parentheses like `(main)` create a **Route Group**.
- **What it does**: It groups routes logically without adding `/(main)` into the URL.
- **Why we use it**: It lets all core pages (`/students`, `/departments`, `/about`, `/help`) share a common `layout.tsx` (Navbar + Footer) while keeping the root `layout.tsx` lean.

### 2. Server Components vs. Client Components
In Next.js App Router, every component is a **Server Component** by default.
- **Server Components** (`StudentCard.tsx`, `DepartmentCard.tsx`, `page.tsx`):
  - Execute only on the server.
  - Zero JavaScript shipped to the browser for these components.
  - Safe for async data queries and static pre-rendering.
- **Client Components** (`"use client"`):
  - We use `"use client"` **only** where browser interactivity is strictly required:
    1. `src/components/layout/Navbar.tsx`: Uses `usePathname()` to highlight the currently active navigation tab with a blue underline.
    2. `src/components/students/StudentFilters.tsx`: Handles user typing in the search box and selecting department dropdown options.
    3. `src/components/students/StudentGrid.tsx`: Manages immediate, reactive client filtering without page reloads.
    4. `src/app/(main)/error.tsx`: Catch runtime errors and provide a "Try again" button that resets the error boundary.

### 3. Static Site Generation (SSG) & `dynamicParams = false`
All dynamic routes (`/students/[id]`, `/departments/[slug]`, and `/departments/[slug]/[specialization]`) implement `generateStaticParams()`:
```tsx
export function generateStaticParams() {
  return getAllStudentIds().map((id) => ({ id }));
}

export const dynamicParams = false;
```
- **Why set `dynamicParams = false`?**
  Setting `dynamicParams = false` instructs Next.js that **only** the paths generated by `generateStaticParams` are valid. If a user tries to access an unlisted ID (such as `/students/STU-9999`), Next.js immediately serves a 404 response without wasting server resources attempting an on-demand runtime render.

### 4. Next.js 16 Asynchronous `params`
In Next.js 15+ and 16, route parameters (`params`) and `searchParams` are delivered as **Promises**:
```tsx
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Must await params in Next.js 16!
  const student = await getStudentById(id);
  // ...
}
```

### 5. Demonstrating `loading.tsx` with Simulated Latency
To make `loading.tsx` observable in development:
- We added a deliberate **500ms delay** inside `getAllStudents()` in `src/lib/helpers.ts`.
- When navigating to `/students`, Next.js immediately streams the skeleton cards from `loading.tsx` while waiting for the data promise to resolve, providing a smooth visual transition.
- *(Note: In real production applications with a live database, this artificial delay is omitted).*

### 6. Catch-All (`[...slug]`) vs Optional Catch-All (`[[...slug]]`)
- **`[...slug]` (Single Bracket)**:
  - Requires **at least one** path segment (e.g. `/directory/students/STU-1042`).
  - Accessing `/directory` directly would trigger a 404 unless a separate `page.tsx` exists.
- **`[[...slug]]` (Double Bracket)**:
  - Handles **zero or more** path segments.
  - Both `/help` (slug is `undefined`) and `/help/search` (slug is `["search"]`) are handled seamlessly inside a single `page.tsx` file!

---

## 🎨 UI & Design Fidelity

The UI has been engineered to closely match the provided screenshots:
1. **Student Profile (`/students/STU-1042`)**:
   Matches Screenshot 1 including Aarav Mehta's bio, 4-column metadata, enrolled subjects table (`CS-301`, `CS-340`, `CS-280`), System Record ID (`0948-CS-AM`), and validation date (`Oct 24, 2024`).
2. **Students Directory (`/students`)**:
   Matches Screenshot 2 with search input, department filter, 8 student cards with colored initials avatars and badges, and pagination footer (`Showing X of 8 students`).
3. **Departments Directory (`/departments`)**:
   Matches Screenshot 3 with faculty cards, icons, specialization counts, and student counts.
4. **Specialization View (`/departments/computer-science/web-development`)**:
   Matches Screenshot 4 with track code `CS-SPEC-04`, academic lead Prof. Elena Vance, Turing Hall 408 lab, and the 4 enrolled student cards (`Aarav Mehta`, `Priya Sharma`, `Tariq Al-Mansoor`, `Sophia Müller`).
5. **Not Found View (404)**:
   Matches Screenshot 5 with badge `404 • ROUTE NOT FOUND`, heading `Student or department not found`, primary/secondary action buttons, and a structured `Suggested Starting Points` link card.

---

## 🛠️ Verification & Quality Assurance

Before delivery, the following checks were run:
- [x] `npm run lint` — Zero ESLint errors or warnings.
- [x] `npx tsc --noEmit` — Zero TypeScript compilation errors.
- [x] `npm run build` — Clean production build with all static pages successfully pre-rendered.
- [x] Route testing — All routes verified with HTTP status code and content assertions.
