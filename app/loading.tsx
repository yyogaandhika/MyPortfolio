export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center pointer-events-none">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-accent animate-spin" />
        <span className="absolute w-2 h-2 rounded-full bg-accent animate-pulse" />
      </div>
      <p className="mt-4 font-mono text-xs text-gray-500 uppercase tracking-widest">
        Loading...
      </p>
    </div>
  );
}
