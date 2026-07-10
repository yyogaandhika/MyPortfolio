import Hero from "@/components/sections/Hero";
import InfiniteMarquee from "@/components/sections/InfiniteMarquee";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import InteractiveTechStack from "@/components/sections/InteractiveTechStack";

export default function Home() {
  return (
    <main className="w-full flex flex-col">
      <Hero />
      <InfiniteMarquee />
      <FeaturedProjects />
      <InteractiveTechStack />
    </main>
  );
}
