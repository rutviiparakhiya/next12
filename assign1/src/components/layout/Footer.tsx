import React from "react";

/**
 * Footer Component
 * 
 * Server Component providing consistent footer branding and metadata across pages.
 */
interface FooterProps {
  leftText?: string;
  rightText?: string;
  className?: string;
}

export function Footer({
  leftText = "Campus Directory © Academic Informatics Core",
  rightText = "Curriculum Year 2024–2025",
  className = "",
}: FooterProps) {
  return (
    <footer
      className={`w-full border-t border-slate-200 bg-white py-6 mt-auto text-xs text-slate-500 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>{leftText}</p>
        <div className="flex items-center space-x-2">
          <span>{rightText}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
        </div>
      </div>
    </footer>
  );
}
