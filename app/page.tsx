import Hero from "@/components/sections/Hero";
import InfiniteMarquee from "@/components/sections/InfiniteMarquee";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import InteractiveTechStack from "@/components/sections/InteractiveTechStack";
import CallToAction from "@/components/sections/CallToAction";
import { getProjects, getProfile } from "@/lib/data";

export default async function Home() {
  const [projects, profile] = await Promise.all([
    getProjects(),
    getProfile(),
  ]);

  return (
    <main className="w-full flex flex-col">
      <Hero profile={profile} />
      <InfiniteMarquee />
      <FeaturedProjects projects={projects} />
      <InteractiveTechStack />
      <CallToAction />
    </main>
  );
}
