"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, FileDown, Sparkles } from "lucide-react";
import { contactDetails } from "@/data/contact";

export default function CallToAction() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactDetails.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${contactDetails.email}`;
    }
  };

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background border-t border-white/10 relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-accent/10 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl p-8 sm:p-12 md:p-16 flex flex-col justify-between gap-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{contactDetails.availability}</span>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-mono text-gray-400">
              <Sparkles size={14} className="text-accent" />
              <span>{contactDetails.location} — Remote & On-Site Ready</span>
            </div>
          </div>

          <div className="max-w-3xl">
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.92] text-white">
              Ready to Build <br />
              <span className="text-accent">Something Impactful?</span>
            </h2>
            <p className="mt-6 text-gray-300 font-sans text-base md:text-lg leading-relaxed max-w-2xl font-light">
              Whether you need an interactive 3D web platform, an enterprise
              analytics dashboard, or a production-ready Machine Learning API,
              let&apos;s turn your vision into clean, scalable software.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-7 py-4 bg-accent text-black font-semibold uppercase tracking-wider text-xs md:text-sm rounded-full hover:bg-white transition-colors flex items-center gap-2"
            >
              <span>Start a Conversation</span>
              <ArrowUpRight size={16} />
            </Link>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-6 py-4 bg-white/5 border border-white/15 text-white font-mono text-xs md:text-sm rounded-full hover:border-accent hover:text-accent transition-colors flex items-center gap-2.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={15} className="text-emerald-400" />
                  <span className="text-emerald-400">
                    Copied: {contactDetails.email}
                  </span>
                </>
              ) : (
                <>
                  <Copy size={15} />
                  <span>{contactDetails.email}</span>
                </>
              )}
            </button>

            <a
              href={contactDetails.cvUrl}
              download="CV_Mhd_Yoga_Andhika.pdf"
              className="px-6 py-4 bg-zinc-900 border border-white/10 text-gray-300 font-semibold uppercase tracking-wider text-xs md:text-sm rounded-full hover:bg-white hover:text-black transition-colors flex items-center gap-2"
            >
              <FileDown size={16} />
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
