"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import Link from "next/link";
import { ArrowUpRight, Code } from "lucide-react";

const mockProjects = [
  {
    id: 1,
    title: "EduSummarize Website",
    category: "React & Next.js",
    image: "/Edusummarize.png",
    demoUrl:
      "https://edu-summarize-website-peringkas-pel.vercel.app/",
    codeUrl:
      "https://github.com/yyogaandhika/EduSummarize-Website-Peringkas-Pelajaran-Saints.git",
  },
  {
    id: 2,
    title: "Product ML API",
    category: "React & Node.js",
    image: "/apiProduct.png",
    demoUrl: "https://product-ml-api.vercel.app/",
    codeUrl:
      "https://github.com/yyogaandhika/product_ml_api.git",
  },
];

export default function FeaturedProjects() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card.querySelector(".card-inner"), {
      rotateY: (x / rect.width) * 20,
      rotateX: -(y / rect.height) * 20,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(card.querySelector(".parallax-img"), {
      x: (x / rect.width) * 15,
      y: (y / rect.height) * 15,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const card = e.currentTarget;

    gsap.to(card.querySelector(".card-inner"), {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(card.querySelector(".parallax-img"), {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={container}
      className="py-32 px-6 md:px-12 lg:px-24 bg-background relative z-10"
    >
      <div className="mb-20 flex justify-between items-end">
        <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter">
          Featured <br />
          <span className="text-gray-500">Works</span>
        </h2>

        <Link
          href="/work"
          className="text-accent hover:text-white transition-colors flex items-center gap-2 pb-2 border-b border-accent hover:border-white"
        >
          <span className="uppercase text-sm tracking-widest font-semibold">
            View All
          </span>
          <ArrowUpRight size={20} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {mockProjects.map((project, idx) => (
          <div
            key={project.id}
            className={`project-card relative cursor-pointer ${
              idx % 2 !== 0 ? "md:mt-32" : ""
            }`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1000px" }}
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-accent/20 blur-[50px] opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />

            <div className="card-inner relative w-full aspect-[4/5] overflow-hidden rounded-xl">

              {/* Image */}
              <div className="parallax-img absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority={project.id === 1}
                  className="object-cover"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 flex flex-col justify-end">

                <p className="text-accent text-xs tracking-widest uppercase mb-2">
                  {project.category}
                </p>

                <h3 className="font-display text-3xl font-bold text-white mb-6">
                  {project.title}
                </h3>

                <div className="flex gap-4 relative z-20">

                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-white text-black font-semibold text-sm rounded-full flex justify-center items-center hover:bg-accent transition-colors"
                  >
                    Live Demo
                  </a>

                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-black border border-white/20 text-white font-semibold text-sm rounded-full flex justify-center items-center gap-2 hover:border-accent hover:text-accent transition-colors"
                  >
                    <Code size={16} />
                    Code
                  </a>

                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}