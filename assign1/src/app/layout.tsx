import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/**
 * Configure Inter font via next/font/google
 * 
 * WHY USE NEXT/FONT?
 * - Automatically optimizes fonts (inlines critical CSS, eliminates layout shift).
 * - Self-hosts font files locally so no third-party Google requests are made at runtime.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Campus Directory",
    default: "Campus Directory - Academic Student & Faculty Portal",
  },
  description:
    "Explore academic departments, specializations, and enrolled student profiles across faculties.",
};

/**
 * Root Layout Component
 * 
 * WHY IS THIS A ROOT LAYOUT?
 * - In Next.js App Router, src/app/layout.tsx is the mandatory top-level layout.
 * - It defines the <html> and <body> tags that wrap all pages across the entire application.
 * - By keeping navbar/footer inside the (main) route group layout, we maintain flexibility
 *   if we ever need pages without standard navigation (like authentication or embed views).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
