"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { SocialIcon } from "@/components/icons";
import { contactDetails } from "@/data/contact";

export default function ContactContent() {
  const container = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.1,
      });
    }, container);
    return () => ctx.revert();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "a5de5d4c-ad9b-40ce-9a15-7c8646acea9f");
    formData.append("subject", "New Contact from Portfolio");
    formData.append("from_name", "Portfolio Contact Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        console.error("Error", data);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main ref={container} className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Contact & Availability */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="fade-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{contactDetails.availability}</span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6 text-white">
                Let&apos;s <span className="text-accent">Connect.</span>
              </h1>
              <p className="font-sans text-base md:text-lg text-gray-400 leading-relaxed font-light">
                Have an exciting project, role, or collaboration in mind? Feel free to send a message through the form or contact me directly via the channels below.
              </p>
            </div>

            {/* Direct Links List */}
            <div className="flex flex-col gap-3 fade-up">
              <p className="text-xs uppercase tracking-widest text-accent font-semibold font-mono mb-1">
                Direct Channels
              </p>
              {contactDetails.socials.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:border-accent hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2 rounded-lg bg-black/50 text-accent group-hover:bg-accent group-hover:text-black transition-colors">
                      <SocialIcon id={item.id} size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-mono">{item.label}</p>
                      <p className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-gray-500 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-zinc-950/80 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-md fade-up">
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-2">
              Send a Message
            </h2>
            <p className="text-sm text-gray-400 mb-8 font-light">
              Fill in your details and I&apos;ll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Web3Forms Honeypot Anti-Spam Checkbox */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="relative group">
                <input 
                  type="text" 
                  name="name"
                  required 
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-lg text-white focus:outline-none focus:border-accent transition-colors peer" 
                  placeholder="Your Name"
                />
              </div>

              <div className="relative group">
                <input 
                  type="email" 
                  name="email"
                  required 
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-lg text-white focus:outline-none focus:border-accent transition-colors peer" 
                  placeholder="Your Email"
                />
              </div>

              <div className="relative group">
                <textarea 
                  name="message"
                  required 
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-lg text-white focus:outline-none focus:border-accent transition-colors peer resize-none" 
                  placeholder="Tell me about your project or inquiry"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="mt-4 py-4 px-8 bg-accent text-black font-semibold uppercase tracking-widest text-xs rounded-full hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitStatus === "success" && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                  ✓ Your message has been sent successfully! I will reply shortly.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  ✕ Something went wrong. Please reach out via WhatsApp or Email directly.
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
