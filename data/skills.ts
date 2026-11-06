export interface TechItem {
  id?: string;
  name: string;
  category: "frontend" | "ml" | "backend";
}

export const techStack: TechItem[] = [
  // Frontend & Creative
  { name: "Next.js 16", category: "frontend" },
  { name: "React 19", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "JavaScript (ES6+)", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "GSAP ScrollTrigger", category: "frontend" },
  { name: "Three.js & WebGL", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "Lenis Smooth Scroll", category: "frontend" },

  // Machine Learning & AI Workflow
  { name: "Python", category: "ml" },
  { name: "Scikit-Learn", category: "ml" },
  { name: "Machine Learning", category: "ml" },
  { name: "LLM Function Calling", category: "ml" },
  { name: "AI-Assisted Dev", category: "ml" },

  // Backend, Database & Tools
  { name: "FastAPI & Flask", category: "backend" },
  { name: "Supabase (Auth & RLS)", category: "backend" },
  { name: "PostgreSQL & SQLite", category: "backend" },
  { name: "RESTful APIs", category: "backend" },
  { name: "Laravel & Django", category: "backend" },
  { name: "Git, Linux & Vercel", category: "backend" },
];

export const technologies: string[] = techStack.map((t) => t.name);

export const marqueeSkills: string[] = [
  "Full-Stack Engineering",
  "Creative Coding",
  "Three.js & WebGL 3D",
  "Next.js & TypeScript",
  "GSAP Motion",
  "Machine Learning APIs",
  "Supabase & PostgreSQL",
  "FastAPI & Python",
  "UI/UX Craft",
];
