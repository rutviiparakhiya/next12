// ============================================================
// Root layout — the outermost HTML shell.
// All pages, regardless of route group, share this layout.
// WHY: Next.js requires a root layout in app/. It sets the <html>
// and <body> tags that wrap everything.
// ============================================================

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PreferencesProvider } from "@/context/PreferencesContext";

// Inter is a clean, modern sans-serif — great for product UIs
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// JetBrains Mono for code-like labels (SKUs, monospace elements)
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PlainShop — Product Category Explorer",
    template: "%s | PlainShop",
  },
  description:
    "PlainShop is a beginner-friendly Next.js practice store demonstrating App Router routing concepts: dynamic routes, optional catch-all, route groups, server/client components.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      {/*
        PreferencesProvider wraps all children so any page can read
        user preferences via usePreferences().
        It must live in a Server Component file but the provider itself
        is a client component — this is the standard pattern.
      */}
      <body className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
        <PreferencesProvider>{children}</PreferencesProvider>
      </body>
    </html>
  );
}
