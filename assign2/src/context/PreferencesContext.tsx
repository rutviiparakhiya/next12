"use client";
// WHY "use client": Context providers use React state and localStorage,
// which are browser-only APIs. They must be client components.

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { Currency } from "@/lib/format";

// ---- Types ----

export type ViewDensity = "comfortable" | "compact";
export type PlaceholderStyle = "wireframe" | "minimal";
export type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

export interface Preferences {
  density: ViewDensity;
  currency: Currency;
  placeholderStyle: PlaceholderStyle;
  simulateLatency: boolean;
  showDiagnosticBadges: boolean;
  defaultSort: SortOption;
}

const DEFAULT_PREFERENCES: Preferences = {
  density: "comfortable",
  currency: "USD",
  placeholderStyle: "wireframe",
  simulateLatency: true,
  showDiagnosticBadges: true,
  defaultSort: "featured",
};

// ---- Context ----

interface PreferencesContextValue {
  prefs: Preferences;
  setPrefs: (prefs: Preferences) => void;
  savePrefs: () => void;
  resetPrefs: () => void;
  saved: boolean; // true briefly after saving
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

// ---- Provider ----

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefsState] = useState<Preferences>(DEFAULT_PREFERENCES);
  const [saved, setSaved] = useState(false);

  // Load from localStorage on mount.
  // WHY useEffect: localStorage is only available in the browser.
  // Running it inside useEffect prevents hydration mismatches.
  useEffect(() => {
    try {
      const stored = localStorage.getItem("plainshop-prefs");
      if (stored) {
        setPrefsState({ ...DEFAULT_PREFERENCES, ...JSON.parse(stored) });
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const setPrefs = useCallback((newPrefs: Preferences) => {
    setPrefsState(newPrefs);
  }, []);

  const savePrefs = useCallback(() => {
    try {
      localStorage.setItem("plainshop-prefs", JSON.stringify(prefs));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // ignore storage errors
    }
  }, [prefs]);

  const resetPrefs = useCallback(() => {
    setPrefsState(DEFAULT_PREFERENCES);
    try {
      localStorage.removeItem("plainshop-prefs");
    } catch {
      // ignore
    }
  }, []);

  return (
    <PreferencesContext.Provider value={{ prefs, setPrefs, savePrefs, resetPrefs, saved }}>
      {children}
    </PreferencesContext.Provider>
  );
}

// ---- Hook ----

export function usePreferences(): PreferencesContextValue {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error("usePreferences must be used inside <PreferencesProvider>");
  }
  return ctx;
}
