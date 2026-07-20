import { Router } from "express";
import { db } from "@workspace/db";
import { jobRolesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAdmin } from "./auth";

const router = Router();

router.get("/jobs", async (req, res) => {
  try {
    const jobs = await db.select().from(jobRolesTable);
    return res.json(jobs);
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/jobs", requireAdmin, async (req, res) => {
  try {
    const [job] = await db.insert(jobRolesTable).values(req.body).returning();
    return res.status(201).json(job);
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/jobs/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [job] = await db.update(jobRolesTable).set(req.body).where(eq(jobRolesTable.id, id)).returning();
    if (!job) return res.status(404).json({ error: "Job not found" });
    return res.json(job);
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/jobs/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(jobRolesTable).where(eq(jobRolesTable.id, id));
    return res.status(204).send();
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
