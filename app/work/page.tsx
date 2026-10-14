"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Code, ExternalLink, Search } from "lucide-react";
import { GitHubRepo } from "@/types";
import { projects } from "@/data/projects";

export default function Work() {
  const container = useRef<HTMLDivElement>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");

  useEffect(() => {
    // Fetch GitHub Repositories with quick timeout/fallback
    fetch("/api/github")
      .then((res) => res.json())
      .then((data: GitHubRepo[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch repos", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        gsap.from(".archive-row", {
          y: 15,
          opacity: 0,
          stagger: 0.04,
          duration: 0.6,
          ease: "power2.out",
        });
      }, container);
      return () => ctx.revert();
    }
  }, [loading, selectedLanguage, searchQuery]);

  const languages = useMemo(() => {
    const langs = new Set<string>();
    repos.forEach((r) => {
      if (r.language) langs.add(r.language);
    });
    return ["All", ...Array.from(langs)];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesLang =
        selectedLanguage === "All" || repo.language === selectedLanguage;
      return matchesSearch && matchesLang;
    });
  }, [repos, searchQuery, selectedLanguage]);

  return (
    <main ref={container} className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent font-mono text-xs mb-4">
            <span>Portfolio & Code Archive</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white">
            Works & <span className="text-accent">Archive.</span>
          </h1>
          <p className="mt-4 font-sans text-gray-400 text-base md:text-lg max-w-2xl font-light">
            Featured applications developed for municipal governments and AI educational tools, paired with an archive of repositories and machine learning experiments.
          </p>
        </div>

        {/* Section 1: Featured Projects Cards */}
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-8 flex items-center gap-3">
            <span>Featured Solutions</span>
            <span className="h-[1px] flex-1 bg-white/10" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 flex flex-col hover:border-accent transition-all duration-300"
              >
                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-mono text-accent border border-white/10">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="mt-2 text-xs md:text-sm text-gray-400 font-sans leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-3 border-t border-white/5">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 bg-accent text-black font-semibold text-xs rounded-full flex justify-center items-center hover:bg-white transition-colors"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 bg-white/5 border border-white/10 text-white font-semibold text-xs rounded-full flex justify-center items-center gap-1.5 hover:border-accent hover:text-accent transition-colors"
                    >
                      <Code size={14} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Complete Code Archive */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white flex items-center gap-3">
                <span>All-Code Archive</span>
              </h2>
              <p className="text-xs md:text-sm text-gray-400 font-sans mt-1">
                Explore all open-source repositories and development projects.
              </p>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Search input */}
              <div className="relative flex-1 md:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter repositories..."
                  className="w-full bg-zinc-950/80 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Language Pills */}
              <div className="flex flex-wrap gap-1.5">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1 rounded-full text-[11px] font-mono transition-colors ${
                      selectedLanguage === lang
                        ? "bg-accent text-black font-bold"
                        : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 w-full bg-zinc-950/60 border border-white/5 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto border border-white/10 rounded-2xl bg-zinc-950/40 backdrop-blur-md">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 font-sans text-xs tracking-widest uppercase bg-white/5">
                    <th className="py-4 px-6 font-normal">Year</th>
                    <th className="py-4 px-6 font-normal">Project</th>
                    <th className="py-4 px-6 font-normal hidden md:table-cell">Description</th>
                    <th className="py-4 px-6 font-normal hidden sm:table-cell">Built with</th>
                    <th className="py-4 px-6 font-normal text-right">Links</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRepos.length > 0 ? (
                    filteredRepos.map((repo) => (
                      <tr
                        key={repo.id}
                        className="archive-row border-b border-white/5 hover:bg-white/5 transition-colors group"
                      >
                        <td className="py-5 px-6 text-accent font-mono text-xs">
                          {new Date(repo.created_at).getFullYear()}
                        </td>
                        <td className="py-5 px-6">
                          <a
                            href={repo.homepage || repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-display text-base md:text-lg font-bold text-white group-hover:text-accent transition-colors inline-block"
                          >
                            {repo.name}
                          </a>
                          <div className="text-xs text-gray-500 sm:hidden mt-0.5">{repo.language}</div>
                          {repo.description && (
                            <p className="text-xs text-gray-400 md:hidden mt-1 line-clamp-2 font-sans">
                              {repo.description}
                            </p>
                          )}
                        </td>
                        <td className="py-5 px-6 hidden md:table-cell text-gray-400 font-sans text-xs max-w-sm leading-relaxed">
                          {repo.description || "—"}
                        </td>
                        <td className="py-5 px-6 hidden sm:table-cell text-gray-300 font-mono text-xs">
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
                            {repo.language || "N/A"}
                          </span>
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex gap-2.5 justify-end">
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors"
                              title="View Source Code"
                              aria-label="View Source Code"
                            >
                              <Code size={16} />
                            </a>
                            {repo.homepage && (
                              <a
                                href={repo.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg border border-accent/30 text-accent hover:bg-accent hover:text-black transition-colors"
                                title="View Live Demo"
                                aria-label="View Live Demo"
                              >
                                <ExternalLink size={16} />
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-500 font-sans text-sm">
                        No repositories found matching your filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
