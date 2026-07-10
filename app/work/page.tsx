"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Code, ExternalLink } from "lucide-react";

export default function Work() {
  const container = useRef<HTMLDivElement>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch GitHub Repositories
    fetch("/api/github")
      .then(res => res.json())
      .then(data => {
        setRepos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch repos", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        gsap.from(".archive-row", {
          y: 20,
          opacity: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: "power2.out"
        });
      }, container);
      return () => ctx.revert();
    }
  }, [loading]);

  return (
    <main ref={container} className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-16 text-white">
          All-Code <span className="text-accent">Archive</span>
        </h1>

        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 w-full bg-zinc-900 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-500 font-sans text-sm tracking-widest uppercase">
                  <th className="py-4 font-normal">Year</th>
                  <th className="py-4 font-normal">Project</th>
                  <th className="py-4 font-normal hidden md:table-cell">Built with</th>
                  <th className="py-4 font-normal">Link</th>
                </tr>
              </thead>
              <tbody>
                {repos.map((repo: any) => (
                  <tr key={repo.id} className="archive-row border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="py-6 text-accent font-mono text-sm">
                      {new Date(repo.created_at).getFullYear()}
                    </td>
                    <td className="py-6">
                      <div className="font-display text-xl font-bold text-white group-hover:text-accent transition-colors">
                        {repo.name}
                      </div>
                      <div className="text-sm text-gray-500 md:hidden mt-1">{repo.language}</div>
                    </td>
                    <td className="py-6 hidden md:table-cell text-gray-400 font-sans text-sm">
                      {repo.language || "N/A"}
                    </td>
                    <td className="py-6 flex gap-3">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Code size={20} />
                      </a>
                      {repo.homepage && (
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
