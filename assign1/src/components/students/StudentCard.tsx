import Link from "next/link";
import React from "react";
import { Student } from "@/types";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

/**
 * StudentCard Component
 * 
 * WHY IS THIS A SERVER COMPONENT?
 * - It does not need interactive React state (useState/useEffect) or browser APIs.
 * - It renders pure HTML & CSS on the server, resulting in zero client JavaScript overhead.
 * - Navigation is handled with next/link which pre-fetches the student profile.
 */
interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all duration-150 flex flex-col justify-between">
      <div>
        {/* Top Header: Avatar & Student ID */}
        <div className="flex items-center justify-between">
          <Avatar
            initials={student.initials}
            colorClass={student.avatarColor}
            size="md"
          />
          <Badge variant="id">{student.id}</Badge>
        </div>

        {/* Student Name */}
        <h3 className="text-base font-bold text-slate-900 mt-4 mb-2 tracking-tight">
          {student.name}
        </h3>

        {/* Department Badge and Study Year */}
        <div className="flex items-center flex-wrap gap-2 text-sm text-slate-600 mb-4">
          <Badge variant="department" departmentName={student.department}>
            {student.department}
          </Badge>
          <span className="text-sm text-slate-500">{student.year.includes("(") ? student.year.split(" ")[0] + " Year" : student.year}</span>
        </div>
      </div>

      {/* Card Footer Link */}
      <div className="pt-3 border-t border-slate-100 mt-2">
        <Link
          href={`/students/${student.id}`}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 group transition-colors"
        >
          <span>View profile</span>
          <span className="ml-1 transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
