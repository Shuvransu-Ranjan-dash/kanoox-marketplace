'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4">
        <span className="text-2xl font-bold">!</span>
      </div>
      <h2 className="text-2xl font-black text-content-primary mb-2">Something went wrong</h2>
      <p className="text-sm text-content-secondary max-w-md mb-6">
        We encountered an unexpected error loading this page. Please try again or return to the marketplace home.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:bg-brand-hover transition-all shadow-sm active:scale-95"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl border border-border text-content-primary font-semibold text-sm hover:bg-gray-100 transition-all shadow-sm"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
