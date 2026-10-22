import React from "react";

/**
 * Avatar Component
 * 
 * Displays student initials inside a colored, rounded container.
 * Beginner tip: We use initials fallback instead of external image dependencies
 * for fast loading and zero external network requests.
 */
interface AvatarProps {
  initials: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  colorClass?: string;
}

export function Avatar({
  initials,
  className = "",
  size = "md",
  colorClass = "bg-blue-100 text-blue-700",
}: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs font-semibold rounded-md",
    md: "w-10 h-10 text-sm font-semibold rounded-lg",
    lg: "w-14 h-14 text-lg font-bold rounded-xl",
  };

  return (
    <div
      className={`inline-flex items-center justify-center select-none shrink-0 ${sizeClasses[size]} ${colorClass} ${className}`}
      aria-label={`Avatar for initials ${initials}`}
    >
      {initials}
    </div>
  );
}
