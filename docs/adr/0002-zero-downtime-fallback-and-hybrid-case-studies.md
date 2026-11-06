# 2. Zero-Downtime Local Fallback and Hybrid Case Study Architecture

Date: 2026-11-06

## Status
Accepted

## Context
Transitioning a personal developer portfolio from static TypeScript modules to a dynamic database introduces availability and resilience risks:
1. If the database is misconfigured, unprovisioned during local development, or temporarily unreachable, public viewers should never see a blank page or 500 error.
2. The portfolio contains high-fidelity flagship case studies (Showcase Studio 3D WebGL, Sekolah Dharma Loka with interactive testing credentials, SI TUAH sectoral analytics). Storing these solely as raw database markdown would degrade their bespoke interactive UI components.

## Decision
1. **Zero-Downtime Local Fallback Baseline**:
   Data access functions will attempt to query Supabase first. If the Supabase client is not initialized or the database returns an error/empty state, the application seamlessly resolves to the hardcoded local baseline in `data/*.ts`.
2. **Hybrid Case Study Architecture**:
   Flagship case studies retain their dedicated TSX route implementations (`app/work/[slug]/page.tsx`), reading dynamic metadata (demo links, visibility, testing accounts) from the database. Any newly added project created via the Admin Workspace without a dedicated TSX file automatically renders via a dynamic template route.
3. **One-Click Automated Seed Pipeline**:
   Provide `npm run db:seed` to batch insert existing projects, experiences, skills, and profile data into Supabase PostgreSQL within seconds.
4. **Public Assets Storage Bucket**:
   Create a dedicated Supabase Storage bucket (`portfolio-assets`) configured for public reads and authenticated uploads for project mockup images and curriculum vitae documents.

## Consequences
- **Positive**: Absolute reliability for public visitors (zero downtime); high-fidelity design preserved for flagship projects; rapid frictionless setup via automated seeding.
- **Negative**: The data layer maintains two sources of truth until seeding is completed, requiring a clean abstraction layer (`lib/data.ts`) to manage precedence.

