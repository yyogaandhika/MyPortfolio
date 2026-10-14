import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact & Collaboration | Yoga Andhika",
  description:
    "Get in touch with Mhd. Yoga Andhika for frontend development, machine learning engineering, or internship and freelance inquiries.",
  openGraph: {
    title: "Contact & Collaboration | Yoga Andhika",
    description:
      "Get in touch with Mhd. Yoga Andhika for frontend development, machine learning engineering, or internship and freelance inquiries.",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
