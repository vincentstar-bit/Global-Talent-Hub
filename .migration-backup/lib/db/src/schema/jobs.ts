import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const jobRolesTable = pgTable("job_roles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  department: text("department").notNull(),
  description: text("description").notNull(),
  responsibilities: text("responsibilities").notNull(),
  requirements: text("requirements").notNull(),
  salary: text("salary").notNull(),
  photoUrl: text("photo_url").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertJobRoleSchema = createInsertSchema(jobRolesTable).omit({ id: true });
export type InsertJobRole = z.infer<typeof insertJobRoleSchema>;
export type JobRole = typeof jobRolesTable.$inferSelect;
