// Browse page loading skeleton

export default function BrowseLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-64 mb-3" />
      <div className="h-4 bg-gray-100 rounded w-96 mb-8" />

      {/* Quick path skeleton */}
      <div className="h-16 bg-gray-100 rounded-xl mb-8" />

      {/* Category cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
            <div className="flex justify-between">
              <div className="h-5 bg-gray-200 rounded w-32" />
              <div className="h-5 bg-gray-100 rounded w-16" />
            </div>
            <div className="h-3 bg-gray-100 rounded w-full" />
            <div className="h-3 bg-gray-100 rounded w-4/5" />
            <div className="flex gap-2 mt-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-5 bg-gray-100 rounded-full w-16" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
