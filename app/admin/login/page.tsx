"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, KeyRound, Loader2, Lock, ShieldCheck } from "lucide-react";
import { loginAdminAction } from "../actions";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginAdminAction(formData);

    if (result.success) {
      router.push("/admin");
      router.refresh();
    } else {
      setErrorMsg(result.message || "Email atau password tidak valid.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col justify-between p-6 md:p-12 relative overflow-hidden select-none">
      {/* Background Grids & Ambient Glows */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px]" />

      {/* Top Header */}
      <div className="relative z-10 flex justify-between items-center w-full max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-accent transition-colors group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-gray-400">
          <ShieldCheck size={13} className="text-accent" />
          <span>Single-Owner Protected</span>
        </div>
      </div>

      {/* Center Login Box */}
      <div className="relative z-10 w-full max-w-md mx-auto my-auto">
        <div className="rounded-3xl border border-white/15 bg-zinc-950/85 backdrop-blur-xl p-8 sm:p-10 shadow-[0_0_60px_rgba(0,0,0,0.8)]">
          <div className="mb-8 text-center">
            <div className="inline-flex p-3 rounded-2xl bg-accent/10 text-accent border border-accent/20 mb-4">
              <Lock size={24} />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
              Admin Workspace
            </h1>
            <p className="font-sans text-xs sm:text-sm text-gray-400 mt-2">
              Masuk untuk mengelola proyek, bio, status ketersediaan, dan keahlian tanpa menyentuh kode.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                Email Owner
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="nama@domain.com"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••••••"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors font-mono"
              />
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-sans">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3.5 px-6 bg-accent text-black font-semibold text-xs uppercase tracking-widest rounded-full hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <KeyRound size={16} />
                  <span>Masuk ke Dashboard</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer Credit */}
      <div className="relative z-10 text-center text-xs font-mono text-gray-600">
        Mhd. Yoga Andhika Portfolio • Content Management System
      </div>
    </div>
  );
}

