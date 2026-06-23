import { defineConfig } from "drizzle-kit";
import path from "path";

const dbCredentials = process.env.PGHOST
  ? {
      host: process.env.PGHOST!,
      port: Number(process.env.PGPORT ?? 5432),
      database: process.env.PGDATABASE!,
      user: process.env.PGUSER!,
      password: process.env.PGPASSWORD!,
      ssl: false,
    }
  : (() => {
      if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL or PG* env vars must be set");
      }
      return { url: process.env.DATABASE_URL };
    })();

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  out: path.join(__dirname, "../../supabase/migrations"),
  dialect: "postgresql",
  dbCredentials,
});
