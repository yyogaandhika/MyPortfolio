# 1. Supabase-Backed Admin Workspace for Portfolio Content Management

Date: 2026-11-06

## Status
Accepted

## Context
The portfolio website for Mhd. Yoga Andhika was originally engineered as a static Next.js 16 application with content stored directly in hardcoded TypeScript modules (`data/projects.ts`, `data/experiences.ts`, `data/skills.ts`, `data/contact.ts`). 

Adding, updating, or editing project showcases, work histories, status badges, and testing credentials required editing source code, creating Git commits, and triggering Vercel build pipelines. The developer desires a dedicated Admin Workspace (`/admin`) to update portfolio entries directly from any browser without code modifications.

## Decision
We will build a custom **Admin Workspace (`/admin`)** backed by **Supabase (PostgreSQL, Supabase Auth, and Supabase Storage)** using Next.js Server Actions and On-Demand Cache Revalidation (`revalidatePath`).

Key architectural choices:
1. **Supabase PostgreSQL Database**: Stores relational records for `projects`, `experiences`, `skills`, and `profile_settings`.
2. **Supabase Auth**: Enforces Single-Owner Authentication on route `/admin` via Next.js Middleware.
3. **Supabase Storage Bucket (`portfolio-assets`)**: Serves public image mockups and CV PDFs via CDN.
4. **On-Demand Cache Revalidation**: Public pages remain blazingly fast Server Components served from the Next.js cache. Mutations in `/admin` invoke `revalidatePath('/')` and `revalidatePath('/work')` for instant updates without full site rebuilds.
5. **Local Fallback Baseline**: If Supabase credentials are not populated or unreachable, the application gracefully reads from existing `data/*.ts` modules to guarantee zero downtime.

## Alternatives Considered
- **Git-based CMS (Keystatic / TinaCMS)**: Rejected due to reliance on Git commits triggering full Vercel build cycles (~1-2 minute latency per update) and lack of native cloud object storage for binary mockups.
- **Third-Party Headless CMS (Sanity / Strapi / Contentful)**: Rejected to avoid external vendor lock-in and API quota constraints. Leveraging Supabase aligns with the developer's verified full-stack stack (as built in the Dharma Loka project).

## Consequences
- **Positive**: Instant content updates without IDE or coding; drag-and-drop media uploads; single-owner administrative security; zero loss in public page speed.
- **Trade-off**: Requires provisioning a Supabase project and setting up environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).

