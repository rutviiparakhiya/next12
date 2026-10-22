// Product detail loading skeleton

export default function ProductDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-80 mb-6" />
      <div className="h-4 bg-gray-100 rounded w-48 mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: gallery skeleton */}
        <div className="space-y-3">
          <div className="h-64 bg-gray-200 rounded-xl" />
          <div className="flex gap-2">
            <div className="flex-1 h-20 bg-gray-100 rounded-lg" />
            <div className="flex-1 h-20 bg-gray-100 rounded-lg" />
            <div className="flex-1 h-20 bg-gray-100 rounded-lg" />
          </div>
          <div className="h-40 bg-gray-100 rounded-xl" />
        </div>

        {/* Right: info skeleton */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded-full w-28" />
            <div className="h-6 bg-gray-100 rounded-full w-24" />
          </div>
          <div className="h-8 bg-gray-200 rounded w-64" />
          <div className="h-10 bg-gray-200 rounded w-32" />
          <div className="flex gap-2">
            <div className="h-6 bg-gray-100 rounded-full w-36" />
            <div className="h-6 bg-gray-100 rounded-full w-44" />
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-100 rounded w-full" />
            <div className="h-3 bg-gray-100 rounded w-5/6" />
            <div className="h-3 bg-gray-100 rounded w-4/6" />
          </div>
          <div className="h-48 bg-gray-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
