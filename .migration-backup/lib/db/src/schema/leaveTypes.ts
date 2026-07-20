import { pgTable, text, serial, integer, numeric, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const leaveTypesTable = pgTable("leave_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  maxDays: integer("max_days").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull().default("0"),
  requiresApproval: boolean("requires_approval").notNull().default(true),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertLeaveTypeSchema = createInsertSchema(leaveTypesTable).omit({ id: true });
export type InsertLeaveType = z.infer<typeof insertLeaveTypeSchema>;
export type LeaveType = typeof leaveTypesTable.$inferSelect;
