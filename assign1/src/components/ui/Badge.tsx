import React from "react";

/**
 * Badge Component
 * 
 * Reusable pill/tag badge for student statuses, IDs, departments, and years.
 */
interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "status" | "id" | "department" | "year" | "outline";
  className?: string;
  departmentName?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
  departmentName,
}: BadgeProps) {
  // If a department name is passed, match department badge color
  if (variant === "department" && departmentName) {
    const dept = departmentName.toLowerCase();
    if (dept.includes("computer") || dept.includes("cs")) {
      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 ${className}`}
        >
          {children}
        </span>
      );
    }
    if (dept.includes("design")) {
      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 ${className}`}
        >
          {children}
        </span>
      );
    }
    if (dept.includes("business")) {
      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 ${className}`}
        >
          {children}
        </span>
      );
    }
  }

  const variantStyles = {
    default: "bg-slate-100 text-slate-700 border border-slate-200",
    id: "bg-slate-100 text-slate-700 font-mono text-xs px-2 py-0.5 rounded border border-slate-200",
    status:
      "bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-0.5 rounded font-medium",
    department:
      "bg-blue-50 text-blue-700 border border-blue-200 text-xs px-2 py-0.5 rounded font-medium",
    year: "bg-slate-100 text-slate-600 border border-slate-200 text-xs px-2 py-0.5 rounded font-medium",
    outline: "bg-white text-slate-700 border border-slate-300 text-xs px-2 py-0.5 rounded",
  };

  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
