"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight, Code } from "lucide-react";
import { projects } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturedProjects() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const inner = card.querySelector(".card-inner");
    const img = card.querySelector(".parallax-img");

    if (inner) {
      gsap.to(inner, {
        rotateY: (x / rect.width) * 12,
        rotateX: -(y / rect.height) * 12,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    if (img) {
      gsap.to(img, {
        x: (x / rect.width) * 8,
        y: (y / rect.height) * 8,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const card = e.currentTarget;
    const inner = card.querySelector(".card-inner");
    const img = card.querySelector(".parallax-img");

    if (inner) {
      gsap.to(inner, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    if (img) {
      gsap.to(img, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  return (
    <section
      ref={container}
      id="featured-works"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 md:mb-16 flex justify-between items-end">
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter">
            Featured <br />
            <span className="text-gray-500">Works</span>
          </h2>

          <Link
            href="/work"
            className="text-accent hover:text-white transition-colors flex items-center gap-2 pb-2 border-b border-accent hover:border-white"
          >
            <span className="uppercase text-xs md:text-sm tracking-widest font-semibold">
              View All
            </span>
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card relative cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: "1000px" }}
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-accent/20 blur-[40px] opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

              <div className="card-inner relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 group bg-zinc-900">

                {/* Image */}
                <div className="parallax-img absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent p-6 flex flex-col justify-end">
                  
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-accent text-[11px] tracking-widest uppercase font-mono">
                      {project.category}
                    </span>
                    {project.role && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/10">
                        {project.role}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-2 line-clamp-1 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-gray-300 font-sans line-clamp-2 mb-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack pills */}
                  {project.techStack && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900/90 text-gray-300 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2.5 relative z-20">
                    {project.hasCaseStudy && project.slug && (
                      <Link
                        href={`/work/${project.slug}`}
                        className="py-2 px-3.5 bg-accent text-black font-semibold text-xs rounded-full flex items-center gap-1 hover:bg-white transition-colors"
                      >
                        <span>Case Study</span>
                        <ArrowUpRight size={13} />
                      </Link>
                    )}

                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 bg-white/10 border border-white/20 text-white font-semibold text-xs rounded-full flex justify-center items-center hover:bg-white hover:text-black transition-colors"
                    >
                      Live Demo
                    </a>

                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-black/80 border border-white/20 text-white rounded-full flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                      title="View Source Code"
                      aria-label="View Source Code"
                    >
                      <Code size={14} />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}