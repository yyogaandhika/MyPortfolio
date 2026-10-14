import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Code, CheckCircle2, Server, Terminal, Shield, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Study: Product ML API & Dashboard | Yoga Andhika",
  description:
    "Engineering case study of Product ML API & Dashboard, a high-throughput Python REST API microservice and interactive frontend dashboard by Yoga Andhika.",
};

export default function ProductMlApiCaseStudy() {
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
              Backend & ML System
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-mono">
              Microservice Architecture
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-mono">
              Year: 2025 - 2026
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
            Product ML API & Live Telemetry Dashboard
          </h1>

          <p className="text-gray-300 font-sans text-lg md:text-xl leading-relaxed max-w-3xl">
            A production-ready machine learning REST API microservice architected in Python (Flask / FastAPI) 
            paired with an interactive React frontend dashboard, providing automated product classification, 
            schema-validated payload parsing, and low-latency inference telemetry.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a
              href="https://product-ml-api.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 bg-accent text-black font-semibold text-sm rounded-full flex items-center gap-2 hover:bg-white transition-colors"
            >
              <span>Explore Live Dashboard</span>
              <ArrowUpRight size={16} />
            </a>
            <a
              href="https://github.com/yyogaandhika/product_ml_api.git"
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
            src="/Apiproduct.png"
            alt="Product ML API Dashboard Preview"
            fill
            sizes="(max-width: 1200px) 100vw, 1100px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div className="text-xs font-mono text-gray-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              RESTful ML Telemetry & Prediction Dashboard
            </div>
          </div>
        </div>

        {/* Project Meta Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-zinc-950/70 border border-white/10 mb-16">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Role</p>
            <p className="text-sm font-semibold text-white">Backend & ML Developer</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Domain</p>
            <p className="text-sm font-semibold text-white">RESTful API & Model Serving</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Backend Stack</p>
            <p className="text-sm font-semibold text-white">Python, Flask / FastAPI, CORS</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Frontend Stack</p>
            <p className="text-sm font-semibold text-white">React, Tailwind CSS, REST Client</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="flex flex-col gap-16 font-sans">
          
          {/* 1. Context & Problem Statement */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><Server size={20} /></span>
              <span>The Problem & Context</span>
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4 text-base md:text-lg font-light">
              <p>
                In academic data science curricula, machine learning models are typically isolated inside 
                static Jupyter Notebooks. Without a clean, documented HTTP interface and an intuitive user-facing 
                dashboard, non-technical team members and external client applications cannot utilize the model.
              </p>
              <p>
                The challenge was to engineer an end-to-end full-stack bridge: packaging an algorithmic product 
                classifier behind performant JSON endpoints with comprehensive request sanitization, and attaching 
                an interactive web dashboard for real-time inference visualization.
              </p>
            </div>
          </section>

          {/* 2. Key Architecture & Features */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><Terminal size={20} /></span>
              <span>Key Features & Architecture</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Decoupled REST API Endpoints</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Standardized JSON request and response contracts supporting automated inference queries, 
                  health-check endpoints, and server status monitoring.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Interactive Telemetry Dashboard</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  React web client allowing manual feature injection, visual classification results, and 
                  instant display of prediction probability ratings.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Strict Request Schema Validation</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Rigorous input sanitization returning descriptive 422 Unprocessable Entity responses 
                  whenever client payloads lack necessary numerical or categorical features.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>CORS & Network Security</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Configured Cross-Origin Resource Sharing (CORS) security headers to safely permit authorized 
                  web frontends while guarding backend compute resources against unsolicited requests.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Engineering Decisions & Challenges */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><Shield size={20} /></span>
              <span>Engineering Decisions & Challenges</span>
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4 text-base md:text-lg font-light">
              <div className="p-6 rounded-2xl bg-zinc-950/60 border border-white/10 space-y-4">
                <div>
                  <h4 className="font-semibold text-white text-base mb-1">Challenge: Managing Cold-Start Inference Overhead</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Python scientific libraries (NumPy, Scikit-Learn) introduce memory and load-time overhead upon 
                    cold starts. Resolved by pre-warming model artifacts in global application memory upon server 
                    initialization, eliminating repeated disk I/O on subsequent inference requests.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <h4 className="font-semibold text-white text-base mb-1">Decision: Stateless Architecture for Scalability</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Designed all prediction routes to be entirely stateless. Any worker instance can immediately 
                    process any incoming payload without depending on shared session state.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Measurable Outcomes */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><Activity size={20} /></span>
              <span>Impact & Key Results</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-zinc-950 border border-accent/20">
                <p className="font-display text-3xl md:text-4xl font-bold text-accent mb-2">&lt; 150ms</p>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400">Response Latency</p>
                <p className="text-xs text-gray-500 mt-2">Rapid inference turnaround across client HTTP POST requests.</p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10">
                <p className="font-display text-3xl md:text-4xl font-bold text-white mb-2">100%</p>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400">Payload Coverage</p>
                <p className="text-xs text-gray-500 mt-2">Total input sanitization preventing application crashes on bad data.</p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10">
                <p className="font-display text-3xl md:text-4xl font-bold text-white mb-2">Full-Stack</p>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400">System Integration</p>
                <p className="text-xs text-gray-500 mt-2">Seamless real-time bridge between Python ML backend and React frontend.</p>
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
              Collaborate on Systems
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
