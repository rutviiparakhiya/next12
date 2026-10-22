import Link from "next/link";
import React from "react";
import { Student } from "@/types";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

/**
 * SpecializationStudentCard Component
 * 
 * Server Component tailored for the specialization detail page (Screenshot 4).
 * Highlights the student's year badge, specific track focus, and direct profile link.
 */
interface SpecializationStudentCardProps {
  student: Student;
}

export function SpecializationStudentCard({
  student,
}: SpecializationStudentCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between">
      <div>
        {/* Top Header: Avatar, Name & Year Badge */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar
              initials={student.initials}
              colorClass={student.avatarColor}
              size="md"
            />
            <div>
              <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                {student.name}
              </h4>
              <p className="text-xs font-mono text-slate-500">{student.id}</p>
            </div>
          </div>
          <Badge variant="year">Year {student.yearNumber}</Badge>
        </div>
      </div>

      {/* Bottom Section: Specialization Focus & View Profile Link */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-xs">
        <span className="font-medium text-slate-600 truncate mr-2">
          {student.specializationFocus || student.specialization}
        </span>
        <Link
          href={`/students/${student.id}`}
          className="inline-flex items-center font-medium text-blue-600 hover:text-blue-700 shrink-0 group transition-colors"
        >
          <span>View profile</span>
          <span className="ml-0.5 transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
