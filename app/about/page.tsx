"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={container} className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="lg:sticky lg:top-32">
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8 fade-up text-white">
            Beyond the <br/><span className="text-accent">Code.</span>
          </h1>
          <div className="w-full aspect-[4/5] relative bg-zinc-900 rounded-2xl overflow-hidden fade-up border border-white/10 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent group-hover:scale-105 transition-transform duration-1000"></div>
            <div className="absolute bottom-6 left-6 font-mono text-sm text-white/50">
              IMG_4923.RAW
            </div>
          </div>
        </div>

        <div className="lg:pt-32 flex flex-col gap-16">
          <div className="fade-up">
            <h3 className="text-accent text-sm tracking-widest uppercase font-semibold mb-4">Philosophy</h3>
            <p className="font-sans text-xl md:text-3xl font-light text-gray-300 leading-relaxed">
              I believe that premium web experiences exist at the intersection of robust engineering and meticulous design. It&apos;s not enough for an application to just work; it has to feel alive.
            </p>
          </div>
          
          <div className="fade-up">
            <h3 className="text-accent text-sm tracking-widest uppercase font-semibold mb-4">Background</h3>
            <p className="font-sans text-lg text-gray-400 leading-relaxed">
              With a strong foundation in modern JavaScript frameworks (React, Next.js, Vue) and a deep passion for motion design (GSAP, WebGL), I build digital products that leave a lasting impression.
            </p>
          </div>

          <div className="fade-up pt-8 border-t border-white/10">
            <h3 className="text-accent text-sm tracking-widest uppercase font-semibold mb-8">Experience</h3>
            <ul className="flex flex-col gap-8">
              {[
                { role: "Senior Frontend Engineer", company: "Creative Agency", year: "2023 - Present" },
                { role: "Fullstack Developer", company: "Tech Startup", year: "2021 - 2023" },
                { role: "Web Developer", company: "Freelance", year: "2019 - 2021" },
              ].map((job, idx) => (
                <li key={idx} className="flex justify-between items-baseline border-b border-white/5 pb-4">
                  <div>
                    <h4 className="text-xl font-display font-semibold text-white">{job.role}</h4>
                    <p className="text-gray-500 font-sans">{job.company}</p>
                  </div>
                  <span className="text-sm font-mono text-accent">{job.year}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
