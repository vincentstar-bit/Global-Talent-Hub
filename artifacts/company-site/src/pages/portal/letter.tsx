import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { useCreateLeaveLetter } from "@workspace/api-client-react";
import {
  CheckCircle2, ChevronRight, ChevronLeft, Clock,
  XCircle, AlertCircle, Mail, Calendar, RefreshCw, Home
} from "lucide-react";
import { format, parseISO } from "date-fns";

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
const RECIPIENT_TITLES = ["Supervisor", "HR Manager", "Managing Director", "Department Head", "Operations Manager"];

function StatusSpinner({ status, requestId }: { status: string; requestId: number }) {
  const config = {
    pending: {
      ring1: "border-[#c9a227]",
      ring2: "border-[#c9a227]/40",
      ring3: "border-[#c9a227]/20",
      icon: <Clock className="w-7 h-7 text-[#c9a227]" />,
      title: "Awaiting Review",
      subtitle: "Your request is in the queue and will be reviewed shortly.",
      badge: "bg-amber-100 text-amber-800 border-amber-200",
      badgeText: "Pending",
    },
    approved: {
      ring1: "border-emerald-500",
      ring2: "border-emerald-400/50",
      ring3: "border-emerald-300/30",
      icon: <CheckCircle2 className="w-7 h-7 text-emerald-600" />,
      title: "Leave Approved!",
      subtitle: "Your leave request has been approved by the department.",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      badgeText: "Approved",
    },
    rejected: {
      ring1: "border-red-500",
      ring2: "border-red-400/50",
      ring3: "border-red-300/30",
      icon: <XCircle className="w-7 h-7 text-red-600" />,
      title: "Request Declined",
      subtitle: "Your leave request has been declined. Contact HR for more information.",
      badge: "bg-red-100 text-red-800 border-red-200",
      badgeText: "Declined",
    },
  }[status] ?? {
    ring1: "border-muted-foreground",
    ring2: "border-muted-foreground/40",
    ring3: "border-muted-foreground/20",
    icon: <Clock className="w-7 h-7 text-muted-foreground" />,
    title: "Processing",
    subtitle: "Your request is being processed.",
    badge: "bg-muted text-muted-foreground border-border",
    badgeText: status,
  };

  return (
    <div className="text-center py-10">
      <div className="relative w-28 h-28 mx-auto mb-6">
        {/* Spinning rings */}
        <div className={`absolute inset-0 rounded-full border-4 ${config.ring1} ${status === "pending" ? "animate-spin" : ""}`} style={{ animationDuration: "2s" }} />
        <div className={`absolute inset-2 rounded-full border-4 ${config.ring2} ${status === "pending" ? "animate-spin" : ""}`} style={{ animationDuration: "3s", animationDirection: "reverse" }} />
        <div className={`absolute inset-4 rounded-full border-4 ${config.ring3} ${status === "pending" ? "animate-spin" : ""}`} style={{ animationDuration: "4s" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          {config.icon}
        </div>
      </div>

      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border mb-4 ${config.badge}`}>
        {config.badgeText}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{config.title}</h3>
      <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">{config.subtitle}</p>

      {status === "pending" && (
        <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-muted-foreground">
          <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: "3s" }} />
          Auto-refreshing every 10 seconds
        </div>
      )}
    </div>
  );
}

function PastRequest({ req }: { req: any }) {
  const statusCls = {
    pending: "bg-amber-100 text-amber-800 border-amber-200",
    approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  }[req.status as string] ?? "bg-muted text-muted-foreground border-border";

  return (
    <div className="flex items-center gap-4 p-4 border border-border rounded-xl bg-card hover:bg-muted/20 transition-colors">
      <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
        req.status === "approved" ? "bg-emerald-500" :
        req.status === "pending" ? "bg-amber-500" : "bg-red-500"
      }`} />
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-foreground text-sm truncate">{req.leaveTypeName ?? "Leave Request"}</div>
        <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
          <Calendar className="w-3 h-3" />
          {req.startDate && req.endDate && `${req.startDate} → ${req.endDate}`}
        </div>
      </div>
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border capitalize shrink-0 ${statusCls}`}>{req.status}</span>
    </div>
  );
}

export default function PortalLetterPage() {
  const [, navigate] = useLocation();

  // Session state
  const [workerId, setWorkerId] = useState<number | null>(null);
  const [workerToken, setWorkerToken] = useState("");
  const [leaveTypeId, setLeaveTypeId] = useState<number | null>(null);
  const [workerName, setWorkerName] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  // Form
  const [recipient, setRecipient] = useState("Supervisor");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  // Post-submit
  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState<number | null>(null);
  const [requestStatus, setRequestStatus] = useState("pending");
  const [pastRequests, setPastRequests] = useState<any[]>([]);

  useEffect(() => {
    const id = sessionStorage.getItem("portal_worker_id");
    const token = sessionStorage.getItem("portal_worker_token") ?? "";
    const typeId = sessionStorage.getItem("portal_selected_leave_type_id");
    const name = sessionStorage.getItem("portal_worker_name") ?? "";
    const email = sessionStorage.getItem("portal_contact_email") ?? "";
    if (!id) { navigate("/portal"); return; }
    setWorkerId(parseInt(id));
    setWorkerToken(token);
    setLeaveTypeId(typeId ? parseInt(typeId) : null);
    setWorkerName(name);
    setContactEmail(email);
    setSubject(`Formal Leave Application — ${name}`);
    setBody("");
  }, []);

  useEffect(() => {
    if (body) {
      setBody((prev) => {
        const lines = prev.split("\n");
        lines[0] = `Dear ${recipient},`;
        return lines.join("\n");
      });
    }
  }, [recipient]);

  // Poll for status
  const pollStatus = useCallback(async (reqId: number) => {
    try {
      const res = await fetch(`${BASE}/api/leave-requests/${reqId}`);
      if (res.ok) {
        const data = await res.json();
        setRequestStatus(data.status);
      }
    } catch (_) {}
  }, []);

  // Load past requests by token
  const loadPastRequests = useCallback(async (token: string) => {
    if (!token) return;
    try {
      const res = await fetch(`${BASE}/api/leave-requests/worker/${token}`);
      if (res.ok) setPastRequests(await res.json());
    } catch (_) {}
  }, []);

  useEffect(() => {
    if (!submitted || !requestId) return;
    pollStatus(requestId);
    loadPastRequests(workerToken);
    const interval = setInterval(() => {
      pollStatus(requestId);
      loadPastRequests(workerToken);
    }, 10000);
    return () => clearInterval(interval);
  }, [submitted, requestId, workerToken]);

  const createLetter = useCreateLeaveLetter({
    mutation: {
      onSuccess: () => {
        const reqId = parseInt(sessionStorage.getItem("portal_leave_request_id") ?? "0");
        setRequestId(reqId);
        setSubmitted(true);
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workerId || !leaveTypeId) return;
    createLetter.mutate({
      data: { workerId, leaveTypeId, subject, body, recipientTitle: recipient },
    });
  };

  // ── Post-submit: status tracker ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1">
          <section className="bg-[#0a1628] pt-28 pb-10">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-8 bg-[#c9a227]" />
                <span className="text-[#c9a227] text-xs tracking-widest uppercase font-medium">Worker Portal</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Leave Request Submitted</h1>
              {contactEmail && (
                <div className="flex items-center gap-2 text-white/50 text-sm mt-2">
                  <Mail className="w-3.5 h-3.5" />
                  Notifications will be sent to <span className="text-white/80">{contactEmail}</span>
                </div>
              )}
            </div>
          </section>

          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Status card */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border bg-muted/30">
                <p className="font-bold text-foreground text-sm">Request Status</p>
                <p className="text-xs text-muted-foreground">Reference #{requestId ?? "—"}</p>
              </div>
              {requestId !== null && (
                <StatusSpinner status={requestStatus} requestId={requestId} />
              )}
            </div>

            {/* What happens next */}
            <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
              <p className="font-bold text-foreground text-sm">What happens next?</p>
              {[
                { icon: Clock, text: "Your leave letter is sent to the designated department for review.", done: true },
                { icon: CheckCircle2, text: "A manager will approve or decline your request.", done: requestStatus !== "pending" },
                { icon: Mail, text: `You'll receive an update at ${contactEmail || "your registered email"} once a decision is made.`, done: requestStatus === "approved" || requestStatus === "rejected" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${item.done ? "bg-[#c9a227]/15" : "bg-muted"}`}>
                    <item.icon className={`w-3.5 h-3.5 ${item.done ? "text-[#c9a227]" : "text-muted-foreground"}`} />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Past requests */}
            {pastRequests.length > 0 && (
              <div>
                <h3 className="font-bold text-foreground text-sm mb-3">Your Leave Request History</h3>
                <div className="space-y-2">
                  {pastRequests.map((req) => <PastRequest key={req.id} req={req} />)}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  const token = sessionStorage.getItem("portal_worker_token") ?? "";
                  sessionStorage.clear();
                  if (token) navigate(`/portal/worker/${token}`);
                  else navigate("/portal");
                }}
                className="flex items-center gap-2 px-5 py-3 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <Home className="w-4 h-4" /> My Profile
              </button>
              <button
                onClick={() => { sessionStorage.clear(); navigate("/portal"); }}
                className="flex-1 py-3 bg-[#c9a227] text-[#0a1628] font-bold rounded-xl hover:bg-[#d4af37] transition-colors text-sm"
              >
                Return to Portal
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Letter form ──
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-[#0a1628] pt-28 pb-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => navigate("/portal/apply")} className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-5 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-[#c9a227]" />
            <span className="text-[#c9a227] text-xs tracking-widest uppercase font-medium">Worker Portal · Step 3 of 3</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">Write Your Leave Letter</h1>
          <p className="text-white/50 text-sm">Compose a formal letter for your supervisor's review.</p>
        </div>
      </section>

      <section className="py-10 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

          {contactEmail && (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700 mb-6">
              <Mail className="w-4 h-4 shrink-0" />
              Approval notifications will be sent to <strong>{contactEmail}</strong>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 space-y-5">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Addressed To</label>
              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 focus:border-[#c9a227] transition-all"
              >
                {RECIPIENT_TITLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 focus:border-[#c9a227] transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Letter Body</label>
              <div className="border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#c9a227]/50 focus-within:border-[#c9a227] transition-all">
                <div className="bg-muted/30 px-4 py-2 border-b border-border text-xs text-muted-foreground">Formal Letter</div>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={14}
                  required
                  className="w-full px-4 py-4 text-sm bg-background text-foreground font-mono resize-none leading-relaxed focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!subject || !body || createLetter.isPending}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#c9a227] text-[#0a1628] font-bold rounded-xl hover:bg-[#d4af37] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg shadow-[#c9a227]/20"
            >
              {createLetter.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#0a1628] border-t-transparent rounded-full animate-spin" />
                  Submitting…
                </>
              ) : (
                <>Submit Letter for Review <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
