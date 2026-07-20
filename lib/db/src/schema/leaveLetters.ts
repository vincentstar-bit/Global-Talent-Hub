import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { workersTable } from "./workers";
import { leaveTypesTable } from "./leaveTypes";

export const leaveLettersTable = pgTable("leave_letters", {
  id: serial("id").primaryKey(),
  workerId: integer("worker_id").notNull().references(() => workersTable.id, { onDelete: "cascade" }),
  leaveTypeId: integer("leave_type_id").notNull().references(() => leaveTypesTable.id),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  recipientTitle: text("recipient_title").notNull(),
  status: text("status").notNull().default("submitted"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertLeaveLetterSchema = createInsertSchema(leaveLettersTable).omit({ id: true, status: true, createdAt: true });
export type InsertLeaveLetter = z.infer<typeof insertLeaveLetterSchema>;
export type LeaveLetter = typeof leaveLettersTable.$inferSelect;
