// ============================================================
// ProductImage — a placeholder component that shows a wireframe
// box when the real image file is missing.
// WHY: No external image URLs are allowed and real photos are not
// available. This placeholder lets us keep image paths in the data
// so real images can be dropped into /public later.
// ============================================================

interface ProductImageProps {
  src: string;       // the image path (e.g. /products/foo.jpg)
  alt: string;
  sku: string;       // shown in the placeholder label
  label?: string;    // optional extra label (e.g. "Front", "Folded")
  className?: string;
}

export function ProductImage({ alt, sku, label, className = "" }: ProductImageProps) {
  // We always show the wireframe placeholder.
  // To use a real image later, replace this with next/image <Image />.
  return (
    <div
      className={`bg-gray-100 flex flex-col items-center justify-center rounded-lg ${className}`}
      aria-label={alt}
      role="img"
    >
      {/* Simple wireframe SVG icon */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        className="text-gray-300 mb-2"
      >
        <rect x="2" y="2" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 26l8-8 6 6 4-4 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-xs font-mono text-gray-400">{sku}</span>
      {label && <span className="text-xs text-gray-400 mt-0.5">{label}</span>}
    </div>
  );
}
