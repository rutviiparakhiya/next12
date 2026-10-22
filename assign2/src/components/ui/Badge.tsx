// ============================================================
// Badge — small pill label used throughout the app.
// A pure presentational component; no state needed.
// ============================================================

import React from "react";

type BadgeVariant =
  | "default"
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "purple"
  | "gray"
  | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700 border border-gray-200",
  blue: "bg-blue-50 text-blue-700 border border-blue-200",
  green: "bg-green-50 text-green-700 border border-green-200",
  yellow: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  red: "bg-red-50 text-red-700 border border-red-200",
  purple: "bg-purple-50 text-purple-700 border border-purple-200",
  gray: "bg-gray-200 text-gray-600 border border-gray-300",
  outline: "bg-white text-gray-600 border border-gray-300",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
