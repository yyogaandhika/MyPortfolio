"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let current = 0;
    const interval = setInterval(() => {
      const step =
        current < 40
          ? Math.floor(Math.random() * 8) + 4
          : current < 80
          ? Math.floor(Math.random() * 6) + 3
          : Math.floor(Math.random() * 4) + 2;

      current = Math.min(100, current + step);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 350);
      }
    }, 45);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  const getStatusText = () => {
    if (progress < 35) return "INITIALIZING NEXT.JS & GSAP ENGINE...";
    if (progress < 70) return "LOADING 3D WEBGL & PORTFOLIO ASSETS...";
    if (progress < 100) return "SYNCHRONIZING SMOOTH SCROLL...";
    return "SYSTEM READY — WELCOME";
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="site-preloader"
          initial={{ y: "0%" }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[200] bg-black select-none"
        >
          {/* Subtle Architectural Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "4rem 4rem",
            }}
          />

          {/* Ambient Glow */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-accent/10 rounded-full blur-[130px]" />

          <div className="relative z-10 w-full h-full flex flex-col justify-between">
            {/* Top Bar */}
            <div className="flex justify-between items-center w-full p-6">
              <div className="font-display font-bold text-2xl uppercase tracking-tighter text-white">
                Yoga<span className="text-accent">.</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-gray-300">
                  Portfolio v2.0
                </span>
              </div>
            </div>

            {/* Center Brand & Status */}
            <div className="my-auto px-6 md:px-12 lg:px-24 flex flex-col items-start md:items-center md:text-center gap-4">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-accent"
              >
                Mhd. Yoga Andhika — Frontend & Creative Dev
              </motion.p>
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tighter text-white">
                Crafting Digital <span className="text-accent">Experiences.</span>
              </h2>
              <p className="font-mono text-xs text-gray-400 tracking-widest uppercase mt-2">
                {getStatusText()}
              </p>
            </div>

            {/* Bottom Progress Bar & Giant Counter */}
            <div className="w-full px-6 md:px-12 lg:px-24 pb-8 md:pb-10 flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <span className="font-mono text-xs uppercase tracking-widest text-gray-500">
                  Loading Experience
                </span>
                <span className="font-display text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter leading-none text-white">
                  {String(progress).padStart(2, "0")}
                  <span className="text-accent text-4xl sm:text-6xl">%</span>
                </span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent shadow-[0_0_20px_rgba(212,255,50,0.8)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.05 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
