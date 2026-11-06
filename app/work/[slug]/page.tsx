import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Code, Layers, Sparkles } from "lucide-react";
import CaseStudyFooterNav from "@/components/ui/CaseStudyFooterNav";
import DemoAccountsSection from "@/components/ui/DemoAccountsSection";
import { getProjectBySlug, getProjects } from "@/lib/data";

export async function generateStaticParams() {
  const allProjects = await getProjects();
  return allProjects
    .filter((p) => p.slug && !["showcase-studio", "dharma-loka", "si-tuah", "edusummarize", "next-item-prediction", "product-ml-api"].includes(p.slug))
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Yoga Andhika`,
    description: project.description,
  };
}

export default async function DynamicCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs md:text-sm font-mono text-gray-400 hover:text-accent transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Works</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono font-semibold uppercase tracking-wider">
              {project.category}
            </span>
            {project.role && (
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-mono">
                {project.role}
              </span>
            )}
            {project.year && (
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-mono">
                Year: {project.year}
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
            {project.title}
          </h1>

          <p className="text-gray-300 font-sans text-lg md:text-xl leading-relaxed max-w-3xl font-light">
            {project.description}
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 bg-accent text-black font-semibold text-sm rounded-full flex items-center gap-2 hover:bg-white transition-colors"
              >
                <span>Live Demo</span>
                <ArrowUpRight size={16} />
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 bg-white/5 border border-white/15 text-white font-semibold text-sm rounded-full flex items-center gap-2 hover:border-accent hover:text-accent transition-colors"
              >
                <Code size={16} />
                <span>Source Repository</span>
              </a>
            )}
          </div>
        </div>

        {/* Hero Visual Mockup */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-12 bg-zinc-950">
          <Image
            src={project.image || "/ShowcaseStudio.png"}
            alt={project.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1120px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div className="text-xs font-mono text-gray-300 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10">
              {project.category} • {project.title}
            </div>
          </div>
        </div>

        {/* Live Testing Credentials Widget if present */}
        {project.demoAccounts && project.demoAccounts.length > 0 && (
          <div className="mb-16">
            <DemoAccountsSection
              accounts={project.demoAccounts}
              loginUrl={project.demoUrl}
            />
          </div>
        )}

        {/* Meta Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-zinc-950/70 border border-white/10 mb-16">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Role</p>
            <p className="text-sm font-semibold text-white">{project.role || "Developer"}</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Category</p>
            <p className="text-sm font-semibold text-white">{project.category}</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Year</p>
            <p className="text-sm font-semibold text-white">{project.year || "2026"}</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">Tech Stack</p>
            <p className="text-sm font-semibold text-white truncate">
              {project.techStack?.slice(0, 3).join(", ") || "Next.js"}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-16 font-sans">
          <section className="border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent">
                <Layers size={20} />
              </span>
              <span>Overview & Impact</span>
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4 text-base md:text-lg font-light max-w-4xl">
              <p>{project.description}</p>
              {project.impact && (
                <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 mt-6">
                  <h4 className="font-semibold text-accent text-sm uppercase tracking-wider mb-2 font-mono flex items-center gap-2">
                    <Sparkles size={14} />
                    <span>Key Engineering Impact</span>
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed font-light">
                    {project.impact}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Tech Stack Pills */}
          {project.techStack && project.techStack.length > 0 && (
            <section className="border-t border-white/10 pt-10">
              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-white mb-4">
                Technologies Applied
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          <CaseStudyFooterNav currentSlug={project.slug || ""} />
        </div>
      </div>
    </main>
  );
}
