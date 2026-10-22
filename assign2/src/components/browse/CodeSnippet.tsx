// ============================================================
// CodeSnippet — renders a styled code block with a header label.
// Server Component.
// ============================================================

interface CodeSnippetProps {
  title?: string;
  subtitle?: string;
  code: string;
  language?: string;
}

export function CodeSnippet({
  title = "Code Snippet",
  subtitle,
  code,
  language = "typescript",
}: CodeSnippetProps) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200">
        <span className="text-xs font-semibold text-gray-600">{title}</span>
        {subtitle && (
          <span className="text-xs font-mono text-gray-400">{subtitle}</span>
        )}
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 text-xs overflow-auto leading-relaxed">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
