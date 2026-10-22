"use client";
// WHY "use client": This form manages preferences state via context
// and reads/writes localStorage. Both require a client component.

import { usePreferences } from "@/context/PreferencesContext";
import type { ViewDensity, PlaceholderStyle, SortOption } from "@/context/PreferencesContext";
import type { Currency } from "@/lib/format";

export function PreferencesForm() {
  const { prefs, setPrefs, savePrefs, resetPrefs, saved } = usePreferences();

  // Helper to update a single preference field
  function update<K extends keyof typeof prefs>(key: K, value: typeof prefs[K]) {
    setPrefs({ ...prefs, [key]: value });
  }

  return (
    <div className="space-y-6">
      {/* ---- Display Preferences ---- */}
      <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            {/* Monitor icon */}
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth={1.5} />
              <path strokeLinecap="round" strokeWidth={1.5} d="M8 21h8M12 17v4" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">Display Preferences</span>
          </div>
          <span className="text-xs font-mono text-gray-400">01_DISPLAY_UI</span>
        </div>

        <div className="divide-y divide-gray-100">
          {/* Catalog view density */}
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-medium text-gray-800">Catalog view density</p>
              <p className="text-xs text-gray-400 mt-0.5">Adjust vertical spacing and padding in matrix product listings.</p>
            </div>
            <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
              {(["comfortable", "compact"] as ViewDensity[]).map((d) => (
                <button
                  key={d}
                  id={`density-${d}`}
                  onClick={() => update("density", d)}
                  className={`px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                    prefs.density === d
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Currency display */}
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-medium text-gray-800">Currency display</p>
              <p className="text-xs text-gray-400 mt-0.5">Formatting token applied to tabular catalog price displays.</p>
            </div>
            <select
              id="currency-select"
              value={prefs.currency}
              onChange={(e) => update("currency", e.target.value as Currency)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USD">USD ($) - Default</option>
              <option value="EUR">EUR (€)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>

          {/* Image placeholder style */}
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-medium text-gray-800">Image placeholder style</p>
              <p className="text-xs text-gray-400 mt-0.5">Fallback visual rendering for catalog assets in development state.</p>
            </div>
            <select
              id="placeholder-select"
              value={prefs.placeholderStyle}
              onChange={(e) => update("placeholderStyle", e.target.value as PlaceholderStyle)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="wireframe">Neutral Monospace Wireframe</option>
              <option value="minimal">Minimal (SVG only)</option>
            </select>
          </div>
        </div>
      </section>

      {/* ---- Catalog Simulation Settings ---- */}
      <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            {/* Settings icon */}
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
            </svg>
            <span className="text-sm font-semibold text-gray-700">Catalog Simulation Settings</span>
          </div>
          <span className="text-xs font-mono text-gray-400">02_SIM_RUNTIME</span>
        </div>

        <div className="divide-y divide-gray-100">
          {/* Simulate inventory latency */}
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-medium text-gray-800">Simulate inventory latency</p>
              <p className="text-xs text-gray-400 mt-0.5">Applies synthetic 240ms delay to dynamic stock verification queries.</p>
            </div>
            <ToggleSwitch
              id="toggle-latency"
              checked={prefs.simulateLatency}
              onChange={(v) => update("simulateLatency", v)}
            />
          </div>

          {/* Show diagnostic badges */}
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-medium text-gray-800">Show dynamic route diagnostic badges</p>
              <p className="text-xs text-gray-400 mt-0.5">Renders route anatomy parameters atop product tiles for inspection.</p>
            </div>
            <ToggleSwitch
              id="toggle-badges"
              checked={prefs.showDiagnosticBadges}
              onChange={(v) => update("showDiagnosticBadges", v)}
            />
          </div>

          {/* Default product sort */}
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-medium text-gray-800">Default product sort</p>
              <p className="text-xs text-gray-400 mt-0.5">Initial order applied to the untouched 8-column matrix index.</p>
            </div>
            <select
              id="default-sort-select"
              value={prefs.defaultSort}
              onChange={(e) => update("defaultSort", e.target.value as SortOption)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name-asc">Name A–Z</option>
            </select>
          </div>
        </div>
      </section>

      {/* ---- Session Environment Info ---- */}
      <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            {/* Info icon */}
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
              <path strokeLinecap="round" strokeWidth={1.5} d="M12 8h.01M12 11v5" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">Session Environment Info</span>
          </div>
          <span className="text-xs font-mono text-gray-400">03_METADATA</span>
        </div>

        <div className="divide-y divide-gray-100">
          {[
            { label: "Route group identifier", value: "(account)" },
            { label: "Rendering strategy", value: "Static Server Component layout with Client Component toggle islands" },
            { label: "Persistence model", value: "Ephemeral localStorage simulation" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between px-5 py-3">
              <span className="text-sm text-gray-500">{label}</span>
              <span className="text-xs font-mono text-gray-700 text-right max-w-xs">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Save / Reset buttons ---- */}
      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="text-xs text-green-600 font-medium animate-pulse">
            ✓ Saved successfully
          </span>
        )}
        <button
          id="reset-prefs"
          onClick={resetPrefs}
          className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Reset to Defaults
        </button>
        <button
          id="save-prefs"
          onClick={savePrefs}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}

// ---- Small toggle switch component ----
function ToggleSwitch({
  id,
  checked,
  onChange,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        checked ? "bg-blue-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
