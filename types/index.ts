export interface Project {
  id: number | string;
  slug?: string;
  title: string;
  category: string;
  role?: string;
  year?: string;
  image: string;
  demoUrl: string;
  codeUrl: string;
  description: string;
  techStack?: string[];
  impact?: string;
  hasCaseStudy?: boolean;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  role: string;
  company: string;
  year: string;
  description?: string;
  highlights?: string[];
}

export interface NavLink {
  href: string;
  label: string;
}
