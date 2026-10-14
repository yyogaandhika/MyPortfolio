"use client";

import { marqueeSkills } from "@/data/skills";

export default function InfiniteMarquee() {
  const items = marqueeSkills;
  
  return (
    <section className="py-16 md:py-24 overflow-hidden border-y border-border bg-black relative">
      <div className="flex whitespace-nowrap group">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center">
              <span className="text-5xl md:text-8xl font-display uppercase font-bold tracking-tighter text-transparent" style={{ WebkitTextStroke: "1px var(--foreground)" }}>
                {item}
              </span>
              <span className="mx-8 md:mx-12 text-accent text-3xl md:text-5xl">*</span>
            </div>
          ))}
        </div>
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] absolute top-0" style={{ left: '100%' }}>
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center">
              <span className="text-5xl md:text-8xl font-display uppercase font-bold tracking-tighter text-transparent" style={{ WebkitTextStroke: "1px var(--foreground)" }}>
                {item}
              </span>
              <span className="mx-8 md:mx-12 text-accent text-3xl md:text-5xl">*</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
