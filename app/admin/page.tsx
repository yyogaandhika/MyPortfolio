import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProjects, getProfile, getExperiences, getSkills } from "@/lib/data";
import AdminDashboard from "./AdminDashboard";

export const metadata = {
  title: "Admin Workspace | Yoga Andhika Portfolio",
};

export default async function AdminPage() {
  const supabase = await createClient();
  let userEmail = "admin@yogaportfolio.vercel.app";

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/admin/login");
    }
    userEmail = user.email || userEmail;
  }

  const [projects, profile, experiences, skills] = await Promise.all([
    getProjects(),
    getProfile(),
    getExperiences(),
    getSkills(),
  ]);

  return (
    <AdminDashboard
      initialProjects={projects}
      initialProfile={profile}
      initialExperiences={experiences}
      initialSkills={skills}
      userEmail={userEmail}
    />
  );
}

