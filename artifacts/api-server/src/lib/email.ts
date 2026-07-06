import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "support@dynamicoffshoredrilling.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";
const ALERT_EMAIL = "lucasdonn20@gmail.com";

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
    subject: `[Dynamic Offshore Contact] ${payload.subject} — from ${payload.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
        <div style="background:#0a1628;padding:24px 32px">
          <h2 style="color:#c9a227;margin:0;font-size:20px">Dynamic Offshore Drilling — New Contact Message</h2>
        </div>
        <div style="padding:32px;background:#fff">
          <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px">
            <tr><td style="padding:8px 0;color:#6b7280;width:100px">Name</td><td style="padding:8px 0;font-weight:600;color:#111827">${payload.name}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${payload.email}" style="color:#c9a227">${payload.email}</a></td></tr>
            ${payload.company ? `<tr><td style="padding:8px 0;color:#6b7280">Company</td><td style="padding:8px 0;color:#111827">${payload.company}</td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#6b7280">Subject</td><td style="padding:8px 0;color:#111827">${payload.subject}</td></tr>
          </table>
          <div style="background:#f9fafb;border-radius:6px;padding:16px;font-size:14px;color:#374151;line-height:1.6;white-space:pre-wrap">${payload.message}</div>
          <p style="margin-top:24px;font-size:12px;color:#9ca3af">Sent from Dynamicoffshoredrilling.com contact form</p>
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
    subject: `[Dynamic Offshore HR] ${eventLabels[payload.event]} — ${payload.workerName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
        <div style="background:#0a1628;padding:24px 32px">
          <h2 style="color:#c9a227;margin:0;font-size:20px">Dynamic Offshore Drilling — ${eventLabels[payload.event]}</h2>
        </div>
        <div style="padding:32px;background:#fff">
          <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px">
            <tr><td style="padding:8px 0;color:#6b7280;width:120px">Worker</td><td style="padding:8px 0;font-weight:600;color:#111827">${payload.workerName}</td></tr>
            ${payload.workerEmail ? `<tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0;color:#111827">${payload.workerEmail}</td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#6b7280">Event</td><td style="padding:8px 0;color:#111827">${eventLabels[payload.event]}</td></tr>
          </table>
          <div style="background:#f9fafb;border-radius:6px;padding:16px;font-size:14px;color:#374151;line-height:1.6">${payload.details}</div>
          <p style="margin-top:24px;font-size:12px;color:#9ca3af">Dynamic Offshore Drilling Enterprise Admin System</p>
        </div>
      </div>
    `,
  });
}

export async function sendLeaveRequestConfirmation(params: {
  workerName: string;
  toEmail: string;
  leaveTypeName: string;
  startDate: string;
  endDate: string;
  requestId: number;
  reason?: string;
}): Promise<void> {
  if (!resend) { warnNoKey(); return; }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: params.toEmail,
    subject: `Leave Request Received — ${params.leaveTypeName} (Ref #${params.requestId})`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
        <div style="background:#0a1628;padding:24px 32px">
          <h2 style="color:#c9a227;margin:0;font-size:20px">Dynamic Offshore Drilling — Leave Request Received</h2>
        </div>
        <div style="padding:32px;background:#fff">
          <p style="font-size:16px;color:#111827;margin-top:0">Dear <strong>${params.workerName}</strong>,</p>
          <p style="font-size:14px;color:#374151;line-height:1.6">Your leave request has been successfully submitted and is now under review by the HR department. You will be notified by email once a decision has been made.</p>
          <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:20px;margin:24px 0">
            <p style="margin:0 0 4px;font-size:11px;color:#92400e;text-transform:uppercase;letter-spacing:0.05em;font-weight:600">Reference Number</p>
            <p style="margin:0 0 16px;font-size:22px;font-weight:700;color:#0a1628">REF-${String(params.requestId).padStart(5, "0")}</p>
            <table style="width:100%;border-collapse:collapse;font-size:13px">
              <tr><td style="padding:5px 0;color:#6b7280;width:110px">Leave Type</td><td style="padding:5px 0;font-weight:600;color:#111827">${params.leaveTypeName}</td></tr>
              <tr><td style="padding:5px 0;color:#6b7280">Start Date</td><td style="padding:5px 0;color:#111827">${params.startDate}</td></tr>
              <tr><td style="padding:5px 0;color:#6b7280">End Date</td><td style="padding:5px 0;color:#111827">${params.endDate}</td></tr>
              <tr><td style="padding:5px 0;color:#6b7280">Status</td><td style="padding:5px 0"><span style="background:#fef3c7;color:#92400e;padding:2px 10px;border-radius:99px;font-size:12px;font-weight:600">Pending Review</span></td></tr>
              ${params.reason ? `<tr><td style="padding:5px 0;color:#6b7280;vertical-align:top">Reason</td><td style="padding:5px 0;color:#374151">${params.reason}</td></tr>` : ""}
            </table>
          </div>
          <p style="font-size:14px;color:#374151;line-height:1.6">You can track the status of your request at any time through the <strong>Worker Portal</strong> using the email address you provided.</p>
          <p style="margin-top:24px;font-size:12px;color:#9ca3af">Dynamic Offshore Drilling Enterprise — HR Department</p>
        </div>
      </div>
    `,
  });
}

export async function sendLeaveStatusUpdate(params: {
  workerName: string;
  toEmail: string;
  leaveTypeName: string;
  startDate: string;
  endDate: string;
  requestId: number;
  status: "approved" | "rejected";
  adminNote?: string;
}): Promise<void> {
  if (!resend) { warnNoKey(); return; }

  const isApproved = params.status === "approved";
  const statusLabel = isApproved ? "Approved" : "Declined";
  const accentColor = isApproved ? "#059669" : "#dc2626";
  const bgColor     = isApproved ? "#f0fdf4" : "#fef2f2";
  const borderColor = isApproved ? "#bbf7d0" : "#fecaca";
  const badgeStyle  = isApproved
    ? "background:#dcfce7;color:#166534;padding:2px 10px;border-radius:99px;font-size:12px;font-weight:600"
    : "background:#fee2e2;color:#991b1b;padding:2px 10px;border-radius:99px;font-size:12px;font-weight:600";

  await resend.emails.send({
    from: FROM_EMAIL,
    to: params.toEmail,
    subject: `Leave Request ${statusLabel} — ${params.leaveTypeName} (Ref #${params.requestId})`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
        <div style="background:#0a1628;padding:24px 32px">
          <h2 style="color:#c9a227;margin:0;font-size:20px">Dynamic Offshore Drilling — Leave Request ${statusLabel}</h2>
        </div>
        <div style="padding:32px;background:#fff">
          <p style="font-size:16px;color:#111827;margin-top:0">Dear <strong>${params.workerName}</strong>,</p>
          <p style="font-size:14px;color:#374151;line-height:1.6">
            ${isApproved
              ? "We are pleased to inform you that your leave request has been <strong>approved</strong>. Please make any necessary arrangements before your leave begins."
              : "We regret to inform you that your leave request has been <strong>declined</strong>. Please contact the HR department if you have any questions or wish to discuss further."}
          </p>
          <div style="background:${bgColor};border:1px solid ${borderColor};border-radius:8px;padding:20px;margin:24px 0">
            <table style="width:100%;border-collapse:collapse;font-size:13px">
              <tr><td style="padding:5px 0;color:#6b7280;width:110px">Reference</td><td style="padding:5px 0;font-weight:700;color:#0a1628">REF-${String(params.requestId).padStart(5, "0")}</td></tr>
              <tr><td style="padding:5px 0;color:#6b7280">Leave Type</td><td style="padding:5px 0;font-weight:600;color:#111827">${params.leaveTypeName}</td></tr>
              <tr><td style="padding:5px 0;color:#6b7280">Start Date</td><td style="padding:5px 0;color:#111827">${params.startDate}</td></tr>
              <tr><td style="padding:5px 0;color:#6b7280">End Date</td><td style="padding:5px 0;color:#111827">${params.endDate}</td></tr>
              <tr><td style="padding:5px 0;color:#6b7280">Decision</td><td style="padding:5px 0"><span style="${badgeStyle}">${statusLabel}</span></td></tr>
            </table>
            ${params.adminNote ? `
            <div style="margin-top:16px;border-top:1px solid ${borderColor};padding-top:14px">
              <p style="margin:0 0 6px;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;font-weight:600">Note from HR</p>
              <p style="margin:0;font-size:14px;color:#374151;line-height:1.6">${params.adminNote}</p>
            </div>` : ""}
          </div>
          <p style="margin-top:24px;font-size:12px;color:#9ca3af">Dynamic Offshore Drilling Enterprise — HR Department<br>For queries, reply to this email or contact your HR manager directly.</p>
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
    subject: `Welcome to Dynamic Offshore Drilling, ${params.workerName} — Your Worker Portal Access`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
        <div style="background:#0a1628;padding:24px 32px">
          <h2 style="color:#c9a227;margin:0;font-size:20px">Welcome to Dynamic Offshore Drilling Enterprise</h2>
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

export async function sendWorkerLookupAlert(params: {
  workerName: string;
  lookupType: "token" | "id";
  ipAddress: string;
  userAgent: string;
}): Promise<void> {
  console.log("[alert] sendWorkerLookupAlert triggered for:", params.workerName);
  if (!resend) { warnNoKey(); return; }

  const now = new Date().toLocaleString("en-US", { timeZone: "UTC", dateStyle: "full", timeStyle: "short" });

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: ALERT_EMAIL,
    subject: `[SinoGlobal Alert] Worker Profile Looked Up — ${params.workerName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
        <div style="background:#0d1b2e;padding:24px 32px">
          <h2 style="color:#c9a227;margin:0;font-size:20px">SinoGlobal Enterprise — Worker Lookup Alert</h2>
        </div>
        <div style="padding:32px;background:#fff">
          <p style="font-size:15px;color:#111827;margin-top:0">Someone just looked up a worker profile via the Worker Portal.</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px">
            <tr><td style="padding:8px 0;color:#6b7280;width:140px">Worker Looked Up</td><td style="padding:8px 0;font-weight:600;color:#111827">${params.workerName}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Lookup Method</td><td style="padding:8px 0;color:#111827">${params.lookupType === "token" ? "Access Token" : "Worker ID"}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">IP Address</td><td style="padding:8px 0;font-weight:600;color:#0d1b2e">${params.ipAddress}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Device / Browser</td><td style="padding:8px 0;color:#374151">${params.userAgent}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Time</td><td style="padding:8px 0;color:#111827">${now} UTC</td></tr>
          </table>
          <p style="font-size:12px;color:#9ca3af;margin:0">SinoGlobal Enterprise — Automated Security Alert</p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("[alert] Resend error:", JSON.stringify(error));
  } else {
    console.log("[alert] Email sent successfully, id:", data?.id);
  }
}

export async function sendAdminMessageToWorker(params: {
  workerName: string;
  toEmail: string;
  subject: string;
  message: string;
  senderName: string;
}): Promise<void> {
  if (!resend) { warnNoKey(); return; }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: params.toEmail,
    replyTo: ADMIN_EMAIL,
    subject: `[Dynamic Offshore Drilling] ${params.subject}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
        <div style="background:#0a1628;padding:24px 32px">
          <h2 style="color:#c9a227;margin:0;font-size:20px">Dynamic Offshore Drilling — HR Message</h2>
        </div>
        <div style="padding:32px;background:#fff">
          <p style="font-size:16px;color:#111827;margin-top:0">Dear <strong>${params.workerName}</strong>,</p>
          <div style="background:#f9fafb;border-left:4px solid #c9a227;padding:16px 20px;border-radius:0 6px 6px 0;margin:20px 0;font-size:14px;color:#374151;line-height:1.8;white-space:pre-wrap">${params.message}</div>
          <p style="font-size:14px;color:#374151;margin-top:20px">
            Regards,<br/>
            <strong>${params.senderName}</strong><br/>
            <span style="color:#6b7280">Dynamic Offshore Drilling — HR Department</span>
          </p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0"/>
          <p style="font-size:12px;color:#9ca3af;margin:0">
            This message was sent to you by the HR administration team. To reply, contact
            <a href="mailto:${ADMIN_EMAIL}" style="color:#c9a227">${ADMIN_EMAIL}</a>.
          </p>
        </div>
      </div>
    `,
  });
}
