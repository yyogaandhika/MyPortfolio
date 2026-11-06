"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, KeyRound, Shield, UserCheck, Users } from "lucide-react";
import { DemoAccount } from "@/types";

export default function DemoAccountsSection({
  accounts,
  loginUrl,
}: {
  accounts: DemoAccount[];
  loginUrl: string;
}) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // Fallback
      console.log("Copy failed", text);
    }
  };

  const getRoleIcon = (role: string) => {
    if (role.toLowerCase().includes("super")) {
      return <Shield className="text-amber-400" size={18} />;
    }
    if (role.toLowerCase().includes("panitia")) {
      return <UserCheck className="text-emerald-400" size={18} />;
    }
    return <Users className="text-sky-400" size={18} />;
  };

  const getRoleBadgeColor = (role: string) => {
    if (role.toLowerCase().includes("super")) {
      return "bg-amber-500/10 text-amber-300 border-amber-500/30";
    }
    if (role.toLowerCase().includes("panitia")) {
      return "bg-emerald-500/10 text-emerald-300 border-emerald-500/30";
    }
    return "bg-sky-500/10 text-sky-300 border-sky-500/30";
  };

  return (
    <div className="rounded-3xl border border-accent/30 bg-gradient-to-b from-zinc-950 via-zinc-950/90 to-zinc-950 p-6 md:p-8 relative overflow-hidden shadow-[0_0_50px_rgba(212,255,50,0.06)]">
      {/* Background Accent Flare */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 bg-accent/10 rounded-full blur-[90px]" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs font-semibold mb-2">
            <KeyRound size={13} />
            <span>Live Interactive Demo Credentials</span>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">
            Akun Testing & Akses Portal Admin
          </h3>
          <p className="text-xs md:text-sm text-gray-400 font-sans mt-1">
            Gunakan akun resmi pengujian di bawah ini untuk menguji hak akses multi-role pada route{" "}
            <code className="text-accent bg-white/5 px-2 py-0.5 rounded font-mono text-xs">/admin</code>.
          </p>
        </div>

        <a
          href={loginUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 py-2.5 px-5 bg-accent text-black font-semibold text-xs md:text-sm rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors cursor-pointer"
        >
          <span>Buka /admin</span>
          <ExternalLink size={14} />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 relative z-10">
        {accounts.map((acc, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/25 transition-all group"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-black/60 border border-white/10">
                    {getRoleIcon(acc.role)}
                  </div>
                  <div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${getRoleBadgeColor(
                        acc.role
                      )}`}
                    >
                      {acc.role}
                    </span>
                  </div>
                </div>
              </div>

              <h4 className="font-display text-base font-bold text-white mb-3">
                {acc.displayName || acc.role}
              </h4>

              {/* Credential Fields */}
              <div className="space-y-2 mb-4 font-mono text-xs">
                {/* Email */}
                <div className="flex items-center justify-between bg-black/50 p-2.5 rounded-xl border border-white/5">
                  <div className="overflow-hidden mr-2">
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">Email</p>
                    <p className="text-gray-200 truncate select-all">{acc.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(acc.email, `email-${idx}`)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors cursor-pointer shrink-0"
                    title="Copy Email"
                    aria-label="Copy Email"
                  >
                    {copiedKey === `email-${idx}` ? (
                      <Check size={14} className="text-emerald-400" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>

                {/* Password */}
                {acc.password && (
                  <div className="flex items-center justify-between bg-black/50 p-2.5 rounded-xl border border-white/5">
                    <div className="overflow-hidden mr-2">
                      <p className="text-[10px] uppercase tracking-wider text-gray-500">Password</p>
                      <p className="text-accent truncate font-semibold select-all">
                        {acc.password}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(acc.password!, `pwd-${idx}`)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors cursor-pointer shrink-0"
                      title="Copy Password"
                      aria-label="Copy Password"
                    >
                      {copiedKey === `pwd-${idx}` ? (
                        <Check size={14} className="text-emerald-400" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Permissions */}
              {acc.permissions && (
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
                    Hak Akses:
                  </p>
                  <p className="text-xs text-gray-300 font-sans leading-relaxed">
                    {acc.permissions}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500">
              <span>Route: {acc.loginRoute || "/admin"}</span>
              <a
                href={loginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-white transition-colors flex items-center gap-1 font-sans font-semibold"
              >
                <span>Login</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

