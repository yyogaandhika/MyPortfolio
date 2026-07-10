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
      const onMouseMove = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.15,
          ease: "power2.out",
        });
      };

      const onMouseEnter = () => {
        gsap.to(cursor, { 
          scale: 2.5, 
          backgroundColor: "transparent", 
          border: "1px solid var(--accent)", 
          duration: 0.3 
        });
      };

      const onMouseLeave = () => {
        gsap.to(cursor, { 
          scale: 1, 
          backgroundColor: "var(--accent)", 
          border: "0px solid transparent", 
          duration: 0.3 
        });
      };

      window.addEventListener("mousemove", onMouseMove);

      // Function to re-attach listeners if DOM changes
      const attachListeners = () => {
        const interactables = document.querySelectorAll("a, button, input, textarea");
        interactables.forEach((el) => {
          el.addEventListener("mouseenter", onMouseEnter);
          el.addEventListener("mouseleave", onMouseLeave);
        });
      };
      
      attachListeners();

      // Mutation observer to handle dynamic elements
      const observer = new MutationObserver(() => {
        attachListeners();
      });
      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        observer.disconnect();
        const interactables = document.querySelectorAll("a, button, input, textarea");
        interactables.forEach((el) => {
          el.removeEventListener("mouseenter", onMouseEnter);
          el.removeEventListener("mouseleave", onMouseLeave);
        });
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-accent rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
      style={{ transform: "translate(-50%, -50%)" }}
    />
  );
}
