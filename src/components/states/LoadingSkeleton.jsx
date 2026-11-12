import React from 'react';

export const LoadingSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="h-6 w-64 bg-white/5 rounded-lg" />

      {/* Hero Level Card Skeleton */}
      <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-2xl bg-white/10 flex-shrink-0" />
        <div className="flex-1 w-full space-y-3">
          <div className="h-8 w-48 bg-white/10 rounded-lg" />
          <div className="h-4 w-36 bg-white/5 rounded" />
          <div className="h-3 w-full bg-white/10 rounded-full" />
          <div className="flex justify-between">
            <div className="h-3 w-20 bg-white/5 rounded" />
            <div className="h-3 w-24 bg-white/5 rounded" />
          </div>
        </div>
      </div>

      {/* Boost 3 Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-white/10" />
            <div className="h-3 w-24 bg-white/5 rounded" />
            <div className="h-5 w-16 bg-white/10 rounded" />
          </div>
        ))}
      </div>

      {/* Roadmap Skeleton */}
      <div className="p-5 rounded-3xl bg-white/5 border border-white/5 space-y-4">
        <div className="h-5 w-44 bg-white/10 rounded" />
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-24 rounded-2xl bg-white/5" />
          ))}
        </div>
      </div>

      {/* Earn More Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-white/5" />
        ))}
      </div>
    </div>
  );
};
export default LoadingSkeleton;
