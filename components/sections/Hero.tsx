"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { ArrowDown, Mail } from "lucide-react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        yPercent: 130,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2,
      });
    }, container);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={container} 
      className="relative h-screen flex flex-col justify-center items-start px-6 md:px-12 lg:px-24 pt-20"
    >
      <div className="overflow-hidden mb-4">
        <p className="reveal-text font-sans text-accent tracking-widest uppercase text-xs md:text-sm font-semibold">
          Hello, I am Mhd. Yoga Andhika — Frontend & Creative Dev
        </p>
      </div>
      
      <div className="overflow-hidden">
        <h1 className="reveal-text font-display text-6xl md:text-8xl lg:text-[10rem] font-bold uppercase leading-[0.85] tracking-tighter text-white">
          Creative
        </h1>
      </div>
      <div className="overflow-hidden">
        <h1 className="reveal-text font-display text-6xl md:text-8xl lg:text-[10rem] font-bold uppercase leading-[0.85] tracking-tighter text-white">
          Developer<span className="text-accent">.</span>
        </h1>
      </div>

      <div className="mt-8 md:mt-10 overflow-hidden max-w-2xl">
        <p className="reveal-text font-sans text-gray-400 text-lg md:text-2xl leading-relaxed font-light">
          Crafting fluid, interactive web applications with Next.js & GSAP, and bridging thoughtful user interfaces with Machine Learning systems.
        </p>
      </div>

      <div className="mt-8 overflow-hidden flex flex-wrap gap-4">
        <a
          href="#featured-works"
          onClick={(e) => {
            e.preventDefault();
            const target = document.getElementById("featured-works");
            if (!target) return;
            if (window.__lenis) {
              window.__lenis.scrollTo(target, { offset: -40, duration: 1.4 });
            } else {
              target.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="reveal-text px-8 py-3.5 bg-accent text-black font-semibold uppercase tracking-wider text-xs md:text-sm rounded-full hover:bg-white transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span>Explore Works</span>
          <ArrowDown size={16} />
        </a>
        <Link
          href="/contact"
          className="reveal-text px-8 py-3.5 bg-black/50 backdrop-blur-sm border border-white/20 text-white font-semibold uppercase tracking-wider text-xs md:text-sm rounded-full hover:border-accent hover:text-accent transition-colors flex items-center gap-2"
        >
          <Mail size={16} />
          <span>Get In Touch</span>
        </Link>
      </div>

      <div className="absolute bottom-10 right-6 md:right-12 font-sans text-xs md:text-sm text-gray-400 overflow-hidden flex items-center gap-2 bg-zinc-950/80 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-mono text-xs text-gray-300">status: open_for_opportunities</span>
      </div>
    </section>
  );
}
