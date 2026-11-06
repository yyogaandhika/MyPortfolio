import type { Metadata } from "next";
import WorkContent from "./WorkContent";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Works & Case Studies | Yoga Andhika",
  description:
    "Explore featured engineering solutions, regional government analytics portals, machine learning applications, and full open-source repository archive by Yoga Andhika.",
  openGraph: {
    title: "Works & Case Studies | Yoga Andhika",
    description:
      "Explore featured engineering solutions, regional government analytics portals, machine learning applications, and full open-source repository archive by Yoga Andhika.",
  },
};

export default async function WorkPage() {
  const projects = await getProjects();
  return <WorkContent initialProjects={projects} />;
}
