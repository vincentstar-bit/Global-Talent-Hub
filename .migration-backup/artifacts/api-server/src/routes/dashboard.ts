import { Router } from "express";
import { db } from "@workspace/db";
import { workersTable, leaveRequestsTable } from "@workspace/db";
import { eq, count } from "drizzle-orm";
import { requireAdmin } from "./auth";

const router = Router();

router.get("/dashboard/stats", requireAdmin, async (req, res) => {
  try {
    const allWorkers = await db.select().from(workersTable);
    const allRequests = await db.select().from(leaveRequestsTable);

    const totalWorkers = allWorkers.length;
    const activeWorkers = allWorkers.filter((w) => w.status === "active").length;
    const pendingLeaveRequests = allRequests.filter((r) => r.status === "pending").length;
    const totalLeaveRequests = allRequests.length;

    const deptMap: Record<string, number> = {};
    for (const w of allWorkers) {
      deptMap[w.department] = (deptMap[w.department] || 0) + 1;
    }
    const workersByDepartment = Object.entries(deptMap).map(([department, count]) => ({ department, count }));

    const statusMap: Record<string, number> = {};
    for (const r of allRequests) {
      statusMap[r.status] = (statusMap[r.status] || 0) + 1;
    }
    const leaveRequestsByStatus = Object.entries(statusMap).map(([status, count]) => ({ status, count }));

    const recentWorkers = allWorkers
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
      .map((w) => ({
        ...w,
        paymentAmount: parseFloat(w.paymentAmount || "0"),
        paymentPaid: parseFloat(w.paymentPaid || "0"),
        createdAt: w.createdAt instanceof Date ? w.createdAt.toISOString() : w.createdAt,
      }));

    return res.json({
      totalWorkers,
      activeWorkers,
      pendingLeaveRequests,
      totalLeaveRequests,
      workersByDepartment,
      leaveRequestsByStatus,
      recentWorkers,
    });
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
