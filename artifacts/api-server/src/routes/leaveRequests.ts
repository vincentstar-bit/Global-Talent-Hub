import { Router } from "express";
import { db } from "@workspace/db";
import { leaveRequestsTable, workersTable, leaveTypesTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAdmin } from "./auth";
import { sendLeaveRequestConfirmation, sendLeaveStatusUpdate } from "../lib/email";

const router = Router();

async function enrichRequest(r: any) {
  const [worker] = await db
    .select({ firstName: workersTable.firstName, lastName: workersTable.lastName, email: workersTable.email })
    .from(workersTable)
    .where(eq(workersTable.id, r.workerId));

  const [leaveType] = await db
    .select({ name: leaveTypesTable.name })
    .from(leaveTypesTable)
    .where(eq(leaveTypesTable.id, r.leaveTypeId));

  // Prefer the contactEmail the worker entered on the form; fall back to their profile email
  const notifyEmail = r.contactEmail || worker?.email || null;

  return {
    ...r,
    workerName: worker ? `${worker.firstName} ${worker.lastName}` : null,
    workerEmail: worker?.email ?? null,
    notifyEmail,
    leaveTypeName: leaveType?.name ?? null,
    createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : r.createdAt,
  };
}

router.get("/leave-requests/by-email/:email", async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email).toLowerCase().trim();
    const requests = await db.select().from(leaveRequestsTable).where(eq(leaveRequestsTable.contactEmail, email));
    if (!requests.length) return res.status(404).json({ error: "No records found for this email address" });
    const enriched = await Promise.all(requests.map(enrichRequest));
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
    const conditions: any[] = [];
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
    const enriched = await enrichRequest(request);

    const toEmail = enriched.notifyEmail;
    if (toEmail) {
      sendLeaveRequestConfirmation({
        workerName: enriched.workerName || "Worker",
        toEmail,
        leaveTypeName: enriched.leaveTypeName || "Leave",
        startDate: request.startDate,
        endDate: request.endDate,
        requestId: request.id,
        reason: request.reason ?? undefined,
      }).catch((err) => console.error("[email] confirmation send failed:", err));
    }

    return res.status(201).json(enriched);
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
    const [request] = await db
      .update(leaveRequestsTable)
      .set(req.body)
      .where(eq(leaveRequestsTable.id, id))
      .returning();
    if (!request) return res.status(404).json({ error: "Not found" });
    const enriched = await enrichRequest(request);

    const newStatus = req.body.status;
    const toEmail = enriched.notifyEmail;

    let emailSent = false;
    if ((newStatus === "approved" || newStatus === "rejected") && toEmail) {
      try {
        await sendLeaveStatusUpdate({
          workerName: enriched.workerName || "Worker",
          toEmail,
          leaveTypeName: enriched.leaveTypeName || "Leave",
          startDate: request.startDate,
          endDate: request.endDate,
          requestId: request.id,
          status: newStatus,
          adminNote: request.adminNote ?? undefined,
        });
        emailSent = true;
      } catch (err) {
        console.error("[email] status update send failed:", err);
      }
    }

    return res.json({ ...enriched, emailSent, emailSentTo: emailSent ? toEmail : null });
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
