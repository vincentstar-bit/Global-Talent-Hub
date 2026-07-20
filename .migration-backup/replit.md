# SinoGlobal Enterprise Co., Ltd.

A comprehensive corporate website and admin management system for a Chinese multinational company headquartered in Beijing — featuring a public-facing website, worker self-service portal, and a full admin dashboard for HR management.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/company-site run dev` — run the frontend (port 23831)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/scripts run seed` — seed job roles and leave types
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS v4, wouter routing, TanStack Query
- API: Express 5 + cookie-parser for session auth
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — source-of-truth for all API contracts
- `lib/db/src/schema/` — Drizzle ORM schema definitions (workers, jobs, leaveTypes, leaveRequests, leaveLetters)
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/company-site/src/pages/` — all React pages
- `artifacts/company-site/src/index.css` — Tailwind theme (navy #0d1b2e + gold #c9a227)
- `scripts/src/seed.ts` — seed script for jobs and leave types

## Architecture decisions

- Session auth uses an in-memory Map + `admin_session` cookie (not JWT). Sessions are lost on server restart.
- Workers get a unique `SGE-XXXXX-XXXXX` format access token generated at creation time. Public portal uses token lookup (no auth required).
- All admin routes require `requireAdmin` middleware (cookie-based session check).
- Jobs API (`GET /api/jobs`) is public (no auth); all write ops require admin.
- Worker portal is stateless — workers enter their token to look up their own profile.

## Product

**Public website**: Home, About Us (history, team, certifications), Careers (live job listings with filter + expand), Contact (global offices + enquiry form).

**Worker Self-Service Portal**: Enter access token → view contract details, payment status/progress, country assignment + time remaining, available leave types. Apply for leave in 3 steps: select type → pick dates → write formal letter.

**Admin Dashboard** (`/admin/login`, credentials: `admin` / `SinoGlobal@2024`):
- Dashboard overview with stats and charts
- Workers: full CRUD with search/filter, access token copy, contract + payment details, country assignment tracking
- Job Roles: manage public listings (CRUD modal)
- Leave Types: configure types with max days, compensation amounts, approval requirements
- Leave Requests: approve/reject with admin notes
- Leave Letters: view formal letters submitted by workers

## Gotchas

- Admin sessions are in-memory; restarting the API server logs everyone out.
- `@workspace/db` exports `jobRolesTable` (not `jobsTable`) — check schema before new inserts.
- `cookie-parser` must come before routes in `app.ts` for session cookies to work.
- Run `pnpm --filter @workspace/api-spec run codegen` after any OpenAPI changes before building the frontend.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
