import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

function sanitizeConnectionUrl(url: string): string {
  try {
    new URL(url);
    return url;
  } catch {
    const match = url.match(/^(postgresql|postgres):\/\/([^:]+):(.+)@(.+)$/);
    if (!match) return url;
    const [, protocol, user] = match;
    const atIndex = url.lastIndexOf("@");
    const beforeAt = url.slice(`${protocol}://${user}:`.length, atIndex);
    const afterAt = url.slice(atIndex + 1);
    const encodedPassword = encodeURIComponent(beforeAt);
    return `${protocol}://${user}:${encodedPassword}@${afterAt}`;
  }
}

const connectionString = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("SUPABASE_DATABASE_URL (or DATABASE_URL) must be set.");
}

export const pool = new Pool({
  connectionString: sanitizeConnectionUrl(connectionString),
});

export const db = drizzle(pool, { schema });

export * from "./schema";
