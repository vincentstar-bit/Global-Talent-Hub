import { Router } from "express";
import { db } from "@workspace/db";
import { workersTable, leaveTypesTable } from "@workspace/db";
import { eq, ilike, and, or } from "drizzle-orm";
import { requireAdmin } from "./auth";
import { sendAdminMessageToWorker, sendWorkerLookupAlert } from "../lib/email";

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

function sanitizeWorkerInput(body: Record<string, any>) {
  const nullableFields = ["email", "phone", "assignedCountry", "countryEntryDate", "countryStayYears", "photoUrl", "nationality", "passportNumber", "hiredBy", "notes"];
  const result = { ...body };
  for (const field of nullableFields) {
    if (result[field] === "" || result[field] === undefined) {
      result[field] = null;
    }
  }
  if (result.countryStayYears !== null && result.countryStayYears !== undefined) {
    result.countryStayYears = Number(result.countryStayYears) || null;
  }
  return result;
}

router.post("/workers", requireAdmin, async (req, res) => {
  try {
    const accessToken = generateAccessToken();
    const data = { ...sanitizeWorkerInput(req.body), accessToken };
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
    const isRefetch = req.headers["x-query-refetch"] === "true";
    if (!isRefetch) {
      const xRealIp = req.headers["x-real-ip"] as string;
      const xForwarded = req.headers["x-forwarded-for"] as string;
      const ipAddress = xRealIp?.trim() || xForwarded?.split(",").pop()?.trim() || req.socket.remoteAddress || "Unknown";
      sendWorkerLookupAlert({
        workerName: `${worker.firstName} ${worker.lastName}`,
        lookupType: "token",
        ipAddress,
        userAgent: req.headers["user-agent"] || "Unknown",
      }).catch((err) => console.error("[alert] Failed to send worker lookup alert:", err?.message || err));
    }
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

router.post("/workers/:id/email", requireAdmin, async (req: any, res: any) => {
  try {
    const id = parseInt(req.params.id);
    const { subject, message } = req.body ?? {};

    if (!subject || typeof subject !== "string" || !subject.trim()) {
      return res.status(400).json({ error: "Subject is required." });
    }
    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return res.status(400).json({ error: "Message must be at least 5 characters." });
    }

    const [worker] = await db.select().from(workersTable).where(eq(workersTable.id, id));
    if (!worker) return res.status(404).json({ error: "Worker not found" });
    if (!worker.email) return res.status(400).json({ error: "This worker has no email address on file." });

    const senderName = req.adminSession?.username
      ? `${req.adminSession.username} (HR Admin)`
      : "HR Administration";

    await sendAdminMessageToWorker({
      workerName: `${worker.firstName} ${worker.lastName}`,
      toEmail: worker.email,
      subject: subject.trim(),
      message: message.trim(),
      senderName,
    });

    return res.json({ ok: true, sentTo: worker.email });
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Failed to send email." });
  }
});

export default router;
