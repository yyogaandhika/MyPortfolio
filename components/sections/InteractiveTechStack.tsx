"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { techStack, TechItem } from "@/data/skills";

type CategoryFilter = "all" | "frontend" | "ml" | "backend";

export default function InteractiveTechStack() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const filteredTech = activeCategory === "all"
    ? techStack
    : techStack.filter((t) => t.category === activeCategory);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-black border-t border-border overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4 text-white">
          The <span className="text-accent">Arsenal</span>
        </h2>
        <p className="text-gray-400 font-sans text-base md:text-lg max-w-xl mx-auto">
          Pragmatic, production-ready technologies applied across my web applications, client solutions, and machine learning models.
        </p>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {[
            { id: "all", label: "All Skills" },
            { id: "frontend", label: "Frontend & Creative" },
            { id: "ml", label: "Machine Learning & Data" },
            { id: "backend", label: "Backend & APIs" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as CategoryFilter)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-accent text-black shadow-[0_0_20px_rgba(212,255,50,0.3)]"
                  : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative min-h-[40vh] max-w-5xl mx-auto border border-white/10 rounded-3xl p-6 md:p-12 flex flex-wrap justify-center items-center content-center gap-3 md:gap-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/60 to-transparent">
        {filteredTech.map((tech, idx) => (
          <TechBadge key={tech.name} item={tech} index={idx} />
        ))}
      </div>
    </section>
  );
}

function TechBadge({ item, index }: { item: TechItem; index: number }) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!badgeRef.current) return;
    const { left, top, width, height } = badgeRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.4;
    const y = (e.clientY - top - height / 2) * 0.4;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const duration = 2.4 + (index % 5) * 0.4;

  const getCategoryColor = (cat: TechItem["category"]) => {
    switch (cat) {
      case "frontend":
        return "hover:border-accent hover:text-accent hover:shadow-[0_0_25px_rgba(212,255,50,0.25)]";
      case "ml":
        return "hover:border-emerald-400 hover:text-emerald-400 hover:shadow-[0_0_25px_rgba(52,211,153,0.25)]";
      case "backend":
        return "hover:border-sky-400 hover:text-sky-400 hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]";
    }
  };

  return (
    <motion.div
      ref={badgeRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileHover={{ scale: 1.08, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      className="relative cursor-pointer"
    >
      <motion.div
        animate={{
          y: ["-5%", "5%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration,
          ease: "easeInOut",
        }}
        className={`px-5 py-3 md:px-6 md:py-4 rounded-full border border-white/10 bg-zinc-950 text-white font-sans text-xs md:text-sm tracking-widest uppercase transition-colors will-change-transform ${getCategoryColor(
          item.category
        )}`}
      >
        {item.name}
      </motion.div>
    </motion.div>
  );
}
