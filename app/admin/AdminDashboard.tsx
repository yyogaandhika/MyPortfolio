"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Plus,
  Trash2,
  Pencil,
  Save,
  Upload,
  RefreshCw,
  LogOut,
  FolderGit2,
  User,
  Briefcase,
  Wrench,
  Check,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";
import { Project, Experience } from "@/types";
import { ProfileData } from "@/lib/data";
import { TechItem } from "@/data/skills";
import {
  logoutAdminAction,
  syncLocalDataToSupabaseAction,
  saveProjectAction,
  deleteProjectAction,
  saveProfileAction,
  saveExperienceAction,
  deleteExperienceAction,
  saveSkillAction,
  deleteSkillAction,
  uploadMediaAction,
} from "./actions";

interface AdminDashboardProps {
  initialProjects: Project[];
  initialProfile: ProfileData;
  initialExperiences: Experience[];
  initialSkills: TechItem[];
  userEmail: string;
}

export default function AdminDashboard({
  initialProjects,
  initialProfile,
  initialExperiences,
  initialSkills,
  userEmail,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "profile" | "experiences" | "skills">("projects");
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [skills, setSkills] = useState<TechItem[]>(initialSkills);

  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Project Modal State
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSavingProject, setIsSavingProject] = useState(false);

  // Skill Input State
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState<"frontend" | "ml" | "backend">("frontend");

  // Experience Modal State
  const [editingExperience, setEditingExperience] = useState<Partial<Experience> & { id?: string } | null>(null);
  const [isSavingExperience, setIsSavingExperience] = useState(false);

  const notify = (text: string, type: "success" | "error" = "success") => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 4000);
  };

  // 1. One-Click Baseline Seeding
  const handleSyncBaseline = async () => {
    if (!confirm("Sinkronkan seluruh data baseline lokal ke database Supabase sekarang?")) return;
    setIsSyncing(true);
    const res = await syncLocalDataToSupabaseAction();
    setIsSyncing(false);
    if (res.success) {
      notify(res.message || "Data berhasil disinkronkan!");
      window.location.reload();
    } else {
      notify(res.message || "Gagal sinkronisasi data.", "error");
    }
  };

  // 2. Handle Media Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: "image" | "cv") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setIsUploadingImage(true);
    const res = await uploadMediaAction(formData);
    setIsUploadingImage(false);

    const uploadData = res.data as { url?: string } | undefined;
    if (res.success && uploadData?.url) {
      if (targetField === "image" && editingProject) {
        setEditingProject({ ...editingProject, image: uploadData.url });
      }
      notify("File berhasil diunggah ke Supabase Storage!");
    } else {
      notify(res.message || "Upload gagal.", "error");
    }
  };

  // 3. Handle Project Save
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setIsSavingProject(true);
    const res = await saveProjectAction(editingProject);
    setIsSavingProject(false);

    if (res.success) {
      notify(res.message || "Proyek berhasil disimpan!");
      setEditingProject(null);
      window.location.reload();
    } else {
      notify(res.message || "Gagal menyimpan proyek.", "error");
    }
  };

  // 4. Handle Project Delete
  const handleDeleteProject = async (id: string | number, title: string) => {
    if (!confirm(`Hapus proyek "${title}" secara permanen?`)) return;
    const res = await deleteProjectAction(id.toString());
    if (res.success) {
      setProjects(projects.filter((p) => p.id !== id));
      notify("Proyek berhasil dihapus.");
    } else {
      notify(res.message || "Gagal menghapus proyek.", "error");
    }
  };

  // 5. Handle Profile Save
  const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await saveProfileAction(formData);
    if (res.success) {
      setProfile({
        ...profile,
        availability: (formData.get("availability") as string) || profile.availability,
        role: (formData.get("role") as string) || profile.role,
        location: (formData.get("location") as string) || profile.location,
        email: (formData.get("email") as string) || profile.email,
        cvUrl: (formData.get("cvUrl") as string) || profile.cvUrl,
        heroBio: (formData.get("heroBio") as string) || profile.heroBio,
      });
      notify("Profil berhasil diperbarui!");
    } else {
      notify(res.message || "Gagal memperbarui profil.", "error");
    }
  };

  // 6. Handle Skill Add & Delete
  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const res = await saveSkillAction(newSkillName, newSkillCategory);
    if (res.success) {
      setSkills([...skills, { name: newSkillName.trim(), category: newSkillCategory }]);
      setNewSkillName("");
      notify("Skill berhasil ditambahkan!");
    } else {
      notify(res.message || "Gagal menambahkan skill.", "error");
    }
  };

  const handleDeleteSkill = async (name: string) => {
    const res = await deleteSkillAction(name);
    if (res.success) {
      setSkills(skills.filter((s) => s.name !== name));
      notify("Skill berhasil dihapus.");
    } else {
      notify(res.message || "Gagal menghapus skill.", "error");
    }
  };

  // 7. Handle Experience Save & Delete
  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExperience) return;

    setIsSavingExperience(true);
    const res = await saveExperienceAction(editingExperience);
    setIsSavingExperience(false);

    if (res.success) {
      notify(res.message || "Pengalaman berhasil disimpan!");
      setEditingExperience(null);
      window.location.reload();
    } else {
      notify(res.message || "Gagal menyimpan pengalaman.", "error");
    }
  };

  const handleDeleteExperience = async (id?: string) => {
    if (!id) return;
    if (!confirm("Hapus pengalaman ini?")) return;
    const res = await deleteExperienceAction(id);
    if (res.success) {
      setExperiences((prev) => prev.filter((exp: Experience & { id?: string }) => exp.id !== id));
      notify("Pengalaman berhasil dihapus.");
    } else {
      notify(res.message || "Gagal menghapus pengalaman.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-black">
      {/* Top Banner & Header */}
      <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-display font-bold text-xl uppercase tracking-tighter text-white">
              Yoga<span className="text-accent">.</span>
            </Link>
            <span className="h-4 w-[1px] bg-white/20" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Admin Workspace
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono text-gray-500">
              ({userEmail})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSyncBaseline}
              disabled={isSyncing}
              className="py-1.5 px-3.5 bg-white/5 border border-white/15 text-gray-300 font-mono text-xs rounded-full hover:border-accent hover:text-accent transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Salin seluruh data baseline (6 proyek, skills, experiences) ke Supabase"
            >
              <RefreshCw size={12} className={isSyncing ? "animate-spin" : ""} />
              <span>{isSyncing ? "Syncing..." : "Sync Baseline Data"}</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="py-1.5 px-3.5 bg-white/10 text-white font-mono text-xs rounded-full hover:bg-white hover:text-black transition-colors flex items-center gap-1.5"
            >
              <span>Lihat Web</span>
              <ExternalLink size={12} />
            </Link>

            <button
              onClick={() => logoutAdminAction()}
              className="py-1.5 px-3.5 bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs rounded-full hover:bg-red-500 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut size={12} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 animate-bounce">
          <div
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-xs font-mono shadow-2xl backdrop-blur-md ${
              notification.type === "success"
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                : "bg-red-500/15 border-red-500/30 text-red-300"
            }`}
          >
            {notification.type === "success" ? <Check size={14} /> : <AlertCircle size={14} />}
            <span>{notification.text}</span>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-accent text-black font-bold shadow-lg"
                : "bg-zinc-950 text-gray-400 hover:text-white border border-white/10"
            }`}
          >
            <FolderGit2 size={14} />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "profile"
                ? "bg-accent text-black font-bold shadow-lg"
                : "bg-zinc-950 text-gray-400 hover:text-white border border-white/10"
            }`}
          >
            <User size={14} />
            <span>Profile & Status</span>
          </button>

          <button
            onClick={() => setActiveTab("experiences")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "experiences"
                ? "bg-accent text-black font-bold shadow-lg"
                : "bg-zinc-950 text-gray-400 hover:text-white border border-white/10"
            }`}
          >
            <Briefcase size={14} />
            <span>Experiences ({experiences.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "skills"
                ? "bg-accent text-black font-bold shadow-lg"
                : "bg-zinc-950 text-gray-400 hover:text-white border border-white/10"
            }`}
          >
            <Wrench size={14} />
            <span>The Arsenal ({skills.length})</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-6 pb-24">
        {/* ================================================================= */}
        {/* TAB 1: PROJECTS                                                   */}
        {/* ================================================================= */}
        {activeTab === "projects" && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
                  Daftar Proyek Portofolio
                </h2>
                <p className="text-xs text-gray-400 font-sans mt-1">
                  Kelola karya yang tampil di beranda dan halaman Work. Data otomatis terhubung dengan On-Demand Revalidation.
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingProject({
                    title: "",
                    slug: "",
                    category: "",
                    role: "",
                    year: new Date().getFullYear().toString(),
                    image: "",
                    demoUrl: "",
                    codeUrl: "",
                    description: "",
                    techStack: [],
                    impact: "",
                    hasCaseStudy: false,
                    demoAccounts: [],
                  })
                }
                className="py-2.5 px-5 bg-accent text-black font-semibold text-xs rounded-full flex items-center gap-2 hover:bg-white transition-colors cursor-pointer w-fit"
              >
                <Plus size={15} />
                <span>Tambah Proyek Baru</span>
              </button>
            </div>

            {/* Grid Proyek */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-white/10 bg-zinc-950/80 overflow-hidden flex flex-col justify-between hover:border-white/25 transition-all group"
                >
                  <div className="relative aspect-[16/10] bg-zinc-900 overflow-hidden">
                    <Image
                      src={p.image || "/ShowcaseStudio.png"}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-accent border border-white/10">
                        {p.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white mb-1">
                        {p.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-sans line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {p.techStack?.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingProject(p)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors cursor-pointer"
                          title="Edit Proyek"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id, p.title)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                          title="Hapus Proyek"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        {p.hasCaseStudy && p.slug && (
                          <Link
                            href={`/work/${p.slug}`}
                            target="_blank"
                            className="text-[11px] font-mono text-accent hover:underline flex items-center gap-1"
                          >
                            <span>Case Study</span>
                            <ExternalLink size={11} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: PROFILE & STATUS                                           */}
        {/* ================================================================= */}
        {activeTab === "profile" && (
          <div className="max-w-2xl bg-zinc-950/80 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-2">
              Pengaturan Profil & Status
            </h2>
            <p className="text-xs text-gray-400 font-sans mb-8">
              Ubah ketersediaan kerja (*availability pill*), bio hero, lokasi, dan link file CV PDF.
            </p>

            <form onSubmit={handleSaveProfile} className="flex flex-col gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                  Status Availability (Pill di Hero & Contact)
                </label>
                <input
                  type="text"
                  name="availability"
                  defaultValue={profile.availability}
                  placeholder="open for internship & freelance"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-accent focus:outline-none focus:border-accent transition-colors font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                    Peran / Role Title
                  </label>
                  <input
                    type="text"
                    name="role"
                    defaultValue={profile.role}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={profile.location}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                  Email Kontak
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={profile.email}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                  URL Dokumen CV (PDF)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="cvUrl"
                    defaultValue={profile.cvUrl}
                    className="flex-1 bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors font-mono"
                  />
                  <label className="py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-mono flex items-center gap-1.5 cursor-pointer shrink-0">
                    <Upload size={14} />
                    <span>Upload PDF</span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileUpload(e, "cv")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                  Hero Paragraph / Bio Singkat
                </label>
                <textarea
                  name="heroBio"
                  rows={3}
                  defaultValue={profile.heroBio}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="py-3.5 px-6 bg-accent text-black font-semibold text-xs uppercase tracking-widest rounded-full hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer w-fit mt-2"
              >
                <Save size={15} />
                <span>Simpan Perubahan Profil</span>
              </button>
            </form>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: EXPERIENCES                                                */}
        {/* ================================================================= */}
        {activeTab === "experiences" && (
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
                  Riwayat Pengalaman & Pendidikan
                </h2>
                <p className="text-xs text-gray-400 font-sans mt-1">
                  Linimasa pengalaman kerja, riset akademis, dan organisasi yang tampil di halaman About.
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingExperience({
                    role: "",
                    company: "",
                    year: new Date().getFullYear().toString(),
                    badge: "",
                    description: "",
                    highlights: [],
                  })
                }
                className="py-2.5 px-5 bg-accent text-black font-semibold text-xs rounded-full flex items-center gap-2 hover:bg-white transition-colors cursor-pointer w-fit"
              >
                <Plus size={15} />
                <span>Tambah Pengalaman</span>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-white/10 bg-zinc-950 flex flex-col sm:flex-row justify-between sm:items-start gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-display text-lg font-bold text-white">{exp.role}</span>
                      <span className="text-xs font-mono text-accent">({exp.year})</span>
                    </div>
                    <p className="text-xs text-gray-400 font-mono mb-2">{exp.company}</p>
                    <p className="text-xs text-gray-300 font-sans leading-relaxed">{exp.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingExperience(exp)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteExperience((exp as { id?: string }).id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                      title="Hapus"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: THE ARSENAL (SKILLS)                                       */}
        {/* ================================================================= */}
        {activeTab === "skills" && (
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
                The Arsenal (Daftar Keahlian & Tech Stack)
              </h2>
              <p className="text-xs text-gray-400 font-sans mt-1">
                Keahlian teknologi interaktif yang tampil mengambang pada beranda.
              </p>
            </div>

            {/* Quick Add Form */}
            <form onSubmit={handleAddSkill} className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-zinc-950 border border-white/10">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Nama Skill (misal: Docker, Zustand, WebGL)"
                className="flex-1 min-w-[200px] bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent"
              />
              <select
                value={newSkillCategory}
                onChange={(e) => setNewSkillCategory(e.target.value as "frontend" | "ml" | "backend")}
                className="bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent"
              >
                <option value="frontend">Frontend & Creative</option>
                <option value="ml">Machine Learning & Data</option>
                <option value="backend">Backend & APIs</option>
              </select>
              <button
                type="submit"
                className="py-2.5 px-5 bg-accent text-black font-semibold text-xs rounded-xl hover:bg-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>Tambah Skill</span>
              </button>
            </form>

            {/* Skills Display by Category */}
            {(["frontend", "ml", "backend"] as const).map((cat) => {
              const catSkills = skills.filter((s) => s.category === cat);
              const label =
                cat === "frontend"
                  ? "Frontend & Creative"
                  : cat === "ml"
                  ? "Machine Learning & Data"
                  : "Backend & APIs";

              return (
                <div key={cat} className="p-6 rounded-2xl bg-zinc-950/70 border border-white/10">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-4">
                    {label} ({catSkills.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {catSkills.map((s) => (
                      <div
                        key={s.name}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 group hover:border-red-500/50 hover:bg-red-500/10 transition-colors"
                      >
                        <span>{s.name}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteSkill(s.name)}
                          className="text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                          title="Hapus"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* =================================================================== */}
      {/* MODAL: EDIT / CREATE PROJECT                                        */}
      {/* =================================================================== */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-950 border border-white/15 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setEditingProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-6">
              {editingProject.id ? "Edit Proyek" : "Tambah Proyek Baru"}
            </h3>

            <form onSubmit={handleSaveProject} className="flex flex-col gap-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                  Judul Proyek *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="Showcase Studio – 3D Mockup Generator"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                    Kategori *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.category || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    placeholder="Creative Dev & 3D WebGL"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                    Peran / Role
                  </label>
                  <input
                    type="text"
                    value={editingProject.role || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                    placeholder="Full-Stack Developer"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                    Live Demo URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={editingProject.demoUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                    GitHub Code URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={editingProject.codeUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, codeUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent font-mono text-xs"
                  />
                </div>
              </div>

              {/* Image URL & Upload */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                  Mockup / Gambar Cover Proyek *
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    required
                    value={editingProject.image || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    placeholder="/ShowcaseStudio.png atau https://..."
                    className="flex-1 bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent font-mono"
                  />
                  <label className="py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-mono flex items-center gap-1.5 cursor-pointer shrink-0">
                    <Upload size={13} />
                    <span>{isUploadingImage ? "Uploading..." : "Upload"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isUploadingImage}
                      onChange={(e) => handleFileUpload(e, "image")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                  Deskripsi Singkat *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.description || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="Ringkasan fitur dan arsitektur proyek..."
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                  Tech Stack (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={editingProject.techStack?.join(", ") || ""}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      techStack: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="Next.js 15, React 19, Supabase, Tailwind CSS"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="hasCaseStudy"
                  checked={Boolean(editingProject.hasCaseStudy)}
                  onChange={(e) => setEditingProject({ ...editingProject, hasCaseStudy: e.target.checked })}
                  className="rounded border-white/20 text-accent focus:ring-accent"
                />
                <label htmlFor="hasCaseStudy" className="text-xs font-sans text-gray-300">
                  Tampilkan tombol &quot;Case Study&quot; untuk proyek ini
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="py-2.5 px-5 bg-white/5 border border-white/10 text-gray-400 text-xs rounded-full hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSavingProject}
                  className="py-2.5 px-6 bg-accent text-black font-semibold text-xs rounded-full hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isSavingProject ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Save size={14} />
                      <span>Simpan Proyek</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / CREATE EXPERIENCE */}
      {editingExperience && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-950 border border-white/15 rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setEditingExperience(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white mb-6">
              {editingExperience.id ? "Edit Pengalaman" : "Tambah Pengalaman Baru"}
            </h3>

            <form onSubmit={handleSaveExperience} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                  Peran / Posisi *
                </label>
                <input
                  type="text"
                  required
                  value={editingExperience.role || ""}
                  onChange={(e) => setEditingExperience({ ...editingExperience, role: e.target.value })}
                  placeholder="Frontend Developer"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                  Perusahaan / Klien / Organisasi *
                </label>
                <input
                  type="text"
                  required
                  value={editingExperience.company || ""}
                  onChange={(e) => setEditingExperience({ ...editingExperience, company: e.target.value })}
                  placeholder="SI TUAH – Diskominfo Kota Dumai"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                    Tahun *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingExperience.year || ""}
                    onChange={(e) => setEditingExperience({ ...editingExperience, year: e.target.value })}
                    placeholder="2026 atau 2024 - Present"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                    Badge Kategori
                  </label>
                  <input
                    type="text"
                    value={editingExperience.badge || ""}
                    onChange={(e) => setEditingExperience({ ...editingExperience, badge: e.target.value })}
                    placeholder="Client & Flagship"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                  Deskripsi Singkat *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingExperience.description || ""}
                  onChange={(e) => setEditingExperience({ ...editingExperience, description: e.target.value })}
                  placeholder="Ringkasan tanggung jawab..."
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                  Highlights (Pisahkan dengan baris baru / enter)
                </label>
                <textarea
                  rows={3}
                  value={editingExperience.highlights?.join("\n") || ""}
                  onChange={(e) =>
                    setEditingExperience({
                      ...editingExperience,
                      highlights: e.target.value.split("\n").filter(Boolean),
                    })
                  }
                  placeholder="Poin pencapaian 1&#10;Poin pencapaian 2"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent font-sans"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingExperience(null)}
                  className="py-2.5 px-5 bg-white/5 border border-white/10 text-gray-400 text-xs rounded-full hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSavingExperience}
                  className="py-2.5 px-6 bg-accent text-black font-semibold text-xs rounded-full hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isSavingExperience ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Save size={14} />
                      <span>Simpan Pengalaman</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
