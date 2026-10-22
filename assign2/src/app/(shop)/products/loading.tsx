// Products listing skeleton while data loads
// This file is automatically shown by Next.js during loading.

export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Title skeleton */}
      <div className="h-8 bg-gray-200 rounded w-32 mb-3" />
      <div className="h-4 bg-gray-100 rounded w-80 mb-6" />

      {/* Filter skeleton */}
      <div className="h-24 bg-gray-100 rounded-lg mb-6" />

      {/* Grid skeleton — 8 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="h-44 bg-gray-100" />
            <div className="p-4 space-y-2">
              <div className="h-3 bg-gray-100 rounded w-24" />
              <div className="h-4 bg-gray-200 rounded w-36" />
              <div className="h-3 bg-gray-100 rounded w-28" />
              <div className="flex justify-between mt-3">
                <div className="h-4 bg-gray-200 rounded w-16" />
                <div className="h-4 bg-gray-100 rounded w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
