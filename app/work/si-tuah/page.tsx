import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Code, CheckCircle2, Layers, Cpu, BarChart3, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Study: SI TUAH – Diskominfo Kota Dumai | Yoga Andhika",
  description:
    "Engineering case study of the Integrated Regional Sectoral Data & Analytics Portal (SI TUAH) developed for the Department of Communication and Informatics (Diskominfo) of Dumai City.",
};

export default function SiTuahCaseStudy() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs md:text-sm font-mono text-gray-400 hover:text-accent transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Works</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono font-semibold uppercase tracking-wider">
              Flagship Case Study
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-mono">
              Client: Diskominfo Kota Dumai
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-mono">
              Year: 2026
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
            SI TUAH – Integrated Regional Sectoral Data & Analytics
          </h1>

          <p className="text-gray-300 font-sans text-lg md:text-xl leading-relaxed max-w-3xl">
            A centralized municipal statistical portal and public visual analytics platform engineered for the 
            Department of Communication and Informatics (Diskominfo) of Dumai City, consolidating 
            cross-sectoral public indicators into interactive, real-time dashboards.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a
              href="https://web-kominfo-seven.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 bg-accent text-black font-semibold text-sm rounded-full flex items-center gap-2 hover:bg-white transition-colors"
            >
              <span>Explore Live Platform</span>
              <ArrowUpRight size={16} />
            </a>
            <a
              href="https://github.com/yyogaandhika/Web-Kominfo.git"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 bg-white/5 border border-white/15 text-white font-semibold text-sm rounded-full flex items-center gap-2 hover:border-accent hover:text-accent transition-colors"
            >
              <Code size={16} />
              <span>Source Repository</span>
            </a>
          </div>
        </div>

        {/* Hero Visual Mockup */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-16 bg-zinc-950">
          <Image
            src="/Kominfo.jpeg"
            alt="SI TUAH Diskominfo Kota Dumai Portal Preview"
            fill
            sizes="(max-width: 1200px) 100vw, 1100px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div className="text-xs font-mono text-gray-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              Production Dashboard • Diskominfo Dumai Sectoral Portal
            </div>
          </div>
        </div>

        {/* Project Meta Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-zinc-950/70 border border-white/10 mb-16">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Role</p>
            <p className="text-sm font-semibold text-white">Frontend Developer</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Target Client</p>
            <p className="text-sm font-semibold text-white">Diskominfo Kota Dumai</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Core Stack</p>
            <p className="text-sm font-semibold text-white">React, Vite, Tailwind CSS</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Analytics</p>
            <p className="text-sm font-semibold text-white">Chart.js & REST API</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="flex flex-col gap-16 font-sans">
          
          {/* 1. Context & Problem Statement */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><Layers size={20} /></span>
              <span>The Problem & Context</span>
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4 text-base md:text-lg font-light">
              <p>
                Regional municipal agencies across Dumai previously managed statistical and sectoral 
                indicators across scattered spreadsheets and disconnected departmental archives. 
                This fragmentation caused latency in strategic policy formulation, hampered inter-agency 
                collaboration, and restricted citizens from conveniently assessing regional developmental statistics.
              </p>
              <p>
                Diskominfo Kota Dumai required an integrated, modern portal that could seamlessly aggregate, 
                categorize, and dynamically visualize data spanning economic development, social welfare, 
                healthcare metrics, regional demographics, and public infrastructure.
              </p>
            </div>
          </section>

          {/* 2. Key Architecture & Features */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><BarChart3 size={20} /></span>
              <span>Key Features & Architecture</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Interactive Sectoral Dashboards</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Dynamic visual charts using Chart.js displaying multi-year trend analysis, demographic 
                  distributions, and cross-sectoral regional health metrics with responsive tooltips.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>High-Performance SPA</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Engineered with React and Vite for near-instant client-side navigation, eliminating 
                  unnecessary full-page reloads and delivering a native app feel across desktop and mobile.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Advanced Data Filtering</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Intuitive search, multi-category taxonomies, and instant pagination allowing officials 
                  and the public to locate granular data records within milliseconds.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Standardized UI Governance</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Tailored design system matching regional branding guidelines with rigorous adherence 
                  to WCAG accessibility standards, readable typography, and contrast harmony.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Engineering Decisions & Technical Challenges */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><Cpu size={20} /></span>
              <span>Engineering Decisions & Challenges</span>
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4 text-base md:text-lg font-light">
              <div className="p-6 rounded-2xl bg-zinc-950/60 border border-white/10 space-y-4">
                <div>
                  <h4 className="font-semibold text-white text-base mb-1">Decision: Vite Bundler over Webpack / CRA</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Opted for Vite with Rollup tree-shaking to keep the production bundle under 350 KB, 
                    ensuring that municipal users with constrained internet connectivity experience swift first-contentful paint.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <h4 className="font-semibold text-white text-base mb-1">Challenge: Rendering Large Multi-Year Datasets</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Some sectoral datasets contained hundreds of metrics per sub-district. Resolved memory 
                    spikes by optimizing React re-renders with memoized charting components and client-side 
                    indexed query structures.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Measurable Outcomes */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><ShieldCheck size={20} /></span>
              <span>Impact & Key Results</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-zinc-950 border border-accent/20">
                <p className="font-display text-3xl md:text-4xl font-bold text-accent mb-2">15+</p>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400">Government Sectors</p>
                <p className="text-xs text-gray-500 mt-2">Consolidated into a unified analytical single source of truth.</p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10">
                <p className="font-display text-3xl md:text-4xl font-bold text-white mb-2">&lt; 1s</p>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400">Query & Chart Latency</p>
                <p className="text-xs text-gray-500 mt-2">Sub-second transitions across high-density statistical views.</p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10">
                <p className="font-display text-3xl md:text-4xl font-bold text-white mb-2">100%</p>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400">Public Transparency</p>
                <p className="text-xs text-gray-500 mt-2">Open access for researchers, citizens, and municipal stakeholders.</p>
              </div>
            </div>
          </section>

          {/* Footer Navigation */}
          <div className="border-t border-white/10 pt-12 flex justify-between items-center">
            <Link
              href="/work"
              className="text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-accent transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={14} />
              <span>Back to Portfolio</span>
            </Link>

            <Link
              href="/contact"
              className="py-3 px-6 bg-accent text-black font-semibold text-xs md:text-sm rounded-full hover:bg-white transition-colors"
            >
              Discuss a Project with Me
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
