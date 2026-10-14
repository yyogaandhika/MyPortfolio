import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-background relative z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-background to-background pointer-events-none" />
      
      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
        <span className="font-mono text-xs text-accent uppercase tracking-widest px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-6">
          Error 404 • Page Not Found
        </span>

        <h1 className="font-display text-7xl md:text-9xl font-bold uppercase tracking-tighter text-white mb-4">
          4<span className="text-accent">0</span>4
        </h1>

        <p className="font-sans text-gray-400 text-base md:text-lg mb-8 leading-relaxed font-light">
          The coordinate you are looking for has been moved, archived, or does not exist in this digital space.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="py-3 px-6 bg-accent text-black font-semibold text-xs md:text-sm uppercase tracking-wider rounded-full hover:bg-white transition-colors flex items-center gap-2"
          >
            <Home size={15} />
            <span>Return Home</span>
          </Link>

          <Link
            href="/work"
            className="py-3 px-6 bg-white/5 border border-white/10 text-white font-semibold text-xs md:text-sm uppercase tracking-wider rounded-full hover:border-accent hover:text-accent transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={15} />
            <span>Explore Works</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
