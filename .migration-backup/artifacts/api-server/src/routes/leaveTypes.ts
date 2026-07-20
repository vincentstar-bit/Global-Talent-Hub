import { Router } from "express";
import { db } from "@workspace/db";
import { leaveTypesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAdmin } from "./auth";

const router = Router();

router.get("/leave-types", async (req, res) => {
  try {
    const types = await db.select().from(leaveTypesTable);
    return res.json(
      types.map((t) => ({ ...t, amount: parseFloat(t.amount || "0") }))
    );
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/leave-types", requireAdmin, async (req, res) => {
  try {
    const [type] = await db.insert(leaveTypesTable).values(req.body).returning();
    return res.status(201).json({ ...type, amount: parseFloat(type.amount || "0") });
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/leave-types/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [type] = await db.update(leaveTypesTable).set(req.body).where(eq(leaveTypesTable.id, id)).returning();
    if (!type) return res.status(404).json({ error: "Leave type not found" });
    return res.json({ ...type, amount: parseFloat(type.amount || "0") });
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/leave-types/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(leaveTypesTable).where(eq(leaveTypesTable.id, id));
    return res.status(204).send();
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
