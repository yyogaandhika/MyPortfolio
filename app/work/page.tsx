import type { Metadata } from "next";
import WorkContent from "./WorkContent";

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

export default function WorkPage() {
  return <WorkContent />;
}
