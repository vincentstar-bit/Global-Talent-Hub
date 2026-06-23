import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

const poolConfig = process.env.PGHOST
  ? {
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT ?? 5432),
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      ssl: false,
    }
  : (() => {
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
      return { connectionString: sanitizeConnectionUrl(process.env.DATABASE_URL) };
    })();

export const pool = new Pool(poolConfig);

export const db = drizzle(pool, { schema });

export * from "./schema";
