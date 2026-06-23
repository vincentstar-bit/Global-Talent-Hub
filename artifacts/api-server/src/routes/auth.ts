import { Router } from "express";

const router = Router();

let ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
let ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "SinoGlobal@2024";

declare module "express-serve-static-core" {
  interface Request {
    session?: { username: string; role: string };
  }
}

const sessions = new Map<string, { username: string; role: string }>();

function generateSessionId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

router.post("/auth/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const sessionId = generateSessionId();
    const session = { username, role: "admin" };
    sessions.set(sessionId, session);
    res.cookie("admin_session", sessionId, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json(session);
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
  const sessionId = req.cookies?.admin_session;
  const session = sessionId ? sessions.get(sessionId) : null;
  if (!session) return res.status(401).json({ error: "Not authenticated" });
  return res.json(session);
});

router.post("/auth/admin/reset-password", (req: any, res: any) => {
  const sessionId = req.cookies?.admin_session;
  const session = sessionId ? sessions.get(sessionId) : null;
  if (!session) return res.status(401).json({ error: "Not authenticated" });

  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Both currentPassword and newPassword are required" });
  }
  if (currentPassword !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Current password is incorrect" });
  }
  if (newPassword.length < 8) {
    return res.status(400).json({ error: "New password must be at least 8 characters" });
  }

  ADMIN_PASSWORD = newPassword;
  return res.json({ ok: true, message: "Password updated successfully" });
});

export function requireAdmin(req: any, res: any, next: any) {
  const sessionId = req.cookies?.admin_session;
  const session = sessionId ? sessions.get(sessionId) : null;
  if (!session) return res.status(401).json({ error: "Unauthorized" });
  req.adminSession = session;
  next();
}

export default router;
