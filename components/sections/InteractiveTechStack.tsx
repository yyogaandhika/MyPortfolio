"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

const technologies = [
  "React", "Next.js", "TypeScript", "GSAP", "Framer Motion", "Tailwind CSS", 
  "Node.js", "WebGL", "Three.js", "PostgreSQL", "Prisma", "GraphQL"
];

export default function InteractiveTechStack() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-black border-t border-border overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6 text-white">
          The <span className="text-accent">Arsenal</span>
        </h2>
        <p className="text-gray-400 font-sans text-lg">
          Not just icons on a screen. Hover over these technologies to see them react.
        </p>
      </div>

      <div className="relative h-[60vh] max-w-5xl mx-auto border border-white/10 rounded-3xl p-8 flex flex-wrap justify-center items-center content-center gap-4 md:gap-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 to-transparent">
        {technologies.map((tech, idx) => (
          <TechBadge key={idx} name={tech} />
        ))}
      </div>
    </section>
  );
}

function TechBadge({ name }: { name: string }) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!badgeRef.current) return;
    const { left, top, width, height } = badgeRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.5; // magnet strength
    const y = (e.clientY - top - height / 2) * 0.5;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={badgeRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileHover={{ scale: 1.1, zIndex: 10 }}
      className="relative cursor-pointer"
    >
      {/* Floating animation wrapper */}
      <motion.div
        animate={{
          y: ["-5%", "5%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: Math.random() * 2 + 2, // random duration between 2-4s
          ease: "easeInOut",
        }}
        className="px-6 py-4 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white font-sans text-sm md:text-base tracking-widest uppercase hover:border-accent hover:text-accent hover:shadow-[0_0_30px_rgba(212,255,50,0.3)] transition-colors"
      >
        {name}
      </motion.div>
    </motion.div>
  );
}
