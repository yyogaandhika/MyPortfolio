"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

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
          Hello, I am Mhd. Yoga Andhika
        </p>
      </div>
      
      <div className="overflow-hidden">
        <h1 className="reveal-text font-display text-6xl md:text-8xl lg:text-[10rem] font-bold uppercase leading-[0.85] tracking-tighter text-white">
          Software
        </h1>
      </div>
      <div className="overflow-hidden">
        <h1 className="reveal-text font-display text-6xl md:text-8xl lg:text-[10rem] font-bold uppercase leading-[0.85] tracking-tighter text-white">
          Engineer<span className="text-accent">.</span>
        </h1>
      </div>

      <div className="mt-12 overflow-hidden max-w-2xl">
        <p className="reveal-text font-sans text-gray-400 text-lg md:text-2xl leading-relaxed font-light">
          Crafting high-end web experiences that bridge the gap between aesthetics and deep technical architecture.
        </p>
      </div>

      <div className="absolute bottom-12 right-6 md:right-12 font-sans text-xs md:text-sm text-gray-500 overflow-hidden flex items-center gap-2">
        <span className="text-accent font-bold animate-pulse">{">_"}</span>
        <div className="overflow-hidden whitespace-nowrap border-r-2 border-accent animate-typing">
          system.init(&quot;premium_portfolio&quot;)
        </div>
      </div>
    </section>
  );
}
