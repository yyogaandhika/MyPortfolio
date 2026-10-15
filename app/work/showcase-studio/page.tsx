import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Code,
  CheckCircle2,
  Box,
  Layers,
  Sparkles,
  Video,
  Monitor,
  Cpu,
  Palette,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Case Study: Showcase Studio – 3D Mockup Generator | Yoga Andhika",
  description:
    "Engineering case study of Showcase Studio, a browser-based 3D product mockup generator and motion animation suite built with Three.js, React 19, and WebCodecs by Yoga Andhika.",
};

export default function ShowcaseStudioCaseStudy() {
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
              Creative Engineering
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-mono">
              3D WebGL Studio
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-mono">
              Year: 2026
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
            Showcase Studio – 3D Mockup & Showcase Generator
          </h1>

          <p className="text-gray-300 font-sans text-lg md:text-xl leading-relaxed max-w-3xl">
            A production-ready browser-based 3D device mockup generator and animation suite built with Three.js, 
            React 19, and WebCodecs. It enables creators, developers, and design agencies to generate cinematic 
            3D product presentations, animated device reels, and studio-lit visual mockups directly on the web.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a
              href="https://show-case-studio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 bg-accent text-black font-semibold text-sm rounded-full flex items-center gap-2 hover:bg-white transition-colors"
            >
              <span>Launch Live Studio</span>
              <ArrowUpRight size={16} />
            </a>
            <a
              href="https://github.com/yyogaandhika/ShowCase-Studio.git"
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
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-16 bg-zinc-950">
          <Image
            src="/ShowcaseStudio.png"
            alt="Showcase Studio 3D Viewport and Editor Preview"
            fill
            sizes="(max-width: 1200px) 100vw, 1100px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div className="text-xs font-mono text-gray-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              Interactive 3D Viewport • Physically Based Shaders • Timeline Controls
            </div>
          </div>
        </div>

        {/* Project Meta Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-zinc-950/70 border border-white/10 mb-16">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Role</p>
            <p className="text-sm font-semibold text-white">Creator & 3D Engineer</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Domain</p>
            <p className="text-sm font-semibold text-white">WebGL & Creative Dev</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Core Stack</p>
            <p className="text-sm font-semibold text-white">React 19, Three.js, Vite</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Export Engine</p>
            <p className="text-sm font-semibold text-white">WebCodecs & MP4 Muxer</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="flex flex-col gap-16 font-sans">
          
          {/* 1. Context & Problem Statement */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><Box size={20} /></span>
              <span>The Problem & Creative Vision</span>
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4 text-base md:text-lg font-light">
              <p>
                Crafting professional 3D device mockups and cinematic promotional videos for digital products 
                traditionally demands heavy desktop software like Blender, Cinema 4D, or After Effects. For product designers, 
                indie makers, and agencies, this introduces steep licensing costs, high learning curves, and slow render queues.
              </p>
              <p>
                Showcase Studio was engineered to solve this by bringing hardware-accelerated 3D graphics directly 
                into modern web browsers. Users can upload screenshots or screen recordings, place them onto photorealistic 
                3D devices (smartphones, laptops, tablets, watches), customize lighting conditions and camera trajectories, 
                and export studio-grade MP4 videos or GIF mockups instantly without any server render delays.
              </p>
            </div>
          </section>

          {/* 2. Key Architecture & Features */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><Layers size={20} /></span>
              <span>Key Features & Architecture</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Real-Time WebGL 3D Viewport</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Custom Three.js rendering pipeline featuring multi-device chassis (phones, laptops, tablets, watches), 
                  physically based materials (anodized aluminium, matte stealth, glazed ceramic), dynamic soft shadows, and screen reflection shaders.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Cinematic Camera Choreography</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Pre-configured motion sequences including Hero Solo, 360° Orbit, Duo Pairing, Portfolio Tilt, and 
                  Cinematic Drift, powered by an integrated keyframe timeline and smooth cubic Bezier easing.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>In-Browser Video & GIF Exporter</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  High-speed client-side rendering pipeline utilizing modern WebCodecs APIs, WebM Muxer, and MP4 Muxer to 
                  capture frame-by-frame 60 FPS animations with zero cloud processing latency and total data privacy.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col gap-3">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Studio Lighting & Brand Kits</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Multi-point studio lighting presets (Neutral, Neon, Sunset) with customizable color temperature, 
                  ambient occlusion, bloom intensity, and client brand kit palettes with full local persistence.
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
                  <h4 className="font-semibold text-white text-base mb-1">Decision: Client-Side WebCodecs over Cloud FFmpeg Queues</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Rather than transmitting heavy video frames to an expensive server cluster for encoding, Showcase Studio 
                    leverages native WebCodecs hardware encoders directly in modern Chromium engines. This eliminates hosting overhead, 
                    ensures user privacy, and allows instant offline exports.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <h4 className="font-semibold text-white text-base mb-1">Challenge: WebGL Texture Memory & Aspect Ratio Mapping</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    When swapping high-resolution user screenshots and video textures across curved device screens, texture 
                    stretching and GPU VRAM leaks were critical concerns. Implemented dynamic UV re-mapping matrices with 
                    automatic texture downsampling and explicit Three.js geometry disposal upon device switching.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Measurable Outcomes */}
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><Sparkles size={20} /></span>
              <span>Impact & Key Results</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-zinc-950 border border-accent/20">
                <p className="font-display text-3xl md:text-4xl font-bold text-accent mb-2">60 FPS</p>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400">Smooth Rendering</p>
                <p className="text-xs text-gray-500 mt-2">Real-time WebGL frame rates with hardware-accelerated shaders.</p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10">
                <p className="font-display text-3xl md:text-4xl font-bold text-white mb-2">0s</p>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400">Server Render Queue</p>
                <p className="text-xs text-gray-500 mt-2">100% private, client-side video encoding directly inside the browser.</p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10">
                <p className="font-display text-3xl md:text-4xl font-bold text-white mb-2">4+ Formats</p>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400">Export Capabilities</p>
                <p className="text-xs text-gray-500 mt-2">One-click export for MP4 video reels, WebM, animated GIFs, and PNG mockups.</p>
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
