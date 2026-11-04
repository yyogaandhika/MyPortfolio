import Link from "next/link";
import { ArrowLeft, ArrowRight, FileDown } from "lucide-react";
import { projects } from "@/data/projects";
import { contactDetails } from "@/data/contact";

export default function CaseStudyFooterNav({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const caseStudyProjects = projects.filter((p) => p.hasCaseStudy && p.slug);
  const currentIndex = caseStudyProjects.findIndex(
    (p) => p.slug === currentSlug
  );

  const prevProject =
    currentIndex >= 0
      ? caseStudyProjects[
          (currentIndex - 1 + caseStudyProjects.length) %
            caseStudyProjects.length
        ]
      : null;

  const nextProject =
    currentIndex >= 0
      ? caseStudyProjects[(currentIndex + 1) % caseStudyProjects.length]
      : null;

  return (
    <div className="border-t border-white/10 pt-12 mt-4 flex flex-col gap-10">
      {/* Prev / Next Case Study Cards */}
      {prevProject && nextProject && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href={`/work/${prevProject.slug}`}
            className="group p-6 rounded-2xl bg-zinc-950 border border-white/10 hover:border-accent/50 transition-all flex flex-col justify-between gap-3"
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 group-hover:text-accent transition-colors">
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>Previous Case Study</span>
            </div>
            <div>
              <p className="text-[11px] font-mono text-accent uppercase tracking-wider mb-1">
                {prevProject.category}
              </p>
              <h4 className="font-display text-lg md:text-xl font-bold text-white group-hover:text-accent transition-colors">
                {prevProject.title}
              </h4>
            </div>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="group p-6 rounded-2xl bg-zinc-950 border border-white/10 hover:border-accent/50 transition-all flex flex-col justify-between gap-3 md:text-right md:items-end"
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 group-hover:text-accent transition-colors">
              <span>Next Case Study</span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
            <div>
              <p className="text-[11px] font-mono text-accent uppercase tracking-wider mb-1">
                {nextProject.category}
              </p>
              <h4 className="font-display text-lg md:text-xl font-bold text-white group-hover:text-accent transition-colors">
                {nextProject.title}
              </h4>
            </div>
          </Link>
        </div>
      )}

      {/* Bottom Action Bar */}
      <div className="flex flex-wrap justify-between items-center gap-4 pt-6 border-t border-white/5">
        <Link
          href="/work"
          className="text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-accent transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={14} />
          <span>Back to All Works</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={contactDetails.cvUrl}
            download="CV_Mhd_Yoga_Andhika.pdf"
            className="py-2.5 px-5 bg-white/5 border border-white/15 text-white font-semibold text-xs rounded-full hover:border-accent hover:text-accent transition-colors flex items-center gap-2"
          >
            <FileDown size={14} />
            <span>Download CV</span>
          </a>

          <Link
            href="/contact"
            className="py-2.5 px-6 bg-accent text-black font-semibold text-xs md:text-sm rounded-full hover:bg-white transition-colors"
          >
            Discuss a Project with Me
          </Link>
        </div>
      </div>
    </div>
  );
}

