import { Router } from "express";
import { db } from "@workspace/db";
import { leaveRequestsTable, workersTable, leaveTypesTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAdmin } from "./auth";

const router = Router();

async function enrichRequest(r: any) {
  const [worker] = await db.select({ firstName: workersTable.firstName, lastName: workersTable.lastName })
    .from(workersTable).where(eq(workersTable.id, r.workerId));
  const [leaveType] = await db.select({ name: leaveTypesTable.name })
    .from(leaveTypesTable).where(eq(leaveTypesTable.id, r.leaveTypeId));
  return {
    ...r,
    workerName: worker ? `${worker.firstName} ${worker.lastName}` : null,
    leaveTypeName: leaveType?.name ?? null,
    createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : r.createdAt,
  };
}

router.get("/leave-requests/by-email/:email", async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email).toLowerCase().trim();
    const workers = await db.select().from(workersTable).where(eq(workersTable.email, email));
    if (!workers.length) return res.status(404).json({ error: "No records found for this email address" });
    const allRequests: any[] = [];
    for (const w of workers) {
      const requests = await db.select().from(leaveRequestsTable).where(eq(leaveRequestsTable.workerId, w.id));
      allRequests.push(...requests);
    }
    const enriched = await Promise.all(allRequests.map(enrichRequest));
    return res.json(enriched.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/leave-requests/worker/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const [worker] = await db.select().from(workersTable).where(eq(workersTable.accessToken, token));
    if (!worker) return res.status(404).json({ error: "Worker not found" });
    const requests = await db.select().from(leaveRequestsTable).where(eq(leaveRequestsTable.workerId, worker.id));
    const enriched = await Promise.all(requests.map(enrichRequest));
    return res.json(enriched.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/leave-requests", requireAdmin, async (req, res) => {
  try {
    const { workerId, status } = req.query as Record<string, string>;
    let conditions: any[] = [];
    if (workerId) conditions.push(eq(leaveRequestsTable.workerId, parseInt(workerId)));
    if (status) conditions.push(eq(leaveRequestsTable.status, status));
    const requests = conditions.length > 0
      ? await db.select().from(leaveRequestsTable).where(and(...conditions))
      : await db.select().from(leaveRequestsTable);
    const enriched = await Promise.all(requests.map(enrichRequest));
    return res.json(enriched);
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/leave-requests", async (req, res) => {
  try {
    const [request] = await db.insert(leaveRequestsTable).values(req.body).returning();
    return res.status(201).json(await enrichRequest(request));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/leave-requests/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [request] = await db.select().from(leaveRequestsTable).where(eq(leaveRequestsTable.id, id));
    if (!request) return res.status(404).json({ error: "Not found" });
    return res.json(await enrichRequest(request));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/leave-requests/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [request] = await db.update(leaveRequestsTable).set(req.body).where(eq(leaveRequestsTable.id, id)).returning();
    if (!request) return res.status(404).json({ error: "Not found" });
    return res.json(await enrichRequest(request));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
