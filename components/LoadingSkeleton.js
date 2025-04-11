// components/LoadingSkeleton.js
export default function LoadingSkeleton() {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border p-4 rounded-lg animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }