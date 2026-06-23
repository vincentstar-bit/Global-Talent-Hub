import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";
import { pool } from "@workspace/db";

const router: IRouter = Router();

router.get("/healthz", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

router.get("/healthz/db", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS time, current_database() AS db");
    return res.json({
      status: "ok",
      database: result.rows[0].db,
      serverTime: result.rows[0].time,
      usingSupabase: (process.env.DATABASE_URL ?? "").includes("supabase"),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(503).json({ status: "error", error: message });
  }
});

export default router;
