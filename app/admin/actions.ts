"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { projects as baselineProjects } from "@/data/projects";
import { experiences as baselineExperiences } from "@/data/experiences";
import { techStack as baselineSkills } from "@/data/skills";
import { contactDetails as baselineContact } from "@/data/contact";
import { Project, Experience } from "@/types";

export interface ActionResult {
  success: boolean;
  message?: string;
  data?: unknown;
}

// -----------------------------------------------------------------------------
// 1. Authentication Actions
// -----------------------------------------------------------------------------

export async function loginAdminAction(formData: FormData): Promise<ActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "Email dan password wajib diisi." };
  }

  const supabase = await createClient();
  if (!supabase) {
    return {
      success: false,
      message: "Supabase belum terkonfigurasi. Pastikan NEXT_PUBLIC_SUPABASE_URL dan KEY sudah diisi di .env.local",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function logoutAdminAction(): Promise<void> {
  const supabase = await createClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  revalidatePath("/admin");
  redirect("/admin/login");
}

// -----------------------------------------------------------------------------
// 2. One-Click Seeding / Sync Action
// -----------------------------------------------------------------------------

export async function syncLocalDataToSupabaseAction(): Promise<ActionResult> {
  const supabase = createAdminClient() || (await createClient());
  if (!supabase) {
    return { success: false, message: "Supabase client tidak tersedia." };
  }

  try {
    // 1. Sync Profile
    await supabase.from("portfolio_profile").upsert({
      id: "profile",
      name: baselineContact.name,
      role: baselineContact.role,
      location: baselineContact.location,
      availability: baselineContact.availability,
      email: baselineContact.email,
      cv_url: baselineContact.cvUrl,
      socials: baselineContact.socials,
      updated_at: new Date().toISOString(),
    });

    // 2. Sync Projects
    for (let i = 0; i < baselineProjects.length; i++) {
      const p = baselineProjects[i];
      await supabase.from("portfolio_projects").upsert(
        {
          slug: p.slug || `project-${p.id}`,
          title: p.title,
          category: p.category,
          role: p.role || "",
          year: p.year || "",
          image: p.image,
          demo_url: p.demoUrl,
          code_url: p.codeUrl,
          description: p.description,
          tech_stack: p.techStack || [],
          impact: p.impact || "",
          has_case_study: Boolean(p.hasCaseStudy),
          demo_accounts: p.demoAccounts || [],
          order_index: i,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "slug" }
      );
    }

    // 3. Sync Experiences
    for (let i = 0; i < baselineExperiences.length; i++) {
      const exp = baselineExperiences[i];
      await supabase.from("portfolio_experiences").upsert({
        role: exp.role,
        company: exp.company,
        year: exp.year,
        badge: exp.badge || "",
        description: exp.description || "",
        highlights: exp.highlights || [],
        order_index: i,
      });
    }

    // 4. Sync Skills
    for (let i = 0; i < baselineSkills.length; i++) {
      const s = baselineSkills[i];
      await supabase.from("portfolio_skills").upsert({
        name: s.name,
        category: s.category,
        order_index: i,
      });
    }

    revalidateAllPublicPaths();
    return {
      success: true,
      message: `Berhasil mensinkronkan ${baselineProjects.length} proyek, profil, pengalaman, dan keahlian ke Supabase!`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, message: `Gagal sinkronisasi: ${message}` };
  }
}

// -----------------------------------------------------------------------------
// 3. Projects CRUD Actions
// -----------------------------------------------------------------------------

export async function saveProjectAction(data: Partial<Project>): Promise<ActionResult> {
  const supabase = await createClient();
  if (!supabase) return { success: false, message: "Koneksi database tidak tersedia." };

  if (!data.title || !data.category || !data.image || !data.demoUrl || !data.codeUrl) {
    return { success: false, message: "Judul, kategori, gambar, link demo, dan link kode wajib diisi." };
  }

  const slug =
    data.slug ||
    data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const row = {
    slug,
    title: data.title,
    category: data.category,
    role: data.role || "",
    year: data.year || new Date().getFullYear().toString(),
    image: data.image,
    demo_url: data.demoUrl,
    code_url: data.codeUrl,
    description: data.description || "",
    tech_stack: data.techStack || [],
    impact: data.impact || "",
    has_case_study: Boolean(data.hasCaseStudy),
    demo_accounts: data.demoAccounts || [],
    updated_at: new Date().toISOString(),
  };

  let error;
  if (data.id && typeof data.id === "string" && data.id.includes("-")) {
    // Update existing UUID record
    const res = await supabase.from("portfolio_projects").update(row).eq("id", data.id);
    error = res.error;
  } else {
    // Upsert by slug
    const res = await supabase.from("portfolio_projects").upsert(row, { onConflict: "slug" });
    error = res.error;
  }

  if (error) {
    return { success: false, message: error.message };
  }

  revalidateAllPublicPaths();
  return { success: true, message: "Proyek berhasil disimpan!" };
}

export async function deleteProjectAction(idOrSlug: string): Promise<ActionResult> {
  const supabase = await createClient();
  if (!supabase) return { success: false, message: "Koneksi database tidak tersedia." };

  const { error } = await supabase
    .from("portfolio_projects")
    .delete()
    .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidateAllPublicPaths();
  return { success: true, message: "Proyek berhasil dihapus." };
}

// -----------------------------------------------------------------------------
// 4. Profile & Bio Action
// -----------------------------------------------------------------------------

export async function saveProfileAction(formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();
  if (!supabase) return { success: false, message: "Koneksi database tidak tersedia." };

  const availability = formData.get("availability") as string;
  const role = formData.get("role") as string;
  const location = formData.get("location") as string;
  const cvUrl = formData.get("cvUrl") as string;
  const heroBio = formData.get("heroBio") as string;
  const email = formData.get("email") as string;

  const { error } = await supabase.from("portfolio_profile").upsert({
    id: "profile",
    availability: availability || baselineContact.availability,
    role: role || baselineContact.role,
    location: location || baselineContact.location,
    cv_url: cvUrl || baselineContact.cvUrl,
    hero_bio: heroBio || undefined,
    email: email || baselineContact.email,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return { success: false, message: error.message };
  }

  revalidateAllPublicPaths();
  return { success: true, message: "Profil berhasil diperbarui!" };
}

// -----------------------------------------------------------------------------
// 5. Experience Actions
// -----------------------------------------------------------------------------

export async function saveExperienceAction(data: Partial<Experience> & { id?: string }): Promise<ActionResult> {
  const supabase = await createClient();
  if (!supabase) return { success: false, message: "Koneksi database tidak tersedia." };

  if (!data.role || !data.company || !data.year) {
    return { success: false, message: "Peran, perusahaan/organisasi, dan tahun wajib diisi." };
  }

  const row = {
    role: data.role,
    company: data.company,
    year: data.year,
    badge: data.badge || "",
    description: data.description || "",
    highlights: data.highlights || [],
  };

  let error;
  if (data.id) {
    const res = await supabase.from("portfolio_experiences").update(row).eq("id", data.id);
    error = res.error;
  } else {
    const res = await supabase.from("portfolio_experiences").insert(row);
    error = res.error;
  }

  if (error) {
    return { success: false, message: error.message };
  }

  revalidateAllPublicPaths();
  return { success: true, message: "Riwayat pengalaman berhasil disimpan!" };
}

export async function deleteExperienceAction(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  if (!supabase) return { success: false, message: "Koneksi database tidak tersedia." };

  const { error } = await supabase.from("portfolio_experiences").delete().eq("id", id);
  if (error) return { success: false, message: error.message };

  revalidateAllPublicPaths();
  return { success: true, message: "Pengalaman berhasil dihapus." };
}

// -----------------------------------------------------------------------------
// 6. Skills Actions
// -----------------------------------------------------------------------------

export async function saveSkillAction(name: string, category: "frontend" | "ml" | "backend"): Promise<ActionResult> {
  const supabase = await createClient();
  if (!supabase) return { success: false, message: "Koneksi database tidak tersedia." };

  if (!name.trim()) return { success: false, message: "Nama skill tidak boleh kosong." };

  const { error } = await supabase.from("portfolio_skills").insert({
    name: name.trim(),
    category,
  });

  if (error) return { success: false, message: error.message };

  revalidateAllPublicPaths();
  return { success: true, message: "Skill berhasil ditambahkan!" };
}

export async function deleteSkillAction(idOrName: string): Promise<ActionResult> {
  const supabase = await createClient();
  if (!supabase) return { success: false, message: "Koneksi database tidak tersedia." };

  const { error } = await supabase
    .from("portfolio_skills")
    .delete()
    .or(`id.eq.${idOrName},name.eq.${idOrName}`);

  if (error) return { success: false, message: error.message };

  revalidateAllPublicPaths();
  return { success: true, message: "Skill berhasil dihapus." };
}

// -----------------------------------------------------------------------------
// 7. Media Upload Action (Supabase Storage Bucket: portfolio-assets)
// -----------------------------------------------------------------------------

export async function uploadMediaAction(formData: FormData): Promise<ActionResult> {
  const file = formData.get("file") as File;
  if (!file || file.size === 0) {
    return { success: false, message: "Tidak ada file yang dipilih." };
  }

  const supabase = await createClient();
  if (!supabase) return { success: false, message: "Koneksi database tidak tersedia." };

  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const sanitizedName = file.name
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  const fileName = `${Date.now()}-${sanitizedName}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const { data, error } = await supabase.storage
    .from("portfolio-assets")
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    return { success: false, message: `Upload gagal: ${error.message}` };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("portfolio-assets").getPublicUrl(data.path);

  return {
    success: true,
    message: "Aset berhasil diunggah!",
    data: { url: publicUrl },
  };
}

// Helper to trigger instant On-Demand Revalidation across all routes
function revalidateAllPublicPaths() {
  try {
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/work");
    revalidatePath("/contact");
    revalidatePath("/admin");
  } catch (err) {
    console.warn("Revalidation notice:", err);
  }
}
