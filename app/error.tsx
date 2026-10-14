"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime exception captured:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-background relative z-10">
      <div className="max-w-md mx-auto flex flex-col items-center">
        <span className="font-mono text-xs text-red-400 uppercase tracking-widest px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
          Runtime Exception
        </span>

        <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4">
          Something went wrong
        </h1>

        <p className="font-sans text-gray-400 text-sm mb-8 leading-relaxed font-light">
          An unexpected error occurred during rendering. You can attempt to re-render the view or navigate back safely.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="py-3 px-6 bg-accent text-black font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-white transition-colors flex items-center gap-2"
          >
            <RotateCcw size={15} />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="py-3 px-6 bg-white/5 border border-white/10 text-white font-semibold text-xs uppercase tracking-wider rounded-full hover:border-accent hover:text-accent transition-colors flex items-center gap-2"
          >
            <Home size={15} />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
