import type { Metadata } from "next";
import AboutContent from "./AboutContent";
import { getExperiences, getProfile } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Me | Yoga Andhika – Frontend & Creative Developer",
  description:
    "Learn about Mhd. Yoga Andhika's background, software engineering philosophy, technical experience at Diskominfo Dumai, and creative development approach.",
  openGraph: {
    title: "About Me | Yoga Andhika – Frontend & Creative Developer",
    description:
      "Learn about Mhd. Yoga Andhika's background, software engineering philosophy, technical experience at Diskominfo Dumai, and creative development approach.",
  },
};

export default async function AboutPage() {
  const [experiences, profile] = await Promise.all([
    getExperiences(),
    getProfile(),
  ]);

  return <AboutContent initialExperiences={experiences} profile={profile} />;
}
