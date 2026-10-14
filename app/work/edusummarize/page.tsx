import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Code, CheckCircle2, BookOpen, Brain, Sparkles, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Study: EduSummarize Platform | Yoga Andhika",
  description:
    "Engineering case study of the EduSummarize AI platform, an intelligent educational science curriculum summarizer built with Next.js, TypeScript, and NLP models.",
};

export default function EduSummarizeCaseStudy() {
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
              AI & EdTech Case Study
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-mono">
              Academic & Research Project
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-mono">
              Year: 2026
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
            EduSummarize – AI Science Curriculum Summarizer
          </h1>

          <p className="text-gray-300 font-sans text-lg md:text-xl leading-relaxed max-w-3xl">
            An intelligent educational web platform engineered to digest dense science textbooks 
            (Biology, Physics) and automatically extract structured, high-retention study notes using 
            natural language processing algorithms paired with a modern Next.js interface.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a
              href="https://edu-summarize-website-peringkas-pel.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 bg-accent text-black font-semibold text-sm rounded-full flex items-center gap-2 hover:bg-white transition-colors"
            >
              <span>Explore Live Platform</span>
              <ArrowUpRight size={16} />
            </a>
            <a
              href="https://github.com/yyogaandhika/EduSummarize-Website-Peringkas-Pelajaran-Saints.git"
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
            src="/Edusummarize.png"
            alt="EduSummarize AI Platform Interface"
            fill
            sizes="(max-width: 1200px) 100vw, 1100px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div className="text-xs font-mono text-gray-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              Interactive AI Note Summarization Interface
            </div>
          </div>
        </div>

        {/* Project Meta Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-zinc-950/70 border border-white/10 mb-16">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Role</p>
            <p className="text-sm font-semibold text-white">Fullstack Developer & AI Integrator</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Category</p>
            <p className="text-sm font-semibold text-white">AI / NLP Educational Tool</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Frontend Stack</p>
            <p className="text-sm font-semibold text-white">Next.js, TypeScript, Tailwind</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Architecture</p>
            <p className="text-sm font-semibold text-white">Decoupled AI Inference Pipeline</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="flex flex-col gap-16 font-sans">
          
          {/* 1. Context & Problem Statement */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><BookOpen size={20} /></span>
              <span>The Problem & Context</span>
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4 text-base md:text-lg font-light">
              <p>
                Secondary school students frequently encounter cognitive overload when attempting to digest 
                voluminous science textbooks. Traditional manual note-taking is time-consuming, prone to missing 
                fundamental concepts, and often leaves students struggling to extract actionable exam revision summaries.
              </p>
              <p>
                The objective was to engineer an intuitive, single-page application where students can paste 
                complex curriculum chapters and instantly receive concise, hierarchical summaries categorized 
                into core definitions, experimental principles, and bullet takeaways.
              </p>
            </div>
          </section>

          {/* 2. Key Architecture & Features */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><Sparkles size={20} /></span>
              <span>Key Features & Architecture</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Automated Key Concept Extraction</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Extracts primary scientific hypotheses, biological classifications, and physics formulas into 
                  structured hierarchical sections rather than unstructured text blobs.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Responsive Single-Page Design</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Engineered using Next.js and Tailwind CSS with a clean, distraction-free reading mode optimized 
                  for both mobile smartphones and desktop study setups.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Instant Clipboard & Export Tooling</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  One-click export allows learners to immediately transfer summarized flashcards into Notion, 
                  digital notebooks, or print-ready study sheets.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Adaptive Study Categories</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Segmented processing filters tailored specifically to biology anatomy, chemistry reactions, 
                  and physics theory formulations.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Engineering Decisions & Challenges */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><Brain size={20} /></span>
              <span>Engineering Decisions & Challenges</span>
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4 text-base md:text-lg font-light">
              <div className="p-6 rounded-2xl bg-zinc-950/60 border border-white/10 space-y-4">
                <div>
                  <h4 className="font-semibold text-white text-base mb-1">Challenge: Managing 4 GB AI Model Weights in Cloud Serverless</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Standard NLP Transformer model checkpoints required upwards of 4 GB of RAM and storage, 
                    far exceeding standard serverless limits (50 MB–250 MB). Resolved by architecting a decoupled 
                    system: keeping the frontend client lightning-fast on Vercel while executing model pipelines 
                    separately via specialized inference servers, supplemented by client-side response caching.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <h4 className="font-semibold text-white text-base mb-1">Decision: Next.js & TypeScript for Reliability</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Strict type safety ensures predictable parsing of API responses, preventing unexpected UI crashes 
                    when handling erratic or non-standard user input documents.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Measurable Outcomes */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><Zap size={20} /></span>
              <span>Impact & Key Results</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-zinc-950 border border-accent/20">
                <p className="font-display text-3xl md:text-4xl font-bold text-accent mb-2">70%</p>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400">Reading Time Saved</p>
                <p className="text-xs text-gray-500 mt-2">Dramatically accelerates textbook review through automated summarization.</p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10">
                <p className="font-display text-3xl md:text-4xl font-bold text-white mb-2">&lt; 2s</p>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400">Client Render Latency</p>
                <p className="text-xs text-gray-500 mt-2">Instantaneous reactive updates across all modern viewport sizes.</p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10">
                <p className="font-display text-3xl md:text-4xl font-bold text-white mb-2">100%</p>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400">Responsive UI</p>
                <p className="text-xs text-gray-500 mt-2">Zero layout shift on mobile, tablet, and desktop monitors.</p>
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
              <span>Back to All Works</span>
            </Link>

            <Link
              href="/contact"
              className="py-3 px-6 bg-accent text-black font-semibold text-xs md:text-sm rounded-full hover:bg-white transition-colors"
            >
              Start a Conversation
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
