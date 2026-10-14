import type { Metadata } from "next";
import AboutContent from "./AboutContent";

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

export default function AboutPage() {
  return <AboutContent />;
}