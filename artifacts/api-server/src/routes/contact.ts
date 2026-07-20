import { Router } from "express";
import { sendContactEmail } from "../lib/email";

const router = Router();

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post("/contact", async (req, res) => {
  const { name, email, company, subject, message } = req.body ?? {};

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ error: "Name is required." });
  }
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: "A valid email address is required." });
  }
  if (!message || typeof message !== "string" || message.trim().length < 10) {
    return res.status(400).json({ error: "Message must be at least 10 characters." });
  }

  try {
    await sendContactEmail({
      name: String(name).trim(),
      email: String(email).trim(),
      company: company ? String(company).trim() : undefined,
      subject: subject ? String(subject).trim() : "General Inquiry",
      message: String(message).trim(),
    });
    return res.json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    return res.status(500).json({ error: "Failed to send message. Please try again." });
  }
});

export default router;
