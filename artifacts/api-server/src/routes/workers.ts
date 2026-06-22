import { Router } from "express";
import { db } from "@workspace/db";
import { workersTable, leaveTypesTable } from "@workspace/db";
import { eq, ilike, and, or } from "drizzle-orm";
import { requireAdmin } from "./auth";

const router = Router();

function generateAccessToken() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let token = "SGE-";
  for (let i = 0; i < 10; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
    if (i === 4) token += "-";
  }
  return token;
}

function serializeWorker(w: any) {
  return {
    ...w,
    paymentAmount: parseFloat(w.paymentAmount || "0"),
    paymentPaid: parseFloat(w.paymentPaid || "0"),
    countryStayYears: w.countryStayYears ?? null,
    createdAt: w.createdAt instanceof Date ? w.createdAt.toISOString() : w.createdAt,
  };
}

router.get("/workers", requireAdmin, async (req, res) => {
  try {
    const { search, department, status } = req.query as Record<string, string>;
    let conditions: any[] = [];
    if (department) conditions.push(eq(workersTable.department, department));
    if (status) conditions.push(eq(workersTable.status, status));
    if (search) {
      conditions.push(
        or(
          ilike(workersTable.firstName, `%${search}%`),
          ilike(workersTable.lastName, `%${search}%`),
          ilike(workersTable.jobTitle, `%${search}%`),
          ilike(workersTable.email, `%${search}%`),
          ilike(workersTable.accessToken, `%${search}%`)
        )
      );
    }
    const workers = conditions.length > 0
      ? await db.select().from(workersTable).where(and(...conditions))
      : await db.select().from(workersTable);
    return res.json(workers.map(serializeWorker));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/workers", requireAdmin, async (req, res) => {
  try {
    const accessToken = generateAccessToken();
    const data = { ...req.body, accessToken };
    const [worker] = await db.insert(workersTable).values(data).returning();
    return res.status(201).json(serializeWorker(worker));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/workers/token/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const [worker] = await db.select().from(workersTable).where(eq(workersTable.accessToken, token));
    if (!worker) return res.status(404).json({ error: "Worker not found" });
    const leaveTypes = await db.select().from(leaveTypesTable).where(eq(leaveTypesTable.isActive, true));
    return res.json({
      ...serializeWorker(worker),
      leaveTypes: leaveTypes.map((lt) => ({
        ...lt,
        amount: parseFloat(lt.amount || "0"),
      })),
    });
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/workers/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [worker] = await db.select().from(workersTable).where(eq(workersTable.id, id));
    if (!worker) return res.status(404).json({ error: "Worker not found" });
    return res.json(serializeWorker(worker));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/workers/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [worker] = await db.update(workersTable).set(req.body).where(eq(workersTable.id, id)).returning();
    if (!worker) return res.status(404).json({ error: "Worker not found" });
    return res.json(serializeWorker(worker));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/workers/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(workersTable).where(eq(workersTable.id, id));
    return res.status(204).send();
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
