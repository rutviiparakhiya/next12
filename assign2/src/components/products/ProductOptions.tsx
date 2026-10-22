"use client";
// WHY "use client": Clicking option choices updates a "selected" state and
// recalculates the total price. This requires React state — client component.

import { useState } from "react";
import type { ProductOption } from "@/types";

interface ProductOptionsProps {
  basePrice: number;
  options: ProductOption[];
}

export function ProductOptions({ basePrice, options }: ProductOptionsProps) {
  // Track selected choice id per option key
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    // Default to first choice for each option
    const defaults: Record<string, string> = {};
    for (const opt of options) {
      if (opt.choices.length > 0) {
        defaults[opt.key] = opt.choices[0].id;
      }
    }
    return defaults;
  });

  // Calculate total price including deltas
  const totalPrice = options.reduce((acc, opt) => {
    const selectedId = selections[opt.key];
    const choice = opt.choices.find((c) => c.id === selectedId);
    return acc + (choice?.priceDelta ?? 0);
  }, basePrice);

  function selectChoice(optionKey: string, choiceId: string) {
    setSelections((prev) => ({ ...prev, [optionKey]: choiceId }));
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <span className="text-xs font-semibold text-gray-700">
          Configurable Parameters
        </span>
        <span className="text-xs font-mono text-gray-400">Schema: V2-AUDIO-SPEC</span>
      </div>

      <div className="p-4 space-y-4">
        {options.map((opt, paramIndex) => {
          const selectedId = selections[opt.key];
          const selectedChoice = opt.choices.find((c) => c.id === selectedId);

          return (
            <div key={opt.key}>
              {/* Option header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">
                  Parameter {String(paramIndex + 1).padStart(2, "0")} · {opt.label}
                </span>
                <span className="text-xs font-mono text-blue-500">
                  active_id: &ldquo;{selectedId}&rdquo;
                </span>
              </div>

              {/* Choices */}
              <div className="flex flex-wrap gap-2">
                {opt.choices.map((choice) => {
                  const isSelected = selectedId === choice.id;
                  return (
                    <button
                      key={choice.id}
                      id={`option-${opt.key}-${choice.id}`}
                      onClick={() => selectChoice(opt.key, choice.id)}
                      className={`px-3 py-1.5 text-sm rounded-md border transition-all flex items-center gap-1 ${
                        isSelected
                          ? "bg-white border-blue-500 text-blue-700 shadow-sm"
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {isSelected && (
                        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {choice.label}
                      {choice.priceDelta > 0 && (
                        <span className="text-xs text-gray-400">(+${choice.priceDelta})</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedChoice && selectedChoice.priceDelta > 0 && (
                <p className="text-xs text-gray-400 mt-1">
                  +${selectedChoice.priceDelta} applied to base price
                </p>
              )}
            </div>
          );
        })}

        {/* Updated price */}
        <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
          <span className="text-sm text-gray-500">Configured Price</span>
          <span className="text-lg font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
