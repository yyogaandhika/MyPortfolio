"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });
    }, container);
    return () => ctx.revert();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    // Ganti string di bawah ini dengan Access Key dari email Anda
    formData.append("access_key", "a5de5d4c-ad9b-40ce-9a15-7c8646acea9f");
    formData.append("subject", "New Contact from Portfolio");
    formData.append("from_name", "Portfolio Contact Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
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
    <main ref={container} className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4 fade-up text-white">
          Let&apos;s <span className="text-accent">Talk.</span>
        </h1>
        <p className="font-sans text-xl text-gray-400 mb-16 fade-up font-light">
          Have a project in mind or just want to say hi? Feel free to send a message.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-12 fade-up">
          <div className="relative group">
            <input 
              type="text" 
              name="name"
              required 
              className="w-full bg-transparent border-b border-white/20 pb-4 text-xl md:text-2xl text-white focus:outline-none peer" 
              placeholder="Your Name"
            />
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 peer-focus:scale-x-100 transition-transform origin-left duration-500" />
          </div>

          <div className="relative group">
            <input 
              type="email" 
              name="email"
              required 
              className="w-full bg-transparent border-b border-white/20 pb-4 text-xl md:text-2xl text-white focus:outline-none peer" 
              placeholder="Your Email"
            />
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 peer-focus:scale-x-100 transition-transform origin-left duration-500" />
          </div>

          <div className="relative group">
            <textarea 
              name="message"
              required 
              rows={4}
              className="w-full bg-transparent border-b border-white/20 pb-4 text-xl md:text-2xl text-white focus:outline-none peer resize-none" 
              placeholder="Tell me about your project"
            />
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 peer-focus:scale-x-100 transition-transform origin-left duration-500" />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="self-start mt-8 px-8 py-4 bg-white text-black font-semibold uppercase tracking-widest text-sm rounded-full hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {submitStatus === "success" && (
            <p className="text-accent font-sans mt-2">Your message has been sent successfully!</p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-500 font-sans mt-2">Something went wrong. Please try again later.</p>
          )}
        </form>
      </div>
    </main>
  );
}
