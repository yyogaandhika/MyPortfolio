"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { SocialIcon } from "@/components/icons";
import { navLinks } from "@/data/navigation";
import { contactDetails } from "@/data/contact";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full border-t border-white/10 bg-black/80 backdrop-blur-md relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/5">
          
          {/* Brand & Bio */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link href="/" className="font-display font-bold text-2xl uppercase tracking-tighter text-white inline-block">
              Yoga<span className="text-accent">.</span>
            </Link>
            <p className="font-sans text-sm text-gray-400 max-w-sm leading-relaxed">
              Frontend & Creative Developer crafting interactive web experiences with Next.js, GSAP, and Machine Learning integrations.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for internships & freelance</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <p className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-2">
              Navigation
            </p>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links & Back to top */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <p className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-2">
              Connect
            </p>
            <div className="flex flex-wrap gap-3">
              {contactDetails.socials.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-black hover:bg-accent hover:border-accent transition-all"
                  title={item.label}
                  aria-label={item.label}
                >
                  <SocialIcon id={item.id} size={18} />
                </a>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-accent transition-colors group"
              >
                <span>Back to top</span>
                <div className="p-1.5 rounded-full border border-white/20 group-hover:border-accent transition-colors">
                  <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500">
          <p>© {new Date().getFullYear()} Mhd. Yoga Andhika. All rights reserved.</p>
          <p>Built with Next.js, Tailwind CSS & GSAP</p>
        </div>
      </div>
    </footer>
  );
}
