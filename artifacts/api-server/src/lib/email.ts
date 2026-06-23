import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "thompsonbaro@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "notifications@sinoglobal.com";

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
};

export type WorkerEventPayload = {
  workerName: string;
  workerEmail?: string;
  event: "hired" | "leave_request" | "payment_update";
  details: string;
};

function warnNoKey() {
  console.warn("[email] RESEND_API_KEY not set — email skipped");
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  if (!resend) { warnNoKey(); return; }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    replyTo: payload.email,
    subject: `[SinoGlobal Contact] ${payload.subject} — from ${payload.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
        <div style="background:#0a1628;padding:24px 32px">
          <h2 style="color:#c9a227;margin:0;font-size:20px">SinoGlobal — New Contact Message</h2>
        </div>
        <div style="padding:32px;background:#fff">
          <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px">
            <tr><td style="padding:8px 0;color:#6b7280;width:100px">Name</td><td style="padding:8px 0;font-weight:600;color:#111827">${payload.name}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${payload.email}" style="color:#c9a227">${payload.email}</a></td></tr>
            ${payload.company ? `<tr><td style="padding:8px 0;color:#6b7280">Company</td><td style="padding:8px 0;color:#111827">${payload.company}</td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#6b7280">Subject</td><td style="padding:8px 0;color:#111827">${payload.subject}</td></tr>
          </table>
          <div style="background:#f9fafb;border-radius:6px;padding:16px;font-size:14px;color:#374151;line-height:1.6;white-space:pre-wrap">${payload.message}</div>
          <p style="margin-top:24px;font-size:12px;color:#9ca3af">Sent from sinoglobal.com contact form</p>
        </div>
      </div>
    `,
  });
}

export async function sendWorkerEventEmail(payload: WorkerEventPayload): Promise<void> {
  if (!resend) { warnNoKey(); return; }

  const eventLabels: Record<WorkerEventPayload["event"], string> = {
    hired: "New Worker Hired",
    leave_request: "Leave Request Submitted",
    payment_update: "Payment Status Updated",
  };

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `[SinoGlobal HR] ${eventLabels[payload.event]} — ${payload.workerName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
        <div style="background:#0a1628;padding:24px 32px">
          <h2 style="color:#c9a227;margin:0;font-size:20px">SinoGlobal — ${eventLabels[payload.event]}</h2>
        </div>
        <div style="padding:32px;background:#fff">
          <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px">
            <tr><td style="padding:8px 0;color:#6b7280;width:120px">Worker</td><td style="padding:8px 0;font-weight:600;color:#111827">${payload.workerName}</td></tr>
            ${payload.workerEmail ? `<tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0;color:#111827">${payload.workerEmail}</td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#6b7280">Event</td><td style="padding:8px 0;color:#111827">${eventLabels[payload.event]}</td></tr>
          </table>
          <div style="background:#f9fafb;border-radius:6px;padding:16px;font-size:14px;color:#374151;line-height:1.6">${payload.details}</div>
          <p style="margin-top:24px;font-size:12px;color:#9ca3af">SinoGlobal Enterprise Admin System</p>
        </div>
      </div>
    `,
  });
}

export async function sendWorkerWelcomeEmail(params: {
  workerName: string;
  workerEmail: string;
  accessToken: string;
  jobTitle: string;
  portalUrl: string;
}): Promise<void> {
  if (!resend) { warnNoKey(); return; }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: params.workerEmail,
    subject: `Welcome to SinoGlobal, ${params.workerName} — Your Worker Portal Access`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
        <div style="background:#0a1628;padding:24px 32px">
          <h2 style="color:#c9a227;margin:0;font-size:20px">Welcome to SinoGlobal Enterprise</h2>
        </div>
        <div style="padding:32px;background:#fff">
          <p style="font-size:16px;color:#111827;margin-top:0">Dear <strong>${params.workerName}</strong>,</p>
          <p style="font-size:14px;color:#374151;line-height:1.6">Your worker account has been created for your role as <strong>${params.jobTitle}</strong>. Use the details below to access your personal worker portal.</p>
          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;text-align:center">
            <p style="margin:0 0 8px;font-size:12px;color:#0369a1;text-transform:uppercase;letter-spacing:0.05em">Your Access Token</p>
            <p style="margin:0;font-size:28px;font-weight:700;color:#0a1628;letter-spacing:0.1em;font-family:monospace">${params.accessToken}</p>
          </div>
          <div style="text-align:center;margin:24px 0">
            <a href="${params.portalUrl}" style="display:inline-block;background:#c9a227;color:#0a1628;font-weight:700;padding:14px 32px;border-radius:6px;text-decoration:none;font-size:15px">Access Your Portal →</a>
          </div>
          <p style="font-size:12px;color:#9ca3af;margin-bottom:0">Keep your access token confidential. If you believe it has been compromised, contact HR immediately.</p>
        </div>
      </div>
    `,
  });
}
