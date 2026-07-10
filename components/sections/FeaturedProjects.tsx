"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { ArrowUpRight, Code } from "lucide-react";

const mockProjects = [
  { id: 1, title: "Fintech Dashboard", category: "React & Node.js", image: "/project1.jpg" },
  { id: 2, title: "E-Commerce Experience", category: "Next.js & GSAP", image: "/project2.jpg" },
  { id: 3, title: "Web3 NFT Marketplace", category: "Solidity & Vue", image: "/project3.jpg" },
];

export default function FeaturedProjects() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale up effect on scroll
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // 3D Tilt effect
    gsap.to(card.querySelector(".card-inner"), {
      rotateY: (x / rect.width) * 20,
      rotateX: -(y / rect.height) * 20,
      duration: 0.5,
      ease: "power2.out",
    });
    
    // Parallax image
    gsap.to(card.querySelector(".parallax-img"), {
      x: (x / rect.width) * 15,
      y: (y / rect.height) * 15,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
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
    <section ref={container} className="py-32 px-6 md:px-12 lg:px-24 bg-background relative z-10">
      <div className="mb-20 flex justify-between items-end">
        <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter">
          Featured <br /><span className="text-gray-500">Works</span>
        </h2>
        <Link href="/work" className="text-accent hover:text-white transition-colors flex items-center gap-2 pb-2 border-b border-accent hover:border-white">
          <span className="uppercase text-sm tracking-widest font-semibold">View All</span>
          <ArrowUpRight size={20} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {mockProjects.map((project, idx) => (
          <div 
            key={project.id} 
            className={`project-card relative cursor-pointer ${idx % 2 !== 0 ? 'md:mt-32' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1000px" }}
          >
            {/* Glowing Hover Effect */}
            <div className="absolute inset-0 bg-accent/20 blur-[50px] opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />
            
            <div className="card-inner w-full aspect-[4/5] overflow-hidden bg-border rounded-xl relative">
              {/* Simulated Image placeholder */}
              <div className="parallax-img absolute inset-[-5%] w-[110%] h-[110%] bg-zinc-800 flex items-center justify-center border border-white/5">
                 <span className="text-zinc-600 font-display text-3xl font-bold uppercase opacity-30">{project.title}</span>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <p className="text-accent font-sans text-xs tracking-widest uppercase mb-2">{project.category}</p>
                <h3 className="font-display text-3xl font-bold text-white mb-6">{project.title}</h3>
                
                <div className="flex gap-4">
                  <button className="flex-1 py-3 px-4 bg-white text-black font-semibold text-sm rounded-full flex justify-center items-center gap-2 hover:bg-accent transition-colors">
                    Live Demo
                  </button>
                  <button className="flex-1 py-3 px-4 bg-black border border-white/20 text-white font-semibold text-sm rounded-full flex justify-center items-center gap-2 hover:border-accent hover:text-accent transition-colors">
                    <Code size={16} /> Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
