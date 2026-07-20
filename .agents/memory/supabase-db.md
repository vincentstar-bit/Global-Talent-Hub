---
name: Supabase DB connection
description: The project uses Supabase PostgreSQL, not Replit's built-in DB. Connection config details.
---

The database is Supabase PostgreSQL, connected via the `SUPABASE_DATABASE_URL` Replit secret.

`lib/db/src/index.ts` reads `process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL` and passes `ssl: { rejectUnauthorized: false }` to the pg Pool.

`lib/db/drizzle.config.ts` does the same for schema push operations.

**Why:** User moved from Railway (suspended) → Render (too slow) → Supabase. All worker/job/leave data lives in Supabase. Do NOT provision or use Replit's built-in PostgreSQL for this project — it would be empty.

**How to apply:** When adding new DB config or connection code, always use `SUPABASE_DATABASE_URL || DATABASE_URL` and always pass `ssl: { rejectUnauthorized: false }`.
