"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      // Use gsap.quickTo for instant 60-144fps mouse tracking without GC churn
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power2.out" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power2.out" });

      const onMouseMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      const onMouseEnter = () => {
        gsap.to(cursor, {
          scale: 2.2,
          backgroundColor: "transparent",
          borderColor: "var(--accent)",
          borderWidth: "1.5px",
          duration: 0.2,
          overwrite: "auto",
        });
      };

      const onMouseLeave = () => {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "var(--accent)",
          borderColor: "transparent",
          borderWidth: "0px",
          duration: 0.2,
          overwrite: "auto",
        });
      };

      window.addEventListener("mousemove", onMouseMove, { passive: true });

      // High-performance event delegation instead of MutationObserver
      const handlePointerOver = (e: MouseEvent) => {
        const target = (e.target as HTMLElement)?.closest("a, button, input, textarea, [role='button'], .cursor-pointer");
        if (target) {
          onMouseEnter();
        } else {
          onMouseLeave();
        }
      };

      window.addEventListener("pointerover", handlePointerOver, { passive: true });

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("pointerover", handlePointerOver);
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3.5 h-3.5 bg-accent rounded-full pointer-events-none z-50 hidden md:block will-change-transform shadow-[0_0_12px_rgba(212,255,50,0.4)]"
      style={{ transform: "translate(-50%, -50%)" }}
    />
  );
}
