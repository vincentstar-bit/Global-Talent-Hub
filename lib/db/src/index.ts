import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

function sanitizeConnectionUrl(url: string): string {
  try {
    new URL(url);
    return url;
  } catch {
    // Password likely contains special characters that aren't URL-encoded.
    // Parse manually: protocol://user:password@host:port/db?params
    const match = url.match(/^(postgresql|postgres):\/\/([^:]+):(.+)@(.+)$/);
    if (!match) return url;
    const [, protocol, user, rest] = match;
    // Split password from host (last @ wins)
    const atIndex = url.lastIndexOf("@");
    const beforeAt = url.slice(`${protocol}://${user}:`.length, atIndex);
    const afterAt = url.slice(atIndex + 1);
    const encodedPassword = encodeURIComponent(beforeAt);
    return `${protocol}://${user}:${encodedPassword}@${afterAt}`;
  }
}

const connectionString = sanitizeConnectionUrl(process.env.DATABASE_URL);

export const pool = new Pool({ connectionString });

export const db = drizzle(pool, { schema });

export * from "./schema";
