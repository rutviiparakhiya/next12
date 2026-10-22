"use client";
// WHY "use client": Clicking thumbnails changes the displayed main image
// — that requires local state, so this must be a client component.

import { useState } from "react";
import { ProductImage } from "@/components/products/ProductImage";

interface GalleryImage {
  src: string;
  label: string;
}

interface ProductGalleryProps {
  sku: string;
  name: string;
  images: GalleryImage[]; // e.g. [{src:"/foo.jpg", label:"Front"}, ...]
}

export function ProductGallery({ sku, name, images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  return (
    <div className="flex flex-col gap-3">
      {/* Main image area */}
      <div className="relative">
        {/* "Scale 1:1 Reference" label in top-left */}
        <div className="absolute top-2 left-2 z-10 text-xs font-mono text-gray-400 bg-white/80 border border-gray-200 px-1.5 py-0.5 rounded">
          Scale 1:1 Reference
        </div>

        <ProductImage
          src={active.src}
          alt={`${name} — ${active.label}`}
          sku={sku}
          label={active.label}
          className="w-full h-64 rounded-xl"
        />

        {/* "Ref: WH-100 · Matte Slate Finish" style caption */}
        <div className="mt-1.5 flex items-center justify-between text-xs text-gray-400 font-mono">
          <span>Ref: {sku} · {active.label}</span>
          <span>Aspect 4:3 Raw</span>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            id={`gallery-thumb-${i}`}
            onClick={() => setActiveIndex(i)}
            className={`flex-1 border-2 rounded-lg overflow-hidden transition-all ${
              i === activeIndex
                ? "border-blue-500"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <ProductImage
              src={img.src}
              alt={img.label}
              sku={sku}
              label={img.label}
              className="w-full h-16"
            />
            {/* Thumbnail label */}
            <div className={`text-xs text-center py-0.5 ${i === activeIndex ? "bg-blue-50 text-blue-600" : "text-gray-400"}`}>
              {img.label}
              {i === activeIndex && (
                <span className="ml-1">▪</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
