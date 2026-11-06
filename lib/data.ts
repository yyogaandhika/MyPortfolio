import { createClient } from "@/lib/supabase/server";
import { projects as fallbackProjects } from "@/data/projects";
import {
  experiences as fallbackExperiences,
  keyMetrics as fallbackKeyMetrics,
} from "@/data/experiences";
import {
  techStack as fallbackSkills,
  TechItem,
} from "@/data/skills";
import { contactDetails as fallbackContact } from "@/data/contact";
import { Project, Experience } from "@/types";

export interface ProfileData {
  name: string;
  role: string;
  location: string;
  availability: string;
  email: string;
  cvUrl: string;
  heroBio?: string;
  philosophy?: string;
  background?: string;
  socials: typeof fallbackContact.socials;
  education?: typeof fallbackContact.education;
}

export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return fallbackProjects;

    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackProjects;
    }

    return data.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      category: item.category,
      role: item.role || undefined,
      year: item.year || undefined,
      image: item.image,
      demoUrl: item.demo_url,
      codeUrl: item.code_url,
      description: item.description,
      techStack: item.tech_stack || [],
      impact: item.impact || undefined,
      hasCaseStudy: Boolean(item.has_case_study),
      demoAccounts: item.demo_accounts || [],
    }));
  } catch (err) {
    console.warn("Failed to fetch projects from Supabase, using local fallback baseline:", err);
    return fallbackProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const allProjects = await getProjects();
  const match = allProjects.find((p) => p.slug === slug);
  return match || null;
}

export async function getProfile(): Promise<ProfileData> {
  try {
    const supabase = await createClient();
    if (!supabase) return fallbackContact;

    const { data, error } = await supabase
      .from("portfolio_profile")
      .select("*")
      .eq("id", "profile")
      .single();

    if (error || !data) {
      return fallbackContact;
    }

    return {
      name: data.name || fallbackContact.name,
      role: data.role || fallbackContact.role,
      location: data.location || fallbackContact.location,
      availability: data.availability || fallbackContact.availability,
      email: data.email || fallbackContact.email,
      cvUrl: data.cv_url || fallbackContact.cvUrl,
      heroBio: data.hero_bio,
      philosophy: data.philosophy,
      background: data.background,
      socials: data.socials && data.socials.length > 0 ? data.socials : fallbackContact.socials,
      education: fallbackContact.education,
    };
  } catch (err) {
    console.warn("Failed to fetch profile from Supabase, using local fallback baseline:", err);
    return fallbackContact;
  }
}

export async function getExperiences(): Promise<Experience[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return fallbackExperiences;

    const { data, error } = await supabase
      .from("portfolio_experiences")
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackExperiences;
    }

    return data.map((item) => ({
      role: item.role,
      company: item.company,
      year: item.year,
      badge: item.badge || undefined,
      description: item.description,
      highlights: item.highlights || [],
    }));
  } catch (err) {
    console.warn("Failed to fetch experiences from Supabase, using local fallback baseline:", err);
    return fallbackExperiences;
  }
}

export async function getSkills(): Promise<TechItem[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return fallbackSkills;

    const { data, error } = await supabase
      .from("portfolio_skills")
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackSkills;
    }

    return data.map((item) => ({
      name: item.name,
      category: item.category as "frontend" | "ml" | "backend",
    }));
  } catch (err) {
    console.warn("Failed to fetch skills from Supabase, using local fallback baseline:", err);
    return fallbackSkills;
  }
}

export async function getKeyMetrics() {
  const currentProjects = await getProjects();
  return [
    {
      value: `${currentProjects.length}+`,
      label: "Production Systems",
      detail: "Full-Stack, 3D WebGL & ML",
    },
    ...fallbackKeyMetrics.slice(1),
  ];
}
