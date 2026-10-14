export interface TechItem {
  name: string;
  category: "frontend" | "ml" | "backend";
}

export const techStack: TechItem[] = [
  // Frontend & Creative
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "GSAP", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },

  // Machine Learning & Data
  { name: "Python", category: "ml" },
  { name: "FastAPI", category: "ml" },
  { name: "Machine Learning", category: "ml" },
  { name: "Scikit-Learn", category: "ml" },

  // Backend & Tools
  { name: "Node.js", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "REST APIs", category: "backend" },
  { name: "Git & GitHub", category: "backend" },
];

export const technologies: string[] = techStack.map((t) => t.name);

export const marqueeSkills: string[] = [
  "Frontend Engineering",
  "Creative Coding",
  "Next.js & React",
  "GSAP Motion",
  "Machine Learning Integration",
  "UI/UX Craft",
  "FastAPI & Python",
  "RESTful Architecture",
];
