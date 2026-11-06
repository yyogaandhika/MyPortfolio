-- ==============================================================================
-- Schema Portofolio Mhd. Yoga Andhika (Supabase PostgreSQL)
-- Jalankan skrip ini langsung di menu "SQL Editor" pada dashboard Supabase kamu.
-- ==============================================================================

-- 1. Tabel Proyek (Projects)
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  role TEXT,
  year TEXT,
  image TEXT NOT NULL,
  demo_url TEXT NOT NULL,
  code_url TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}'::TEXT[],
  impact TEXT,
  has_case_study BOOLEAN DEFAULT false,
  demo_accounts JSONB DEFAULT '[]'::JSONB,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Pengaturan Profil & Status (Profile & Availability)
CREATE TABLE IF NOT EXISTS public.portfolio_profile (
  id TEXT PRIMARY KEY DEFAULT 'profile',
  name TEXT NOT NULL DEFAULT 'Mhd. Yoga Andhika',
  role TEXT NOT NULL DEFAULT 'Full-Stack & Creative Developer',
  location TEXT NOT NULL DEFAULT 'Pekanbaru, Indonesia',
  availability TEXT NOT NULL DEFAULT 'open for internship & freelance',
  email TEXT NOT NULL DEFAULT 'yogaandika395@gmail.com',
  cv_url TEXT NOT NULL DEFAULT '/CV_Mhd_Yoga_Andhika.pdf',
  hero_bio TEXT DEFAULT 'Crafting fluid, interactive web applications with Next.js & GSAP, and bridging thoughtful user interfaces with Machine Learning systems.',
  philosophy TEXT DEFAULT 'I believe compelling digital products exist at the intersection of solid engineering and purposeful interaction. Rather than building static interfaces, I craft web applications that feel fluid, responsive, and genuinely enjoyable to use.',
  background TEXT DEFAULT 'Currently pursuing a Bachelor of Applied Science (D4) in Informatics Engineering at Politeknik Caltex Riau (GPA 3.21/4.00), I specialize in modern frontend engineering using React, Next.js, Three.js, and GSAP animations. Alongside frontend craft, I actively engineer Machine Learning pipelines, RESTful APIs, and AI-integrated web platforms.',
  socials JSONB DEFAULT '[]'::JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabel Riwayat Pengalaman & Pendidikan (Experiences)
CREATE TABLE IF NOT EXISTS public.portfolio_experiences (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  year TEXT NOT NULL,
  badge TEXT,
  description TEXT NOT NULL,
  highlights TEXT[] DEFAULT '{}'::TEXT[],
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabel Keahlian (Skills / The Arsenal)
CREATE TABLE IF NOT EXISTS public.portfolio_skills (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('frontend', 'ml', 'backend')),
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- KEAMANAN: Row Level Security (RLS)
-- Publik: Boleh membaca (SELECT)
-- Admin (Login via Supabase Auth): Boleh mengelola penuh (INSERT, UPDATE, DELETE)
-- ==============================================================================

ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_skills ENABLE ROW LEVEL SECURITY;

-- Policy Projects
CREATE POLICY "Public can view portfolio_projects" ON public.portfolio_projects
  FOR SELECT USING (true);

CREATE POLICY "Admin can modify portfolio_projects" ON public.portfolio_projects
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Policy Profile
CREATE POLICY "Public can view portfolio_profile" ON public.portfolio_profile
  FOR SELECT USING (true);

CREATE POLICY "Admin can modify portfolio_profile" ON public.portfolio_profile
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Policy Experiences
CREATE POLICY "Public can view portfolio_experiences" ON public.portfolio_experiences
  FOR SELECT USING (true);

CREATE POLICY "Admin can modify portfolio_experiences" ON public.portfolio_experiences
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Policy Skills
CREATE POLICY "Public can view portfolio_skills" ON public.portfolio_skills
  FOR SELECT USING (true);

CREATE POLICY "Admin can modify portfolio_skills" ON public.portfolio_skills
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- STORAGE BUCKET: portfolio-assets
-- ==============================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policy Storage Publik Baca
CREATE POLICY "Public Access for portfolio-assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio-assets');

-- Policy Storage Admin Upload / Edit / Delete
CREATE POLICY "Admin Upload portfolio-assets" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-assets');

CREATE POLICY "Admin Update portfolio-assets" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-assets');

CREATE POLICY "Admin Delete portfolio-assets" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'portfolio-assets');

