"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileDown } from "lucide-react";
import { experiences } from "@/data/experiences";
import { contactDetails } from "@/data/contact";
import { SocialIcon } from "@/components/icons";

export default function AboutContent() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 65%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={container}
      className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Side */}
        <div className="lg:sticky lg:top-32">
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8 fade-up text-white">
            Beyond the <br />
            <span className="text-accent">Code.</span>
          </h1>

          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden fade-up border border-white/10 group shadow-2xl">
            {/* Image */}
            <Image
              src="/yoga2.jpeg"
              alt="Yoga Andhika"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Accent Glow */}
            <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Location & Status Badge */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <p className="font-display font-bold text-white text-base">
                  {contactDetails.name}
                </p>
                <p className="font-mono text-xs text-accent">
                  {contactDetails.location}
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[11px] text-gray-300">
                  {contactDetails.availability}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons & Socials */}
          <div className="mt-8 flex flex-col gap-4 fade-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/contact"
                className="w-full py-3.5 px-6 bg-white text-black font-semibold text-xs uppercase tracking-widest rounded-full text-center hover:bg-accent transition-colors"
              >
                Get In Touch
              </Link>
              <a
                href={contactDetails.cvUrl}
                download="CV_Mhd_Yoga_Andhika.pdf"
                className="w-full py-3.5 px-6 bg-white/5 border border-white/15 text-white font-semibold text-xs uppercase tracking-widest rounded-full text-center hover:bg-accent hover:text-black hover:border-accent transition-colors flex items-center justify-center gap-2"
              >
                <FileDown size={15} />
                <span>Download CV</span>
              </a>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs uppercase tracking-widest text-accent font-semibold font-mono">
                Connect
              </span>
              <div className="flex gap-2">
                {contactDetails.socials.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-black hover:bg-accent hover:border-accent transition-all"
                    title={item.label}
                    aria-label={item.label}
                  >
                    <SocialIcon id={item.id} size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:pt-32 flex flex-col gap-16">
          <div className="fade-up">
            <h3 className="text-accent text-sm tracking-widest uppercase font-semibold mb-4">
              Philosophy
            </h3>
            <p className="font-sans text-xl md:text-2xl font-light text-gray-300 leading-relaxed">
              I believe compelling digital products exist at the intersection of
              solid engineering and purposeful interaction. Rather than building
              static interfaces, I craft web applications that feel fluid,
              responsive, and genuinely enjoyable to use.
            </p>
          </div>

          <div className="fade-up">
            <h3 className="text-accent text-sm tracking-widest uppercase font-semibold mb-4">
              Background
            </h3>
            <p className="font-sans text-base md:text-lg text-gray-400 leading-relaxed">
              Currently pursuing a Bachelor of Applied Science (D4) in
              Informatics Engineering at Politeknik Caltex Riau (GPA 3.21/4.00),
              I specialize in modern frontend engineering using React, Next.js,
              Three.js, and GSAP animations. Alongside frontend craft, I
              actively engineer Machine Learning pipelines, RESTful APIs, and
              AI-integrated web platforms.
            </p>
          </div>

          <div className="fade-up border-t border-border pt-12">
            <h3 className="text-accent text-sm tracking-widest uppercase font-semibold mb-8">
              Experience & Education
            </h3>

            <div className="flex flex-col gap-10">
              {experiences.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-1 group">
                  <div className="flex justify-between items-baseline gap-4">
                    <h4 className="font-display text-xl md:text-2xl font-bold text-white group-hover:text-accent transition-colors">
                      {item.role}
                    </h4>
                    <span className="font-mono text-xs text-accent shrink-0">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-gray-400 font-sans text-sm">
                    {item.company}
                  </p>
                  <p className="text-gray-400 font-sans text-xs md:text-sm mt-2 leading-relaxed">
                    {item.description}
                  </p>
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-2.5 flex flex-col gap-1.5 pl-4 list-disc marker:text-accent/70">
                      {item.highlights.map((point, pIdx) => (
                        <li
                          key={pIdx}
                          className="text-gray-400 font-sans text-xs leading-relaxed"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
