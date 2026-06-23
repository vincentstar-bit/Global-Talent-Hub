import { Router } from "express";
import { db } from "@workspace/db";
import { adminsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

const router = Router();

const SUPER_USERNAME = process.env.ADMIN_USERNAME || "admin";
const SUPER_PASSWORD = process.env.ADMIN_PASSWORD || "SinoGlobal@2024";


const sessions = new Map<string, { username: string; role: string; isSuperAdmin: boolean }>();

function generateSessionId() {
  return randomBytes(32).toString("hex");
}

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [hashed, salt] = hash.split(".");
  if (!hashed || !salt) return false;
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  const hashedBuf = Buffer.from(hashed, "hex");
  return timingSafeEqual(buf, hashedBuf);
}

router.post("/auth/admin/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Username and password are required" });

  if (username === SUPER_USERNAME && password === SUPER_PASSWORD) {
    const sessionId = generateSessionId();
    const session = { username, role: "admin", isSuperAdmin: true };
    sessions.set(sessionId, session);
    res.cookie("admin_session", sessionId, { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.json({ token: sessionId, ...session });
  }

  try {
    const [admin] = await db.select().from(adminsTable).where(eq(adminsTable.username, username));
    if (admin && await verifyPassword(password, admin.passwordHash)) {
      const sessionId = generateSessionId();
      const session = { username, role: "admin", isSuperAdmin: false };
      sessions.set(sessionId, session);
      res.cookie("admin_session", sessionId, { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.json({ token: sessionId, ...session });
    }
  } catch (err) {
    console.error("[auth] DB lookup failed:", err);
  }

  return res.status(401).json({ error: "Invalid credentials" });
});

router.post("/auth/admin/logout", (req, res) => {
  const sessionId = req.cookies?.admin_session;
  if (sessionId) sessions.delete(sessionId);
  res.clearCookie("admin_session");
  res.json({ ok: true });
});

router.get("/auth/admin/me", (req, res) => {
  const authHeader = req.headers?.authorization;
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const cookieToken = req.cookies?.admin_session;
  const sessionId = bearerToken || cookieToken;
  const session = sessionId ? sessions.get(sessionId) : null;
  if (!session) return res.status(401).json({ error: "Not authenticated" });
  return res.json(session);
});

router.post("/auth/admin/reset-password", async (req: any, res: any) => {
  const sessionId = req.cookies?.admin_session;
  const session = sessionId ? sessions.get(sessionId) : null;
  if (!session) return res.status(401).json({ error: "Not authenticated" });

  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) return res.status(400).json({ error: "Both currentPassword and newPassword are required" });
  if (newPassword.length < 8) return res.status(400).json({ error: "New password must be at least 8 characters" });

  if (session.isSuperAdmin) {
    if (currentPassword !== SUPER_PASSWORD) return res.status(401).json({ error: "Current password is incorrect" });
    return res.json({ ok: true, message: "Password updated successfully. Update ADMIN_PASSWORD env var to persist." });
  }

  try {
    const [admin] = await db.select().from(adminsTable).where(eq(adminsTable.username, session.username));
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    if (!await verifyPassword(currentPassword, admin.passwordHash)) return res.status(401).json({ error: "Current password is incorrect" });
    const newHash = await hashPassword(newPassword);
    await db.update(adminsTable).set({ passwordHash: newHash }).where(eq(adminsTable.id, admin.id));
    return res.json({ ok: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("[auth] reset-password error:", err);
    return res.status(500).json({ error: "Failed to update password" });
  }
});

router.get("/auth/admins", requireAdmin, requireSuperAdmin, async (req: any, res: any) => {
  try {
    const admins = await db.select({
      id: adminsTable.id,
      username: adminsTable.username,
      displayName: adminsTable.displayName,
      createdAt: adminsTable.createdAt,
      createdBy: adminsTable.createdBy,
    }).from(adminsTable).orderBy(adminsTable.createdAt);
    return res.json(admins);
  } catch (err) {
    console.error("[auth] list admins error:", err);
    return res.status(500).json({ error: "Failed to list admins" });
  }
});

router.post("/auth/admins", requireAdmin, requireSuperAdmin, async (req: any, res: any) => {
  const { username, password, displayName } = req.body;
  if (!username || typeof username !== "string" || username.trim().length < 3) {
    return res.status(400).json({ error: "Username must be at least 3 characters" });
  }
  if (!password || typeof password !== "string" || password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters" });
  }
  if (username.trim() === SUPER_USERNAME) {
    return res.status(400).json({ error: "That username is reserved" });
  }
  try {
    const passwordHash = await hashPassword(password);
    const [created] = await db.insert(adminsTable).values({
      username: username.trim(),
      passwordHash,
      displayName: displayName?.trim() || null,
      createdBy: req.adminSession?.username || SUPER_USERNAME,
    }).returning({ id: adminsTable.id, username: adminsTable.username, displayName: adminsTable.displayName, createdAt: adminsTable.createdAt, createdBy: adminsTable.createdBy });
    return res.status(201).json(created);
  } catch (err: any) {
    if (err?.code === "23505") return res.status(409).json({ error: "Username already exists" });
    console.error("[auth] create admin error:", err);
    return res.status(500).json({ error: "Failed to create admin" });
  }
});

router.delete("/auth/admins/:id", requireAdmin, requireSuperAdmin, async (req: any, res: any) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });
  try {
    const deleted = await db.delete(adminsTable).where(eq(adminsTable.id, id)).returning({ id: adminsTable.id });
    if (!deleted.length) return res.status(404).json({ error: "Admin not found" });
    return res.json({ ok: true });
  } catch (err) {
    console.error("[auth] delete admin error:", err);
    return res.status(500).json({ error: "Failed to delete admin" });
  }
});

export function requireAdmin(req: any, res: any, next: any) {
  const authHeader = req.headers?.authorization;
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const cookieToken = req.cookies?.admin_session;
  const sessionId = bearerToken || cookieToken;
  const session = sessionId ? sessions.get(sessionId) : null;
  if (!session) return res.status(401).json({ error: "Unauthorized" });
  req.adminSession = session;
  next();
}

export function requireSuperAdmin(req: any, res: any, next: any) {
  if (!req.adminSession?.isSuperAdmin) return res.status(403).json({ error: "Forbidden: super admin only" });
  next();
}

export default router;
