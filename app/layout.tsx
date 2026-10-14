import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yoga Andhika | Frontend & Creative Developer",
  description: "Personal portfolio of Mhd. Yoga Andhika — Frontend & Creative Developer crafting interactive web applications with Next.js, GSAP, and Machine Learning integrations.",
  keywords: [
    "Mhd. Yoga Andhika",
    "Yoga Andhika",
    "Frontend Developer",
    "Creative Developer",
    "Next.js",
    "React",
    "GSAP",
    "Machine Learning",
    "Web Developer Indonesia",
  ],
  authors: [{ name: "Mhd. Yoga Andhika" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} dark antialiased`}
    >
      <body className="min-h-screen font-sans bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-background flex flex-col">
        <CustomCursor />
        <Navigation />
        <SmoothScroll>
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
