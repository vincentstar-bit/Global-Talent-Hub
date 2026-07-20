import { Router } from "express";
import { db } from "@workspace/db";
import { leaveLettersTable, workersTable, leaveTypesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAdmin } from "./auth";

const router = Router();

async function enrichLetter(l: any) {
  const [worker] = await db.select({ firstName: workersTable.firstName, lastName: workersTable.lastName })
    .from(workersTable).where(eq(workersTable.id, l.workerId));
  const [leaveType] = await db.select({ name: leaveTypesTable.name })
    .from(leaveTypesTable).where(eq(leaveTypesTable.id, l.leaveTypeId));
  return {
    ...l,
    workerName: worker ? `${worker.firstName} ${worker.lastName}` : null,
    leaveTypeName: leaveType?.name ?? null,
    createdAt: l.createdAt instanceof Date ? l.createdAt.toISOString() : l.createdAt,
  };
}

router.post("/leave-letters", async (req, res) => {
  try {
    const [letter] = await db.insert(leaveLettersTable).values(req.body).returning();
    return res.status(201).json(await enrichLetter(letter));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/leave-letters", requireAdmin, async (req, res) => {
  try {
    const { workerId } = req.query as Record<string, string>;
    const letters = workerId
      ? await db.select().from(leaveLettersTable).where(eq(leaveLettersTable.workerId, parseInt(workerId)))
      : await db.select().from(leaveLettersTable);
    const enriched = await Promise.all(letters.map(enrichLetter));
    return res.json(enriched);
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
