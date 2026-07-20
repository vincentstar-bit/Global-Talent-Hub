import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";
import { pool } from "@workspace/db";

const router: IRouter = Router();

router.get("/healthz", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

router.get("/healthz/db", async (_req, res) => {
  const rawUrl = process.env.DATABASE_URL ?? "";
  let maskedUrl = "(not set)";
  try {
    const u = new URL(rawUrl);
    maskedUrl = `${u.protocol}//${u.username}:***@${u.host}${u.pathname}${u.search}`;
  } catch {
    maskedUrl = `(unparseable — starts with: ${rawUrl.slice(0, 30)}...)`;
  }

  try {
    const result = await pool.query("SELECT NOW() AS time, current_database() AS db");
    return res.json({
      status: "ok",
      database: result.rows[0].db,
      serverTime: result.rows[0].time,
      usingReplit: true,
      connectionUrl: maskedUrl,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(503).json({ status: "error", error: message, connectionUrl: maskedUrl });
  }
});

export default router;
