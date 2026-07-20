import { pgTable, text, serial, integer, numeric, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const workersTable = pgTable("workers", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email"),
  phone: text("phone"),
  accessToken: text("access_token").notNull().unique(),
  jobTitle: text("job_title").notNull(),
  department: text("department").notNull(),
  contractStart: text("contract_start").notNull(),
  contractEnd: text("contract_end").notNull(),
  contractDeal: text("contract_deal").notNull(),
  paymentStatus: text("payment_status").notNull().default("pending"),
  paymentAmount: numeric("payment_amount", { precision: 12, scale: 2 }).notNull().default("0"),
  paymentPaid: numeric("payment_paid", { precision: 12, scale: 2 }).notNull().default("0"),
  assignedCountry: text("assigned_country"),
  countryEntryDate: text("country_entry_date"),
  countryStayYears: integer("country_stay_years"),
  photoUrl: text("photo_url"),
  nationality: text("nationality"),
  passportNumber: text("passport_number"),
  status: text("status").notNull().default("active"),
  hiredBy: text("hired_by"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertWorkerSchema = createInsertSchema(workersTable).omit({ id: true, accessToken: true, createdAt: true });
export type InsertWorker = z.infer<typeof insertWorkerSchema>;
export type Worker = typeof workersTable.$inferSelect;
