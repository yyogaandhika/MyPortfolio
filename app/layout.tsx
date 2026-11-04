import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
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
  metadataBase: new URL("https://yogaportfolio.vercel.app"),
  title: {
    default: "Yoga Andhika | Full-Stack & Creative Developer",
    template: "%s | Yoga Andhika",
  },
  description:
    "Personal portfolio of Mhd. Yoga Andhika — Full-Stack & Creative Developer crafting interactive web applications with Next.js, Three.js, GSAP, and Machine Learning APIs.",
  keywords: [
    "Mhd. Yoga Andhika",
    "Yoga Andhika",
    "Frontend Developer",
    "Full-Stack Developer",
    "Creative Developer",
    "Next.js",
    "React",
    "GSAP",
    "Three.js",
    "Machine Learning",
    "Web Developer Indonesia",
    "Diskominfo Dumai",
    "SI TUAH",
  ],
  authors: [{ name: "Mhd. Yoga Andhika" }],
  openGraph: {
    title: "Yoga Andhika | Full-Stack & Creative Developer",
    description:
      "Crafting fluid web experiences with Next.js, Three.js & GSAP, bridging thoughtful user interfaces with Machine Learning systems.",
    url: "https://yogaportfolio.vercel.app",
    siteName: "Yoga Andhika Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yoga Andhika | Full-Stack & Creative Developer",
    description:
      "Crafting fluid web experiences with Next.js, Three.js & GSAP, bridging thoughtful user interfaces with Machine Learning systems.",
  },
  icons: {
    icon: "/icon.svg",
  },
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
        <Preloader />
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
