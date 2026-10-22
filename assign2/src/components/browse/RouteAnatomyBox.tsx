// ============================================================
// RouteAnatomyBox — educational box explaining [[...slug]] routing.
// Server Component.
// ============================================================

export function RouteAnatomyBox() {
  const rows = [
    { url: "/browse", params: "undefined", view: "Root Category Matrix" },
    { url: "/browse/electronics", params: '["electronics"]', view: "Category Product View" },
    { url: "/browse/electronics/audio", params: '["electronics","audio"]', view: "Subcategory View" },
    { url: "/browse/electronics/audio/headphones", params: '["elec","audio","head"]', view: "Filtered Subtree" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">
            Educational Reference
          </span>
        </div>
        <span className="text-sm font-semibold text-gray-800">
          Next.js Route Anatomy:{" "}
          <code className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-blue-600">
            [[...slug]]
          </code>
        </span>
        <span className="text-xs font-mono text-gray-400">
          app/(shop)/browse/[[...slug]]/page.tsx
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Left: table */}
        <div className="p-5 border-r border-gray-100">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-400 border-b border-gray-100">
                <th className="text-left pb-2 font-medium">URL Pattern</th>
                <th className="text-left pb-2 font-medium">Resolved params.slug</th>
                <th className="text-left pb-2 font-medium">Rendered View</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-mono text-blue-600">{row.url}</td>
                  <td className="py-2 font-mono text-gray-600">{row.params}</td>
                  <td className="py-2 text-gray-700">{row.view}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-400 mt-3">
            Double brackets{" "}
            <code className="font-mono bg-gray-100 px-1 rounded">[[...slug]]</code>{" "}
            denote an optional catch-all segment, unlike required catch-all{" "}
            <code className="font-mono bg-gray-100 px-1 rounded">[...slug]</code>. Route
            handles the base taxonomy without requiring a specific page file.
          </p>
        </div>

        {/* Right: code snippet */}
        <div className="p-5">
          <p className="text-xs font-semibold text-gray-500 mb-2">Conditional Render Logic</p>
          <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-xs overflow-auto leading-relaxed">
{`if (!slug) {
  return <TaxonomyOverview />;
}

if (isCategorySlug) {
  return <CategoryProductView slug={slug} />;
}`}
          </pre>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Catalog Depth</span>
              <span className="font-mono text-gray-700">3 Levels Max</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Route Boundary</span>
              <span className="font-mono text-gray-700">Client + Server</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
