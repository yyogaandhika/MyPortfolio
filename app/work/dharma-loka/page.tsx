import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Code,
  CheckCircle2,
  Layers,
  Cpu,
  ShieldCheck,
  GraduationCap,
  Lock,
  Database,
  FileCheck2,
} from "lucide-react";
import CaseStudyFooterNav from "@/components/ui/CaseStudyFooterNav";
import DemoAccountsSection from "@/components/ui/DemoAccountsSection";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Case Study: Sekolah Dharma Loka – Academic & PPDB Portal | Yoga Andhika",
  description:
    "Engineering case study of Sekolah Dharma Loka Pekanbaru digital ecosystem & online student admission (PPDB) portal built with Next.js 15, React 19, Supabase RLS, and Tailwind CSS by Yoga Andhika.",
};

export default function DharmaLokaCaseStudy() {
  const currentProject = projects.find((p) => p.slug === "dharma-loka") || projects[1];

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
              Institutional Case Study
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-mono">
              Client: Yayasan Dharma Loka Pekanbaru
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-mono">
              Year: 2026
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
            Sekolah Dharma Loka – Institutional Ecosystem & Multi-Role PPDB Portal
          </h1>

          <p className="text-gray-300 font-sans text-lg md:text-xl leading-relaxed max-w-3xl">
            A centralized digital institutional ecosystem and online admission (PPDB) platform engineered for 
            Sekolah Dharma Loka Pekanbaru, consolidating four distinct academic units (PG/TK, SD, SMP, SMA) 
            into a unified web portal with strict multi-role Row Level Security (RLS) governance.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a
              href="https://dharma-loka-school-liard.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 bg-accent text-black font-semibold text-sm rounded-full flex items-center gap-2 hover:bg-white transition-colors"
            >
              <span>Explore Live Platform</span>
              <ArrowUpRight size={16} />
            </a>
            <a
              href="https://dharma-loka-school-liard.vercel.app/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 bg-white/10 border border-white/20 text-white font-semibold text-sm rounded-full flex items-center gap-2 hover:bg-white hover:text-black transition-colors"
            >
              <Lock size={16} />
              <span>Admin Login Portal (/admin)</span>
            </a>
            <a
              href="https://github.com/yyogaandhika/dharma-loka-school.git"
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
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-12 bg-zinc-950">
          <Image
            src="/DharmaLoka.png"
            alt="Sekolah Dharma Loka Academic & PPDB Portal Preview"
            fill
            sizes="(max-width: 1200px) 100vw, 1120px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div className="text-xs font-mono text-gray-300 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10">
              Production Release • Sekolah Dharma Loka (PG/TK · SD · SMP · SMA)
            </div>
            <a
              href="https://dharma-loka-school-liard.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-black text-xs font-mono font-bold hover:bg-white transition-colors"
            >
              <span>Visit Site</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Live Testing Credentials Widget */}
        {currentProject.demoAccounts && currentProject.demoAccounts.length > 0 && (
          <div className="mb-16">
            <DemoAccountsSection
              accounts={currentProject.demoAccounts}
              loginUrl="https://dharma-loka-school-liard.vercel.app/admin"
            />
          </div>
        )}

        {/* Project Meta Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-zinc-950/70 border border-white/10 mb-16">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Role</p>
            <p className="text-sm font-semibold text-white">Full-Stack Developer</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Institution</p>
            <p className="text-sm font-semibold text-white">Sekolah Dharma Loka</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Frontend Core</p>
            <p className="text-sm font-semibold text-white">Next.js 15, React 19, TS</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Backend & Auth</p>
            <p className="text-sm font-semibold text-white">Supabase, PostgreSQL & RLS</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="flex flex-col gap-16 font-sans">
          {/* 1. Context & Problem Statement */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent">
                <Layers size={20} />
              </span>
              <span>The Problem & Institutional Context</span>
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4 text-base md:text-lg font-light max-w-4xl">
              <p>
                Sekolah Dharma Loka Pekanbaru is a premier trilingual educational foundation (Indonesian, 
                English, and Mandarin) grounding its curriculum in Buddhist moral values across four distinct 
                institutions: Early Childhood Education (PG/TK), Elementary (SD), Junior High (SMP), and Senior 
                High School (SMA).
              </p>
              <p>
                Prior to this platform, each school unit operated with fragmented manual paper forms, scattered 
                spreadsheets, and disjointed communication channels. The admissions period (PPDB) burdened 
                administrators with time-consuming in-person document verifications, untracked payment transfers, 
                and opaque selection processes for parents registering multiple children across different educational stages.
              </p>
              <p>
                The foundation needed an integrated, highly secure web portal capable of providing an elegant 
                institutional brand presence while powering a comprehensive online PPDB system with granular 
                role-based permission boundaries.
              </p>
            </div>
          </section>

          {/* 2. Key Architecture & Features */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent">
                <GraduationCap size={20} />
              </span>
              <span>Key Features & Multi-Role Architecture</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Hierarchical Multi-Role Access Control</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Configured three distinct administrative tiers via Supabase Auth & PostgreSQL Row Level 
                  Security (RLS): <strong>Super Admin Yayasan</strong> (full control across all 6 modules), 
                  <strong>Admin Unit SD/SMP/SMA</strong> (scoped to unit content & verifications), and 
                  <strong>Panitia PPDB</strong> (admissions verification desk & quota management).
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>End-to-End Online PPDB Pipeline</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  A structured applicant lifecycle from initial registration, dynamic form fields tailoring 
                  kindergarten vs. high school requirements, private document uploads (KK, Akta, Rapor), 
                  to instant bank transfer confirmation and official registration number generation.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Real-Time Verification Desk</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Interactive admissions desk equipped with signed URL document previewers, quick-action status 
                  toggles (Valid, Need Revision, Accepted, Rejected), direct WhatsApp follow-up generation, 
                  and automated registration status audit logs.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Multi-Unit Institutional CMS</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  A custom headless management system allowing school staff to publish academic calendar events, 
                  multimedia campus facilities, student competitions & achievements, and news announcements 
                  filtered by specific educational unit or yayasan-wide.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Engineering Decisions & Technical Challenges */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent">
                <Cpu size={20} />
              </span>
              <span>Engineering Decisions & Challenges</span>
            </h2>

            <div className="text-gray-300 leading-relaxed space-y-4 text-base md:text-lg font-light">
              <div className="p-6 rounded-2xl bg-zinc-950/60 border border-white/10 space-y-6">
                <div>
                  <h4 className="font-semibold text-white text-base mb-1 flex items-center gap-2">
                    <Database size={16} className="text-accent" />
                    <span>Decision: PostgreSQL Row Level Security (RLS) over App-Level Filtering</span>
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Rather than relying solely on client-side routing checks, security policies are enforced 
                    directly inside PostgreSQL tables via Supabase RLS. An Admin Unit SD can never query or mutate 
                    SMP/SMA records even if their client session is tampered with, safeguarding private student 
                    records at the database layer.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <h4 className="font-semibold text-white text-base mb-1 flex items-center gap-2">
                    <FileCheck2 size={16} className="text-accent" />
                    <span>Challenge: Dynamic Data Requirements Across 4 Different School Units</span>
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    PG/TK applications require child developmental milestones and immunization records without a 
                    national student ID (NISN), while SMA applications require Junior High origin data, NISN, 
                    and academic transcripts. Architected a flexible JSON schema validator allowing unit-adaptive 
                    forms while keeping relational admissions integrity intact.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <h4 className="font-semibold text-white text-base mb-1 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-accent" />
                    <span>Decision: Architectural Editorial Monograph & WCAG AA Contrast</span>
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Formulated an intentional institutional palette (Warm Alabaster Paper, Dharma Indigo, 
                    Bodhi Verdigris, and Saffron Terra) with 100% verified WCAG AA ratios (ranging from 5.79:1 
                    to 16.68:1), rejecting generic AI-template layouts in favor of an authoritative academic ledger.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Measurable Outcomes & Key Results */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent">
                <ShieldCheck size={20} />
              </span>
              <span>Impact & Key Results</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-zinc-950 border border-accent/20">
                <p className="font-display text-3xl md:text-4xl font-bold text-accent mb-2">4 Units</p>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400">Integrated Levels</p>
                <p className="text-xs text-gray-500 mt-2">
                  Unified PG/TK, SD, SMP, and SMA under one synchronized digital platform.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10">
                <p className="font-display text-3xl md:text-4xl font-bold text-white mb-2">100%</p>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400">Digital Workflow</p>
                <p className="text-xs text-gray-500 mt-2">
                  Eliminated manual paperwork with encrypted private cloud document uploads.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10">
                <p className="font-display text-3xl md:text-4xl font-bold text-white mb-2">3 Tiers</p>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400">Role-Based Security</p>
                <p className="text-xs text-gray-500 mt-2">
                  Strict isolation between Foundation Super Admins, Unit Admins, and Panitia PPDB.
                </p>
              </div>
            </div>
          </section>

          {/* Case Study Footer Navigation */}
          <CaseStudyFooterNav currentSlug="dharma-loka" />
        </div>
      </div>
    </main>
  );
}

