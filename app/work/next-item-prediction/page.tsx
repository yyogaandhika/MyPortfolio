import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Code, CheckCircle2, TrendingUp, Cpu, Binary, LineChart } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Study: Next-Category Item Prediction | Yoga Andhika",
  description:
    "Engineering case study of Next-Category Item Prediction, a machine learning classification application forecasting consumer shopping sequences using Scikit-Learn and Python.",
};

export default function NextItemPredictionCaseStudy() {
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
              Machine Learning Case Study
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-mono">
              E-Commerce Predictive Analytics
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-mono">
              Year: 2026
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
            Next-Category Item Prediction – Retail Intelligence
          </h1>

          <p className="text-gray-300 font-sans text-lg md:text-xl leading-relaxed max-w-3xl">
            A supervised machine learning classification system developed in Python and Scikit-Learn to 
            analyze temporal customer transaction records and predict the most probable product category 
            a shopper will purchase in their subsequent checkout session.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a
              href="https://website-prediksi-next-kategori-item.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 bg-accent text-black font-semibold text-sm rounded-full flex items-center gap-2 hover:bg-white transition-colors"
            >
              <span>Explore Live Model</span>
              <ArrowUpRight size={16} />
            </a>
            <a
              href="https://github.com/yyogaandhika/Website-Prediksi-Next-Kategori-Item-Purchase"
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
            src="/NextItemPurchase.png"
            alt="Next-Category Item Prediction Application"
            fill
            sizes="(max-width: 1200px) 100vw, 1100px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div className="text-xs font-mono text-gray-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              Interactive E-Commerce Prediction Dashboard
            </div>
          </div>
        </div>

        {/* Project Meta Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-zinc-950/70 border border-white/10 mb-16">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Role</p>
            <p className="text-sm font-semibold text-white">Machine Learning Engineer</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Domain</p>
            <p className="text-sm font-semibold text-white">Predictive Retail Analytics</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Modeling Stack</p>
            <p className="text-sm font-semibold text-white">Python, Scikit-Learn, Pandas</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Deployment</p>
            <p className="text-sm font-semibold text-white">Cloud Web Runtime (Vercel)</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="flex flex-col gap-16 font-sans">
          
          {/* 1. Context & Problem Statement */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><TrendingUp size={20} /></span>
              <span>The Problem & Context</span>
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4 text-base md:text-lg font-light">
              <p>
                In modern e-commerce, conventional recommendation engines often rely on broad collaborative 
                filtering or static product associations. They fail to exploit chronological order—neglecting 
                what a specific user just purchased and how that purchase shifts their immediate category intent.
              </p>
              <p>
                The objective was to train a predictive classification model capable of analyzing historical 
                basket traits (order sequence, purchase quantity, monetary value, and customer interaction recency) 
                to output accurate next-category recommendations for cross-selling optimization.
              </p>
            </div>
          </section>

          {/* 2. Key Architecture & Features */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><Binary size={20} /></span>
              <span>Key Features & Pipeline</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Sequential Feature Engineering</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Extracted customer historical frequency, category transition matrices, and monetary expenditure 
                  signals to provide rich numeric inputs for the classifiers.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Multi-Class Prediction Output</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Predicts discrete retail product categories with accompanying probability distributions, enabling 
                  merchants to rank product promotions by statistical confidence.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Interactive Parameter Testing</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Allows users and stakeholders to dynamically tweak customer transaction metrics and instantly 
                  observe how algorithmic predictions react in real time.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Lightweight Deployment Footprint</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Optimized serialized pipeline weights to under 45 MB, allowing smooth deployment on standard cloud 
                  web hosting with zero heavy GPU dependencies.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Engineering Decisions & Challenges */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><Cpu size={20} /></span>
              <span>Engineering Decisions & Challenges</span>
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4 text-base md:text-lg font-light">
              <div className="p-6 rounded-2xl bg-zinc-950/60 border border-white/10 space-y-4">
                <div>
                  <h4 className="font-semibold text-white text-base mb-1">Challenge: Highly Imbalanced Retail Transaction Classes</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Certain common product categories dominated 60% of transaction logs while specialized categories 
                    were scarce. Mitigated bias by applying stratified cross-validation, custom class weighting, 
                    and evaluating against macro F1-score rather than raw overall accuracy.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <h4 className="font-semibold text-white text-base mb-1">Decision: Streamlined Pipeline Export via Joblib</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Bundled pre-processing transformers (scalers, encoders) alongside trained estimators into a single 
                    atomic Joblib artifact. This prevents feature drift between offline training and live web inference.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Measurable Outcomes */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><LineChart size={20} /></span>
              <span>Impact & Key Results</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-zinc-950 border border-accent/20">
                <p className="font-display text-3xl md:text-4xl font-bold text-accent mb-2">&lt; 200ms</p>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400">Inference Latency</p>
                <p className="text-xs text-gray-500 mt-2">Ultra-fast classification cycle suitable for real-time checkout prompts.</p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10">
                <p className="font-display text-3xl md:text-4xl font-bold text-white mb-2">Multi-Class</p>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400">Target Taxonomies</p>
                <p className="text-xs text-gray-500 mt-2">Accurately segments next purchases across diverse retail departments.</p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10">
                <p className="font-display text-3xl md:text-4xl font-bold text-white mb-2">100%</p>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400">Pipeline Reproducibility</p>
                <p className="text-xs text-gray-500 mt-2">Atomic pipeline serialization eliminates data pre-processing mismatches.</p>
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
              Hire Me for ML & Web
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
