// ============================================================
// SpecsTable — renders the "Physical Architecture" specs table.
// Server Component: pure display, no interactivity.
// ============================================================

import type { ProductSpec } from "@/types";

interface SpecsTableProps {
  specs: ProductSpec[];
  title?: string;
}

export function SpecsTable({ specs, title = "Physical Architecture" }: SpecsTableProps) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
          {title}
        </span>
      </div>

      {/* Spec rows */}
      <table className="w-full text-sm">
        <tbody>
          {specs.map((spec, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
              <td className="px-4 py-2.5 text-gray-400 font-medium w-48 text-sm">
                {spec.label}
              </td>
              <td className="px-4 py-2.5 text-gray-800 font-mono text-xs">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
